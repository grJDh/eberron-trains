import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Settings.scss';

import { settingsSelector, costModeChange, distanceSourceChange, speedChange } from '../../slices/settings';

const Settings = props => {

  const dispatch = useDispatch();
  const { costMode, distanceSource, speed } = useSelector(settingsSelector);

  const onCostModeChange = event => dispatch(costModeChange(event.target.value));
  const onDistanceSourceChange = event => dispatch(distanceSourceChange(event.target.value));
  const onSpeedChange = event => dispatch(speedChange(event.target.value));

  return (
    <div className='settings'>
        <div className='settings-block'>
          <label for='settings-cost'>Pricing method:</label>
          <select name="settings-cost" onChange={onCostModeChange} defaultValue={costMode}>
            <option value='0'>All</option>
            <option value='1'>ERLW (5E) - per mile</option>
            <option value='2'>WGtE (5E) - per day</option>
            <option value='3'>ECG (4E) - per mile</option>
          </select>
        </div>

        <div className='settings-block'>
          <label for='settings-distances'>Distances source:</label>
          <select name="settings-distances" onChange={onDistanceSourceChange} defaultValue={distanceSource}>
            <option value='4E'>4E</option>
            <option value='3E'>3E</option>
            <option disabled value='custom'>Custom</option>
          </select>
        </div>

        <div className='settings-block'>
          <label for='settings-cost'>Speed:</label>
          <input onChange={onSpeedChange} type="number" defaultValue={speed} style={{width: '50px'}}/>
        </div>
    </div>
  );
}

export default Settings;