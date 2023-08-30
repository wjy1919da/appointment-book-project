import PageNotFoundImg from '../../assets/page-not-found/page-not-found.png';
import HomeButton from '../../components/home-button/home-button.component.jsx';
import Footer from '../../components/footer/footer.component';
import './page-not-found.styles.scss';
import ErrorMsg from '../../components/error-msg/error-msg.component.jsx';

const PageNotFound = () => {

    return (
        <div className='page-not-found-container'>
            <ErrorMsg/>
            <div style={{width: "100vw"}}>
                <Footer/> 
            </div>
        </div>
    )
}

export default PageNotFound;