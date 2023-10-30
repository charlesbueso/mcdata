import os
from .config import config
from flask import Flask, render_template, request, send_file, g, redirect
from .dataset import Dataset

ALLOWED_EXTENSIONS={'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

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
    @app.route('/')
    def main():
        return render_template("index.html")

    @app.route('/datasetuploaded', methods = ['POST'])   
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

                Dataset.uploadDataset(f)

                return render_template("datasetuploaded.html", name = f.filename)
    
    from . import db
    db.init_app(app)

    return app