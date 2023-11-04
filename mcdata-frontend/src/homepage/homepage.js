import React from 'react';
import { useState, useEffect } from 'react';

const Header = () => {
  return (
    <div className="header">
      <img src="/logo.png" alt="mcdata logo" />
      <div className="buttons">
        <button>Home</button>
        <button>Data</button>
        <button>About</button>
        <button>Account</button>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="grid">
        <div className="column">
          <animation />
        </div>
        <div className="column">
          <animation />
        </div>
        <div className="column">
          <animation />
        </div>
        <div className="column">
          <animation />
        </div>
      </div>
      <div className="text">
        <h3>Dataset market</h3>
        <h1>MCDATA: the crowdsourced data marketplace</h1>
        <p>With mcdata, you can find and purchase high-quality datasets from our community.
          You can also sell your own datasets to other users, and earn money for your data.</p>
      </div>
      <div className="explore-button">
        <button>Explore datasets</button>
      </div>
    </div>
  );
};

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(0);
  
    useEffect(() => {
      fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
      });
    }, []);
  
    return (
      <div className="current-time">
        <p>The current time is {currentTime}.</p>
      </div>
    );
  };

export const HomePage = () => {
    return (
      <div className="homepage">
        <Header />
        <Body />
        <CurrentTime />
      </div>
    );
  };