from multipong import socketio, app
from flask import session, render_template
from flask_socketio import emit, join_room, leave_room, Namespace
from multipong.sockets import IndexNamespace

@app.route('/chat')
def chat():
    return render_template('chat.html')


class ChatNamespace(Namespace):
    def on_usermessage(self, data):
        if session.get('room') is not None and session.get('username') is not None:
            emit('usermessage', {'username': session.get('username'), 'message': data['message']}, room=session.get('room'), namespace="/chat")
        else:
            "error because user should have had a room and a username to send message."
    def on_logout(self):
        print('logout ', session.get('username'))
        self.on_roomleave()
        session.clear()
        emit('askusername')

socketio.on_namespace(ChatNamespace("/chat"))