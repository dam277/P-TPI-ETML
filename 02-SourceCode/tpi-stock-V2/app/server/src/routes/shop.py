# file: shop.py
# Description: Shop API routes
# Author: Damien Loup

# Import modules
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import pandas

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Import mains
from .. import db, FRONTEND_URL

# Create the shops blueprint
shop = Blueprint("shop", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@shop.route("/get_shops", methods=["GET"])
@login_required
def get_shops():
    """
    Get all the shops
    """
    user: User = current_user
    if not user.isBoss:
        return jsonify({"error" : "You are not an admin"}), 401
    
    # Get all the shops
    shops: list[Shop] = Shop.query.all()
    
    # Return the shops
    return jsonify({"shops" : [shop.to_dict_raw() for shop in shops]}), 200

@shop.route("/shop/<int:shop_id>", methods=["GET"])
@login_required
def get_shop_by_id(shop_id: int):
    """
    Get a shop by id
    """
    # Get the shop
    shop: Shop = Shop.query.get(shop_id)

    # Check if shop exists
    if not shop:
        return jsonify({"message": "Shop not found"})
    
    # Return the shop
    return jsonify({"shop" : shop.to_dict_raw()}), 200

@shop.route("/shop/<int:shop_id>/articles", methods=["GET"])
@login_required
def get_articles_by_shop_id(shop_id: int):
    """
    Get all the articles of a shop by id
    """
    # Get the shop
    shop: Shop = Shop.query.get(shop_id)

    # Check if shop exists
    if not shop:
        return jsonify({"message": "Shop not found"})
    
    # Get the articles of the shop
    shop_articles: list[ShopArticle] = shop.shop_articles

    # Get the articles of the shop
    articles = []
    for shop_article in shop_articles:
        article = dict()
        article.update({"article": Article.query.get(shop_article.fk_article).to_dict_raw()})
        article.update({"unitsSolded": shop_article.unitsSolded})
        article.update({"unitsStored": shop_article.unitsStored})
        article.update({"status": "In stock" if shop_article.unitsStored > 0 else "Out of stock"})
        articles.append(article)   
        
    # Return the articles
    return jsonify({"articles" : articles}), 200

@shop.route("/shop/<int:shop_id>/orders", methods=["GET"])
@login_required
def get_orders_by_shop_id(shop_id: int):
    """
    Get all the orders of a shop by id
    """
    # Get the shop
    shop: Shop = Shop.query.get(shop_id)

    # Check if shop exists
    if not shop:
        return jsonify({"message": "Shop not found"})
    
    # Get the orders of the shop
    orders: list[Order] = shop.orders
    ordersInfos = []
    for order in orders:
        orderInfo = dict()
        orderInfo.update({"order": order.to_dict_raw()})
        orderInfo.update({"user": order.user.to_dict_raw()})
        orderInfo.update({"article": order.article.to_dict_raw()})
        ordersInfos.append(orderInfo)

    # Return the orders
    return jsonify({"orders" : ordersInfos}), 200

@shop.route("/import_stock", methods=["POST"])
@login_required
def import_stock():
    """
    Import a file
    """
    # region GET ALL DATA AND READ THE FILE -------------------------------------------------------------------
    # Get the file amd check if it exists
    if not "import_file" in request.files:
        return jsonify({"error": "No file found"})
    file = request.files["import_file"]
    if not file:
        return jsonify({"error": "File doesn't exists"})
    
    # Get the current user
    user: User = current_user
    if user.isBoss:
        return jsonify({"error": "You can't import a file as a boss"})

    # Get the shop of the user
    shop: Shop = user.shop
    if not shop:
        return jsonify({"error": "No shop found"})
    print(shop.name)
    
    # Read the excel file with pandas
    xl_file = pandas.ExcelFile(file)
    data = xl_file.parse(xl_file.sheet_names[0])
    # endregion -----------------------------------------------------------------------------------------------

    # region ADD THE ARTICLES AND ORDERS TO THE DATABASE -------------------------------------------------------------------
    # Get the rows of the file
    for index, raw_row in data.iterrows():
        from colorama import Fore; print(Fore.RED + str(raw_row.to_dict())); print(Fore.RESET); print(Fore.GREEN, "---")
        row = raw_row.to_dict()
    
        # Get the article if it exists
        article = Article.query.filter_by(description=row.get("Description"), brand=row.get("Brand"), collection=row.get("Collection"), size=row.get("Size"), color=row.get("Color")).first()
        if not article:
            # Set the article as a new article 
            article = Article(description=row.get("Description"), brand=row.get("Brand"), collection=row.get("Collection"), size=row.get("Size"), color=row.get("Color"))
            db.session.add(article)
            db.session.commit()

        # Get the shop article if it exists
        shop_article: ShopArticle = ShopArticle.query.filter_by(fk_shop=shop.id, fk_article=article.id).first()
        if not shop_article:
            # Set the shop article
            new_shop_article = ShopArticle(fk_shop=shop.id, fk_article=article.id, unitsStored=row.get("Stock"), unitsSolded=0)
            db.session.add(new_shop_article)
            db.session.commit()
        else:
            # Update the shop article
            shop_article.unitsStored += row.get("Stock")
            db.session.commit()

        # Check if there is an order on this article
        if row.get("Order") > 0:
            order = Order(user_id=user.id, article_id=article.id, shop_id=shop.id, units=row.get("Order"))
            db.session.add(order)
            db.session.commit()
    # endregion ------------------------------------------------------------------------------------------------------------


    
    
    return jsonify({"message": "File imported"}), 200