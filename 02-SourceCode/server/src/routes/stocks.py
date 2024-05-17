from flask import Blueprint, redirect, request, jsonify
from . import STATIC_FOLDER
from ..database.models import Order, Article, shop_article, Shop, user_shop, User
from .. import db, FRONTEND_URL

# Create the stocks blueprint
stocks = Blueprint("stocks", __name__, static_folder=STATIC_FOLDER, static_url_path='/')

