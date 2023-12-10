#Contains all api calls

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
from datetime import datetime, timedelta
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
import antiscatter

app = Flask(__name__)

client = MongoClient("mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority")

CORS(app, origins=["*"], methods=["GET", "POST"], allow_headers=["Content-Type"])

app.config['MONGO_URI'] = "mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority"
mongo = PyMongo(app)


CORS(app, origins="*")

db = client["AntiScatterDB"]
activeSessions = db["activeSessions"]

# --------- Dashboard--------- 


#gets the total study time 
@app.route('/api/total_study_time', methods=['POST'])
def total_study_time():
    # # Access the client and list database names
    # all_databases = mongo.cx.list_database_names()

    # # Print or use the list of databases as needed
    # print("All databases:", all_databases)

    allSessions = db["allSessions"]


    user_data = request.get_json()  # Parse JSON data sent with the request
    userID = user_data.get('userID')
    


    current_year = datetime.now().year
    january_first = datetime(current_year, 1, 1)

    # Get the current date as a datetime.date object
    current_date = datetime.now().date()

    # Convert the current_date to a datetime.datetime object
    end_date_datetime = datetime(current_date.year, current_date.month, current_date.day)

    # Gets the total study time for the past year in minutes
    totalStudyTime = antiscatter.getPastStudyTime(allSessionsDB=allSessions, userId=userID, startDate=january_first, endDate=end_date_datetime)
    #In this revised code, end_date_datetime is a datetime.datetime object created from 

    print("Total Study Time: ", total_study_time)
    docs = allSessions.find({"userID": userID}) 
    for d in docs: 
        print(d) 


#gets the study streak
@app.route('/api/study_streak', methods=['POST'])
def study_streak(): 
    allSessions = db["allSessions"]
    user_data = request.get_json()  # Parse JSON data sent with the request
    userID = user_data.get('userID')
    studyStreak = antiscatter.calculate_study_streak(allSessionsDB=allSessions, user_id=userID)

    print("Study Streak: ", study_streak)
    return jsonify(studyStreak)

    


# --------- Start A Session! --------- 

@app.route("/api/start-session", methods=["POST"])
def start_session():
  try:
    data = request.get_json()
    minutes = data["minutes"]
    hours = data["hours"]
    blocking_method = data["blockingMethod"]
    user_id = data["userId"]

    activeSessions.insert_one({
        "user_id": user_id,
        "minutes": minutes,
        "hours": hours,
        "blocking_method": blocking_method,
        "start_time": datetime.datetime.now(),

    })

    return jsonify({"message": "Session started successfully!"})
  except Exception as e:
    print(f"Error: {e}")
    return jsonify({"error": "Something went wrong."}), 500
  
# Blocklist
# Allowlist
# Block By Theme
# Block By Schedule
# Calendar
# Social
# To-do List
# Setting
# FAQ
# Give Us Feedback!

@app.route('/api/submit_feedback', methods=['POST'])
def submit_feedback():
    feedback_data = request.json
    # Assume your MongoDB has a collection named 'feedbacks'
    feedback_id = mongo.db.feedback.insert_one(feedback_data).inserted_id
    return jsonify(str(ObjectId(feedback_id))), 200
    

# Extension

