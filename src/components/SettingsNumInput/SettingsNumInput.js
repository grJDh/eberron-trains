import React from 'react';

const SettingsNumInput = ({ label, onFunc, defValue }) => {

  return (
    <div className='settings-block'>
      <label>{label}</label>
      <input type="number" onChange={onFunc} defaultValue={defValue} min={0} step="any"/>
    </div>
  );
}

export default SettingsNumInput;
