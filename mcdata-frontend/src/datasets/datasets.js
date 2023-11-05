import { Link, Outlet } from 'react-router-dom';
import './datasets.css';

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
        <header className='data-body-text'>
            <h1>
                Datasets
            </h1>
        </header>
    )
};

export const DataPage = () => {
    return (
      <div className='data-page'>
        <Header />
        <Body />
      </div>
    );
};