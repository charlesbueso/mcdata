import os
from flask import Flask, render_template, request, send_file


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'), #TODO: the fuck?
        UPLOAD_FOLDER = "/folder_for_uploads",
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

    @app.route('/success', methods = ['POST'])   
    def success():   
        if request.method == 'POST':   
            f = request.files['file'] 
            f.save(app.config['UPLOAD_FOLDER'], f.filename)   
            return render_template("upload_success.html", name = f.filename)
    
    from . import db
    db.init_app(app)

    return app