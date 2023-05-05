import ConsultingIcon from '../../assets/home/consulting-icon.gif';
import SharingIcon from '../../assets/home/sharing-icon.gif';
import SavingIcon from '../../assets/home/saving-icon.gif';
import HomeFeaturesText from './home-fearures-text/home-features-text.component';

import './home-features.styles.scss';

const HomeFeatures = () => {
    return (
        <div>
            <h2 className='home-title'>
                CHARM FEATURES
            </h2>
            <hr className='home-divider'/>
            <div className='home-features-container'>
                <div className='box-1'>
                    <HomeFeaturesText iconPic={ConsultingIcon}
                                      position='left'
                                      title='consulting'
                                      text='Charm aims to build a connection between patients, doctors, and clinics. Users can schedule virtual or in-person consultations with doctors through our online appointment system.' />
                </div>
                <div className='box-2'>
                    <HomeFeaturesText iconPic={SharingIcon}
                                      position='right'
                                      title='sharing'
                                      text="Charm envisions a more transparent industrial market, enhanced mutual trust between patients and surgeons, and every individual's interest and rights being protected. Hence, we encourage users on our platform to share experiences, help each other through in-app posts, and communicate effectively and transparently with board-certified doctors." />
                </div>
                <div className='box-1'>
                    <HomeFeaturesText iconPic={SavingIcon}
                                      position='left'
                                      title='saving'
                                      text='Discover the exceptional savings potential with Charm&apos;s innovative "Voucher" feature. Experience discounted prices on offline cosmetic procedures by securing vouchers at a reduced cost. Our vouchers offer substantial savings compared to market rates, allowing you to invest confidently in your beauty journey. Conveniently pay a nominal fee online and the remainder directly to your chosen provider. You can rest assured knowing there are no fees for expired or forfeited vouchers. Upon successful service completion, Charm imposes a modest commission fee, elevating your cosmetic shopping experience to unparalleled heights.' />
                </div>
            </div>
        </div>
    )
}

export default HomeFeatures;