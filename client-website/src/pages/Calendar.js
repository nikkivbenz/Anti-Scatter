{/*

function Calendar() {
    return(
        <h1> i am in calendar </h1> 
    )
};

export default Calendar; 

*/}



import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

// Google API client ID and API key
const CLIENT_ID = '111482971289803426523';
const API_KEY = 'I need to find the API KEY to write in here';

// Google Calendar API discovery document
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Which parts of the user's Google account I want to access
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

const CalendarComponent = () => {
  // Store the events from Google Calendar
  const [events, setEvents] = useState([]);

  // Initializes the Google API client with my credentials and sets up sign-in state listeners
  const initClient = () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {

      // Listening for sign-in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle the current sign-in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, error => {
      console.error(error);
    });
  };

   // Effect hook to initialize the Google API client when the component mounts
   useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, [initClient]); //There was a missing dependancy here , I just added that now

  // Updates the sign-in status and fetches events if the user is signed in
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      listUpcomingEvents();
    } else {
      // Prompt the user to sign in
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  // Fetches upcoming events from the user's calendar and updates the state
  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      const events = response.result.items;
      setEvents(events);
    });
  };
  // Adding the visual calendar events (Renderin)
  return (
    <div>
      <h1>Google Calendar</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.summary} ({new Date(event.start.dateTime).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
