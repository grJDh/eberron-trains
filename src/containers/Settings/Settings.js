import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SettingsSelect from '../../components/SettingsSelect/SettingsSelect';
import SettingsNumInput from '../../components/SettingsNumInput/SettingsNumInput';
import SettingsTextArea from '../../components/SettingsTextArea/SettingsTextArea';
import SettingsCheckbox from '../../components/SettingsCheckbox/SettingsCheckbox';

import './Settings.scss';

import { settingsSelector, costModeChange, distanceSourceChange, speedChange, layoverChange, setCustomRails, setCustomPrices, ColorPricesChange } from '../../slices/settings';

const Settings = () => {

  const dispatch = useDispatch();
  const { costMode, distanceSource, speed, layover, customRails, customPrices, colorPrices } = useSelector(settingsSelector);

  const onCostModeChange = event => dispatch(costModeChange(event.target.value));
  const onDistanceSourceChange = event => dispatch(distanceSourceChange(event.target.value));
  const onSpeedChange = event => dispatch(speedChange(event.target.value));
  const onLayoverChange = event => dispatch(layoverChange(event.target.value));
  const onColorPricesChange = () => dispatch(ColorPricesChange(!colorPrices));

  const [customPricesChanges, setCustomPricesChanges] = useState(JSON.stringify(customPrices, null, 1))
  const onCustomPricesChange = event => setCustomPricesChanges(event.target.value);
  const onCustomPricesReset = () => setCustomPricesChanges(JSON.stringify(customPrices, null, 1));
  const onCustomPricesSave = () => {
    if (customPricesChanges.length !== 0) {
      try {
        dispatch(setCustomPrices(JSON.parse(customPricesChanges)));
      }
      catch (e) {
        alert(e);
      }
    } else {
      dispatch(setCustomPrices({}));
    }
  }

  const [customRailsChanges, setCustomRailsChanges] = useState(JSON.stringify(customRails, null, 1))
  const onCustomRailsChange = event => setCustomRailsChanges(event.target.value);
  const onCustomRailsReset = () => setCustomRailsChanges(JSON.stringify(customRails, null, 1));
  const onCustomRailsSave = () => {
    if (customRailsChanges.length !== 0) {
      try {
        dispatch(setCustomRails(JSON.parse(customRailsChanges)));
      }
      catch (e) {
        alert(e);
      }
    } else {
      dispatch(setCustomRails([]));
    }
  }

  const pricingList = [
    'All',
    'ERLW (5E) - per mile',
    'WGtE (5E) - per day',
    'ECG (4E) - per mile',
    'Custom',
  ];
  const distancesList = [
    '4E',
    '3E',
    'Only custom',
  ];


  return ( 
    <div className='settings'>
        <SettingsSelect list={pricingList} label={'Pricing method:'} onFunc={onCostModeChange} defValue={costMode}/>

        <SettingsSelect list={distancesList} label={'Distances source:'} onFunc={onDistanceSourceChange} defValue={distanceSource}/>

        <SettingsNumInput label={'Speed (mph):'} onFunc={onSpeedChange} defValue={speed}/>

        <SettingsNumInput label={'Layover (hours):'} onFunc={onLayoverChange} defValue={layover}/>

        <SettingsCheckbox label={'Color prices:'} onFunc={onColorPricesChange} defValue={colorPrices}/>

        <SettingsTextArea label={'Custom prices:'} onChangeFunc={onCustomPricesChange} saveFunc={onCustomPricesSave}
        resetFunc={onCustomPricesReset} defValue={customPricesChanges}/>

        <SettingsTextArea label={'Custom distances:'} onChangeFunc={onCustomRailsChange} saveFunc={onCustomRailsSave}
        resetFunc={onCustomRailsReset} defValue={customRailsChanges}/>
    </div>
  );
}

export default Settings;