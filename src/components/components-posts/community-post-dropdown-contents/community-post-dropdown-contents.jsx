import React from 'react';

import { nanoid } from 'nanoid';

// components
import FormButton from '../community-post-button/community-post-button';

// scss
import './community-post-dropdown-contents.scss';

// images
import BreastProcedureImage from '../../../assets/post/dropdown_images/breast_procedures.svg';
import BodyProcedureImage from '../../../assets/post/dropdown_images/body_procedures.svg';
import FaceProcedureImage from '../../../assets/post/dropdown_images/face_procedures.svg';
import SkinProcedureImage from '../../../assets/post/dropdown_images/skin_procedures.svg'


const PostDropDownContents = () => {
  const trendyProcedureData = [
    {
      id: nanoid(),
      name: 'Breast Procedures',
      src: BreastProcedureImage,
    },
    {
      id: nanoid(),
      name: 'Body Procedures',
      src: BodyProcedureImage,
    },
    {
      id: nanoid(),
      name: 'Body Procedures',
      src: BodyProcedureImage,
    },
    {
      id: nanoid(),
      name: 'Face Procedures',
      src: FaceProcedureImage,
    },
    {
      id: nanoid(),
      name: 'Skin Procedures',
      src: SkinProcedureImage,
    },
    {
      id: nanoid(),
      name: 'Skin Procedures',
      src: SkinProcedureImage,
    },
  ];

  return (
    <div className='post-dropdown-contents-container'>
      <div className='post-dropdown-contents-inner-container'>
        <div className='post-dropdown-contents-left-container'>
          <div className='post-dropdown-contents-up'>
            <h3 className='procedure-title'>Post By</h3>
            <p>Member</p>
            <p>Authorized Doctor</p>
          </div>
          <div className='post-dropdown-contents-down'>
            <h3 className='procedure-title'>Topic</h3>
            <p>Lorum ipsum Lorum ipsum</p>
            <p>Lorum ipsum Lorum</p>
            <p>Lorum ipsum Lorum ipsum</p>
          </div>
        </div>
        <div className='post-dropdown-contents-right-container'>
          <h3 className='procedure-title'>Body Area</h3>
          <p>Lorum ipsum Lorum ipum</p>
          <p>Lorum ipsum Lorum</p>
          <p>Lorum ipsum Lorum ipsum</p>
          <p>Lorum ipsum Lorum ipsum</p>
          <p>Lorum ipsum Lorum ipsum</p>
          <p>Lorum ipsum Lorum ipsum</p>
        </div>
      </div>
      <div className='post-dropdown-contents-procedures-container'>
        <h3 className='procedure-title'>Trendy Procedure</h3>
        <div className='post-dropdown-contents-procedures-inner-container'>
          {trendyProcedureData.map((procedure, index) => (
            <figure id={procedure.id} className='procedure-container'>
              <img src={procedure.src} alt={`Image-${index}`} className='procedure-image' />
              <figcaption className='procedure-name'>
                {procedure.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className='post-dropdown-contents-procedures-button-container'>
          <FormButton buttonName='Apply Filter' />
        </div>
      </div>
    </div>
  );
};

export default PostDropDownContents;
