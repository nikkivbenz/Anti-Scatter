// BlockByTheme.js
import React, { useState, useEffect } from "react";

const BlockByTheme = () => {
  const [themes, setThemes] = useState([
    {
      name: "Social",
      sites: [
        { url: "https://*.facebook.com/*", checked: false },
        { url: "https://*.youtube.com/*", checked: false },
        { url: "https://*.instagram.com/*", checked: false },
        { url: "https://*.twitter.com/*", checked: false },
        { url: "https://*.linkedin.com/*", checked: false },
        { url: "https://*.pinterest.com/*", checked: false },
        { url: "https://*.snapchat.com/*", checked: false },
        { url: "https://*.tiktok.com/*", checked: false },
        { url: "https://*.reddit.com/*", checked: false },
        { url: "https://*.tumblr.com/*", checked: false },
        { url: "https://*.whatsapp.com/*", checked: false },
        { url: "https://*.wechat.com/*", checked: false },
        { url: "https://*.telegram.org/*", checked: false },
        { url: "https://*.viber.com/*", checked: false },
        { url: "https://*.vk.com/*", checked: false },
        { url: "https://*.weibo.com/*", checked: false },
        { url: "https://*.line.me/*", checked: false },
        { url: "https://*.joinclubhouse.com/*", checked: false },
        { url: "https://*.parler.com/*", checked: false },
        { url: "https://*.gab.com/*", checked: false },
      ],
      checked: false,
    },
    {
      name: "Shopping",
      sites: [
        { url: "https://*.amazon.com/*", checked: false },
        { url: "https://*.ebay.com/*", checked: false },
        { url: "https://*.walmart.com/*", checked: false },
        // Add more shopping sites as needed
      ],
      checked: false,
    },
    {
      name: "Entertainment",
      sites: [
        { url: "https://*.youtube.com/*", checked: false },
        { url: "https://*.netflix.com/*", checked: false },
        { url: "https://*.hulu.com/*", checked: false },
        // Add more entertainment sites as needed
      ],
      checked: false,
    },
    // Add more themes as needed
  ]);
  // Load blocked themes and sites from local storage on component mount
  useEffect(() => {
    const blockedThemes =
      JSON.parse(localStorage.getItem("blockedThemes")) || [];
    const blockedSites = JSON.parse(localStorage.getItem("blockedSites")) || [];

    setThemes((prevThemes) =>
      prevThemes.map((theme) => ({
        ...theme,
        checked: blockedThemes.includes(theme.name),
        sites: theme.sites.map((site) => ({
          ...site,
          checked: blockedSites.includes(site.url) || theme.checked,
        })),
      }))
    );
  }, []);

  const handleThemeToggle = (themeName) => {
    setThemes((prevThemes) => {
      const updatedThemes = prevThemes.map((theme) =>
        theme.name === themeName
          ? {
              ...theme,
              checked: !theme.checked,
              sites: theme.sites.map((site) => ({
                ...site,
                checked: !theme.checked,
              })),
            }
          : theme
      );
  
      // Update local storage with blocked sites
      const blockedThemes = updatedThemes
        .filter((theme) => theme.checked)
        .map((theme) => theme.name);
      const blockedSites = updatedThemes
        .flatMap((theme) => theme.checked ? theme.sites.filter((site) => site.checked) : [])
        .map((site) => site.url);
  
      localStorage.setItem("blockedThemes", JSON.stringify(blockedThemes));
      localStorage.setItem("blockedSites", JSON.stringify(blockedSites));
  
      return updatedThemes;
    });
  };
  return (
    <div>
      <h1>Block By Theme</h1>
      {themes.map((theme) => (
        <div key={theme.name}>
          <label>
            <input
              type="checkbox"
              checked={theme.checked}
              onChange={() => handleThemeToggle(theme.name)}
            />
            <strong>{theme.name}</strong>
          </label>
          <ul>
            {theme.sites.map((site) => (
              <li key={site.url}>
                <label>
                  <input
                    type="checkbox"
                    checked={site.checked}
                    disabled={true} // Disable individual site checkboxes
                  />
                  {site.url}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlockByTheme;
