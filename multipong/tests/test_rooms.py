from multipong import rooms


class TestRoom:
    def test_multiple_rooms(self):
        room1 = rooms.Room.create()
        room2 = rooms.Room.create()
        room1.save()
        room2.save()
        assert room1.id != room2.id
        assert room1.id == rooms.Room.get_by_id(room1.id).id
        assert room2.id == rooms.Room.get_by_id(room2.id).id
        room1.delete()
        room2.delete()

    def test_playeradd(self):
        room = rooms.Room.create()
        assert room.players.add("testplayer")
        room.save()
        assert "testplayer" in room.players
        room.players.remove("testplayer")
        assert "testplayer" not in room.players
        room.delete()

    def test_specadd(self):
        room = rooms.Room.create()
        assert room.spectators.add("testspectator")
        room.save()
        assert "testspectator" in room.spectators
        room.spectators.remove("testspectator")
        assert "testspectator" not in room.spectators
        room.delete()

