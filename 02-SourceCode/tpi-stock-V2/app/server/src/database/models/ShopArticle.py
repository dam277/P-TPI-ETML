from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from ...utils.globals import hash_id
from ... import db

class ShopArticle(db.Model):
    """
    ShopArticle model

    Inherits:
        db.Model: SQLAlchemy model
    """
    # Create a table in the db
    __tablename__ = 'shop_article'

    fk_shop = Column(Integer, ForeignKey('shop.id'), primary_key=True) # ID of the shop
    fk_article = Column(Integer, ForeignKey('article.id'), primary_key=True) # ID of the article
    unitsStored = Column(Integer) # Units stored of the article in the shop
    unitsSolded = Column(Integer) # Units solded of the article in the shop

    shop = relationship("Shop", back_populates="shop_articles") # Shop of the shop article
    article = relationship("Article", back_populates="shop_articles") # Article of the shop article

    def __init__(self, fk_shop: int, fk_article: int, unitsStored: int, unitsSolded: int):
        """
        Create a new shop article
        
        Args:
            fk_shop (int): The ID of the shop
            fk_article (int): The ID of the article
            unitsStored (int): The units stored of the article in the shop
            unitsSolded (int): The units solded of the article in the shop
        
        Returns:
            ShopArticle: The new shop article
        """
        self.fk_shop = fk_shop
        self.fk_article = fk_article
        self.unitsStored = unitsStored
        self.unitsSolded = unitsSolded

    def __repr__(self) -> str:
        """
        Get the string representation of the shop article
        
        Returns:
            str: The string representation of the shop article
        """
        return f"ShopArticle {self.fk_shop} {self.fk_article} {self.unitsStored} {self.unitsSolded}"
    
    def to_dict(self) -> dict:
        """
        Get the dictionary representation of the shop article
        
        Returns:
            dict: The dictionary representation of the shop article
        """
        return {
            "fk_shop": hash_id(self.fk_shop),
            "fk_article": hash_id(self.fk_article),
            "unitsStored": self.unitsStored,
            "unitsSolded": self.unitsSolded
        }
    
    def to_dict_debug(self) -> dict:
        """
        Get the dictionary representation of the shop article for debugging
        
        Returns:
            dict: The dictionary representation of the shop article
        """
        return {
            "fk_shop": self.fk_shop,
            "fk_article": self.fk_article,
            "unitsStored": self.unitsStored,
            "unitsSolded": self.unitsSolded
        }
