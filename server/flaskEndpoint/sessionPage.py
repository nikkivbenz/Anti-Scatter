#dedicated to the flask endpoint!
#conncts to the react app to put/pull data from the mongoDB

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

from bson import ObjectId

app = Flask(__name__)
CORS(app, origins=["*"], methods=["GET", "POST"], allow_headers=["Content-Type"])

app.config['MONGO_URI'] = "mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority"
mongo = PyMongo(app)


@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message='Hello from the Python backend!')

@app.route('/api/data', methods=['GET'])
def get_data():
    collection = mongo.db1.allSessions # Replace with your collection name

    # Query MongoDB to fetch data (e.g., find all documents)
    data = list(collection.find({}))

    # Serialize data to JSON and return it
    return jsonify(data)

@app.route('/api/submit_feedback', methods=['POST'])
def submit_feedback():
    feedback_data = request.json
    # Assume your MongoDB has a collection named 'feedbacks'
    feedback_id = mongo.db.feedback.insert_one(feedback_data).inserted_id
    return jsonify(str(ObjectId(feedback_id))), 200
    


if __name__ == '__main__':
    app.run(debug=True)
