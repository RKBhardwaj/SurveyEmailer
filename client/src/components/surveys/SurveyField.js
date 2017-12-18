//Survey field contains logic to render a single label and text input

import React from 'react';

export default (props) => {
    let {input, label, meta} = props;
    let {touched, error} = meta;
    if (props.value) {
        input.value = props.value || '';
    }
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
};