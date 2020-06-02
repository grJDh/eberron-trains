import React from 'react';
import { useSelector } from 'react-redux';

import './Settings.scss';

import { mainSelector } from '../../slices/settings';

const Settings = props => {

  return (
    <div className='settings'>
        <input type="radio" name="ERLW - per mile" value="ERLW - per mile" />
        <label for="ERLW - per mile">ERLW(5E) - per mile</label>

        <input type="radio" name="ERLW - per day" value="ERLW - per day" />
        <label for="ERLW - per day">ERLW(5E) - per day</label>

        <input type="radio" name="ERLW" value="ERLW" />
        <label for="ERLW">ERLW</label>
    </div>
  );
}

export default Settings;