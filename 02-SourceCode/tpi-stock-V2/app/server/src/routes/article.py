# file: article.py
# Description: Article API routes
# Author: Damien Loup

# Import modules
from flask import Blueprint, jsonify
from flask_login import login_required, current_user

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Create the articles blueprint
article = Blueprint("article", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@article.route("/get_articles", methods=["GET"])
@login_required
def get_articles():
    """
    Get all the articles
    """
    user: User = current_user
    if not user.isBoss:
        return jsonify({"error" : "You are not an admin"}), 401
    
    # Get all the articles
    articles: list[Article] = Article.query.all()

    full_articles = []
    for article in articles:
        full_article = dict()
        full_article.update({"article": article.to_dict_raw()})

        # Sum up the unitsStored and unitsSolded for each shop article of the article
        total_units_stored = sum(shop_article.unitsStored for shop_article in article.shop_articles)
        total_units_solded = sum(shop_article.unitsSolded for shop_article in article.shop_articles)
        
        # Add the total units stored and solded to the full article
        full_article.update({"unitsStored": total_units_stored})
        full_article.update({"unitsSolded": total_units_solded})
        
        full_articles.append(full_article)

    # Return the articles
    return jsonify({"articles" : full_articles}), 200