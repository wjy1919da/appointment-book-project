import { Link } from 'react-router-dom';
import './instrument-icon-grid.styles.scss';

const formatTitle = (title) => {
    // return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    const words = title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    let formattedTitle = '';

    if (words.length === 2) {
    formattedTitle = `${words[0]} \n${words[1]}`;
    } 
    else if (words.length === 3) {
    formattedTitle = `${words[0]} ${words[1]} \n${words[2]}`;
    }
    return formattedTitle;
}

const ProcedureIconGrid = (props) => {
    var option = props.option;
    const instrumentsGrid = props.names.map((name) => 
        <div className='procedure-icon-section' key={name} >
            {/* <Link to={`/${props.option}/${name}`} > */}
                <img src={require(`../../../assets/sign/${name}.png`)} className='procedure-icon-pic'  alt={name} style={{ width: '60px', height: '60px'}} />
            {/* </Link> */}
            <div className = 'title'>{formatTitle(name)}</div>
        </div>
    );

    return (
         <div className='procedure-icons-container'>
            {instrumentsGrid}
        </div>
    )
}

export default ProcedureIconGrid;