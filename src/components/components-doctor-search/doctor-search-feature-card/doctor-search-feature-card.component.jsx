import './doctor-search-feature-card.styles.scss'
import StarRate from '../../starRate/starRate';

const FeatureDoctorCard =({imageURL,starRate,name,specialization})=>
{
    return(
        <div className='featured-doctor-card-container'>
            <img src ={imageURL} style={{height:"262.5px;width: 150px;"}}></img>
            <span className="feature-doctor-card-text1">{name}</span>
            <span className="feature-doctor-card-text2">{specialization}</span>
            <span className="feature-doctor-starRate">
                <StarRate rateScore ={starRate}/>
            </span>
        </div>
    )
};
export default FeatureDoctorCard