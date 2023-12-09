//Katherine Hernandez

import React, { useState, useEffect } from 'react';
import { Calendar as DefaultCalendar } from 'react-calendar';
import { gapi } from 'gapi-script';
import 'react-calendar/dist/Calendar.css'; // Importing the default styling from react-calendar

// Google API client ID and API key
const CLIENT_ID = '111482971289803426523';
const API_KEY = 'AIzaSyCsmr0wgWOZ-SRiq8l5l54M0zNrxM5y5ik';

// Google Calendar API discovery document
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Which parts of the user's Google account I want to access
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

const Calendar = () => {
    const [events, setEvents] = useState([]); // Events from Google Calendar
    const [localEvents, setLocalEvents] = useState([]); // Local events for the basic calendar
    const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');

    useEffect(() => {
        // ... useEffect content for Google Calendar API
    }, [useGoogleCalendar]);

    const listUpcomingEvents = () => {
        // ... listUpcomingEvents content for Google Calendar API
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
                            {/* Adding inline style for spacing */}
                            <button 
                                onClick={() => deleteLocalEvent(event.id)}
                                style={{ marginLeft: '10px' }}
                            >
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

export default Calendar
