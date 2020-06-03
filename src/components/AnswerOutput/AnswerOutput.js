import React from 'react';
import { useSelector } from 'react-redux';

import './AnswerOutput.scss';

import { mainSelector } from '../../slices/main';
import { settingsSelector } from '../../slices/settings';

const AnswerOutput = props => {

  const { miles, path } = useSelector(mainSelector);
  const { costMode } = useSelector(settingsSelector);

  const speed = 30;

  const time = (miles / speed) + path.length - 2;
  const days = Math.trunc(time / 24);
  const hours = Math.trunc(time) - (days * 24);
  const minutes = Math.ceil((time - Math.trunc(time)) * 60);

  const costERLW = miles * 0.5;

  const renderCostERLW = () => {
    if (costMode === '0' || costMode === '1') return (
      <li>
        ERLW(5E) - per mile: <span className='answer-cost-bold '>{Math.trunc(costERLW) + 'gp '}
        {((costERLW % 1).toFixed(1) !== "0.0") ? (costERLW % 1).toFixed(1) * 10 + 'sp' : ''}</span>
      </li>
    )
  }

  const renderCostWGtE = () => {
    if (costMode === '0' || costMode === '2') {
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
      return (
        <li>WGtE(5E) - per day:
          <ul>
            <li>
            <span className='answer-category-italic'>Flat: </span><span className='answer-cost-bold '>{costWGtEFlat[0] ? costWGtEFlat[0] + 'gp ' : ''} {costWGtEFlat[1] ? costWGtEFlat[1] + 'sp ' : ''}
              {costWGtEFlat[2] ? costWGtEFlat[2] + 'cp ' : ''}</span>
            </li>
            <li>
            <span className='answer-category-italic'>Luxury: </span><span className='answer-cost-bold '>{costWGtELuxury[0] ? costWGtELuxury[0] + 'gp ' : ''} {costWGtELuxury[1] ? costWGtELuxury[1] + 'sp ' : ''}
              {costWGtELuxury[2] ? costWGtELuxury[2] + 'cp ' : ''}</span>
            </li>
          </ul>
        </li>
      )
    }
  }

  const renderCostECG = () => {
    if (costMode === '0' || costMode === '3') {
      const costECGSteerage = [
        Math.trunc(costERLW*0.06),
        Math.trunc(costERLW*0.06 % 1 * 10),
        Math.trunc(costERLW*0.06 % 1 * 10 % 1 * 10)
      ]
      const costECGStandard = [
        Math.trunc(costERLW*0.4),
        Math.trunc(costERLW*0.4 % 1 * 10),
        Math.trunc(costERLW*0.4 % 1 * 10 % 1 * 10)
      ]
      const costECGFirstClass = [
        Math.trunc(costERLW),
        Math.trunc(costERLW % 1 * 10),
        Math.trunc(costERLW % 1 * 10 % 1 * 10)
      ]
      return (
        <li>ECG(4E) - per mile:
          <ul>
            <li>
              <span className='answer-category-italic'>First Class: </span><span className='answer-cost-bold '>{costECGFirstClass[0] ? costECGFirstClass[0] + 'gp ' : ''} {costECGFirstClass[1] ? costECGFirstClass[1] + 'sp ' : ''}
              {costECGFirstClass[2] ? costECGFirstClass[2] + 'cp ' : ''}</span>
            </li>
            <li>
              <span className='answer-category-italic'>Standard: </span><span className='answer-cost-bold '>{costECGStandard[0] ? costECGStandard[0] + 'gp ' : ''} {costECGStandard[1] ? costECGStandard[1] + 'sp ' : ''}
              {costECGStandard[2] ? costECGStandard[2] + 'cp ' : ''}</span>
            </li>
            <li>
              <span className='answer-category-italic'>Steerage: </span><span className='answer-cost-bold '>{costECGSteerage[0] ? costECGSteerage[0] + 'gp ' : ''} {costECGSteerage[1] ? costECGSteerage[1] + 'sp ' : ''}
              {costECGSteerage[2] ? costECGSteerage[2] + 'cp ' : ''}</span>
            </li>
          </ul>
        </li>
      )
    }
  }
  
  return (
    <div className='answer'>
      <div className='answer-block answer-distance'>Distance: <span className='answer-cost-bold '>{miles} miles</span></div>
      <div className='answer-block answer-time'>Travel time: <span className='answer-cost-bold '>
      {days ? days+':' : ''}
      {(hours / 10 < 1 && days) ? '0' + hours : hours}:
      {minutes / 10 < 1 ? '0' + minutes : minutes} </span>
      (with 1 hour layover at each station)
      </div>

      <div className='answer-block answer-cost'>Cost: 
      <ul>
        {renderCostERLW()}
        {renderCostWGtE()}
        {renderCostECG()}
      </ul>
      </div>

      <div className='answer-block answer-path'>Stations: 
      <ul>
        {path.map(item => <li>{item}</li>)}
      </ul>
      </div>
    </div>
  );
}

export default AnswerOutput;