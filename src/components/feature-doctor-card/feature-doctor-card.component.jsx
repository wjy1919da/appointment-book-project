import './feature-doctor-card.styles.scss'

const FeatureDoctorCard =({imageURL,starRate})=>
{
    return(
        <div className='featured-doctor-card-container'>
            <img src ={imageURL} style={{height:"262.5px"}}></img>
            <span className="feature-doctor-card-text1">Dr.Name Name</span>
            <span className="feature-doctor-card-text2">specialization in Field</span>
            <span className="feature-doctor-starRate"><span className={`stars-container stars-${starRate}`}>★★★★★</span></span>
        </div>
    )
};
export default FeatureDoctorCard