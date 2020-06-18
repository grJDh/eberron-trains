import React from 'react';

const SettingsCheckbox = ({ label, onFunc, defValue }) => {

  return (
    <div className='settings-block'>
      <label>{label}</label>
      <input type="checkbox" onChange={onFunc} defaultChecked={defValue}/>
    </div>
  );
}

export default SettingsCheckbox;
