#this file take is triggered when a session has ended and updates a few different data points
import pymongo
from datetime import datetime, timedelta
import random

#going to add up all study time between date x1 and date x2
#returns in minutes
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
    foundSessions = allSessionsDB.find(query)

    #adds up all study time from each session for that user
    for session in foundSessions: 
        # print("\nsession found: ", session)
        totalStudyTime += session["time"]

    print("Total Study Time: ", totalStudyTime)

    return totalStudyTime







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
    result = aggregateStudyTime.update_one(filter, update)

    if result.modified_count > 0:
        print("Document updated successfully.")
    else:
        print("No matching document found or no updates made.")

    updateTopicTime(userId)


updateUserStats(currentUser)
# updateTopicTime(currentUser)

client.close()