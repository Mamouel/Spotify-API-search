import React from "react";




const SearchField = (props) => {

  return(  
    <div className="search-container">
      <div className="textfield-container">
        <input
          key="searchInput"
          placeholder='Search an artist...'
          type='search'
          className='search-input'
          defaultValue={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}
  
export default SearchField;