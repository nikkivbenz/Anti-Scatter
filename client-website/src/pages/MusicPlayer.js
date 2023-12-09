import React from 'react';

const MusicPlayer = () => {
    
    const playlistId = 'PLXIclLvfETS3AgCnZg4N6QqHu_T27XKIq';

    const playerStyle = {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Shadow effect
        borderRadius: '10px', // Rounded corners
        overflow: 'hidden',
        margin: '20px 0' // Adds some margin to the top and bottom
    }; 

    return (
        <div style={playerStyle}>
            <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                title="Lofi Focus Music Player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    );
};

export default MusicPlayer;




//Will work on Spotify if have time, youtube music player works well
//Youtube and Spotify 
// //Temporary placement of Music Player
// import React, { useState } from 'react';

// const MusicPlayer = () => {
//     const [service, setService] = useState('youtube'); // default to YouTube

//     const renderPlayer = () => {
//         if (service === 'youtube') {
//             return (
//                 <iframe
//                     width="560"
//                     height="315"
//                     src="https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID"
//                     title="YouTube video player"
//                     frameborder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowfullscreen>
//                 </iframe>
//             );
//         } else if (service === 'spotify') {
//             // Spotify player integration goes here
//             // You will need to use Spotify's Web Playback SDK and handle authentication
//             return <div>Spotify player not implemented yet</div>;
//         }
//     };

//     return (
//         <div>
//             <button onClick={() => setService('youtube')}>Play YouTube Playlist</button>
//             <button onClick={() => setService('spotify')}>Play Spotify Playlist</button>
//             {renderPlayer()}
//         </div>
//     );
// };

// export default MusicPlayer;
