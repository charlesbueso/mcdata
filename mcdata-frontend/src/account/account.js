import { Link, Outlet } from 'react-router-dom';
import './account.css';

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
        <header className='account-body-text'>
            <h1>
                You
            </h1>
        </header>
    )
};

export const AccountPage = () => {
    return (
      <div className='account-page'>
        <Header />
        <Body />
      </div>
    );
};