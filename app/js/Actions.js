export const ADD_USER = 'ADD_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CONFIRM_REGISTER = 'CONFIRM_REGISTER';
export const SET_MESSAGES = 'SET_MESSAGES';
export const OPEN_CHAT_WINDOW = 'OPEN_CHAT_WINDOW';

/* Action Creators */
export function add_user(username, sid) {
  return {
    type: ADD_USER,
    username,
    sid
  }
}

export function add_message(sender_username, receiver_username, msg) {
  return {
    type: ADD_MESSAGE,
    sender_username,
    receiver_username,
    msg
  }
}

export function confirm_register(username, sid) {
  return {
    type: CONFIRM_REGISTER,
    username,
    sid
  }
}

export function open_chat_window(username, sid) {
  return {
    type: OPEN_CHAT_WINDOW,
    username,
    sid
  }
}
