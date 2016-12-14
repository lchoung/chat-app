import React from 'react';
import ChatRoomsContainer from "../Components/ChatRoomsContainer.js";
import HeaderContainer from '../Components/HeaderContainer.js';
import Message from '../../js/Message.js';
import UserSidebar from '../Components/UserSidebar';

import { add_user, add_message, confirm_register, open_chat_window} from '../../js/Actions.js';
import { store } from '../../js/UserStore.js';

var socket = io.connect('http://' + document.domain + ':' + location.port);

var sidebarStyle = {
  float: 'right',
  width: '20%',
  marginBottom: '-5000px',
  paddingBottom: '5000px',
};

var chatroomStyle = {
  width: '80%',
  display: 'inline-block',
  position: 'relative',
}
class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onRegisterUser = this._onRegisterUser.bind(this);
    this._addUser = this._addUser.bind(this);
    this._openChatWindow = this._openChatWindow.bind(this);
    this._onMessageSend = this._onMessageSend.bind(this);

    socket.on('registered', function(msg) {
      store.dispatch(confirm_register(msg.username, msg.sid));
    });

    // Received identification from older user
    socket.on('announce to new user', function(msg) {
      store.dispatch(add_user(msg.username, msg.sid));
    });

    // Add new user
    socket.on('add user', (msg) => this._addUser(msg));

    // Receive message from another client
    socket.on('receive msg', function(msg) {
      store.dispatch(add_message(msg.sender_username, msg.receiver_username, msg.msg));
      store.dispatch(open_chat_window(msg.sender_username, msg.sender_sid));
    });
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <div id = "header">
          <HeaderContainer
            onRegisterUser={this._onRegisterUser}
            userList={this.props.userList}
            isSignedIn={this.props.isSignedIn}
            openChatWindow={this._openChatWindow}
          />
        </div>
        <div style={sidebarStyle}>
          <UserSidebar
            username={this.props.user ?
               this.props.user.username :
               null}
            userList={this.props.userList}
            openChatWindow={this._openChatWindow}
          />
        </div>
        <div style={chatroomStyle} id="main-container">
          <ChatRoomsContainer
            messages={this.props.messages}
            openChatWindows={this.props.openChatWindows}
            onMessageSend={this._onMessageSend}
            />
        </div>
      </div>
    );
  }

  _addUser(msg) {
    store.dispatch(add_user(msg.username, msg.sid));
    if (this.props.user) {
      socket.emit('announce', {
        username: this.props.user.username,
        sid: this.props.user.sid,
        client_sid: msg.sid
      });
    }
  }

  _openChatWindow(user) {
    var userObj = this.props.userList.get(user);
    store.dispatch(open_chat_window(userObj.username, userObj.sid));
  }

  _onMessageSend(receiver_username, msg) {
    var userObj = this.props.userList.get(receiver_username);
    var sid = userObj.sid;
    store.dispatch(
      add_message(this.props.user.username, receiver_username, msg));
    socket.emit('msg', {
      sender_username: this.props.user.username,
      sender_sid: this.props.user.sid,
      receiver_sid: sid,
      receiver_username: receiver_username,
      msg: msg
    });
  }

  _onRegisterUser(username) {
    socket.emit('register', {username: username});
  }
}

Chat.propTypes = {
    user: React.PropTypes.object,
    userList: React.PropTypes.object,
    isSignedIn: React.PropTypes.bool,
    messages: React.PropTypes.object,
};

export default Chat;
