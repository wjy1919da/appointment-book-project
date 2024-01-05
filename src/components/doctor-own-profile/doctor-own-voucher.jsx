// import { useNavigate } from 'react-router-dom';

// components
import DocotorOwnVoucherCard from './doctor-profile-voucher-card';

// scss
import './doctor-own-voucher.scss';

const DocotorOwnVoucher = () => {
    return (
        <div className='doctor-own-voucher-container' style={{display:'flex',flexDirection:'column',gap:'30px',}}>
            <span style={{
                fontFamily:'Open Sans',
                fontSize:'24px',
                fontStyle:'normal',
                fontWeight:'600',
                color:'#F29E86',

            }}>Vouchers</span>
            <div class='doctor-profile-voucher-card-container'>
            <DocotorOwnVoucherCard/>
            <DocotorOwnVoucherCard/>
            </div>

        </div>
    );
};

export default DocotorOwnVoucher;