from sqlalchemy import Column, String, Integer, ForeignKey

from ...utils.globals import hash_id
from ... import db

class Order(db.Model):
    """
    Order model

    Inherits:
        db.Model: SQLAlchemy model
    """
    # Create a table in the db
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)                              # ID of the order   
    units = Column(Integer)                                             # Units of the order

    # Foreign keys
    fk_user = Column(Integer, ForeignKey('user.id'))                   # ID of the user
    fk_shop = Column(Integer, ForeignKey('shop.id'))                   # ID of the shop
    fk_article = Column(Integer, ForeignKey('article.id'))             # ID of the article

    # Relationships
    user = db.relationship("User", back_populates="orders")            # User of the order
    shop = db.relationship("Shop", back_populates="orders")            # Shop of the order
    article = db.relationship("Article", back_populates="orders")      # Article of the order

    def __init__(self, user_id: int, article_id: int, shop_id: int, units: int):
        """
        Create a new order
        
        Args:
            user_id (int): The ID of the user
            article_id (int): The ID of the article
            shop_id (int): The ID of the shop
            units (int): The units of the order
        
        Returns:
            Order: The new order
        """
        self.fk_user = user_id
        self.fk_article = article_id
        self.fk_shop = shop_id
        self.units = units

    def __repr__(self) -> str:
        """
        Get the string representation of the order
        
        Returns:
            str: The string representation of the order
        """
        return f"Order {self.id} of {self.units} units"
    
    def to_dict(self) -> dict:
        """
        Get the dictionary representation of the order
        
        Returns:
            dict: The dictionary representation of the order
        """
        return {
            "id": hash_id(self.id),
            "units": self.units,
            "user_id": self.fk_user,
            "article_id": self.fk_article,
            "fk_shop": self.fk_shop
        }
    
    def to_dict_debug(self) -> dict:
        """
        Get the dictionary representation of the order for debugging
        
        Returns:
            dict: The dictionary representation of the order for debugging
        """
        return {
            "id": self.id,
            "units": self.units,
            "user_id": self.fk_user,
            "article_id": self.fk_article,
            "fk_shop": self.fk_shop
        }