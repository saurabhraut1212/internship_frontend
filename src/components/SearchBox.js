import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
