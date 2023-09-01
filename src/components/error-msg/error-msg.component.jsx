import PageNotFoundImg from '../../assets/page-not-found/page-not-found.png';
import HomeButton from '../home-button/home-button.component';
import './error-msg.styles.scss';
import { useMediaQuery } from 'react-responsive';
const ErrorMsg = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` }); 
  return (
        <div className='error-page-container'>
             {isMobile&&<p className='text-section'>The requested URL was not found on this server</p>}
            <div className='page-not-found-image-section'>
                <img className='page-not-found-image' src={PageNotFoundImg} alt='Page Not Found Image'/> 
            </div>
            <div className='page-not-found-text-button-section'>
                {!isMobile&&<p className='text-section'>The requested URL was not found on this server</p>}
                <div className='button-section'>
                    <HomeButton height="isMobile? 56px: 50px" title='Download APP' href = '/download'/>
                </div>
            </div>
        </div>   
  )
}

export default ErrorMsg