import { Link, Outlet } from 'react-router-dom';
import './about.css';

const Header = () => {
    return (
      <div className="header">
        <img className="logo" src="/logo.png" alt="mcdata logo" />
        <nav className="buttons">
          <Link to="/">Home</Link>
          <Link to="/data">Data</Link>
          <Link to="/about">About</Link>
          <Link to="/account">Account</Link>
        </nav>
        <Outlet/>
      </div>
    );
  };

const Body = () => {
    return(
        <header className='about-body-text'>
            <h1>
                About mcdata
            </h1>
        </header>
    )
};

export const AboutPage = () => {
    return (
      <div className='about-page'>
        <Header />
        <Body />
      </div>
    );
};