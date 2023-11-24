import React, { useState } from 'react';
import usePostQueryStore from '../../../../postStore.ts';
import { nanoid } from 'nanoid';

// components
import FormButton from '../../community-post-button/community-post-button';

// hook
import { useApiRequestPostFilter } from '../../../../hooks/useApiRequestPostFilter';

// scss
import './dropdown-procedure-contents.scss';

// images
import BreastProcedureImage from '../../../../assets/procedure/breast_augmentation.svg';
import BodyProcedureImage from '../../../../assets/procedure/chemical_peels.svg';
import BotoxProcedureImage from '../../../../assets/procedure/botox_injections.svg';
import FaceProcedureImage from '../../../../assets/procedure/fox_eyes.svg';
import SkinProcedureImage from '../../../../assets/procedure/teeth_whitening.svg';
import NeckProcedureImage from '../../../../assets/procedure/neck_contouring.svg';

const DropdownProcedureContents = () => {
  const setFilterCondition = usePostQueryStore(
    (state) => state.setFilterCondition
  );

  const postQuery = usePostQueryStore((state) => state.postQuery);

  const [filterTopics, setFilterTopics] = useState([]);

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
      name: 'Botox Procedures',
      src: BotoxProcedureImage,
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
      name: 'Neck Procedures',
      src: NeckProcedureImage,
    },
  ];

  // filter 
  const handleToggleFilter = (topicValue) => {
    console.log('topicValue', topicValue);
    if (filterTopics.includes(topicValue)) {
      setFilterTopics((prevState) =>
        prevState.filter((topic) => topic !== topicValue)
      );
    } else {
      setFilterTopics((prevState) => [...prevState, topicValue]);
    }
  };

  const isButtonClicked = (topicValue) => {
    return filterTopics.includes(topicValue);
  };

  // apply filter
  const handleClickApplyFilter = async () => {
    setFilterCondition(filterTopics);

    try {
      const res = await apiRequestPostFilter.fetchNextPage();
      // console.log(res);
    } catch (error) {
      // console.error('API request failed:', error);
    }
    // console.log(filterTopic);
    // console.log(postQuery);
  };

  return (
    <div className='post-dropdown-procedure-contents-wrapper'>
      <div className='post-dropdown-procedure-contents-container'>
        <h3 className='procedure-title'>Trendy Procedure</h3>
        <div className='post-dropdown-procedure-contents-inner-container'>
          {trendyProcedureData.map((procedure, index) => (
            <figure id={procedure.id} className='procedure-container'>
              <button
                onClick={() => handleToggleFilter(procedure.src)}
                className={
                  isButtonClicked(procedure.src)
                    ? 'clicked-image-button clicked'
                    : ''
                }
              >
                <img
                  src={procedure.src}
                  alt={`Image-${index}`}
                  className='procedure-image'
                />
              </button>
              <figcaption className='procedure-name'>
                {procedure.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className='post-dropdown-procedure-contents-button-container'>
          <FormButton
            buttonName='Apply Procedure'
            onClick={handleClickApplyFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownProcedureContents;
