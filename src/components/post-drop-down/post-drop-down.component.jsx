import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse

const PostDropDown = (props) => {
  

  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
       newChecked.push(value);
    } else {
       newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(value);  // 这里只传递了当前切换的选项
  }

  const CheckboxList = () => props.options && props.options.map((value, index) =>(
    <React.Fragment key={index}>
        <div>
            <Checkbox
                onChange={() => handleToggle(value.value)}
                type="checkbox"
                checked={Checked.indexOf(value.value) === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>{value.label}</span>
        </div>
</React.Fragment>
  )) 

  return(
    <div>
        <div> 
            <Collapse defaultActiveKey={['0']}>
                
                    <Panel header="All" key = "1">
                        {CheckboxList()}
                    </Panel>
                
            </Collapse>
        </div>
    </div>
  )
}

export default PostDropDown;
