import './doctor-search-card.scss';
import './blank-search-card.scss';

const BlankSearchCard = () => {
    return (
        <div className='doctor-sc-container'>
            <div className='doctor-sc'>
                <div className='doctor-sc-image-column'>
                    <div className='doctor-sc-image-container'>
                        <div className='blank-fake fake-image'></div> 
                    </div>
                    <div className='blank-fake fake-stars'></div>
                </div>
                <div className='doctor-sc-info-column'>
                    <div className='doctor-sc-location-row doctor-sc-row'>
                        <div className='blank-fake fake-location' ></div>
                    </div>
                    <div className='doctor-sc-name-row doctor-sc-row'>
                        <div className='blank-fake fake-name'></div>
                    </div>
                    <div className='doctor-sc-field-row doctor-sc-row'>
                        <div className='blank-fake fake-field'></div>
                    </div>
                    <div className='doctor-sc-license-row doctor-sc-row'>
                        <div className='blank-fake fake-verification'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlankSearchCard;