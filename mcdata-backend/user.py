
from flask_login import UserMixin
from . import db

class User(UserMixin):
    def __init__(self, user_id, email, username, password, first_name, last_name, datasets_owned):
        self.user_id = user_id
        self.email = email
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.datasets_owned = datasets_owned
