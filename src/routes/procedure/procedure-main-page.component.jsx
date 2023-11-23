import React from "react";
import "./procedure-main-page.styles.scss";
import MainPageIntro from "../../components/main-page-intro/main-page-intro.component";
import PostSearchBox from "../../components/components-posts/community-post-search-box/community-post-search-box.jsx";
import ProcedureMainCollapsibleGrid from "../../components/procedure-main-collapsible-grid/procedure-main-collapsible-grid.component";
import { useGetProcedureCategories } from "../../hooks/useGetProcedures";
import useProcedureQueryStore from "../../procedureStore";
import HomeSpinner from "../../components/home-spinner/home-spinner.component";
import ErrorMsg from "../../components/error-msg/error-msg.component";
import { useEffect } from "react";
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
const formatCategoryName = (name) => {
  return name.toLowerCase().replace(/\s+/g, "_");
};
const ProcedureMainPage = () => {
  const { data, isLoading, error } = useGetProcedureCategories();
  const procedures = data && data.data ? groupByGroupName(data.data) : [];
  const procedureQuery = useProcedureQueryStore(
    (state) => state.procedureQuery
  );
  const setProcedureSearchParam = useProcedureQueryStore(
    (s) => s.setProcedureSearchParam
  );
  let formatSearchParam = formatCategoryName(
    procedureQuery.procedureSearchParam
  );
  useEffect(() => {
    return () => {
      setProcedureSearchParam("");
    };
  }, [setProcedureSearchParam]);
  if (isLoading) {
    return <HomeSpinner />;
  }
  if (error) {
    return (
      <div>
        <ErrorMsg />
      </div>
    );
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
    <ProcedureMainCollapsibleGrid
      key={group.groupName}
      title={group.groupName}
      procedures={group.procedures}
    />
  ));

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
          <PostSearchBox isProcedure={true} />
        </div>
        {data?.data && (
          <div className="procedure-main-collapse-container">
            {procedureGrids}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureMainPage;
