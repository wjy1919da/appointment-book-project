<<<<<<< HEAD
import React from 'react';
import usePostQueryStore from '../../../postStore.ts';

// scss
import './community-post-search-box-dropdown.scss';
=======
import React from "react";
import "./community-post-search-box-dropdown.scss";
import usePostQueryStore from "../../../postStore.ts";
const formatInputForFilter = (input) => {
  return input.toLowerCase().replace(/\s+/g, "_");
};

const formatTitle = (title) => {
  return title.replace(/_/g, " ");
};
>>>>>>> AWS-frontend-postSearch

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
<<<<<<< HEAD

  const trendyProcedures = [
    'Lorum ipsum',
    'Lorum ipsum Lorum',
    'Lorum ipsum Lorum',
    'Lorum ipsum',
  ];

  const postSearchHistory = JSON.parse(
    localStorage.getItem('postSearchHistory')
  );

=======
  const trendyProcedures = [
    "botox_injections",
    "breast_augmentation",
    "chemical_peels",
    "fox_eyes",
    "lip_augmentation",
    "liposuction",
    "rhinoplasty",
    "tummy_tuck",
    "vaginal_rejuvenation",
  ];
  const postSearchHistory = JSON.parse(
    localStorage.getItem("postSearchHistory")
  );
>>>>>>> AWS-frontend-postSearch
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
<<<<<<< HEAD
    <div className='post-search-dropdown-container'>
      <div className='post-search-dropdown-title'>Trendy</div>
      <div className='post-search-dropdown-trendy'>
        <div className='post-search-dropdown-trendy-items'>
          {filteredTrendyProcedures.map((procedure, index) => (
            <div
              key={index}
              className='post-item'
=======
    <div className="post-search-dropdown-container">
      <div className="post-search-dropdown-title">Trendy</div>
      <div className="post-search-dropdown-trendy">
        <div className="post-search-dropdown-trendy-items">
          {filteredTrendyProcedures.map((procedure, index) => (
            <div
              key={index}
              className="post-item"
>>>>>>> AWS-frontend-postSearch
              onClick={() => setTempSearchParam(procedure)}
            >
              {formatTitle(procedure)}
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      <div className='post-search-dropdown-previous-container'>
        <div className='post-search-dropdown-title-previous'>
=======
      <div className="post-search-dropdown-previous-container">
        <div className="post-search-dropdown-title-previous">
>>>>>>> AWS-frontend-postSearch
          Previous Search
        </div>
        {filteredpostSearchHistory && filteredpostSearchHistory.length > 0 ? (
          filteredpostSearchHistory.map((history, index) => (
            <div
              key={index}
<<<<<<< HEAD
              className='post-search-item-previous'
=======
              className="post-search-item-previous"
>>>>>>> AWS-frontend-postSearch
              onClick={() => setTempSearchParam(history)}
            >
              {formatTitle(history)}
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <div className='post-search-item-previous'>No search history</div>
=======
          <div className="post-search-item-previous">No search history</div>
>>>>>>> AWS-frontend-postSearch
        )}
      </div>
    </div>
  );
};

export default PostSearchBoxDropDown;
