from multipong import socketio
from flask import request, session, url_for
from flask_socketio import emit, join_room, leave_room, Namespace
from multipong.rooms import Room

MAX_ROOM_SIZE = 10  # maximum of 10 players/spectators per room


class IndexNamespace(Namespace):
    def on_connect(self):
        print(self.namespace)
        if "username" not in session:
            self.on_roomjoin(isPlayer=False)
            emit('askusername')
        else:
            self.on_roomjoin()
            emit('playerready', {"username": session['username']})

    def on_disconnect(self):
        if "username" in session:
            self.on_roomleave()
        print("disconnected, ", session.sid, self.namespace)

    def on_newplayer(self, data):
        session['username'] = data['username']
        session['isPlayer'] = True
        self.on_roomjoin()  # join a room if not already in one
        emit('playerready', {"username": session['username']})

    def on_roomjoin(self, isPlayer=True):
        if session.get('room') is None:
            rooms = list(Room.all())
            if len(rooms) < 1:  # case: no rooms on server
                room = Room.create()
            else:
                room = rooms[0]
                for rm in rooms:
                    if isPlayer:
                        if len(rm.players) < MAX_ROOM_SIZE:
                            room = rm
                            room.players.add(session.sid)
                            break
                        elif len(rm.spectators) < MAX_ROOM_SIZE:
                            room = rm
                            room.spectators.add(session.sid)
                            break
            session['room'] = room.id
            room.save()
            join_room(room.id)
            if "username" in session and session['username'] is not None:
                emit('roomjoin', {"username": session['username'], "room": room.id}, room=room.id)
        else:
            join_room(session['room'])

    def on_roomupdate(self, data):
        pass

    def on_roomleave(self):
        leave_room(session['room'])
        room = list(Room.query(Room.id == session['room'])).__getitem__(0)  # avoids key error
        if session['isPlayer']:
            room.players.remove(session.sid)
        else:
            room.spectators.remove(session.sid)
        room.save()
        if session['username'] is not None:
            emit('roomleave', {"username": session['username']}, room=room.id)
        session['room'] = None
        players = list(room.players)
        specs = list(room.spectators)
        if len(players) < 1:
            emit('roomdelete', room=room.id)
            room.delete()


socketio.on_namespace(IndexNamespace("/"))

