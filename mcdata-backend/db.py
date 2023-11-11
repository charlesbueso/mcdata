from pymongo import MongoClient 
import click
from flask import g
from .config import config


def get_db():
    if 'db' not in g:
        client = MongoClient(config['host'], config['port_number'],uuidRepresentation='standard') 
        g.db = client[config['database']] 

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        client = db.client
        client.close()

def init_db():
    db = get_db() #client
    init_schema(db)
    
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

def init_schema(db):
    # flask --app mcdata-backend init-db
    collection_names = db.list_collection_names()

    if "user" not in collection_names:
        db.create_collection("user")

    # Delete all other collections
    for collection_name in collection_names:
        if collection_name != "user":
            db[collection_name].drop()

@click.command('init-db')
def init_db_command():
    """Cleans up collections, sets user if not found."""
    init_db()
    click.echo('Initialized the database.')

