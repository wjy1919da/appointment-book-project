import { useNavigate } from 'react-router-dom';
import DocotorOwnVoucherCard from './doctor-profile-voucher-card';
const DocotorOwnVoucher = () => {
    return (
        <div className='doctor-own-voucher-container' style={{display:'flex',flexDirection:'column',gap:'30px',}}>
            <spna style={{
                fontFamily:'Open Sans',
                fontSize:'20px;',
                fontStyle:'normal',
                fontWeight:'700',
                color:'pink'

            }}>Vouchers</spna>
            <div style={{display:'flex',gap:'50px'}}>
            <DocotorOwnVoucherCard/>
            <DocotorOwnVoucherCard/>
            </div>

        </div>
    );
};

export default DocotorOwnVoucher;