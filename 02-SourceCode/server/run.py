from flask import Flask
from src import create_app, db
from src.database.models import *

app: Flask = None

if __name__ == '__main__':
    # Create the application and the database
    app = create_app()
    with app.app_context():
        db.create_all()

    # Run the application
    app.run(debug=True, host='0.0.0.0')


