import React from "react";
import "./community-post-search-box-dropdown.scss";
import usePostQueryStore from "../../../postStore.ts";
const formatInputForFilter = (input) => {
  return input.toLowerCase().replace(/\s+/g, "_");
};

const formatTitle = (title) => {
  return title
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PostSearchBoxDropDown = () => {
  // console.log("search box dropdown");
  const setTempSearchParam = usePostQueryStore((s) => s.setTempSearchParam);
  const postQuery = usePostQueryStore((state) => state.postQuery);
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
    <div className="post-search-dropdown-container">
      <div className="post-search-dropdown-title">Trendy</div>
      <div className="post-search-dropdown-trendy">
        <div className="post-search-dropdown-trendy-items">
          {filteredTrendyProcedures.map((procedure, index) => (
            <div
              key={index}
              className="post-item"
              onClick={() => setTempSearchParam(procedure)}
            >
              {formatTitle(procedure)}
            </div>
          ))}
        </div>
      </div>
      <div className="post-search-dropdown-previous-container">
        <div className="post-search-dropdown-title-previous">
          Previous Search
        </div>
        {filteredpostSearchHistory && filteredpostSearchHistory.length > 0 ? (
          filteredpostSearchHistory.map((history, index) => (
            <div
              key={index}
              className="post-search-item-previous"
              onClick={() => setTempSearchParam(history)}
            >
              {history}
            </div>
          ))
        ) : (
          <div className="post-search-item-previous">No search history</div>
        )}
      </div>
    </div>
  );
};

export default PostSearchBoxDropDown;
