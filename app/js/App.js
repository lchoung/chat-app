// @flow
import { Provider, connect } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {blueGrey700, blueGrey900, teal400, grey900, grey400, grey100, grey500} from 'material-ui/styles/colors';

import { store } from '../js/UserStore.js';
import Chat from '../js/Components/Chat.js';

const socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('session messages', messages =>
  store.dispatch({type: 'SET_MESSAGES', messages})
);

injectTapEventPlugin();

const mapStateToProps = function(state) {
  return {
    messages: state.messages,
    user: state.user,
    userList: state.userList,
    isSignedIn: state.isSignedIn,
    openChatWindows: state.openChatWindows,
  };
}

const ChatContainer = connect(
  mapStateToProps
)(Chat);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey700,
    primary2Color: blueGrey900,
    primary3Color: grey400,
    accent1Color: grey900,
    accent2Color: grey100,
    accent3Color: grey500
  },
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
        <ChatContainer/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('chat-app')
);
