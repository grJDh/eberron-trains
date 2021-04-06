import React from 'react';
import { useDispatch } from 'react-redux';

import StationInput from '../../components/StationInput/StationInput';

import './SearchForm.scss';

import { startStationChange, finishStationChange } from '../../slices/main';

const SearchForm = ({ stations }) => {

  const dispatch = useDispatch();

  const onStartStationChange = event => dispatch(startStationChange(event.target.value));
  const onFinishStationChange = event => dispatch(finishStationChange(event.target.value));

  return (
    <div className='form'>
      <div>
        <StationInput placeholder="From..." onChangeFunc={onStartStationChange} stations={stations} />
        {/* <span>🠒</span> */}
        <StationInput placeholder="To..." onChangeFunc={onFinishStationChange} stations={stations} />
      </div>
      {/* <button onClick={letsTravel}>Calculate</button> */}
    </div>
  );
}

export default SearchForm;
