function Message(msg, sender_username, receiver_username, timestamp) {
  this.msg = msg;
  this.sender_username = sender_username;
  this.receiver_username = receiver_username;
  this.timestamp = timestamp;
}

export default Message;
