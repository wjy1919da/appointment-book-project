import React from 'react'
import './procedure-main-page.styles.scss'
import MainPageIntro from '../../components/main-page-intro/main-page-intro.component'
import PostSearchBox from '../../components/components-posts/community-post-search-box/community-post-search-box.jsx';
import ProcedureMainCollapsibleGrid from '../../components/procedure-main-collapsible-grid/procedure-main-collapsible-grid.component'
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import useProcedureQueryStore from '../../procedureStore';
function groupByGroupName(data) {
    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.groupName]) {
            grouped[item.groupName] = [];
        }
        grouped[item.groupName].push(item);
    });

    return Object.keys(grouped).map(key => ({
        groupName: key,
        items: grouped[key]
    }));
}
const formatCategoryName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '_');
};
const ProcedureMainPage = () => {
    const { data, isLoading, error } = useGetProcedureCategories();
    /* Do not delete this */
    // const procedures = data ? groupByGroupName(data.data) : [];
    // console.log("procedure Main",procedures);
    /* Test data */
    const procedures = [
        {
            "groupName": "SKIN PROCEDURES",
            "items": [
                {
                    "categoryName": "botox_injections",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "chemical_peels",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "laser_hair_removal",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "chin_implants",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "neck_contouring",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },{
                    "categoryName": "laser_hair_removal",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "chin_implants",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                },
                {
                    "categoryName": "neck_contouring",
                    "description": null,
                    "subcategories": null,
                    "groupId": 4,
                    "groupName": "SKIN PROCEDURES"
                }
            ]
        },
        {
            "groupName": "BREAST PROCEDURES",
            "items": [
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 1,
                    "groupName": "BREAST PROCEDURES"
                }
            ]
        },
        {
            "groupName": "FACE PROCEDURES",
            "items": [
                {
                    "categoryName": "fox_eyes",
                    "description": null,
                    "subcategories": null,
                    "groupId": 3,
                    "groupName": "FACE PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 3,
                    "groupName": "FACE PROCEDURES"
                },
                {
                    "categoryName": "otoplasty",
                    "description": null,
                    "subcategories": null,
                    "groupId": 3,
                    "groupName": "FACE PROCEDURES"
                },
                {
                    "categoryName": "breast_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 3,
                    "groupName": "FACE PROCEDURES"
                },
                {
                    "categoryName": "otoplasty",
                    "description": null,
                    "subcategories": null,
                    "groupId": 3,
                    "groupName": "FACE PROCEDURES"
                }
            ]
        },
        {
            "groupName": "BODY PROCEDURES",
            "items": [
                {
                    "categoryName": "lip_augmentation",
                    "description": null,
                    "subcategories": null,
                    "groupId": 2,
                    "groupName": "BODY PROCEDURES"
                },
                {
                    "categoryName": "teeth_whitening",
                    "description": null,
                    "subcategories": null,
                    "groupId": 2,
                    "groupName": "BODY PROCEDURES"
                },
                {
                    "categoryName": "tummy_tuck",
                    "description": null,
                    "subcategories": null,
                    "groupId": 2,
                    "groupName": "BODY PROCEDURES"
                },
                {
                    "categoryName": "teeth_whitening",
                    "description": null,
                    "subcategories": null,
                    "groupId": 2,
                    "groupName": "BODY PROCEDURES"
                },
                {
                    "categoryName": "tummy_tuck",
                    "description": null,
                    "subcategories": null,
                    "groupId": 2,
                    "groupName": "BODY PROCEDURES"
                }
                
            ]
        }
    ]
    const procedureQuery = useProcedureQueryStore((state) => state.procedureQuery);
    let formatSearchParam = formatCategoryName(procedureQuery.procedureSearchParam);
    // Convert the procedures data into the required format for ProcedureMainCollapsibleGrid
    const filteredProcedures = procedures.map(group => ({
        groupName: group.groupName,
        procedures: group.items
          .filter(item => formatCategoryName(item.categoryName).includes(formatSearchParam))
          .map(item => item.categoryName)
      })).filter(group => group.procedures.length > 0);

    const procedureGrids = filteredProcedures.map(group => (
      <ProcedureMainCollapsibleGrid key={group.groupName} title={group.groupName} procedures={group.procedures} />
    ));
  
    return (
      <div>
          <MainPageIntro 
              title="Discover the ideal cosmetic treatment"
              description="Charm Life helps you discover and compare aesthetic procedures."/>
          <div className='procedure-main-content-container'>
              <div className="procedure-main-title-container" >
                  <div className='procedure-main-header-title'>Our Cosmetic Procedures</div>
                  <PostSearchBox isProcedure={true}/>
              </div>
              <div className='procedure-main-collapse-container'>
                  {procedureGrids}
              </div>
          </div>
      </div>
    );
  }
  

export default ProcedureMainPage