import './feature-doctor-card.styles.scss'
import StarRate from '../starRate/starRate';

const FeatureDoctorCard =({imageURL,starRate})=>
{
    return(
        <div className='featured-doctor-card-container'>
            <img src ={imageURL} style={{height:"262.5px"}}></img>
            <span className="feature-doctor-card-text1">Dr.Name Name</span>
            <span className="feature-doctor-card-text2">specialization in Field</span>
            <span className="feature-doctor-starRate">
                <StarRate rateScore ={starRate}/>
            </span>
        </div>
    )
};
export default FeatureDoctorCard