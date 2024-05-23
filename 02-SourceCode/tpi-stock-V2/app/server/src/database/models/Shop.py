from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from ...utils.globals import hash_id
from ... import db

class Shop(db.Model):
    """
    Shop model

    Inherits:
        db.Model: SQLAlchemy model
    """
    # Create a table in the db
    __tablename__ = 'shop'

    id = Column(Integer, primary_key=True)                  # ID of the shop
    name = Column(String(255), unique=True, index=True)     # Name of the shop
    city = Column(String(255))                              # City of the shop

    shop_articles = db.relationship("ShopArticle", back_populates="shop") # Articles of the shop
    orders = relationship("Order", back_populates="shop")                                # Orders of the shop
    users = relationship("User", back_populates="shop")                                  # Users of the shop

    def __init__(self, name: str, city: str):
        """
        Create a new shop
        
        Args:
            name (str): The name of the shop
            city (str): The city of the shop
        
        Returns:
            Shop: The new shop
        """
        self.name = name
        self.city = city

    def __repr__(self) -> str:
        """
        Get the string representation of the shop
        
        Returns:
            str: The string representation of the shop
        """
        return f"Shop {self.name} in {self.city}"
    
    def to_dict(self) -> dict:
        """
        Get the dictionary representation of the shop
        
        Returns:
            dict: The dictionary representation of the shop
        """
        return {
            "id": hash_id(self.id),
            "name": self.name,
            "city": self.city
        }
    
    def to_dict_debug(self) -> dict:
        """
        Get the dictionary representation of the shop for debugging
        
        Returns:
            dict: The dictionary representation of the shop for debugging
        """
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city
        }