import React, { useState } from 'react';
import './test1.css'; // Import your CSS file for styling
import Header from '../Header/Header';
import {Col, Row } from 'antd';
import CheckBox from './Sections/CheckBox';
import { sectionName} from './Sections/Data';
import SearchFeature from './Sections/SearchFeature';
const Test1 = () => {
  //const [rightColumnContent, setRightColumnContent] = useState('');
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);
  const [SearchTerms, setSearchTerms] = useState("")
  const [Filters, setFilters] = useState({
    sectionNames: [],
  })

  const handleSectionName = (value) => {
    const data = sectionName;
    let Name = [];
    let i = 0;

    for (let j = 0; j <  value.length; j++) {
        for(let key in data){
            if (data[key]._id === parseInt(value[j], 10)){
                Name[i] = data[key]._id;
                i = i+1;
            }
        }
    }
    return Name;
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }
    newFilters[category] = filters

    if (category === "sectionName") {
        let roomSizeValues = handleSectionName(filters)
        newFilters[category] = roomSizeValues
    }
    // showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
        // skip: 0,
        // limit: Limit,
        filters: Filters,
        searchTerm: newSearchTerm
    }
    // setSkip(0)
    setSearchTerms(newSearchTerm)
    // getProducts(variables)
  }


  return (
    <div className="container">
    <div className="left-column">
      <div className="left-header">
        <Row>
          <Col span={24}>
            <SearchFeature refreshFunction={updateSearchTerms}/>  
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CheckBox
                list={sectionName}
                handleFilters={filters => handleFilters(filters, "sectionName")}
            />
          </Col>
        </Row>
      </div>
      <div className="left-content">
        <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
      </div>
    </div>
    <div className="right-column">
        <Header/>
    </div>
  </div>
  );
};

export default Test1;
