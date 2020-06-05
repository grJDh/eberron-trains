import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Settings.scss';

import { settingsSelector, costModeChange, distanceSourceChange, speedChange, setCustomRails } from '../../slices/settings';

const Settings = props => {

  const dispatch = useDispatch();
  const { costMode, distanceSource, speed, customRails } = useSelector(settingsSelector);

  const onCostModeChange = event => dispatch(costModeChange(event.target.value));
  const onDistanceSourceChange = event => dispatch(distanceSourceChange(event.target.value));
  const onSpeedChange = event => dispatch(speedChange(event.target.value));

  const [customRailsChanges, setCustomRailsChanges] = useState(JSON.stringify(customRails))
  const onCustomRailsChange = event => setCustomRailsChanges(event.target.value);
  const onCustomRailsReset = () => setCustomRailsChanges(JSON.stringify(customRails));
  const onCustomRailsSave = () => {
    if (customRailsChanges.length !== 0) {
      dispatch(setCustomRails(JSON.parse(customRailsChanges)));
    } else {
      dispatch(setCustomRails([]));
    }
  }

  return (
    <div className='settings'>
        <div className='settings-block'>
          <label>Pricing method:</label>
          <select onChange={onCostModeChange} defaultValue={costMode}>
            <option value='0'>All</option>
            <option value='1'>ERLW (5E) - per mile</option>
            <option value='2'>WGtE (5E) - per day</option>
            <option value='3'>ECG (4E) - per mile</option>
          </select>
        </div>

        <div className='settings-block'>
          <label>Distances source:</label>
          <select onChange={onDistanceSourceChange} defaultValue={distanceSource}>
            <option value='4E'>4E</option>
            <option value='3E'>3E</option>
          </select>
        </div>

        <div className='settings-block'>
          <label>Speed:</label>
          <input onChange={onSpeedChange} type="number" defaultValue={speed} style={{width: '50px'}}/>
        </div>

        <div className='settings-block settings-customDistances'>
          <label>Custom distances:</label>
          <textarea onChange={onCustomRailsChange} rows="5" cols="30" value={customRailsChanges} />
          <div>
            <button onClick={onCustomRailsSave}>Save</button>
            <button onClick={onCustomRailsReset}>Reset</button>
          </div>
        </div>
    </div>
  );
}

export default Settings;