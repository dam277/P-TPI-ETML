from flask import Blueprint, redirect, request, jsonify
from . import STATIC_FOLDER
from ..database.models import Order, Article, ShopArticle, Shop, User

from ..utils.globals import hash_id
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

@main.route('/shops')
def shops():
    shop: list[Shop] = Shop.query.filter_by(name="shop2").first()
    return jsonify({"shop": shop.name, "users": [user.name for user in shop.users]})
    #return jsonify({"shops": [shop.name for shop in shops], "users": [[user.name for user in shop.users] for shop in shops]})


@main.route('/testsMtM')
def testsMtM():
    shop = Shop(name="shop201", city="city201")
    db.session.add(shop)

    article = Article(description="article202", brand="brand202", collection="collection202", size="size202", color="color202")
    db.session.add(article)

    #shop = Shop.query.filter_by(name="shop201").first()
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

@main.route('/testsMtM3')
def testsMtM3():
    shop = Shop.query.filter_by(id=2).first()
    return jsonify({"shop": shop.name})