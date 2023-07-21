import { Link } from 'react-router-dom';
import './procesure-mobile-instrument.styles.scss';
// 格式化标题
// 图片需要按照固定格式命名，如：face_lift.png 标题为 Face Lift
const formatTitle = (title) => {
    return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// 接收instrument 和 procedure 两种option
const ProcesureInstrumentMobile = (props) => {
    var option = props.option;
    const instrumentsGrid = props.names.map((name) => 
        <div className='procesure-instruments-procedure' key={name} >
            <Link to={`/${props.option}/${name}`} >
                <img src={require(`../../assets/${props.option}/${name}.png`)} className={`${option}-pic`}  alt={name} style={{ width: '160px', height: '160px'}} />
            </Link>
            <div className = 'title'>{formatTitle(name)}</div>
        </div>
    );
    return (
         <div className='procedure-instruments-container'>
        
            {instrumentsGrid}
        
        </div>
    )
}

export default ProcesureInstrumentMobile;