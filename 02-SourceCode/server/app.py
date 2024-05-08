from flask import Flask
import os

app = Flask(__name__, static_folder='build')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')