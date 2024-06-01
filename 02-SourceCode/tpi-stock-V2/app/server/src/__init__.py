# file: MAIN.__init__.py
# Description: Main file to create the Flask app
# Author: Damien Loup

# Import modules
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os

# Import configs
from .Configs import Configs

# Init sqlalchemy and login manager
db = SQLAlchemy()
login_manager = LoginManager()

# Get frontend url
FRONTEND_URL = os.environ.get('FRONTEND_URL')

# Create app
def create_app():
    """ 
    Create a Flask app, set the blueprints, init the database and set the CORS policy if FRONTEND_URL is set

    Returns:
        Flask: The Flask app
    """
    # Init app
    app = Flask(__name__, static_folder='../frontend', static_url_path='/')
    app.config.from_object(Configs)
    
    # Init database
    db.init_app(app)

    # Init login manager
    login_manager.init_app(app)

    # Save the blueprints
    from .routes.main import main as main_blueprint
    from .routes.auth import auth as auth_blueprint
    from .routes.shop import shop as shops_blueprint
    from .routes.user import user as users_blueprint
    from .routes.article import article as articles_blueprint
    from .routes.order import order as orders_blueprint

    # Register the blueprints
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(shops_blueprint)
    app.register_blueprint(users_blueprint)
    app.register_blueprint(articles_blueprint)
    app.register_blueprint(orders_blueprint)
    
    # Set the CORS policy if FRONTEND_URL is set
    if FRONTEND_URL:
        from flask_cors import CORS; CORS(app, origins=[FRONTEND_URL])

    # Return app
    return app