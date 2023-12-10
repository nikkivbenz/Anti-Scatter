#flask endpoint for antiscatter - ordered by ordering in navigation bar 
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
from datetime import datetime, timedelta
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta



app = Flask(__name__)

client = MongoClient("mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority")

CORS(app, origins=["*"], methods=["GET", "POST"], allow_headers=["Content-Type"])

app.config['MONGO_URI'] = "mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority"
mongo = PyMongo(app)


CORS(app, origins="*")

db = client["AntiScatterDB"]
activeSessions = db["activeSessions"]

# --- START LOGIC FUNCTIONS ---

#going to add up all study time between date x1 and date x2
#returns in minutes

def duration_to_minutes(duration_str):
    hours, minutes, _ = map(int, duration_str.split(':'))
    total_minutes = hours * 60 + minutes
    return total_minutes


def getPastStudyTime(allSessionsDB, userId, startDate, endDate): 
    print("\nEntering getPastStudyTime()\n")
    # Create a query to find documents within the date range
    # for e in allSessions.find(): 
    #     print(e)
    query = {
        "userId" : userId, 
        "date": {
            "$gte": startDate,
            "$lte": endDate
        }
    }

    totalStudyTime = 0
    foundSessions = allSessionsDB.find()


    #adds up all study time from each session for that user
    for session in foundSessions: 
        asMinutes = duration_to_minutes(session['total'])
        print("\nsession found: ", session)
        totalStudyTime += asMinutes

    print("Total Study Time: ", totalStudyTime)

    return totalStudyTime

def getStudyTimeByDayOfWeek(allSessionsDB, userId):
    # Initialize a dictionary to store study time for each day of the week
    study_time_by_day = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0
    }

    # Get the current date
    today = datetime.now()

    # Backtrack 6 days from today
    for i in range(6, -1, -1):
        # Calculate the date for the current day in the loop
        current_date = today - timedelta(days=i)

        # Define the start and end date for the current day
        start_date = current_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = current_date.replace(hour=23, minute=59, second=59, microsecond=999)

        # Create a query to find documents within the date range for the current day
        query = {
            "userId": userId,
            "date": {
                "$gte": start_date,
                "$lte": end_date
            }
        }

        # Find sessions for the current day
        found_sessions = allSessionsDB.find(query)

        # Calculate total study time for the current day
        total_study_time = 0
        for session in found_sessions:
            as_minutes = duration_to_minutes(session['total'])
            total_study_time += as_minutes

        # Get the day of the week as a string (e.g., 'Monday', 'Tuesday')
        day_of_week = current_date.strftime("%A")

        # Update the study time in the dictionary
        study_time_by_day[day_of_week] = total_study_time

    return study_time_by_day


def calculate_study_streak(allSessionsDB, user_id):
    # Fetch session documents for the specified user
    sessions_cursor = allSessionsDB.find({"userID": user_id})

    # Convert string dates to datetime.date objects and remove duplicates
    dates = {datetime.strptime(session['date'], '%m/%d/%Y').date() for session in sessions_cursor}
    
    # Sort the dates
    sorted_dates = sorted(dates)
    print("Sorted Dates: ", sorted_dates)

    # Count consecutive days
    streak = 0
    max_streak = 0

    for i in range(1, len(sorted_dates)):
        if sorted_dates[i] - sorted_dates[i - 1] == timedelta(days=1):
            streak += 1
            max_streak = max(max_streak, streak)
        else:
            streak = 0

    return max_streak + 1  # +1 to include the first day of the streak



def updateStudyTime(userId): 
    print("\nEntering updateUserStats\n")
    #gettings dates to get the past 7 days
    todayDate = datetime.now()
    sevenDaysAgo = todayDate - timedelta(days=7)

    #getting dates for the current year
    currentYear = datetime.now().year
    janFirst = datetime(currentYear, 1, 1)

    #goes through all the sessions from the past year/past 
    yearToDateTime = getPastStudyTime(userId, janFirst, todayDate)
    weekToDate = getPastStudyTime(userId, sevenDaysAgo, todayDate)

    return [weekToDate, yearToDateTime]

