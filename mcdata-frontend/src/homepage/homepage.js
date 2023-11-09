import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from '../utils/header';
import { useNavigate } from 'react-router-dom';
import homepage_animation from './homepage_animation.mp4';
import './homepage.css';

const Body = () => {
  const navigate = useNavigate();
    return (
    <div className="body-text">
      <div>
        <h1>mcdata: the crowdsourced<br />data marketplace</h1>
        <p>The place to find high-quality datasets curated by our community. You can also 
            <br />sell your own datasets to other users, and earn money for your data.
        </p>
        <br />
        <button className="explore-button" onClick={() => navigate('/data')}>
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
