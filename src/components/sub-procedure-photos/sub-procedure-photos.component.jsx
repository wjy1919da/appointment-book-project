import './sub-procedure-photos.styles.scss';

const SubProcedurePhotos = ({ photos }) => {
    return (
        <div className='sub-procedure-photos-container'>
            <div className='sub-procedure-photos-title'>
                before and after photo gallery
            </div>
            <div className='sub-procedure-photos-container'>
                <img className='sub-procedure-photos-photo' src={photos} alt='sub-procedure' />
            </div>
        </div>
    )
}

export default SubProcedurePhotos;