def updateTopicTime(allSessionsDB, aggregateStudyTimeDB, userId): 
    query = {"userId": userId}
    foundSessions = allSessionsDB.find(query)

    newDict = {}
    for session in foundSessions: 

        #print(session)
        #figure out how to retreive the value for sessionTopic
        sessionTopic = session["topic"]
        #print("\nSession Topic: ", sessionTopic)
        sessionTime = session["time"]
        #print("\nSession Time: ", sessionTime)

        #gets the currentTotal in dictionary for a specific topic; -1 if not found
        currentTotal = newDict.get(sessionTopic, -1)

        if currentTotal == -1: 
            newDict.update({sessionTopic: sessionTime})
        else: 
            newDict[sessionTopic] += sessionTime


    #newStats[0] is the weekly number, [1] is year-to-date number
    update = {
        "$set" : {
            "topicTime": newDict, # 
        }
    }

    #updates the times for a given userID
    newQuery = {"userID": userId}
    result = aggregateStudyTimeDB.update_one(newQuery, update)

    if result.modified_count > 0:
        print("Topic time updated successfully.")
    else:
        print("No matching document found or no updates made.")

    #creates a new dictionary
    #goes through all the sessions and += to the dictionary key:value pair if exists; creates new one if not
    


#given a userId, grabs the updated values for the past week and year-to-date
def updateUserStats(userId): 
    print("\nEntering getUserStats()\n")
    newStats = updateStudyTime(userId)


    #not the same because in the allSessions table it's userId and there it's userID
    filter = {"userID": userId}
    print(filter)

    print(newStats)
    #newStats[0] is the weekly number, [1] is year-to-date number
    update = {
        "$set" : {
            "weekToDateTime": newStats[0], 
            "yearToDateTime": newStats[1], 
        }
    }

    #updates the times for a given userID
    # result = update_one(filter, update)

    # if result.modified_count > 0:
    #     print("Document updated successfully.")
    # else:
    #     print("No matching document found or no updates made.")

    updateTopicTime(userId)

#--- END LOGIC FUNCTIONS ---


#---- START PRODUCTIVITY SCORE/ GOLDEN HOUR ----


# could create a machine learning model that takes in: 
# start time + end time for all study sessions within the last week 
# model outputs the time of day that this person is most likely productive 
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
import pandas as pd
import datetime

from sklearn.cluster import KMeans

import pymongo
#can use the model for a regression and classification appraoch
global model

MONGO_URL= "mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGO_URL)

client_db = client['AntiScatterDB']
allSessions = client_db['allSessions']


def createsClassificationModel(): 
    model = Sequential()
    model.add(Dense(units=4, activation='relu'))
    model.add(Dense(units=3, activation='relu'))
    model.add(Dense(units=2, activation='relu'))

    model.add(Dense(1, activation='sigmoid'))

def createRegressionModel(): 
    model = Sequential([
        # Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
        Dense(64, activation='relu'),
        Dense(1, activation='sigmoid')
        ])
    

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # model.fit(X_train, y_train, epochs=10, batch_size=32)



#categorizes the time of day
def get_part_of_day(time_str):
    time = pd.to_datetime(time_str).time()
    if time < datetime.time(12, 0):
        return 'Morning'
    elif time < datetime.time(17, 0):
        return 'Afternoon'
    else:
        return 'Evening'


def goldenHour(): 
    df = pd.DataFrame(list(allSessions.find()))


    df['date'] = pd.to_datetime(df['date'])
    df['day_of_week'] = df['date'].dt.day_name()


    df['part_of_day'] = df['start'].apply(get_part_of_day)

    df['total_duration'] = pd.to_timedelta(df['total']).dt.total_seconds() / 3600

    df_encoded = pd.get_dummies(df, columns=['day_of_week', 'part_of_day'])

    features = df_encoded.drop(['_id', 'userID', 'date', 'start', 'end', 'total', 'tags'], axis=1)

    kmeans = KMeans(n_clusters=5)  
    clusters = kmeans.fit_predict(features)
    df['cluster'] = clusters

    for i in range(kmeans.n_clusters):
        print("Cluster ", i , ": ")
        cluster_data = df[df['cluster'] == i]
        print(cluster_data[['day_of_week', 'part_of_day']].mode())  # Most frequent day and time



goldenHour()
     
#productivity score. takes into account the device manager logic and outputs the score (out of 100) of how productive someone is 
#can use afk timer, interrutps (during a session w/ device manager), total study time and 