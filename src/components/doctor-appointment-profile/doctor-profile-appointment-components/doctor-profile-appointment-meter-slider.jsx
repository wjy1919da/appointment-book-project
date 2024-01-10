import React, { useState } from "react";

// scss
import "./doctor-profile-appointment-meter-slider.scss";

const MeterSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        id="slider"
        min="0"
        max="100"
        step="1"
        value={sliderValue}
        onChange={handleSliderChange}
        style={{ width: "667px" }}
      />
    </div>
  );
};

export default MeterSlider;
