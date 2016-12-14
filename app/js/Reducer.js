import { ADD_USER, ADD_MESSAGE, CONFIRM_REGISTER, SET_MESSAGES, OPEN_CHAT_WINDOW} from '../js/Actions.js';
import Immutable from 'immutable';
import Message from '../js/Message.js';
import User from '../js/User.js';

const initialState = {
  isSignedIn: false,
  messages: Immutable.Map(),
  openChatWindows: Immutable.Set(),
  user: null,
  userList: Immutable.Map(),
}

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      const user = new User(
        action.username,
        action.sid
      );
      return Object.assign({}, state, {
        userList: state.userList.set(action.username, user)
      });
      return state;
    case ADD_MESSAGE:
      if(action.msg == '') {
        return state;
      }
      const sender_username = action.sender_username;
      const receiver_username = action.receiver_username;
      const msg = new Message(
        action.msg,
        sender_username,
        receiver_username,
        + new Date()
      );
      /* msg_list: Immutable.List */
      const msg_updater = (msg_list) => {
        return msg_list.push(msg);
      };

      /* state.messages: Immutable.Map */
      const new_msgs =
        state.messages.update(
          (sender_username == state.user.username) ?
            receiver_username :
            sender_username,
          Immutable.List(),
          msg_updater
        );

      const newState = Object.assign({}, state, {
        messages: new_msgs,
      });
      return newState;

    case CONFIRM_REGISTER:
      const userObj = new User(
        action.username,
        action.sid
      );
      return Object.assign({}, state, {
        user: userObj,
        isSignedIn: true,
      });
      return state;
    case OPEN_CHAT_WINDOW:
      return Object.assign({}, state, {
        openChatWindows: state.openChatWindows.add(action.username),
      });
    case SET_MESSAGES:
      return Object.assign({}, state, {
        messages: action.messages,
      });
    default:
      return state;
  }
}

export default chatReducer
