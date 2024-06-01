# file: user.py
# Description: User API routes
# Author: Damien Loup

# Import modules
from flask import Blueprint, jsonify
from flask_login import login_required, current_user

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Create the users blueprint
user = Blueprint("user", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@user.route("/user/<int:user_id>", methods=["GET"])
@login_required
def get_user_by_id(user_id: str):
    """
    Get a user by id
    """
    # Get the user
    user: User = User.query.get(user_id)

    # Check if user exists
    if not user:
        return jsonify({"message": "User not found"})
    
    # Return the user
    return jsonify({"user" : user.to_dict_raw()}), 200

@user.route("/user/<int:user_id>/shop", methods=["GET"])
@login_required
def get_user_shop(user_id: str):
    """
    Get a user's shop
    """
    # Get the user
    user: User = User.query.get(user_id)

    # Check if user exists
    if not user:
        return jsonify({"message": "User not found"})
    
    # Return the shop of the user
    return jsonify({"shop": user.shop.to_dict_raw()}), 200