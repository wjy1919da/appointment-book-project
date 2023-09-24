import { Link } from 'react-router-dom';
import './instrument-icon-grid.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';
const formatTitle = (title) => {
    title = title.replace(/_/g, ' ');
    return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}
const ProcedureIconGrid = (props) => {
    const { setInterested, userInfo } = userInfoQueryStore(state => ({
        setInterested: state.setInterested,
        userInfo: state.userInfo
    }));
    const selectedInterests = userInfo.selectedInterests || new Set();
    //console.log("selectedInterests",selectedInterests);
    const instrumentsGrid = props.names.map((name) => 
        <div 
            className= "procedure-icon-section"
            key={name}
            onClick={() => setInterested(name)}
        >
            <img src={require(`../../../assets/sign/${name}.png`)} className= {`procedure-icon-pic ${selectedInterests.has(name) ? 'active' : ''}`} alt={name} style={{ width: '60px', height: '60px'}} />
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