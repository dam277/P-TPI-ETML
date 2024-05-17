from ... import db
from sqlalchemy import Column, ForeignKey, Integer

user_shop = db.Table(
    'user_shop',
    Column('fk_user', Integer, ForeignKey('user.id')),
    Column('fk_shop', Integer, ForeignKey('shop.id'))
)