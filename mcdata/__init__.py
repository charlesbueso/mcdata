import os
from flask import Flask, render_template, request, send_file, g, redirect
from .config import config
from .dataset import Dataset
from .search import search_database

ALLOWED_EXTENSIONS={'txt', 'pdf', 'xlsx'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

    # Homepage
    @app.route('/', methods=['GET', 'POST'])
    def main():
        return render_template("index.html")

    @app.route('/datasetuploaded', methods=['POST'])   
    def datasetuploaded():   
        if request.method == 'POST':
            # check if the post request has file
            if 'file' not in request.files:
                return redirect('/')
            
            f = request.files['file'] 

            if f.filename == '':
                return redirect('/')

            # check allowed file
            if f and allowed_file(f.filename):

                Dataset.uploadDataset(f, f.filename)

                return render_template("datasetuploaded.html", name = f.filename)
    
    @app.route('/searchresults', methods=['POST'])
    def search():

        if request.method == 'POST':

            search_input = request.form.get("search_input")

        return render_template('searchresults.html', search_results=search_database(search_input))

    from . import db
    db.init_app(app)

    return app