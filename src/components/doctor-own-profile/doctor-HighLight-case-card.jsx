import { useNavigate } from 'react-router-dom';
import './doctor-own-hightLight.styles.scss'
const DocotorOwnHightLight = () => {
    return (
        <div className='hightLight-case-container'>
            <div className='hight-light-title-container'>
                <span className='hightLight-title-text'>HightLight Cases</span>
                <div className='hightLight-title-buttonIcon'>
                    <span className='icon-left'>&#8592;</span> 
                    <span className='icon-right'>&#8594;</span> 
                    <span className='icon-more'>&#8230;</span> 
                </div>
            </div>
            
            <div className='hightlight-case-main'>
                <div className='hightlight-case-card'>
                    <div className='hightLight-case-picture'></div>
                    <span className='hightLight-case-text'>
                    Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum
                    </span>
                </div>
                <div className='hightlight-case-card'>
                    <div className='hightLight-case-picture'></div>
                    <span className='hightLight-case-text'>
                    Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum
                    </span>
                </div>
                <div className='hightlight-case-card'>
                    <div className='hightLight-case-picture'></div>
                    <span className='hightLight-case-text'>
                    Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DocotorOwnHightLight;