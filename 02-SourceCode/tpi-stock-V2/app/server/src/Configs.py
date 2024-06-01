# file: Configs.py
# Description: Set Flask configuration vars
# Author: Damien Loup

# Import modules
import os

class Configs:
    """
    Set Flask configuration vars
    
    Attributes:
        SECRET_KEY: str
            Secret key to encrypt the session
        SQLALCHEMY_DATABASE_URI: str
            Database URI
    """
    SECRET_KEY = 'tpi-5101f6a5-8186-56ef-87a3-0742a225bd48'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'db.sqlite')