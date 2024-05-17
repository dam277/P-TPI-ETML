from ... import db
from sqlalchemy import Column, ForeignKey, Integer

shop_article = db.Table(
    'shop_article',
    Column('fk_shop', Integer, ForeignKey('shop.id')),
    Column('fk_article', Integer, ForeignKey('article.id'))
)