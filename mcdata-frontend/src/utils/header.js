import { NavLink, Outlet } from 'react-router-dom';
import './header.css';

export const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="/logo.png" alt="mcdata logo" />
      <nav className="buttons">
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/data" activeClassName="active">Data</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
        <NavLink to="/account" activeClassName="active">Account</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};