import React from 'react';
import { useState, useEffect } from 'react';
import homepage_animation from './homepage_animation.mp4';
import './homepage.css';

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="/logo.png" alt="mcdata logo" />
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
    <div className="body-text">
      <div>
        <h1>mcdata: the crowdsourced<br />data marketplace</h1>
        <p>The place to find high-quality datasets curated by our community. You can also <br />sell your own datasets to other users, and earn money for your data.
        </p>
        <br />
        <button className="explore-button">
        ⇨  Explore datasets 
        </button>
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

const BackgroundAnimation = () => {
    return (
      <video autoPlay muted loop className="background-animation" >
        <source src={homepage_animation} type="video/mp4" />
      </video>
    );
  };

export const HomePage = () => {
    return (
      <div className="homepage">
        <BackgroundAnimation />
        <Header />
        <Body />
        <CurrentTime />
      </div>
    );
  };