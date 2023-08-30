import PageNotFoundImg from '../../assets/page-not-found/page-not-found.png';
import HomeButton from '../home-button/home-button.component';
import './error-msg.styles.scss';
const ErrorMsg = () => {
  return (
        <div className='error-page-container'>
            <div className='page-not-found-image-section'>
                <img className='page-not-found-image' src={PageNotFoundImg} alt='Page Not Found Image'/> 
            </div>
            <div className='page-not-found-text-button-section'>
                <p className='text-section'>The requested URL was not found on this server</p>
                <div className='button-section'>
                    <HomeButton height="56px" title='Refresh Page' href = '/download'/>
                </div>
            </div>
        </div>   
  )
}

export default ErrorMsg