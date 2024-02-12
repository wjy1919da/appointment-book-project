// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '../../mutual_components/button/button';
import procedureItem from '../../assets/procedure/Chin-Implants.png';
import backArrow from '../../assets/doctor/left_back.png';
import './doctor-profile-voucher-card.scss';

const DocotorOwnVoucherCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const iPhoneScreen = useMediaQuery({ query: '(min-width: 375px)' });

  const expandedOnClick = () => {
    console.log('We are expanding!');
    setIsExpanded(true);
  };

  const closeOnClick = () => {
    console.log('We are closing!');
    setIsExpanded(false);
  };

  if (isExpanded) {
    return <ExpandedVoucherCard arrowOnClick={closeOnClick} />;
  }

  return (
    <div className='doctor-own-voucher-card-container'>
      <div className='doctor-own-voucher-inner-container'>
        <div className='voucher-card-avartar'>
          <img src={procedureItem} className='voucher-card-image'></img>
          {iPhoneScreen ? (
            <span className='voucher-card-procedure-name'>Botox Injection</span>
          ) : (
            <span className='voucher-card-procedure-name'>
              Botox
              <br />
              Injection
            </span>
          )}
        </div>
        <div className='voucher-card-info'>
          <div className='voucher-card-price'>
            <span className='original-price-text'>Original Price:$99</span>
            <span className='hour-left-text'>12 hours left</span>
          </div>
          {/* <span className='voucher-card-original-price'>Original Price:$99</span> */}
          <span className='voucher-card-promotion'>$69 with Promotion</span>
          <div className='voucher-card-button-container'>
            <Button
              buttonName='Buy it Now'
              className='voucher-card-first-button'
              onClick={() => expandedOnClick()}
            />
            <Button
              buttonName='Details'
              className='voucher-card-second-button'
              onClick={() => expandedOnClick()}
            />
          </div>
        </div>
      </div>

      <div className='mid-voucher-card-button-container'>
        <Button
          buttonName='Buy it Now'
          className='mid-voucher-card-first-button'
          onClick={() => expandedOnClick()}
        />
        <Button
          buttonName='Details'
          className='mid-voucher-card-second-button'
          onClick={() => expandedOnClick()}
        />
      </div>
    </div>
  );
};

const ExpandedVoucherCard = ({ arrowOnClick }) => {
  return (
    <div className='doctor-own-expanded-container'>
      <div className='doctor-own-expanded-header-container'>
        <div className='doctor-own-expanded-back-arrow-container'>
          <img
            src={backArrow}
            alt='return arrow'
            className='doctor-own-expanded-back-arrow'
            onClick={() => arrowOnClick()}
          />
        </div>
        <div className='doctor-own-expanded-timelimit-container doctor-own-expanded-row'>
          <p className='doctor-own-expanded-timelimit'>12 hours left</p>
        </div>
        <div className='doctor-own-expanded-pricing-container doctor-own-expanded-row'>
          <p className='doctor-own-expanded-promotional'>Promotional Price</p>
          <p className='doctor-own-expanded-new-cost'>$69 with Promotion</p>
          <p className='doctor-own-expanded-original-cost'>
            Original Price: $99
          </p>
        </div>
      </div>
      <div className='doctor-own-expanded-info-container'>
        <div className='doctor-own-expanded-procedure-title-container'>
          <h2 className='doctor-own-expanded-procedure-title'>
            Botox Injection
          </h2>
        </div>
        <div className='doctor-own-expanded-coupon-details-container'>
          <h4 className='doctor-own-expanded-coupon-details'>
            coupon details. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </h4>
        </div>
        <div className='doctor-own-expanded-other-details-container'>
          <p className='doctor-own-expanded-other-details-title doctor-own-expanded-coupon-details'>
            Details:
          </p>
          <p className='doctor-own-expanded-other-details'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className='doctor-own-expanded-footer'>
        <p className='doctor-own-expanded-fine-print'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </p>
        {/* <HomeButtonPink title='Buy it NOW!' /> */}
      </div>
    </div>
  );
};

export default DocotorOwnVoucherCard;
