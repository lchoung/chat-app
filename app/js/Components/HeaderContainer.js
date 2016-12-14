import React from 'react';
import ActionFace from 'material-ui/svg-icons/action/face';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const logoStyles = {
  marginRight: 10,
  marginLeft: 10,
  marginTop: 3,
  width: 40,
  height: 40,
};

const loginStyles = {
  marginTop: 5,
}

class HeaderContainer extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      selectedUsername: null,
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._selectUser = this._selectUser.bind(this);
    this.renderClientList = this.renderClientList.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.renderLogoutForm = this.renderLogoutForm.bind(this);
  }

  /* Event handlers */
  _handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  _handleSubmit(event) {
    this.props.onRegisterUser(this.state.username);
    event.preventDefault();
  }

  _selectUser(event, index, name) {
    this.setState({
      selectedUsername: name
    });
    this.props.openChatWindow(name);
  }

  renderClientList() {
    /* Fix the value thing later*/
    const menuItems =
       Object.keys(this.props.userList.toObject()).map(function(user, i) {
         return(
           <MenuItem key={i} value={user} primaryText={user} />
         );
       });
    const menu =
      <DropDownMenu
        value={this.state.selectedUsername}
        onChange={this._selectUser}
        >
        {menuItems}
      </DropDownMenu>;
    return menu;
  }

  /* Rendering functions */
  renderLoginForm() {
    return (
      <div style={loginStyles}>
        <form onSubmit={this._handleSubmit}>
          <label>
            <TextField
              style={{marginRight: '7px', color: '#FFFFFF'}}
              hintText="Username"
              onChange={this._handleChange}/>
          </label>
          <RaisedButton
            type="submit"
            label="Login"
            secondary={true}/>
        </form>
      </div>
    );
  }

  renderLogoutForm() {
    return(
      <h3 style={{color: '#FFFFFF'}}>
        {this.state.username}
      </h3>
    );
  }

  render() {
    return (
      <AppBar
        title="S P E A K"
        iconElementLeft={<ActionFace style={logoStyles} color='#FFFFFF'/>}>
        <div id="nav-bar">
          {!this.props.isSignedIn ?
            this.renderLoginForm() :
            this.renderLogoutForm()}
        </div>
      </AppBar>
    );
  }
}

HeaderContainer.propTypes = {
    onRegisterUser: React.PropTypes.func.isRequired,
    openChatWindow: React.PropTypes.func.isRequired,
    userList: React.PropTypes.object.isRequired,
    isSignedIn: React.PropTypes.bool,
};

export default HeaderContainer;
