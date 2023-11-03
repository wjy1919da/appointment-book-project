import './error-page-common.scss';

const ErrorPage = (props) => {
    const title = props.title || 'Error Page'
    const context = props.context || 'The requested URL was Expired!'

    return (
        <div className='error-page-common'>
            <div className='error-page-common-container gradient-background'>
                {/* <div className='error-page-common-orange-rounded-column'></div> */}
                <div className='error-page-common-upper-text-container'>
                    <div className='error-page-common-title-container'>
                        <h3 className='error-page-common-title'>{title}</h3>
                    </div>
                    <div className='error-page-common-subtitle-container'>
                        <h4 className='error-page-common-subtitle'>{context}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;