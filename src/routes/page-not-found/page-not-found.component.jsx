import { Link } from 'react-router-dom';
import PageNotFoundImg from '../../assets/page-not-found/page-not-found.png';
import HomeButton from '../../components/home-button/home-button.component.jsx';
import Footer from '../../components/footer/footer.component';
import './page-not-found.styles.scss';

const PageNotFound = () => {
    return (
        <div className='page-not-found-container'>
            <div className='page-not-found-image-section'>
                <img className='page-not-found-image' src={PageNotFoundImg} alt='Page Not Found Image'/> 
            </div>

            <div className='page-not-found-text-button-section'>
                <p className='text-section'>The requested URL was not found on this server</p>
                <div className='button-section'>
                    <HomeButton height="56px" title='Refresh Page' href = '/download'/>
                </div>
            </div>
            <div style={{width: "100vw"}}>
                <Footer/> 
            </div>
        </div>
    )
}

export default PageNotFound;