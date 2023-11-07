import { Header } from '../utils/header';
import './account.css';

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