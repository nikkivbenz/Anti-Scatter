#create tables
import pymongo
import pandas as pd
import numpy as np

MONGO_URL= "mongodb+srv://theplugs:Kcymdi6rLMJLNisW@cecs491.4pv6kr9.mongodb.net/AntiScatterDB?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGO_URL)

client_db = client['AntiScatterDB']
allSessions = client_db['allSessions']

#create testing data for model training for the golden hour logic
def populateAllSessionTable():
    filepath = "./TrainingData_GoldenHour.csv"
    df = pd.read_csv(filepath)
    data = df.to_dict(orient='records')

    allSessions.insert_many(data)

# populateAllSessionTable()

# docs = allSessions.find()
# for d in docs:
#     print(d)

import pymongo
from datetime import datetime, timedelta
import random

#creates 10 fakes sessions for the week 
def createFakeSessions(allSessions):

    current_date = datetime.now()
    sessionTopics = ["491", "327", "429", "448"]

    for n in range(0,10): 
        random_days = random.randint(0, 6)
        random_time = random.randint(5, 75)
        random_topic = random.randint(0, 3)

        random_date = current_date - timedelta(days=random_days)
    
        insertedSession = allSessions.insert_one({
                    "userId": "test1", 
                    "date": random_date, 
                    "time": random_time, 
                    "topic": sessionTopics[random_topic]
        })
        if insertedSession.acknowledged:
            print("Item was inserted successfully.")
            print("Inserted document ID:", insertedSession.inserted_id)
        else:
            print("Item insertion was not acknowledged.")


#creates one(1) entry for the aggregateStudyTime 
#
def starterData(aggregateStudyTime): 
    aggregateStudyTime.insert_one({"userID": "test1", 
                   "yearToDateTime": 500, 
                   "weekToDateTime": 75, 
                   "topicTime": {
                       "491": 25,  
                       "327": 25, 
                       "429": 10, 
                       "448": 15
                   },
                   "curr_productivity_score": .95
                   })


# #connects to db and grabs the allSessions and aggregateStudyTime collections objects
# def main(): 
#     MONGO_URL = "mongodb+srv://nikkivbenitez:0p0Cmt7YJineiYCA@db1.r71bzj0.mongodb.net/?retryWrites=true&w=majority"
#     client = pymongo.MongoClient(MONGO_URL)

#     # selects db or creates a new one
#     db = client['db1']

#     feedback = db["feedback"]
#     feedback.insert_one({"name": "test1", 
#                    "email": "test1@gmail.com", 
#                    "feedback": "this is da best website ever."
#                    })

#     # # creates or grabs db table
#     # allSessions = db["allSessions"] 
#     # aggregateStudyTime = db["aggregateStudyTime"]
#     # createFakeSessions(allSessions)

#     client.close()

# main()