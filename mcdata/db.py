import mysql.connector
import click
from flask import current_app, g
from .config import config


def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(**config)
        print("connected")

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()
    cursor = db.cursor()

    with current_app.open_resource('schema.sql') as f:
        for line in f:
            if line.strip():
                cursor.execute(line.decode('utf8'))

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

