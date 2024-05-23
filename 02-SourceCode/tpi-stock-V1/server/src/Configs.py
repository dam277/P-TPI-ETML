import os

class Configs:
    SECRET_KEY = 'tpi-5101f6a5-8186-56ef-87a3-0742a225bd48'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'db.sqlite')