import React from 'react';
import { useSelector } from 'react-redux';

import './AnswerOutput.scss';

import { mainSelector } from '../../slices/main';

const AnswerOutput = props => {

  const { miles, path } = useSelector(mainSelector);

  const speed = 30;

  const time = (miles / speed) + path.length - 2;
  const days = Math.trunc(time / 24);
  const hours = Math.trunc(time) - (days * 24);
  const minutes = Math.ceil((time - Math.trunc(time)) * 60);

  const costERLW = miles * 0.5;

  const costWGtE = miles / speed / 24;
  const costWGtEFlat = [
    Math.trunc(costWGtE),
    Math.trunc(costWGtE % 1 * 10),
    Math.trunc(costWGtE % 1 * 10 % 1 * 10)
  ]
  const costWGtELuxury = [
    Math.trunc(costWGtE*4),
    Math.trunc(costWGtE*4 % 1 * 10),
    Math.trunc(costWGtE*4 % 1 * 10 % 1 * 10)
  ]

  const costERLWSteerage = [
    Math.trunc(costERLW*0.06),
    Math.trunc(costERLW*0.06 % 1 * 10),
    Math.trunc(costERLW*0.06 % 1 * 10 % 1 * 10)
  ]
  const costERLWStandard = [
    Math.trunc(costERLW*0.4),
    Math.trunc(costERLW*0.4 % 1 * 10),
    Math.trunc(costERLW*0.4 % 1 * 10 % 1 * 10)
  ]
  const costERLWFirstClass = [
    Math.trunc(costERLW),
    Math.trunc(costERLW % 1 * 10),
    Math.trunc(costERLW % 1 * 10 % 1 * 10)
  ]
  
  return (
    <div className='answer'>
      <div className='answer-block'>Distance: <span className='answer-cost'>{miles} miles</span></div>
      <div className='answer-block'>Travel time: <span className='answer-cost'>{days ? days : ''}:{hours}:{minutes}</span> (with 1 hour lay over at each station)</div>

      <div className='answer-block'>Cost: 
      <ul>
        <li>
          ERLW(5E) - per mile: <span className='answer-cost'>{Math.trunc(costERLW) + 'gp '}
          {((costERLW % 1).toFixed(1) !== "0.0") ? (costERLW % 1).toFixed(1) * 10 + 'sp' : ''}</span>
        </li>
        <li>WGtE(5E) - per day:
          <ul>
            <li>
            <span className='answer-category'>Flat: </span><span className='answer-cost'>{costWGtEFlat[0] ? costWGtEFlat[0] + 'gp ' : ''} {costWGtEFlat[1] ? costWGtEFlat[1] + 'sp ' : ''}
              {costWGtEFlat[2] ? costWGtEFlat[2] + 'cp ' : ''}</span>
            </li>
            <li>
            <span className='answer-category'>Luxury: </span><span className='answer-cost'>{costWGtELuxury[0] ? costWGtELuxury[0] + 'gp ' : ''} {costWGtELuxury[1] ? costWGtELuxury[1] + 'sp ' : ''}
              {costWGtELuxury[2] ? costWGtELuxury[2] + 'cp ' : ''}</span>
            </li>
          </ul>
        </li>
        <li>ECG(4E) - per mile:
          <ul>
            <li>
              <span className='answer-category'>First Class: </span><span className='answer-cost'>{costERLWFirstClass[0] ? costERLWFirstClass[0] + 'gp ' : ''} {costERLWFirstClass[1] ? costERLWFirstClass[1] + 'sp ' : ''}
              {costERLWFirstClass[2] ? costERLWFirstClass[2] + 'cp ' : ''}</span>
            </li>
            <li>
              <span className='answer-category'>Standard: </span><span className='answer-cost'>{costERLWStandard[0] ? costERLWStandard[0] + 'gp ' : ''} {costERLWStandard[1] ? costERLWStandard[1] + 'sp ' : ''}
              {costERLWStandard[2] ? costERLWStandard[2] + 'cp ' : ''}</span>
            </li>
            <li>
              <span className='answer-category'>Steerage: </span><span className='answer-cost'>{costERLWSteerage[0] ? costERLWSteerage[0] + 'gp ' : ''} {costERLWSteerage[1] ? costERLWSteerage[1] + 'sp ' : ''}
              {costERLWSteerage[2] ? costERLWSteerage[2] + 'cp ' : ''}</span>
            </li>
          </ul>
        </li>
      </ul>
      </div>

      <div className='answer-block'>Stations: 
      <ul>
        {path.map(item => <li>{item}</li>)}
      </ul>
      </div>
    </div>
  );
}

export default AnswerOutput;