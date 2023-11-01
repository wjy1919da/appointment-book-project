import { Link } from 'react-router-dom';
import './home-recommende.styels.scss';
import ProcedureCard from '../../procedure-card/procedure-card.component';
import SubTxt from '../../sub-txt/sub-txt.component';
const HomeRecommande = () => {
    const cardInfo = 
    [
        {
            Cost:"1k-2k",
            Duration:"30 minutes",
            Safety:"Non-invasive",
            Pain:"Pain Free"
        }
    ]
    return  (
        <div className='home-recommande-container'>
            <div>
                <span className='home-recommande-title'>Recommended Cosmetic Procedures</span>
            </div>
            <div className='home-recommande-sub-area'>
                <div className='home-recommande-sub-area-left'>
                    <SubTxt title = 'Facial Rejuvenation'  text = 'Various means to restore a youthful appearance to an aging face A high-safety procedure that helps patients regain their best youthful appearance by removing excess or sagging skin, smoothing deep folds, and lifting and tightening deep facial tissues.' />
                    <SubTxt title = 'What is Facial Rejuvenation?'  text = 'Various means to restore a youthful appearance to an aging face. A high-safety procedure that helps patients regain their best youthful appearance by removing excess or sagging skin, smoothing deep folds, and lifting and tightening deep facial tissues.' />
                    <Link className='watch-video-link'>Watch video</Link>
                </div>
                <div className='home-recommande-procedureCard'>
                    <ProcedureCard cardInfo={cardInfo[0]}/>
                </div>
            </div>
        </div>
    ) 
};

export default HomeRecommande;