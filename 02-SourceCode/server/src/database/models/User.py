from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from ... import db, login_manager

class User(UserMixin, db.Model):
    """
    User model

    Inherits:
        UserMixin: Flask-Login mixin
        db.Model: SQLAlchemy model
    """
    # Create a table in the db
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)                  # ID of the user
    name = Column(String(255), unique=True, index=True)     # Name of the user
    email = Column(String(255), unique=True, index=True)    # Email of the user
    password = Column(String(255))                          # Password of the user
    isBoss = Column(Integer)                                # Whether the user is a boss or not 

    shops = relationship("Shop", secondary="user_shop", back_populates="users") # Shops of the user

    def __init__(self, name: str, email: str, password: str, isBoss: bool = False):
        """
        Create a new user
        
        Args:
            name (str): The name of the user
            email (str): The email of the user
            password (str): The password of the user
            isBoss (bool): Whether the user is a boss or not
        
        Returns:
            User: The new user
        """
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)
        self.isBoss = 1 if isBoss else 0

    def check_password(self, password):
        """
        Check if hashed password matches actual password
        
        Args:
            password (str): The password to check
            
        Returns:
            bool: True if the password matches, False otherwise
        """
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        """
        Get the string representation of the user
        
        Returns:
            str: The string representation of the user
        """
        return f'User {self.name}, {self.email}, {self.isBoss}'
    
    @staticmethod
    @login_manager.user_loader
    def load_user(user_id):
        """
        Load a user by ID
        
        Args:
            user_id (int): The ID of the user
            
        Returns:
            User: The user with the given ID
        """
        return User.query.get(int(user_id))

    def to_dict(self):
        """
        Get the dictionary representation of the user
        
        Returns:
            dict: The dictionary representation of the user
        """
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "isBoss": self.isBoss
        }
