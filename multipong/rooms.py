from multipong import app
import walrus


def generate_uid(size=10):
    import random, string
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(size))


class Room(walrus.Model):
    def __init__(self, id="default", *args, **kwargs):
        if id == "default":
            id = "room_{}".format(generate_uid())
        super().__init__(id=id, *args, **kwargs)

    @staticmethod
    def get_by_id(rid):  # returns a room object
        return list(Room.query(Room.id == rid)).__getitem__(0)  # avoids key error

    __database__ = walrus.Database.from_url(app.config.get("REDIS_URL"))
    id = walrus.TextField(default="room_{}".format(generate_uid()), index=True)
    players = walrus.SetField()
    spectators = walrus.SetField()
