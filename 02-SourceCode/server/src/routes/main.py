from flask import Blueprint, redirect, request, jsonify
from . import STATIC_FOLDER
from ..database.models import Order, Article, shop_article, Shop, user_shop, User
from .. import db, FRONTEND_URL

# Create the main blueprint
main = Blueprint("main", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@main.app_errorhandler(404)
def not_found(e):
    """
    Error handler for 404 error
    """
    return get_frontend()

@main.route("/")
def index():
    """
    Index route of the server
    """
    return get_frontend()

def get_frontend():
    """
    Display the frontend of the application
    
    Using docker, this route instantly redirect to the frontend url. \n
    However if the frontend is built and the server can open it from main.send_static_file() function, 
    it will display the html of (react) correctly. From the frontend the api call will be '/...' instead of 'http://localhost:5000/...'
    """
    # Check if the frontend url is set otherwise display the static html
    if FRONTEND_URL:
        return redirect(FRONTEND_URL)
    return main.send_static_file("index.html")


















@main.route('/hello')
def hello():
    user = User(name='test', email="test@gmail.com", password="test")
    db.session.add(user)
    db.session.commit()
    return user

@main.route('/users')
def users():
    users: list[User] = User.query.all()
    return jsonify({"users": [user.name for user in users]})


# @main.route('/testsMtM')
# def testsMtM():
#     shop = Shop(name="shop3", city="city3")
#     db.session.add(shop)

#     article = Article(description="article4", brand="brand4", collection="collection4", size="size4", color="color4")
#     db.session.add(article)
    
#     # shop = Shop.query.filter_by(name="shop2").first()
#     shop.articles.append(article)

#     db.session.commit()
#     return "OK"

# @main.route('/testsMtM2')
# def testsMtM2():
#     # article_got = Article.query.filter_by(description="article2").first()
#     # articles_in_shop = article_got.shop


#     # shop_got = Shop.query.filter_by(name="shop2").first()
#     # articles_in_shop = shop_got.article
#     # return jsonify({"shop_got": shop_got.name, "articles_in_shop": [article.id for article in articles_in_shop]})

#     shop_article_got = db.session.query(shop_article).filter(shop_article.columns.fk_shop == 1).all()
#     print(shop_article_got)

#     one = shop_article_got[0] if len(shop_article_got) > 0 else None
#     two = shop_article_got[1] if len(shop_article_got) > 1 else None
#     three = shop_article_got[2] if len(shop_article_got) > 2 else None

#     return f"result 1 = {one}, result 2 = {two}, result 3 = {three}"


#     return jsonify()