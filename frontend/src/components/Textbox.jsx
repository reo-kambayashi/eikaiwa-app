import React from 'react';

const Textbox = ({ placeholder, value, onChange, type = "text" }) => {
    return (
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="textbox"
        />
    );
};

export default Textbox;