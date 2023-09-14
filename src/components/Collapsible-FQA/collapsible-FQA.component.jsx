import React, { useState } from 'react';
import './collapsible-FQA.styles.scss';
import { useGetFAQ } from '../../hooks/useGetProcedures';
import HomeSpinner from '../home-spinner/home-spinner.component';

const CollapsibleSet = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const {data, error, isLoading} = useGetFAQ();
  const toggleCollapsible = (index) => {
    setActiveIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  // Handle the loading state
  if (isLoading) {
    return <HomeSpinner/>;
  }

  // Handle the error state
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className='Collapsible-list'>
      {data.data && data.data.length > 0 &&
        <>
          <h2 className="FAQ-title">FAQ</h2>
          <table className="collapsible-list table">
              <tbody>
              {data.data.map((item, index) => (
                  item.content && 
                  <tr key={index}>
                      <th>
                          <button
                              className={`collapsible ${activeIndexes.includes(index) ? 'active' : ''}`}
                              onClick={() => toggleCollapsible(index)}
                          >
                             <li>{item.title}</li>
                          </button>
                          <div
                              className="content"
                              style={{
                                  maxHeight: activeIndexes.includes(index) ? '1000px' : '0',
                                  transition: 'max-height 0.3s ease',
                                  overflow: 'hidden',
                              }}
                          >
                              <p>{item.content}</p>
                          </div>
                      </th>
                  </tr>
              ))}
              </tbody>
          </table>
        </>
      }
    </div>
);}


export default CollapsibleSet;