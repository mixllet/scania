import React, { useMemo } from 'react';
import {useEffect, useState} from 'react';
import Select from 'react-select';
import {DriverTable} from './DriverTable';

// Simulate data fetch from datasource
import DATASET from '../DataStorage/dataset.json';
import DISTANCE from '../DataStorage/distance.json';

export const DistanceFilter = () => {

  // Simulate data fetch from datasource
  const distanceData = useMemo( () => DISTANCE,[] );
  const selectedDefault = { label: "Select distance", value: 0 };

  // One have to take into account what type of data source is being used. 
  // For this example this is just fine.
  // const [filteredDrivers, setFilteredDrivers] = useState(() => setInitialDrivers());
  // const [filteredDrivers, setFilteredDrivers] = useState(DATASET);
  const [filteredDrivers, setFilteredDrivers] = useState(setInitialDrivers());
  const [selectedValue, setSelectedValue] = useState(selectedDefault);

  const handleChange = selectedOption => {
    setSelectedValue(selectedOption);
    filterDriversByDistance(selectedOption.value);
  }

  function setInitialDrivers() {
    return DATASET;
  }

  /**
   * Reset all filters
   */
  function resetFilter() {
    setFilteredDrivers( DATASET );
    setSelectedValue(selectedDefault);
  }

  /**
   * Filter on user selected type
   */
  function filterDriversByDistance(distanceValue) {
    
    setFilteredDrivers( DATASET );
    //split value to get correct filter - Fromat is e.g "gte:200000"
    const filterValues = distanceValue.split(':');
    let filtered = [];
    
    // Filter switch
    if(filterValues[0]=='gte') { // filter type 1

      // filter type 2
      // Could be any other type of filter

      filteredDrivers.filter(driver => {
        if(driver.distance >  filterValues[1]) {
          driver = {
            ...driver,
            filtered: false
          } 
        } else {
          driver = { ...driver, filtered: true};
        }
        filtered.push(driver);
      });
      // set filter state
      setFilteredDrivers( prevFilteredDrivers => filtered );

    } else if(filterValues[0]=='lte') { 

      // filter type 2
      // Could be any other type of filter

      filteredDrivers.filter(driver => {
        if(driver.distance <=  filterValues[1]) {
          driver = {
            ...driver,
            filtered: false
          } 
        } else {
          driver = { ...driver, filtered: true};
        }
        filtered.push(driver);
      });
      // set filter state
      setFilteredDrivers( prevFilteredDrivers => filtered );

    } else if(false) { 
      // filter type 4
      // place holder for additional filter type
      // could be any type of filter, user selected from drop list on page
    } else {
      setFilteredDrivers( prevFilteredDrivers => DATASET );  
    }
    
  } 

  return (
    <>
      {/*
        I know test required Stencil JS for selection but I couldn't do it.
        I tried LINK and TAR but didn't work, I just couldn't inject the component to React,
        ... don't know why to be honest!
        I have never worked with React before and this is my very first app, I just 
        wanted to put energy on delivering a working app instead of putting too much 
        time on Sencil. Sorry to waste your time, next time :-)
      */}
      <div className="d-flex flex-row">
        <div className="p-2 w-25">
          {/* TODO: style list hover color to match Scania profile!!! */}
          <Select styles= 
                  {
                    {dropdownIndicator: (provided, state) => ({
                      ...provided,
                      transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                    })}
                  } 
                  options={distanceData} 
                  onChange={handleChange} 
                  value={selectedValue}
          /> 
        </div>
        <div className="p-2">
          <button className="resetButton btn btn-link" onClick={resetFilter}>Reset</button>
        </div>  
      </div>

      <div className="row m-2">
        <DriverTable data={filteredDrivers}/>
      </div>
    </>
  )  
  
}