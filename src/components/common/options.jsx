import React from "react";

const Options = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        {...rest}
        className="form-control"
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id }  value={option._id}>{option.name}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Options;
