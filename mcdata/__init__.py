import os
from flask import Flask, render_template, request, send_file, g, redirect
from flask_login import login_required, current_user
from flask_login import LoginManager 
from bson.json_util import dumps
from bson.json_util import loads

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    #### INITIALIZE APP ####
    from . import db
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    from .user import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        user_collection = db.get_db()['user']
        cursor = user_collection.find({"user_id": user_id})
        user_bson = loads(dumps(cursor)) # bson
        if not user_bson: # username doesn't exist
            return
        user_doc = user_bson[0] # dict
        print("LOAD USER. USER DOC:\n" + user_doc["user_id"]+ user_doc["email"])
        user = User(user_doc) # TODO should work now that user is Object (with MixinUser inheritance)
        return user# TODO query to get USER object User.query.get(int(user_id))

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    return app