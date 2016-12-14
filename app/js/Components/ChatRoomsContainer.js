import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import {blueGrey700, blueGrey900, teal400, grey900, grey400, grey100, grey500} from 'material-ui/styles/colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  chatbox: {
    width: '300px',
    minHeight: '275px',
    maxHeight: '300px',
    borderColor: 'blue',
    margin: '10px',
    padding: '10px',
  },
  chatMessageContainer: {
    display: 'block',
    overflow: 'hidden',
    width: '275px',
    height: '300px',
    maxHeight: '300px',
    minHeight: '300px',
    clear: 'both',
  },
  chatMessages: {
    height: '180px',
    paddingLeft: '5px',
    overflow: 'auto',
  },
  submit: {
    position: 'absolute',
    bottom: '0',
    marginBottom: '15px',
  },
};

const ChatLine = (message) => {
  return (
    <div>
      <div style = {{
        color: teal400,
        textTransform: 'uppercase',
        marginBottom: 2,
        fontSize: '9'}}>
          {message.sender_username}
      </div>
      <div style = {{
        fontSize: 15,
        marginLeft: 8,
        marginBottom: 5,
      }}>
        {message.msg}
      </div>
    </div>
  );
}

class ChatBoxMessages extends React.Component {
  constructor(props: Props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = {
      pendingMessage: '',
    };
  }
  _onChange(event) {
    this.setState({
      pendingMessage: event.target.value,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.pendingMessage != nextState.pendingMessage) {
      return true;
    }
    if (nextProps && nextProps.messages && this.props.messages) {
      return (nextProps.messages.size != this.props.messages.size);
    }
    return true;
  }

  componentDidUpdate() {
    var node = this.refs.msgs;
    node.scrollTop = node.scrollHeight;
  }

  _onSubmit(event) {
    this.props.onMessageSend(this.props.username, this.state.pendingMessage);
    this.setState({
      pendingMessage: '',
    });
    event.preventDefault();
  }

  render() {
    const chat_msgs = this.props.messages ?
       this.props.messages.map(function(message, i) {
         return(
           <div key={i}> {ChatLine(message)} </div>
         );
       }) : null;
    return(
      <div style={styles.chatMessageContainer}>
        <div ref="msgs" style={styles.chatMessages}>
          {chat_msgs}
        </div>
        <form style={styles.submit} onSubmit={this._onSubmit}>
            <TextField
              style={{width: '250px'}}
              value={this.state.pendingMessage}
              onChange={this._onChange}
              hintText="Say something" />
            <FlatButton style={{display:'none'}} type="submit" label="Send" />
        </form>
      </div>
    );
  }
}

ChatBoxMessages.propTypes = {
    messages: React.PropTypes.object,
    username: React.PropTypes.string.isRequired,
    onMessageSend: React.PropTypes.func.isRequired,
};

class ChatBox extends React.Component {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return(
      <Paper style={styles.chatbox}>
        <h3> {this.props.username} </h3>
        <ChatBoxMessages
          messages={this.props.messages}
          username={this.props.username}
          onMessageSend={this.props.onMessageSend} />
      </Paper>
    );
  }
}

ChatBox.propTypes = {
    messages: React.PropTypes.object,
    username: React.PropTypes.string.isRequired,
    onMessageSend: React.PropTypes.func.isRequired,
};


class ChatRoomsContainer extends React.Component {
  constructor(props: Props) {
    super(props);
    this._renderChatBox = this._renderChatBox.bind(this);
  }

  _renderChatBox(user, i) {
      let onMessageSend = this.props.onMessageSend;
      const messages = this.props.messages.get(user);
      return(
        <ChatBox
          key={i}
          messages={messages}
          username={user}
          onMessageSend={onMessageSend}
          />
      );
  }

  render() {
    const chatItems =
      Object.keys(this.props.openChatWindows.toObject()).map(this._renderChatBox);

    const openChatList =
      <div style={styles.container}>
          {chatItems}
      </div>;

    return(openChatList);
  }
}

ChatRoomsContainer.propTypes = {
    messages: React.PropTypes.object,
    openChatWindows: React.PropTypes.object.isRequired,
    onMessageSend: React.PropTypes.func.isRequired,
};

export default ChatRoomsContainer;
