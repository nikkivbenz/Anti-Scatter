
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import CreateSession from './CreateSession'; 
import InSession from './InSession';

function StartSession() {

  const [sessionData, setSessionData] = useState(null);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {

     // would need to change the request to be currentusers auth token
      axios.get('/api/session/test1')
        .then(response => {
          if (response.data.sessionExists) {
            setSessionData(response.data.sessionDetails);
            setSessionExists(true);
          } else {
            setSessionExists(false);
          }
        })
        .catch(error => {
          console.error('Error fetching session data', error);
        });
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  return (
    <div> 
    {sessionExists ? (
        <div>
          <InSession/> 
        </div>
      ) : (
        <div>
          <CreateSession/> 
        </div>
      )}
    </div>

  );
}

export default StartSession;


