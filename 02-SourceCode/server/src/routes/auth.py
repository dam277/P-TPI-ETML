from flask import Blueprint, redirect, request, jsonify
from flask_login import login_user, login_required, logout_user
from . import STATIC_FOLDER
from ..database.models import Order, Article, shop_article, Shop, user_shop, User
from .. import db, login_manager

# Create the auth blueprint
auth = Blueprint('auth', __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@auth.route('/login', methods=['POST'])
def login():
    """
    Login the user to the server
    """
    # Get the email and password from the request
    email: str = request.json.get('email')
    password: str = request.json.get('password')

    # Get the user
    user: User = User.query.filter_by(email=email).first()

    # Check if user exists and if the password is correct
    if not user or not user.check_password(password):
        return {'message': 'Invalid credentials'}, 401
    
    # Log the user in
    login_user(user)
    return {'message': 'Logged in'}, 200

@auth.route('/logout')
@login_required
def logout():
    """
    Logout the user from the server
    """
    # Log the user out
    logout_user()
    return {'message': 'Logged out'}, 200

@login_manager.unauthorized_handler
def unauthorized():
    """
    Block the user when not logged in
    """
    return {'message': 'Unauthorized'}, 401
    