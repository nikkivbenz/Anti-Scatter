import React, { useState, useEffect } from 'react';
import {Calendar as DefaultCalendar } from 'react-calendar';
import { gapi } from 'gapi-script';
import 'react-calendar/dist/Calendar.css'; // Importing the default styling from react-calendar

// Google API client ID and API key
const CLIENT_ID = '111482971289803426523';
const API_KEY = 'AIzaSyCsmr0wgWOZ-SRiq8l5l54M0zNrxM5y5ik';

// Google Calendar API discovery document
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Which parts of the user's Google account I want to access
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";
//function
const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    // Effect hook to initialize the Google API client when the component mounts
    useEffect(() => {
        const updateSigninStatus = (isSignedIn) => {
            if (isSignedIn) {
                listUpcomingEvents();
            }
        };

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

        if (useGoogleCalendar) {
            gapi.load('client:auth2', initClient);
        }
    }, [useGoogleCalendar]);

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
            setEvents(response.result.items);
        });
    };

    const handleGoogleCalendarClick = () => {
        setUseGoogleCalendar(true);
    };

    const renderCalendar = () => {
        if (useGoogleCalendar) {
            return (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.summary} ({new Date(event.start.dateTime).toLocaleString()})
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <DefaultCalendar onChange={setDate} value={date} />;
        }
    };

    // Rendering the visual calendar events
    return (
        <div>
            <h1>Your Calendar</h1>
            {renderCalendar()}
            {!useGoogleCalendar && (
                <button onClick={handleGoogleCalendarClick}>Use Google Calendar</button>
            )}
        </div>
    );
};

export default Calendar;


    //function Calendar() {
    //export default Calendar; 