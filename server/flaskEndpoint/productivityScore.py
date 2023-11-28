

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
        Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
        Dense(64, activation='relu'),
        Dense(1, activation='sigmoid')
        ])
    

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    model.fit(X_train, y_train, epochs=10, batch_size=32)



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