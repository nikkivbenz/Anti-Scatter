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

docs = allSessions.find()
for d in docs:
    print(d)