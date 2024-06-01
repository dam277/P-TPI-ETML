# file: order.py
# Description: Order API routes
# Author: Damien Loup

# Import modules
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Import database
from .. import db

# Create the orders blueprint
order = Blueprint("order", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@order.route("/get_orders", methods=["GET"])
@login_required
def get_orders():
    """
    Get all the orders
    """
    user: User = current_user
    if not user.isBoss:
        return jsonify({"error" : "You are not an admin"}), 401
    
    # Get all the orders
    orders: list[Order] = Order.query.all()

    # Return the orders
    return jsonify({"orders" : [{"order" : order.to_dict_raw()} for order in orders]}), 200

@order.route("/update_order/<int:order_id>", methods=["POST"])
@login_required
def update_order(order_id: int):
    """
    Modify an order
    """
    user: User = current_user
    if not user.isBoss:
        return jsonify({"error" : "You are not an admin"}), 401
    
    # Get the data from the request
    status: bool = request.json.get("status")

    # Get the order
    order: Order = Order.query.filter_by(id=order_id).first()
    print(order)
    if order is None:
        return jsonify({"error" : "Order not found"})

    # Modify the order
    order.status = "Approved" if status else "Rejected"

    # If the order is approved, add the units to the shop article
    if status:
        shop_article: ShopArticle = ShopArticle.query.filter_by(fk_article=order.fk_article, fk_shop=order.fk_shop).first()
        shop_article.unitsStored += order.units

    # Commit the changes
    db.session.commit()

    return jsonify({"message": "order successfully updated"}), 200

