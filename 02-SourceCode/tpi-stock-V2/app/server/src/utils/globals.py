# file: globals.py
# Description: Global utility functions for the application.
# Author: Damien Loup

# Import modules
import hashlib

# Function to hash an id
def hash_id(id):
    """
    Hash an id
    
    Parameters:
        id: :int:int => Id to hash

    Returns:
        str => Hashed id
    """
    return hashlib.sha256(str(id).encode()).hexdigest()