# main.py

from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .user import User
from . import db
from .search import search_database
from flask_login import login_required, current_user
from .config import config
from .dataset import Dataset


main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS={'txt', 'pdf', 'xlsx'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

##############################
########## Homepage ##########
##############################
@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")

##############################
####### Dataset Upload #######
##############################
@main.route('/datasetuploaded', methods=['POST'])   
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

##############################
####### Search Results #######
##############################
@main.route('/searchresults', methods=['POST'])
def search():

    if request.method == 'POST':

        search_input = request.form.get("search_input")

    return render_template('searchresults.html', search_results=search_database(search_input))

###############################
####### Sign In/Sign Up #######
###############################
@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)
