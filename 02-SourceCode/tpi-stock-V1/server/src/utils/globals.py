import hashlib

def hash_id(id):
    return hashlib.sha256(str(id).encode()).hexdigest()