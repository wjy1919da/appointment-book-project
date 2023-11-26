import React, { useState } from 'react';
import usePostQueryStore from '../../../../postStore.ts';

import { nanoid } from 'nanoid';

// components
import FormButton from '../../community-post-button/community-post-button';

// hook
import { useApiRequestPostFilter } from '../../../../hooks/useApiRequestPostFilter';

// scss
import './dropdown-filter-contents.scss';

const DropdownFilterContents = () => {
  const setFilterCondition = usePostQueryStore(
    (state) => state.setFilterCondition
  );

  const postQuery = usePostQueryStore((state) => state.postQuery);

  const [filterTopics, setFilterTopics] = useState([]);

  const apiRequestPostFilter = useApiRequestPostFilter();

  // filter 
  const handleToggleFilter = (topicValue) => {
    if (filterTopics.includes(topicValue)) {
      setFilterTopics((prevTopics) =>
        prevTopics.filter((topic) => topic !== topicValue)
      );
    } else {
      setFilterTopics((prevTopics) => [...prevTopics, topicValue]);
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
  };

  return (
    <div className='post-dropdown-contents-container'>
      <div className='post-dropdown-contents-inner-container'>
        <div className='post-dropdown-contents-left-container'>
          <div className='post-dropdown-contents-up'>
            <h3 className='procedure-title'>Post By</h3>
            <div className='post-by-button-container'>
              {['Member', 'Authorized Doctor'].map((post) => (
                <button
                  key={nanoid()}
                  onClick={() => handleToggleFilter(post)}
                  className={isButtonClicked(post) ? 'clicked-button' : ''}
                >
                  {post}
                </button>
              ))}
            </div>
          </div>
          <div className='post-dropdown-contents-down'>
            <h3 className='procedure-title'>Topic</h3>
            <div className='topic-button-container'>
              {['Facial', 'Breast', 'Skin'].map((topic) => (
                <button
                  key={nanoid()}
                  onClick={() => handleToggleFilter(topic)}
                  className={isButtonClicked(topic) ? 'clicked-button' : ''}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className='post-dropdown-contents-right-container'>
          <h3 className='procedure-title'>Body Area</h3>
          <div className='body-area-button-container'>
            {['A', 'B', 'C', 'D', 'E', 'F'].map((area) => (
              <button
                key={nanoid()}
                onClick={() => handleToggleFilter(area)}
                className={isButtonClicked(area) ? 'clicked-button' : ''}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='post-button-container'>
        <FormButton
          buttonName='Apply Filter'
          onClick={handleClickApplyFilter}
        />
      </div>
    </div>
  );
};

export default DropdownFilterContents;
