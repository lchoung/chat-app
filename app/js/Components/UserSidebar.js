import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const styles = {
  sidebarStyle: {
    position: 'absolute',
    height: '500px',
    width: '250px',
    overflow: 'auto'
  }
};

class UserListItem extends React.Component {
  constructor(props: Props) {
    super(props);
    this._selectUser = this._selectUser.bind(this);
  }

  _selectUser(event) {
    var name = this.props.userObj.username;
    this.props.openChatWindow(name);
    event.preventDefault();
  }

  render() {
    const userObj = this.props.userObj;
    return(
      <ListItem
         key={userObj.id}
         primaryText={userObj.username}
         leftAvatar={<Avatar> {userObj.username[0]} </Avatar>}
         rightIcon={<CommunicationChatBubble />}
         onClick={this._selectUser}
       />
    );
  }
}

UserListItem.propTypes = {
  userObj: React.PropTypes.object.isRequired,
  openChatWindow: React.PropTypes.func.isRequired
};

class UserSidebar extends React.Component {
  constructor(props: Props) {
    super(props);
    this._renderClientList = this._renderClientList.bind(this);
  }

  _renderClientList() {
    const clientItems =
       this.props.userList.map(function(userObj, i) {
         if(userObj.username != this.props.username) {
           return(
            <UserListItem
              userObj={userObj}
              openChatWindow={this.props.openChatWindow} />
           );
         }
       }, this);
    const menu =
      <div style = {styles.sidebarStyle}>
        <List>
          {clientItems}
        </List>
      </div>;
    return menu;
  }

  render() {
    return this._renderClientList();
  }
}

UserSidebar.propTypes = {
    username: React.PropTypes.string,
    userList: React.PropTypes.object.isRequired,
    openChatWindow: React.PropTypes.func.isRequired,
};

export default UserSidebar;
