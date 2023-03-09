import React from 'react'

const SearchBox = ({ value, onChange }) => {
    return (
      <div className="form-outline">
        <input
          type="search"
          id="search"
          className="form-control m-2"
          placeholder="Search..."
          value={value}
          onChange={(e)=>onChange( e.target.value)}
        />
      </div>
    );
}
 
export default SearchBox;