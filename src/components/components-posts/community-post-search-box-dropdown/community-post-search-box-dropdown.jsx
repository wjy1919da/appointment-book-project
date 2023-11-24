import React from 'react';
import usePostQueryStore from '../../../postStore.ts';

// scss
import './community-post-search-box-dropdown.scss';

const formatInputForFilter = (input) => {
  return input.toLowerCase().replace(/\s+/g, '_');
};

const formatTitle = (title) => {
  return title.replace(/_/g, ' ');
};

const PostSearchBoxDropDown = () => {
  // console.log("search box dropdown");
  const setTempSearchParam = usePostQueryStore((s) => s.setTempSearchParam);
  const postQuery = usePostQueryStore((state) => state.postQuery);

  const trendyProcedures = [
    'Lorum ipsum',
    'Lorum ipsum Lorum',
    'Lorum ipsum Lorum',
    'Lorum ipsum',
  ];

  const postSearchHistory = JSON.parse(
    localStorage.getItem('postSearchHistory')
  );

  const filteredTrendyProcedures = trendyProcedures
    .filter((procedure) =>
      procedure.toLowerCase().includes(postQuery.tempSearchParam)
    )
    .slice(0, 6);
  const filteredpostSearchHistory = postSearchHistory
    ?.filter((procedure) =>
      procedure.toLowerCase().includes(postQuery.tempSearchParam)
    )
    .slice(0, 5);

  return (
    <div className='post-search-dropdown-container'>
      <div className='post-search-dropdown-title'>Trendy</div>
      <div className='post-search-dropdown-trendy'>
        <div className='post-search-dropdown-trendy-items'>
          {filteredTrendyProcedures.map((procedure, index) => (
            <div
              key={index}
              className='post-item'
              onClick={() => setTempSearchParam(procedure)}
            >
              {formatTitle(procedure)}
            </div>
          ))}
        </div>
      </div>
      <div className='post-search-dropdown-previous-container'>
        <div className='post-search-dropdown-title-previous'>
          Previous Search
        </div>
        {filteredpostSearchHistory && filteredpostSearchHistory.length > 0 ? (
          filteredpostSearchHistory.map((history, index) => (
            <div
              key={index}
              className='post-search-item-previous'
              onClick={() => setTempSearchParam(history)}
            >
              {formatTitle(history)}
            </div>
          ))
        ) : (
          <div className='post-search-item-previous'>No search history</div>
        )}
      </div>
    </div>
  );
};

export default PostSearchBoxDropDown;
