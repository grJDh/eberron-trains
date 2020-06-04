import React from 'react';

import './StationInput.scss';

const StationInput = props => {

  return (
    <div className='station-block'>
       <input onChange={props.onChangeFunc} className='station-input' type="text" list="cities" placeholder={props.placeholder} />

        <datalist id="cities">
          {props.stations.sort().map((item, key) =>
            <option key={key} value={item} />
          )}
        </datalist>
    </div>
  );
}

export default StationInput;

//  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist