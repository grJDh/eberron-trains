import React from 'react';

const SettingsTextArea = ({ label, onChangeFunc, saveFunc, resetFunc, defValue }) => {

  return (
    <div className='settings-block settings-custom'>
      <label>{label}</label>
      <textarea onChange={onChangeFunc} rows="20" cols="35" value={defValue} spellCheck={false}/>
      <div>
        <button onClick={saveFunc}>Save</button>
        <button onClick={resetFunc}>Reset</button>
      </div>
    </div>
  );
}

export default SettingsTextArea;
