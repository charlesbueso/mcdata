// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [currentTime, setCurrentTime] = useState(0);

//   useEffect(() => {
//     fetch('/time').then(res => res.json()).then(data => {
//       setCurrentTime(data.time);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">

//         React.JS Frontend - Flask Backend setup

//         <p>The current time is {currentTime}.</p>
//       </header>
//     </div>
//   );
// }

// import React from 'react';

// const Header = () => {
//   return (
//     <div className="header">
//       <img src="/logo.png" alt="Logo" />
//       <div className="buttons">
//         <button>Home</button>
//         <button>Data</button>
//         <button>About</button>
//         <button>Account</button>
//       </div>
//     </div>
//   );
// };

// const Body = () => {
//   return (
//     <div className="body">
//       <div className="grid">
//         <div className="column">
//           <animation />
//         </div>
//         <div className="column">
//           <animation />
//         </div>
//         <div className="column">
//           <animation />
//         </div>
//         <div className="column">
//           <animation />
//         </div>
//       </div>
//       <div className="text">
//         <h3>Dataset market</h3>
//         <h1>MCDATA: the crowdsourced data marketplace</h1>
//         <p>With mcdata, you can find and purchase high-quality datasets from our community.
//           You can also sell your own datasets to other users, and earn money for your data.</p>
//       </div>
//       <div className="explore-button">
//         <button>Explore datasets</button>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="app">
//       <Header />
//       <Body />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { HomePage } from './homepage/homepage.js';

const App = () => {
  return (
    <HomePage />
  );
};

export default App;