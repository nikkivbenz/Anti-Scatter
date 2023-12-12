//Katherine Hernandez
import React, { useState, useEffect } from 'react';
import { Calendar as DefaultCalendar } from 'react-calendar';
import { gapi } from 'gapi-script';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const CLIENT_ID = '111482971289803426523';
const API_KEY = 'AIzaSyCsmr0wgWOZ-SRiq8l5l54M0zNrxM5y5ik';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

const Calendar = () => {

    let navigate = useNavigate();
  
    useEffect(() => {
        const verifyCookie = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (!storedToken) {
                    navigate("/login");
                    return;
                }
  
                const { data } = await axios.post(
                    "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                    { token: storedToken }
                );
  
                if (!data.status) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
  
                navigate('/Calendar')
            } catch (error) {
                console.error("Error verifying cookie:", error);
                navigate("/login");
            }
        };
  
        verifyCookie();
    }, [navigate]);

    const [events, setEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');

    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);

    const initClient = () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch(error => {
            console.error('Error initializing Google API client:', error);
        });
    };

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            listUpcomingEvents();
        }
    };

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

    const addLocalEvent = () => {
        if (eventTitle.trim()) {
            const newEvent = {
                id: Math.random(),
                date: selectedDate,
                title: eventTitle
            };
            setLocalEvents([...localEvents, newEvent]);
            setEventTitle('');
            setSelectedDate(null);
        }
    };

    const deleteLocalEvent = (eventId) => {
        setLocalEvents(localEvents.filter(event => event.id !== eventId));
    };

    const handleDateChange = (date) => {
        setDate(date);
        setSelectedDate(date);
    };

    const handleGoogleCalendarClick = () => {
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
        }
        setUseGoogleCalendar(true);
    };

    const renderLocalCalendar = () => {
        return (
            <>
                <DefaultCalendar onChange={handleDateChange} value={date} />
                {selectedDate && (
                    <div>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            placeholder="Event Title"
                        />
                        <button onClick={addLocalEvent}>Add Event</button>
                    </div>
                )}
                <ul>
                    {localEvents.map(event => (
                        <li key={event.id}>
                            {event.title} on {event.date.toDateString()}
                            <button onClick={() => deleteLocalEvent(event.id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    const renderGoogleCalendar = () => {
        return (
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        {event.summary} ({new Date(event.start.dateTime).toLocaleString()})
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h1>Your Calendar</h1>
            {useGoogleCalendar ? renderGoogleCalendar() : renderLocalCalendar()}
            {!useGoogleCalendar && (
                <button onClick={handleGoogleCalendarClick}>Use Google Calendar</button>
            )}
        </div>
    );
};

export default Calendar;
