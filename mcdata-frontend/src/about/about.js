import { Header } from '../utils/header';
import './about.css';

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