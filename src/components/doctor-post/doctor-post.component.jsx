import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import Footer from '../footer/footer.component';
import './doctor-post.styles.scss'
import PostDropDown1 from '../post-drop-down/post-dropdown1.component';
import PostDropDown2 from '../post-drop-down/post-dropdown2.component';
import { useState } from 'react';
import usePostQueryStore from "../../postStore.ts";
import DoctorPostGridMobile from '../doctor-post-grid/doctor-post-grid-mobile.component';
import React, { useLayoutEffect} from 'react';
import { useMediaQuery } from 'react-responsive';

const DoctorPost = () => {
    const postQuery = usePostQueryStore(state => state.postQuery);
    const setFilterCondition = usePostQueryStore(state => state.setFilterCondition);
    const dropdownOptionsByCategory = [
        { value: 'facial', label: 'Facial' },
        { value: 'breast', label: 'Breast' },
        { value: 'body', label: 'Body' } 
      ];
    const dropdownOptionsByRole = [
        { value: 'by user', label: 'By User' },
        { value: 'by doctor', label: 'By Doctor' },
      ]; 
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleFilters = (value, isChecked) => {
        const updatedFilter = [...postQuery.filterCondition];
        
        if (isChecked) {
            if (!updatedFilter.includes(value)) {
                updatedFilter.push(value);
            }
        } else {
            const index = updatedFilter.indexOf(value);
            if (index !== -1) {
                updatedFilter.splice(index, 1);
            }
        }
    
        setFilterCondition(updatedFilter);
        
    };
    
    
    console.log("doctor post",postQuery.filterCondition);
    if (isMobile) {
        return (
            <div>
                <div className='doctor-post-outer-container-mobile'>
                    <div className='doctor-post-header-container-mobile'>
                        <PostDropDown1 options={dropdownOptionsByCategory} handleFilters={handleFilters} menuLabel = "Category"/>
                        <PostDropDown1 options={dropdownOptionsByRole} handleFilters={handleFilters} menuLabel = "Post By"/>
                    </div>
                    <DoctorPostGrid />
                </div>
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div>
                <div className='doctor-post-outer-container'>
                    <div className='doctor-post-header-container'>
                        <PostDropDown1 options={dropdownOptionsByCategory} handleFilters={handleFilters} menuLabel = "Category"/>
                        <PostDropDown1 options={dropdownOptionsByRole} handleFilters={handleFilters} menuLabel = "Post By" />
                    </div>
                    <DoctorPostGrid />
                </div>
                <Footer />
            </div>
        )
    }
}

export default DoctorPost;