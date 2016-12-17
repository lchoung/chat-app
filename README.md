# chat-app

## Description

Simple chat app that allows clients connected to the server to send messages to each other.

## Structure

Server: `chat.py`

Client: `app/`


## Run
I recommend setting this up in a Python venv.

Requires Python, Node.

To install:

`pip install` -- Server dependencies

`npm install` -- Client-side dependencies
`webpack`-- To use npm packages on client-side

To run:

`python chat.py`


## To Do
- Implement log out
- Save sessions on flask-session cookies
- Sanitize inputs
- Write backend tests
