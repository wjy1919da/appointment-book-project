import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
import './post-drop-down.styles.scss'
import Icon from '../../assets/post/dropdownIcon.png'
const { Panel } = Collapse

const PostDropDown = (props) => {
    const [Checked, setChecked] = useState([]);
    const [Open, setOpen] = useState(false);
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked); // 把最新的 filters 传递给父组件
    }
    const handleOpen = () => {
        setOpen(!Open);
    }

    const CheckboxList = () => props.options && props.options.map((value, index) => (
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

    return (
        <div>
            {/* <Collapse defaultActiveKey={['0']}>
                <Panel header="All" key="1">
                    <div>
                        {CheckboxList()}
                    </div>
                </Panel>
            </Collapse> */}
             <div className='post-drop-button-container'>
                <div
                    onClick={handleOpen}
                    className='post-drop-button'
                >
                   <div className='post-drop-button-pre-text'>
                       {props.title}:
                   </div>
                   <div className='post-drop-button-text'>
                        All
                   </div>
                   <div className='post-drop-button-icon'>
                        <img src={Icon} alt="dropdownIcon" />
                   </div>
                </div>
             </div>
            {Open && <div className='post-drop-down-container'>
                   {CheckboxList()}
                </div>
             } 
        </div>
    )
}


export default PostDropDown;
