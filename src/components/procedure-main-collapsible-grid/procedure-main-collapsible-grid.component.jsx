import React,{useState, useEffect} from 'react';
import './procedure-main-collapsible-grid.styles.scss';
import CollapseButton from '../collapse-button/collapse-button.component';
import {Link} from 'react-router-dom';
const formatTitle = (title) => {
  title = title.replace(/_/g, ' ');
  return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}
const formatTitleToFirstWord = (title) => {
  return title.split(' ')[0]; 
};

const ProcedureMainCollapsibleGrid = ({procedures, title}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const showProcedures = procedures.slice(0, 5);
  const remainingProcedures = procedures.slice(5);
  const formattedTitle = formatTitleToFirstWord(title).charAt(0).toUpperCase() + formatTitleToFirstWord(title).slice(1).toLowerCase();
  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    // 重置 isCollapsed 为 true 当 procedures 改变
    setIsCollapsed(true);
  }, [procedures]);
  
  let isRemaining = isCollapsed ? 'hidden' : 'visible';
  const showProceduresList = showProcedures.map((name) => 
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
  const remainingProceduresList = remainingProcedures.map((name) =>
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
          <CollapseButton title={formattedTitle} />
        </div>
        <div className= "procedure-main-icons-container">
          {showProceduresList}
        </div>
        <div className={`procedure-main-icons-container ${isRemaining}`}>
          {remainingProceduresList}
        </div>
    </div>
     
  );
};


export default ProcedureMainCollapsibleGrid;
