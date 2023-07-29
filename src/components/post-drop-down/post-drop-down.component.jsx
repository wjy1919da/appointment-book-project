import React, { useState } from 'react';
import { Checkbox, Collapse} from 'antd';
import "./post-drop-down.styles.scss";
// import { Icon } from '@ant-design/icons';
import closeCollapseIcon from "../../assets/post/post-drop-down-icon.png"
import openCollapseIcon from "../../assets/post/post-drop-down-icon.png"

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
    props.handleFilters(newChecked);
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
    
            <Collapse className='post-drop-down' defaultActiveKey={['0']}>
                    <Panel className='post-drop-down-button' header="All" key = "1">
                      <div className='post-drop-down-menu'>
                          {CheckboxList()}
                      </div>
                    </Panel>
            </Collapse>
        
    
  )
}

export default PostDropDown;
