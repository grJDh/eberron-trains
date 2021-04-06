import React from 'react';

const SettingsSelect = ({ list, label, onFunc, defValue }) => {

  return (
    <div className='settings-block'>
      <label>{label}</label>
      <select onChange={onFunc} defaultValue={defValue}>
        {
          list.map(element => <option key={element} value={element}>{element}</option>)
        }
      </select>
    </div>  
  );
}

export default SettingsSelect;
