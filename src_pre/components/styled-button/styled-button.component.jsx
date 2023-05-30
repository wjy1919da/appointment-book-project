import './styled-button.styles.scss';

const StyledButton = ({ text }) => {
    return (
        <div className='styled-button-container'>
            {text}
        </div>
    )
}

export default StyledButton;