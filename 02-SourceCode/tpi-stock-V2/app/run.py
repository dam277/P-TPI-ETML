# file: run.py
# Description: Run the application
# Author: Damien Loup

# Import mains
from server.src import create_app, db

# Import models
from server.src.database.models import *

if __name__ == '__main__':
    # Create the application and the database
    app = create_app()
    with app.app_context():
        db.create_all()

    # Run the application
    app.run(debug=True, host='0.0.0.0')


