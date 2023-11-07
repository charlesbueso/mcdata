import { Link, Outlet } from 'react-router-dom';
import './header.css';

export const Header = () => {
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