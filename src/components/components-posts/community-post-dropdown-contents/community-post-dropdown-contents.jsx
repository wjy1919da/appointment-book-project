import React, { useState } from 'react';
import usePostQueryStore from '../../../postStore';
import { nanoid } from 'nanoid';

// components
import FormButton from '../community-post-button/community-post-button';

// hook
import { useApiRequestPostFilter } from '../../../hooks/useApiRequestPostFilter';

// scss
import './community-post-dropdown-contents.scss';

// images
import BreastProcedureImage from '../../../assets/procedure/breast_augmentation.svg';
import BodyProcedureImage from '../../../assets/procedure/chemical_peels.svg';
import FaceProcedureImage from '../../../assets/procedure/fox_eyes.svg';
import SkinProcedureImage from '../../../assets/procedure/teeth_whitening.svg';

const PostDropDownContents = () => {
  const setFilterCondition = usePostQueryStore(
    (state) => state.setFilterCondition
  );

  const postQuery = usePostQueryStore((state) => state.postQuery);

  const [filterTopic, setFilterTopic] = useState([]);

  const apiRequestPostFilter = useApiRequestPostFilter();

  // data
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

  // filter
  const handleToggleFilter = (topicValue) => {
    // console.log(topicValue);
    if (filterTopic.includes(topicValue)) {
      setFilterTopic((prevState) =>
        prevState.filter((topic) => topic !== topicValue)
      );
    } else {
      setFilterTopic((prevState) => [...prevState, topicValue]);
    }
  };

  // apply filter
  const handleClickApplyFilter = async () => {
    setFilterCondition(filterTopic);

    try {
      const response = await apiRequestPostFilter.fetchNextPage();
      console.log(response);
    } catch (error) {
      console.error('API request failed:', error);
    }
    // console.log(filterTopic);
    // console.log(postQuery);
  };

  return (
    <div className='post-dropdown-contents-container'>
      <div className='post-dropdown-contents-inner-container'>
        <div className='post-dropdown-contents-left-container'>
          <div className='post-dropdown-contents-up'>
            <h3 className='procedure-title'>Post By</h3>
            <button type='button' onClick={() => handleToggleFilter('Member')}>Member</button>
            <button type='button' onClick={() => handleToggleFilter('Authorized Doctor')}>Authorized Doctor</button>
          </div>
          <div className='post-dropdown-contents-down'>
            <h3 className='procedure-title'>Topic</h3>
            {['Facial', 'Breast', 'Skin'].map((topic) => {
              <button key={topic} type='button' onClick={() => handleToggleFilter(topic)}>{topic}</button>
            })}
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
            <figure id={index} className='procedure-container'>
              <img
                src={procedure.src}
                alt={`Image-${index}`}
                className='procedure-image'
              />
              <figcaption className='procedure-name'>
                {procedure.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className='post-dropdown-contents-procedures-button-container'>
          <FormButton
            buttonName='Apply Filter'
            onClick={handleClickApplyFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDropDownContents;
