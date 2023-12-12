//Written by Katherine Hernandez
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//We will manually add the Release Notes when needed here 
const ReleaseNotes = () => {
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

              navigate('/ReleaseNotes')
          } catch (error) {
              console.error("Error verifying cookie:", error);
              navigate("/login");
          }
      };

      verifyCookie();
  }, [navigate]);
  //December Release
  const [newRelease] = useState({
    version: '1.0.0',
    releaseDate: 'December 8, 2023',
    features: [
      'Improved website blocking algorithm',
      'User interface enhancements',
      'Bug fixes and performance improvements',
    ],
  });

  //November Release
  const [previousReleases] = useState([
    {
      version: '0.8.0',
      releaseDate: 'November 1, 2023',
      features: [
        'Initial release',
        'Basic website blocking functionality',
        'User-friendly Navigation Bar',
      ],
    },
    // Added October release
    {
      version: '0.6.0',
      releaseDate: 'October 15, 2023',
      features: [
        'Beta testing phase',
        'Introduction of customization options',
        'Feedback collection mechanism',
      ],
    },
    // Added September release
    {
      version: '0.4.0',
      releaseDate: 'September 10, 2023',
      features: [
        'Alpha testing phase',
        'Preliminary blocking features',
        'Early user interface prototype',
      ],
    },
    // Added August release
    {
      version: '0.2.0',
      releaseDate: 'August 5, 2023',
      features: [
        'Project inception',
        'Initial codebase setup',
        'Concept planning',
      ],
    },
    // Here we can add more releases if needed
  ]);


  return (
    //main container for the release notes
    // Displaying the version and release date for the new release
    <div className="release-notes">
      <h2>New Release</h2>
      <div className="new-release">
        <h3>Version {newRelease.version} - {newRelease.releaseDate}</h3>
        <ul>
          {newRelease.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <h2>Previous Releases</h2>
      {previousReleases.map((release, index) => (
        <div key={index} className="previous-release">
          <h3>Version {release.version} - {release.releaseDate}</h3>
          <ul>
            {release.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ReleaseNotes;
