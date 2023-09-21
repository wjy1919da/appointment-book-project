import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login-popUp.styles.scss';
import Modal from 'react-bootstrap/Modal';
const HeaderLoginPopUp = ({show,onHide}) => {
   return (
    <div>
        <Modal
            dialogClassName='login-popUp-modal'
            show={show} 
            onHide={onHide} 
            size='lg'
            aria-labelledby="example-custom-modal-styling-title"
            style={{ marginTop: '100px' }}
        >
            <div className='login-popUp-container'> 
                
            </div>
        </Modal>
    </div>
  );
}

export default HeaderLoginPopUp;