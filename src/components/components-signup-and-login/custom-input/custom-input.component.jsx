import React from 'react'

const CustomInput = React.forwardRef((props, ref) => {
    const { ...otherProps } = props;
    return (
      <input ref={ref} {...otherProps} />
    );
  });

export default CustomInput