from flask import Flask, jsonify
import os

frontend_url = os.environ.get('FRONTEND_ULR')
app = Flask(__name__, static_folder='build')

if frontend_url:
    from flask_cors import CORS; CORS(app, origins=[frontend_url])

@app.route('/')
def serve():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')