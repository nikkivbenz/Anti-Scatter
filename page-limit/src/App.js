import React, { useState } from 'react';

const BlockedWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [usageTime, setUsageTime] = useState(0);

  const addWebsite = () => {
    if (websiteUrl && usageTime > 0) {
      const newWebsite = { url: websiteUrl, limit: usageTime };
      setWebsites([...websites, newWebsite]);
      setWebsiteUrl('');
      setUsageTime(0);
    }
  };

  const removeWebsite = (url) => {
    const updatedWebsites = websites.filter((website) => website.url !== url);
    setWebsites(updatedWebsites);
  };

  return (
    <div>
      <h2>Blocked Websites</h2>
      <div>
        <input
          type="text"
          placeholder="Enter website URL"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Usage time limit (minutes)"
          value={usageTime}
          onChange={(e) => setUsageTime(parseInt(e.target.value))}
        />
        <button onClick={addWebsite}>Add</button>
      </div>
      <ul>
        {websites.map((website, index) => (
          <li key={index}>
            {website.url} - {website.limit} minute(s)
            <button onClick={() => removeWebsite(website.url)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockedWebsites;