import React from 'react';
import './doctor-profile-interest-category-area.styles.scss';
import { useGetProcedureCategories } from '../../../hooks/useGetProcedures';
import { Link } from 'react-router-dom';
import imageSrc from '../../../assets/procedure/facelift.svg'; // Imported image
const ProcedureItem = ({ categoryName }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const formatTitle = (name) => {
    return name.replace(/_/g, ' ').toUpperCase();
  };

  const handleItemClick = () => {
    setIsSelected(!isSelected); // Toggle the selected state
  };

  return (
    <div className='interest-category-combination' onClick={handleItemClick}>
      <img 
        src={require(`../../../assets/procedure/${categoryName}.svg`)} 
        className={`procedure-main-icon-pic ${isSelected ? 'selected' : ''}`} 
        alt={categoryName} 
      />
      <div className='procedure-main-title-container'>
        <div className='procedure-main-pic-title'>{formatTitle(categoryName)}</div>
      </div>
    </div>
  );
};
const ProceduresGrid = ({ data }) => {
  return (
      <div className="procedures-grid-container">
          {data.map((item) => (
              <ProcedureItem key={item.categoryName} categoryName={item.categoryName} />
          ))}
      </div>
  );
};

  const DoctorEditInterestCategory = () => {
    const { data, isLoading, error } = useGetProcedureCategories();
    const [selectedId, setSelectedId] = React.useState(null); // Correct placement for useState
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log("what is the procedure data,",data);
  
    return (
      <div className="interest-category-main-container">
        <ProceduresGrid data={data.data}  />
      </div>
    );
  };
export default DoctorEditInterestCategory;