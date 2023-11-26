import React from 'react';
import './doctor-profile-interest-category-area.styles.scss';
import imageSrc from '../../../assets/procedure/Facelift.png'; // Imported image

const ImageTextComponent = ({ imageSrc, text, onClick, isSelected }) => (
    <div className="image-text" onClick={onClick}>
      <img 
        src={imageSrc} 
        alt={text} 
        className={`circle-img ${isSelected ? 'selected' : ''}`}
      />
      <p>{text}</p>
    </div>
  );

  const RowComponent = ({ rowIndex, imageSrc, text, onImageClick, selectedId }) => (
    <div className="row">
      {[...Array(3)].map((_, itemIndex) => {
        const id = `${rowIndex}-${itemIndex}`;
        return (
          <ImageTextComponent
            key={id}
            imageSrc={imageSrc}
            text={text}
            onClick={() => onImageClick(id)}
            isSelected={selectedId === id}
          />
        );
      })}
    </div>
  );

  const DoctorEditInterestCategory = () => {
    const [selectedId, setSelectedId] = React.useState(null);
    const text = "Procedure"; // Your text
  
    const handleImageClick = (id) => {
      if (selectedId === id) {
        setSelectedId(null); // Deselect if the same item is clicked
      } else {
        setSelectedId(id);
      }
    };
  
    return (
      <div className="grid">
        {[...Array(7)].map((_, rowIndex) => (
          <RowComponent
            key={rowIndex}
            rowIndex={rowIndex}
            imageSrc={imageSrc}
            text={text}
            onImageClick={handleImageClick}
            selectedId={selectedId}
          />
        ))}
      </div>
    );
  };
export default DoctorEditInterestCategory;