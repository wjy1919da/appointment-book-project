import './doctor-verification-page.styles.scss'
import submittedIcon from '../../assets/doctor/submmitedIcon.png'
import './doctor-submitted-verification-container.styles.scss'
const DoctorVerifiedSubmitted = () => {
    return (
        <div className='doctor-submmited-license-container'>
            <div className='submmited-license-container'>
                <img src = {submittedIcon}></img>
            </div>
            <div className='submmited-license-title'>
                Submitted Sucessfully
            </div>
            <div className='submmited-license-text'>
            Please allow us some time to verify your documentation/information. We appreciate your time!
            </div>
        </div>

    )
}

export default DoctorVerifiedSubmitted;