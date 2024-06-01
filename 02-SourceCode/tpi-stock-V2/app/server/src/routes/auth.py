# file: auth.py
# Description: Auth API routes
# Author: Damien Loup

# Import modules
from flask import Blueprint, redirect, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Import mains
from .. import login_manager

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
        return {'message': 'Invalid credentials'}
    
    # Log the user in
    login_user(user, remember=True, force=True)
    
    # Return logged in message
    return jsonify({'message': 'Logged in', 'user': user.to_dict_raw()}), 200

@auth.route('/@me', methods=['GET'])
@login_required
def me():
    """
    Get the current user
    """
    # Return the current user
    return jsonify({'user': current_user.to_dict_raw()}), 200

@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    """
    Logout the user from the server
    """
    # Log the user out
    logout_user()

    # Return logged out message
    return jsonify({'message': 'Logged out'}), 200

@login_manager.unauthorized_handler
def unauthorized():
    """
    Block the user when not logged in
    """
    # Return unauthorized message
    return jsonify({'message': 'Unauthorized'}), 403
    