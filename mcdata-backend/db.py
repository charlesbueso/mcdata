from pymongo import MongoClient 
import click
from flask import current_app, g
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
    init_schema()
    
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

def init_schema(db):
    #cleans up collections, sets user
    collection_names = db.list_collection_names()

    if "user" in collection_names:
        db["user"].drop()
    db.create_collection("user")

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

