import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StationInput from '../../components/StationInput/StationInput';

import './SearchForm.scss';

import { mainSelector, startStationChange, finishStationChange } from '../../slices/main';

const SearchForm = () => {

  const dispatch = useDispatch();
  const { rails } = useSelector(mainSelector);

  const onStartStationChange = event => dispatch(startStationChange(event.target.value));
  const onFinishStationChange = event => dispatch(finishStationChange(event.target.value));

  return (
    <div className='form'>
      <StationInput placeholder="From..." onChangeFunc={onStartStationChange} rails={rails} />
      {/* <span>🠒</span> */}
      <StationInput placeholder="To..." onChangeFunc={onFinishStationChange} rails={rails} />
    </div>
  );
}

export default SearchForm;
