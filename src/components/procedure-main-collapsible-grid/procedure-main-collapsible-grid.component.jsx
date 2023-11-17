import React,{useState} from 'react';
import './procedure-main-collapsible-grid.styles.scss';
import CollapseButton from '../collapse-button/collapse-button.component';
import {Link} from 'react-router-dom';
const formatTitle = (title) => {
  title = title.replace(/_/g, ' ');
  return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}
const ProcedureMainCollapsibleGrid = ({procedures, title}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  let containerClass = isCollapsed ? 'collapsed' : 'expanded';
  const procedureList = procedures.map((name) => 
    <Link 
        className= "procedure-main-icon-section"
        key={name}
        to={`/procedure/${name}`}
    >
        <img src={require(`../../assets/procedure/${name}.svg`)} className= "procedure-main-icon-pic" alt={name} />
        <div className='procedure-main-title-container'>
          <div className = 'procedure-main-pic-title'>{formatTitle(name)}</div>
        </div>
    </Link>
  );
  return (
    <div>
        <div className='collapse-button-container' onClick={handleCollapseClick}>
          <CollapseButton title={title} />
        </div>
        <div className={`procedure-main-icons-container ${containerClass}`}>
          {procedureList}
        </div>
    </div>
     
  );
};


export default ProcedureMainCollapsibleGrid;
