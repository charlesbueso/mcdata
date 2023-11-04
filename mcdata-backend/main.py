# main.py

from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .user import User
from .search import searchPost
from flask_login import login_required, current_user
from .dataset import Dataset
import time


main = Blueprint('main', __name__)


##############################
##### test react endpoint ####
##############################
@main.route('/time')
def get_current_time():
    return {'time': time.time()}

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
    return Dataset.uploadPost()

##############################
####### Search Results #######
##############################
@main.route('/searchresults', methods=['POST'])
def search():
    return searchPost()

###############################
####### Sign In/Sign Up #######
###############################
@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.first_name)
