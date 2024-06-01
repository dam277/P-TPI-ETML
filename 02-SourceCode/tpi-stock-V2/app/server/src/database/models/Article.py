# file: Article.py
# Description: Article model
# Author: Damien Loup

# Import modules
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

# Import globals
from ...utils.globals import hash_id

# Import main
from ... import db

class Article(db.Model):
    """
    Article model

    Inherits:
        db.Model: SQLAlchemy model
    """
    # Create a table in the db
    __tablename__ = 'article'

    # Columns
    id = Column(Integer, primary_key=True)                                          # ID of the article
    description = Column(String(255), index=True)                                   # Description of the article
    brand = Column(String(255))                                                     # Brand of the article
    collection = Column(String(255))                                                # Collection of the article
    size = Column(String(255))                                                      # Size of the article
    color = Column(String(255))                                                     # Color of the article

    # Relationships
    shop_articles = db.relationship("ShopArticle", back_populates="article")        # Shops of the article
    orders = relationship("Order", back_populates="article")                        # Orders of the article

    def __init__(self, description: str, brand: str, collection: str, size: str, color: str):
        """
        Create a new article
        
        Args:
            description (str): The description of the article
            brand (str): The brand of the article
            collection (str): The collection of the article
            size (str): The size of the article
            color (str): The color of the article
        
        Returns:
            Article: The new article
        """
        self.description = description
        self.brand = brand
        self.collection = collection
        self.size = size
        self.color = color

    def __repr__(self) -> str:
        """
        Get the string representation of the article
        
        Returns:
            str: The string representation of the article
        """
        return f"<Article - Description : {self.description}| Brand : {self.brand}| Collection : {self.collection}| Size : {self.size}| color : {self.color}>"
    
    def to_dict(self) -> dict:
        """
        Get the dictionary representation of the article with a hashed id
        
        Returns:
            dict: The dictionary representation of the article
        """
        return {
            "id_article": hash_id(self.id),
            "description": self.description,
            "brand": self.brand,
            "collection": self.collection,
            "size": self.size,
            "color": self.color
        }
    
    def to_dict_raw(self) -> dict:
        """
        Get the dictionary representation of the article
        
        Returns:
            dict: The dictionary representation of the article
        """
        return {
            "id_article": self.id,
            "description": self.description,
            "brand": self.brand,
            "collection": self.collection,
            "size": self.size,
            "color": self.color
        }