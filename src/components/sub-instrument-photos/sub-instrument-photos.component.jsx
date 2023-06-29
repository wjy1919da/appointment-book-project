import './sub-instrument-photos.styles.scss';

const SubInstrumentPhotos = ({ photo_1, photo_2}) => {
    return (
        <div className='sub-instrument-photos-container'>
            <div className='sub-instrument-photos-title'>
                before and after photo gallery
            </div>
            <div className='sub-instrument-photos-container'>
                <img className='sub-instrument-photos-photo' src={photo_1} alt='sub-instrument' />
                <img className='sub-instrument-photos-photo' src={photo_2} alt='sub-instrument' />
            </div>
        </div>
    )
}

export default SubInstrumentPhotos;