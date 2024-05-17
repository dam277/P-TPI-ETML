from flask import Blueprint, redirect, request, jsonify
from . import STATIC_FOLDER
from ..database.models import Order, Article, shop_article, Shop, user_shop, User
from .. import db, FRONTEND_URL

# Create the shops blueprint
shop = Blueprint("shop", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@shop.route("/shops")
def get_shops():
    """
    Get all the shops
    """
    # Get all the shops
    shops: list[Shop] = Shop.query.all()
    return jsonify([shop.to_dict() for shop in shops])

@shop.route("/shop/<int:shop_id>")
def get_shop_by_id(shop_id: int):
    """
    Get a shop by id
    """
    # Get the shop
    shop: Shop = Shop.query.get(shop_id)

    # Check if shop exists
    if not shop:
        return jsonify({"message": "Shop not found"}), 404
    
    return jsonify(shop.to_dict())

@shop.route("/shop/<int:shop_id>/articles")
def get_articles_by_shop_id(shop_id: int):
    """
    Get all the articles of a shop by id
    """
    # Get the shop
    shop: Shop = Shop.query.get(shop_id)

    # Check if shop exists
    if not shop:
        return jsonify({"message": "Shop not found"}), 404
    
    articles: list[Article] = shop.articles
    return jsonify([article.to_dict() for article in articles])