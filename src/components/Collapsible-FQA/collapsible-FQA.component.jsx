import React, { useState } from 'react';
import './collapsible-FQA.styles.scss';

const CollapsibleSet = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleCollapsible = (index) => {
    setActiveIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  return (
    <div className='Collapsible-list'>
    <h2 className="FAQ-title">FAQ</h2>
    <table className="collapsible-list" class='table'>
    <tr>
        <th>
      <button
        className={`collapsible ${activeIndexes.includes(0) ? 'active' : ''}`}
        onClick={() => toggleCollapsible(0)}
      >
        •  Lorem ipsum dolor sit amet, consectetur adipiscing elit?
      </button>
      <div
        className="content"
        style={{
          maxHeight: activeIndexes.includes(0) ? '1000px' : '0',
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      </th>
      </tr>
      <tr>
        <th>
      <button
        className={`collapsible ${activeIndexes.includes(1) ? 'active' : ''}`}
        onClick={() => toggleCollapsible(1)}
      >
        •  Lorem ipsum dolor sit amet, consectetur adipiscing elit?
      </button>
      <div
        className="content"
        style={{
          maxHeight: activeIndexes.includes(1) ? '1000px' : '0',
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      </th>
      </tr>
      <tr>
        <th>
      <button
        className={`collapsible ${activeIndexes.includes(2) ? 'active' : ''}`}
        onClick={() => toggleCollapsible(2)}
      >
        •  Lorem ipsum dolor sit amet, consectetur adipiscing elit?
      </button>
      <div
        className="content"
        style={{
          maxHeight: activeIndexes.includes(2) ? '1000px' : '0',
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      </th>
      </tr>
      </table>
    </div>
  );
};

export default CollapsibleSet;