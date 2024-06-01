# file: main.py
# Description: Main routes of the server
# Author: Damien Loup

# Import modules
from flask import Blueprint, redirect, jsonify

# Import routes init variables
from . import STATIC_FOLDER

# Import models
from ..database.models import Order, Article, ShopArticle, Shop, User

# Import globals
from ..utils.globals import hash_id

# Import mains
from .. import db, FRONTEND_URL

# Create the main blueprint
main = Blueprint("main", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

@main.app_errorhandler(404)
def not_found(e):
    """
    Error handler for 404 error
    """
    return get_frontend()

@main.route("/", methods=["GET"])
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
    
    # Display the static html
    return main.send_static_file("index.html")
















# DEBUGGING ROUTES (DELETE LATER) --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

@main.route('/hello')
def hello():
    shop = Shop(name="shop3", city="city3")
    db.session.add(shop)

    user = User(name='admin3', email="admin3@gmail.com", password="admin1234")
    db.session.add(user)
    user.shop = shop
    db.session.commit()
    db.session.close()
    return user

@main.route('/users')
def users():
    users: list[User] = User.query.all()
    print(users)
    return jsonify({"users": [user.name for user in users], "shops": [user.shop.name for user in users]})

# @main.route('/shops')
# def shops():
#     shop: list[Shop] = Shop.query.filter_by(name="shop2").first()
#     return jsonify({"shop": shop.name, "users": [user.name for user in shop.users]})
#     #return jsonify({"shops": [shop.name for shop in shops], "users": [[user.name for user in shop.users] for shop in shops]})


@main.route('/testsMtM')
def testsMtM():
    # shop = Shop(name="shop201", city="city201")
    # db.session.add(shop)

    article = Article(description="article202", brand="brand202", collection="collection202", size="size202", color="color202")
    db.session.add(article)

    shop: Shop = Shop.query.filter_by(name="shop3").first()
    # shop.articles.append(article)
    # db.session.commit()

    # db.session.execute(shop_article.insert().values(
    #     fk_shop=shop.id, 
    #     fk_article=article.id,
    #     unitsStored=200,
    #     unitsSolded=300
    # ))
    db.session.commit()

    shopArticle = ShopArticle(fk_shop=shop.id, fk_article=article.id, unitsStored=0, unitsSolded=2)
    db.session.add(shopArticle)
    db.session.commit()

    return jsonify({"shop": shop.name, "articles": [article for article in shop.shop_articles]})

@main.route('/testsMtM2')
def testsMtM2():
    # article_got = Article.query.filter_by(description="article2").first()
    # articles_in_shop = article_got.shop


    # shop_got = Shop.query.filter_by(name="shop2").first()
    # articles_in_shop = shop_got.article
    # return jsonify({"shop_got": shop_got.name, "articles_in_shop": [article.id for article in articles_in_shop]})

    # shop_article_got = ShopArticle.query.all()
    # shops = Shop.query.all()
    # articles = Article.query.all()

    # # shop_article_got = db.session.query(shop_article).all()
    # # print(shop_article_got)
    # # one = shop_article_got[0] if len(shop_article_got) > 0 else None
    # # two = shop_article_got[1] if len(shop_article_got) > 1 else None
    # # three = shop_article_got[2] if len(shop_article_got) > 2 else None

    # shop_article_result = []
    # for sa in shop_article_got:
    #     result = {
    #         "fk_shop": sa.fk_shop,
    #         "fk_article": sa.fk_article,
    #         "unitsStored": sa.unitsStored,
    #         "unitsSolded": sa.unitsSolded
    #     }
    #     shop_article_result.append(result)

    # shops_result = []
    # for shop in shops:
    #     result = {
    #         "id": shop.id,
    #         "name": shop.name,
    #         "city": shop.city
    #     }
    #     shops_result.append(result)
    
    # articles_result = []
    # for article in articles:
    #     result = {
    #         "id": article.id,
    #         "description": article.description,
    #         "brand": article.brand,
    #         "collection": article.collection,
    #         "size": article.size,
    #         "color": article.color
    #     }
    #     articles_result.append(result)


    shop: Shop = Shop.query.filter_by(id=1).first()

    # get all the articles of the shop
    shop_articles = ShopArticle.query.filter_by(fk_shop=shop.id).all()

    articles = []
    for shop_article in shop_articles:
        article = Article.query.filter_by(id=shop_article.fk_article).first()
        articles.append(article)

    print("test", shop.to_dict().get("id"), shop.to_dict().get("id") == hash_id(1))

    #print(shop.shop_articles)
    return jsonify({"Shop": shop.to_dict_debug()}, {"shop_article": [article.to_dict() for article in shop_articles]}, {"articles": [article.to_dict() for article in articles]})

    # return jsonify({"shop_article": shop_article_result, "shops": shops_result, "articles": articles_result})

@main.route('/addShop')
def addShop():
    shop = Shop(name="Super shop", city="Lausanne")
    db.session.add(shop)
    db.session.commit()
    return jsonify({"shop": shop.name})

@main.route('/addArticleToShop')
def addArticleToShop():
    shop: Shop = Shop.query.filter_by(id=2).first()
    
    article = Article(description="Montre en or", brand="Rolex", collection="Witner", size="31mm", color="Gold")
    db.session.add(article)
    db.session.commit()

    shop_article = ShopArticle(fk_shop=shop.id, fk_article=article.id, unitsStored=133, unitsSolded=232)
    db.session.add(shop_article)
    db.session.commit()
    return jsonify({"shop": shop.name, "article": article.description})

@main.route('/addOrders')
def addOrders():
    shop: Shop = Shop.query.filter_by(id=1).first()
    user: User = User.query.filter_by(id=2).first()
    article: Article = Article.query.filter_by(id=4).first()

    order = Order(user_id=user.id, article_id=article.id, shop_id=shop.id, units=53, status="Not approved")
    db.session.add(order)
    db.session.commit()

    return jsonify({"shop": shop.name, "user": user.name, "order": order.id})

@main.route('/addUser')
def addUser():
    shop: Shop = Shop.query.filter_by(id=2).first()
    user = User(name='Jean', email="jean@gmail.com", password="jean1234", isBoss=True)
    user.shop = shop
    db.session.add(user)
    db.session.commit()

    return jsonify({"shop": shop.name, "user": user.name})

@main.route('/modifyOrder')
def modifyOrder():
    order: Order = Order.query.filter_by(id=4).first()
    order.status = "Pending"
    db.session.commit()
    return jsonify({"order": order.id, "status": order.status})

# users
# Louis Turner - louis.t@gmail.com - Louis1234 - no shop - boss
# Alice Smith - alice.s@gmail.com - Alice1234 - no shop - boss
# François Lambert - françois.l@gmail.com - F-L1234 - Horology Haven - no boss
# Steve Davis - steve.d@gmail.com - S-D1234 - Horology Haven - no boss
# Sabrina King - sabrina.k@gmail.com - S-K1234 - O'Clock - no boss

# shops
# Horology Haven - Lausanne
# O'Clock - Geneva

@main.route('/createDatas')
def createDatas():
    # Create shops
    shops = [
        {"name": "Horology Haven", "city": "Lausanne"},
        {"name": "O'Clock", "city": "Geneva"}
    ]

    for shop_data in shops:
        shop = Shop(name=shop_data["name"], city=shop_data["city"])
        db.session.add(shop)
        db.session.commit()

    # Create users
    users = [
        {"name": "Louis Turner", "email": "louis.t@gmail.com", "password": "Louis1234", "shop": False, "boss": True},
        {"name": "Alice Smith", "email": "alice.s@gmail.com", "password": "Alice1234", "shop": False, "boss": True},
        {"name": "François Lambert", "email": "françois.l@gmail.com", "password": "F-L1234", "shop": "Horology Haven", "boss": False},
        {"name": "Steve Davis", "email": "steve.d@gmail.com", "password": "S-D1234", "shop": "Horology Haven", "boss": False},
        {"name": "Sabrina King", "email": "sabrina.k@gmail.com", "password": "S-K1234", "shop": "O'Clock", "boss": False}
    ]
    
    for user_data in users:
        user = User(name=user_data["name"], email=user_data["email"], password=user_data["password"], isBoss=user_data["boss"])
        if user_data["shop"]:
            shop: Shop = Shop.query.filter_by(name=user_data["shop"]).first()
            user.shop = shop
        db.session.add(user)
        db.session.commit()

    return jsonify({"shops": [shop.name for shop in Shop.query.all()], "users": [user.name for user in User.query.all()]})
