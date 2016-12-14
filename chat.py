from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, join_room, leave_room, send, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")

def index():
  if 'username' in session:
    print('Logged in as %s' % escape(session['username']))
  else:
    print('not logged in')
  return render_template('index.html')

# Client requests to join chat
@socketio.on('register')
def handle_registration(registration):
    sid = request.sid
    username = registration['username']
    session['username'] = username

    # Pull up old messages if they exist
    if ('messages' in session):
        print('old messages:', session['messages'])
        emit('session messages',
        {'messages': session['messages']},
        room = sid)
    else:
        print('creating new messages on session')
        session['messages'] = {}
    join_room('chatroom')

    # Confirm registration
    emit('registered',
        {'username': username, 'sid': sid},
        room = sid)
    # Tell other users about new client
    emit('add user',
        {'username': username, 'sid': sid},
        room = 'chatroom')

    # Send state

# Client tells new user of its existence
@socketio.on('announce')
def announce_self(message):
    username = message['username']
    user_sid = message['sid']
    client_sid = message['client_sid']
    # Tell only the new user
    emit('announce to new user',
        {'username': username, 'sid': user_sid},
        room = client_sid)

# On Client request to send a message.
@socketio.on('msg')
def handle_message(message):
  sender_username = message['sender_username']
  sender_sid = message['sender_sid']
  recipient_sid = message['receiver_sid']
  receiver_username = message['receiver_username']
  msg = message['msg']

  # Check if the client
  if sender_sid not in session['messages']:
      session['messages'][sender_username] = []

  session['messages'][sender_username].append(msg)

  emit('receive msg',
    {'sender_username': sender_username,
    'sender_sid': sender_sid,
    'receiver_username': receiver_username,
    'msg': msg},
    room = recipient_sid)

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == "__main__":
  socketio.run(app)
