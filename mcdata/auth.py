# auth.py

from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .user import User
from . import db
from bson.json_util import dumps
from bson.json_util import loads

auth = Blueprint('auth', __name__)

###############################
########### Login #############
###############################
@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user_collection = db.get_db()['user']
    cursor = user_collection.find({"email": email})
    user_bson = loads(dumps(cursor)) # bson
    if not user_bson: # username doesn't exist
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # reload the page
    user_doc = user_bson[0] # dict
    print(user_doc)
    user = User(user_doc) # TODO should work now that user is Object (with MixinUser inheritance)
    print(user)
    print(password)
    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not user or not check_password_hash(user.password, password): 
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return redirect(url_for('main.profile'))

###############################
########## Sign Up ############
###############################
@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    # TODO move to external method
    user_collection = db.get_db()['user']
    cursor = user_collection.find({"email": email})
    user = loads(dumps(cursor))

    if user: # if a user is found, we want to redirect back to signup page so user can try again  
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user_doc = {
        "user_id": "10",
        "email" : email,
        "username" : email,
        "password" : generate_password_hash(password),
        "first_name" : name,
        "last_name" : "Lasn",
        "datasets_owned" :{}
        # "is_active": "False" TODO remove?
    }
    #new_user = User("1", email=email, username=email, password=generate_password_hash(password), first_name=name, last_name="Last")
    #new_user_document = bson.decode(bson.encode(new_user.__dict__))
    user_collection.insert_one(new_user_doc)
    print("USER CREATED")

    return redirect(url_for('auth.login'))

###############################
########### Logout ############
###############################
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('app.index'))