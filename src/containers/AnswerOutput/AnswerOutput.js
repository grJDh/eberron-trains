import React from 'react';
import { useSelector } from 'react-redux';

import './AnswerOutput.scss';

import { mainSelector } from '../../slices/main';
import { settingsSelector } from '../../slices/settings';

const AnswerOutput = props => {

  const { miles, path, basePrices } = useSelector(mainSelector);
  const { costMode, speed, layover, customPrices, colorPrices } = useSelector(settingsSelector);

  const time = (miles / speed) + ((path.length - 2) * layover);
  const days = Math.trunc(time / 24);
  const hours = Math.trunc(time) - (days * 24);
  const minutes = Math.ceil((time - Math.trunc(time)) * 60);

  const combinedPrices = {...basePrices, ...customPrices}
  const methods = Object.keys(combinedPrices);

  const coloredPricesStyle = p => {

    if (colorPrices) {
      switch (p) {
        case 'gold':
          return {color: 'gold', textShadow: 'black 0px 0px 5px'}
        case 'silver':
          return {color: 'silver', textShadow: 'black 0px 0px 5px'}
        case 'copper':
          return {color: '#da8932', textShadow: 'black 0px 0px 5px'}
        default:
          return {color: 'black'}
      }
    }

    return {color: 'black'}
  }
  
  const returnSeparatedCost = cost => {
    return [
      Math.trunc(cost),
      Math.trunc(cost % 1 * 10),
      Math.trunc(cost % 1 * 10 % 1 * 10)
    ]
  }
  const returnBasePrice = style => {
    if (style.pricingMethod === 'per mile') return miles * style.price / style.mod;

    return miles / speed / style.mod * style.price;
  }

  const renderCost = method => {
    if (costMode === 'All' || method === costMode ) {
      return (
        <li>{method}:
          <ul>
            {combinedPrices[method].map(style => {
              const baseCost = returnBasePrice(style);
              const separatedCost = returnSeparatedCost(baseCost);
              return (
                <li>
                  <span className='answer-category-italic'>{style.tier + ': '}</span>
                  <span className='answer-cost-bold' style={coloredPricesStyle('gold')}>{separatedCost[0] ? separatedCost[0] + 'gp ' : ''}</span>
                  <span className='answer-cost-bold' style={coloredPricesStyle('silver')}>{separatedCost[1] ? separatedCost[1] + 'sp ' : ''}</span>
                  <span className='answer-cost-bold' style={coloredPricesStyle('copper')}>{separatedCost[2] ? separatedCost[2] + 'cp ' : ''}</span>
                </li>
              )})}
          </ul>
        </li>
      )
   }
  }
  
  return (
    <div className='answer'>
      <div className='answer-block answer-distance'>Distance: <span className='answer-cost-bold '>{miles} miles</span></div>
      <div className='answer-block answer-time'>Travel time: <span className='answer-cost-bold '>
      {days ? days + ':' : ''}
      {(hours / 10 < 1 && days) ? '0' + hours : hours}:
      {minutes / 10 < 1 ? '0' + minutes : minutes} </span>
      {layover ? '(with ' + layover + ' hour(s) layover at each station)' : ''}
      </div>

      <div className='answer-block answer-cost'>Cost: 
        <ul>
          {methods.map(method => renderCost(method))}
        </ul>
      </div>

      <div className='answer-block answer-path'>Stations: 
        <ul>
          {path.map(item => <li key={item}>{item[0]}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default AnswerOutput;