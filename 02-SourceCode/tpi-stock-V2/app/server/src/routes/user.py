from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required, current_user
from . import STATIC_FOLDER
from ..database.models import Order, Article, ShopArticle, Shop, User
from .. import db, FRONTEND_URL

# Create the users blueprint
user = Blueprint("user", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@user.route("/user/<int:user_id>")
def get_user_by_id(user_id: int):
    """
    Get a user by id
    """
    # Get the user
    user: User = User.query.get(user_id)

    # Check if user exists
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify(user.to_dict()), 200

@user.route("/user/<int:user_id>/shops")
def get_shops_by_user_id(user_id: int):
    """
    Get all the shops of a user by id
    """
    # Get the user
    user: User = User.query.get(user_id)

    # Check if user exists
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # Get the shops of the user or all the shops if the user is a boss
    shops: list[Shop] = None
    if user.isBoss:
        shops = Shop.query.all()
    else:
        shops: list[Shop] = user.shops

    # Return the shops
    return jsonify([shop.to_dict() for shop in shops]), 200

@user.route("/user")
def get_user():
    """
    Get all users
    """
    # Get connected user

    print("utilisateur sur route /user : ", current_user)

    if current_user.is_authenticated:
        print("connected user")
    return jsonify(current_user.name)

    return jsonify([user.to_dict() for user in User.query.all()]), 200