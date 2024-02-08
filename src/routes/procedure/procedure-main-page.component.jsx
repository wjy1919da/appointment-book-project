import React from "react";
import "./procedure-main-page.styles.scss";
import MainPageIntro from "../../components/main-page-intro/main-page-intro.component";
import PostSearchBox from "../../components/components-posts/community-post-search-box/community-post-search-box.jsx";
import ProcedureMainCollapsibleGrid from "../../components/procedure-main-collapsible-grid/procedure-main-collapsible-grid.component";
import { useGetProcedureCategories } from "../../hooks/useGetProcedures";
import useProcedureQueryStore from "../../procedureStore";
import HomeSpinner from "../../components/home-spinner/home-spinner.component";
import ErrorMsg from "../../components/error-msg/error-msg.component";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ProcedureSearchDropDown from "../../components/procedure-search-dropdown/procedure-search-dropdown.component";

function groupByGroupName(data) {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.groupName]) {
      grouped[item.groupName] = [];
    }
    grouped[item.groupName].push(item);
  });

  return Object.keys(grouped).map((key) => ({
    groupName: key,
    items: grouped[key],
  }));
}
const toDisplayFormat = (param) => {
  return param.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
const formatCategoryName = (name) => {
  return name.toLowerCase().replace(/\s+/g, "_");
};
const ProcedureMainPage = () => {
  const { data, isLoading, error } = useGetProcedureCategories();
  // Memoize the grouped procedures to avoid recalculating on every render
  const procedures = useMemo(() => {
    return data && data.data ? groupByGroupName(data.data) : [];
  }, [data]);
  const procedureQuery = useProcedureQueryStore(
    (state) => state.procedureQuery
  );
  const [isSearchContainerVisible, setIsSearchContainerVisible] =
    useState(false);
  const setProcedureSearchParam = useProcedureQueryStore(
    (s) => s.setProcedureSearchParam
  );
  const formatSearchParam = useMemo(
    () => formatCategoryName(procedureQuery.procedureSearchParam),
    [procedureQuery.procedureSearchParam]
  );
  // useEffect(() => {
  //   return () => {
  //     setProcedureSearchParam("");
  //   };
  // }, [setProcedureSearchParam]);
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       containerRef.current &&
  //       !containerRef.current.contains(event.target)
  //     ) {
  //       setIsSearchContainerVisible(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [containerRef]);

  const navigate = useNavigate();

  if (isLoading) {
    return <HomeSpinner />;
  }
  if (error) {
    navigate("../*");
    // return (
    //   <div>
    //     <ErrorMsg />
    //   </div>
    // );
  }

  const filteredProcedures = procedures
    .map((group) => ({
      groupName: group.groupName,
      procedures: group.items
        .filter((item) =>
          formatCategoryName(item.categoryName).includes(formatSearchParam)
        )
        .map((item) => item.categoryName),
    }))
    .filter((group) => group.procedures.length > 0);

  const procedureGrids = filteredProcedures.map((group) => (
    // const procedureGrids = procedures.map((group) => (
    <ProcedureMainCollapsibleGrid
      key={group.groupName}
      title={group.groupName}
      procedures={group.procedures}
    />
  ));
  // const handleInputChange = (e) => {
  //   setProcedureSearchParam(e.target.value);
  //   setIsSearchContainerVisible(true);
  // };
  // const handleShowContainer = () => {
  //   setIsSearchContainerVisible(!isSearchContainerVisible);
  // };
  return (
    <div>
      <MainPageIntro
        title="Discover the ideal cosmetic treatment"
        description="Charm Life helps you discover and compare aesthetic procedures."
      />
      <div className="procedure-main-content-container">
        <div className="procedure-main-title-container">
          <div className="procedure-main-header-title">
            Our Cosmetic Procedures
          </div>
          {/* <div ref={containerRef} className=''>
            <PostSearchBox
              isProcedure={true}
              value={toDisplayFormat(procedureQuery.procedureSearchParam)}
              onChange={handleInputChange}
              onClick={handleShowContainer}
            />
            {isSearchContainerVisible && <ProcedureSearchDropDown />}
          </div> */}
        </div>
        {data?.data && procedureGrids.length !== 0 ? (
          <div className="procedure-main-collapse-container">
            {procedureGrids}
          </div>
        ) : (
          <div className="procedure-grid-empty-container">
            <h2 className="procedure-grid-empty">
              No results match this filter, please try again.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureMainPage;
