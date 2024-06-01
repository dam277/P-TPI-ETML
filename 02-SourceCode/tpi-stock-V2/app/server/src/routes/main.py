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