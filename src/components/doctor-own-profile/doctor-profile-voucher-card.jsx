import { useNavigate } from 'react-router-dom';
import HomeButtonPink from '../home-button-pink/home-button-pink';
import procedureItem from '../../assets/procedure/Chin-Implants.png'
import './doctor-own-voucher-card.styles.scss'
const DocotorOwnVoucherCard = () => {
    return (
        <div className='doctor-own-voucher-card-container'>
            <div className='voucher-card-avartar'>
                <img src={procedureItem} style={{width:'100px',height:'100px'}}></img>
                <span> Botox Injection</span>
            </div>
            <div className='voucher-card-info'>
                <div className='voucher-card-price'>
                    <span className='original-price-text'>Original Price</span>
                    <span className='hour-left-text'>12 hours left</span>
                </div>
                <span className='voucher-card-original-price'>
                    Original Price:$99
                </span>
                <span className='voucher-card-promotion'>
                    $69 with Promotion
                </span>
                <HomeButtonPink title ='redemption for customers'/>
            </div>
        </div>
    );
};

export default DocotorOwnVoucherCard;