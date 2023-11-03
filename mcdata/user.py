
from flask_login import UserMixin
from . import db

class User(UserMixin):
        def __init__(self, d=None):
            if d is not None:
                for key, value in d.items():
                    setattr(self, key, value)

        def get_id(self):
           return (self.user_id)
        # @property
        # def is_active(self):
        #     return self.is_active
        # @is_active.setter
        # def is_active(self, new_is_active):
        #     self.is_active = new_is_active
    # def __init__(self, user_id, email, username, password, first_name, last_name, datasets_owned={}, is_active=False):
    #     self.user_id = user_id
    #     self.email = email
    #     self.username = username
    #     self.password = password
    #     self.first_name = first_name
    #     self.last_name = last_name
    #     self.datasets_owned = datasets_owned
    
