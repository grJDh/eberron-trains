import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchForm from './containers/SearchForm/SearchForm';
import AnswerOutput from './containers/AnswerOutput/AnswerOutput';
import Settings from './containers/Settings/Settings';

import './App.scss';

import { mainSelector, setMiles, setPath } from './slices/main';
import { settingsSelector } from './slices/settings';

const App = () => {

  const [error, setError] = useState(false);

  const { distanceSource, customRails, customPrices } = useSelector(settingsSelector);

  const dispatch = useDispatch();
  const { startStation, finishStation, miles, rails4E, rails3E } = useSelector(mainSelector);

  const settingsStore = useSelector(settingsSelector)

  const getRails = () => {
    switch (distanceSource) {
      case '3E':
        return rails3E;
      case 'Only custom':
        return [];
      default:
        return rails4E;
    }
  }

  const addStations = () => {
    let baseRails = getRails();
    let railsCombined = {};

    baseRails = baseRails.concat(customRails);

    baseRails.forEach(element => {
      railsCombined = {...railsCombined, [element[0]]:{...railsCombined[element[0]], [element[1]]: element[2]}}
      railsCombined = {...railsCombined, [element[1]]:{...railsCombined[element[1]], [element[0]]: element[2]}}
    });

    return railsCombined;
  }

  const rails = addStations();
  const stations = Object.keys(rails);

  const findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs)
    
    const lowestCostNode = knownNodes.reduce((lowest, node) => {
        if (lowest === null && !processed.includes(node)) {
          lowest = node;
        }
        if (costs[node] < costs[lowest] && !processed.includes(node)) {
          lowest = node;
        }
        return lowest;
    }, null);
  
    return lowestCostNode
  };

  const findingPath = (start, finish) => {
    let weights = {...rails[start], [start]: 0};
    let visited = [];

    for (let i = 0; i < stations.length; i++) {
      if (!Object.keys(weights).includes(stations[i])) {
        weights = {...weights, [stations[i]]: Infinity};
      }
    }

    let path = {};
    for (let child in rails[start]) {
      path[child] = start;
    }

    let node = findLowestCostNode(weights, visited);

    while (node) {
      let costToReachNode = weights[node];
      let childrenOfNode = rails[node];
    
      for (let child in childrenOfNode) {
        let costFromNodetoChild = childrenOfNode[child]
        let costToChild = costToReachNode + costFromNodetoChild;
    
        if (!weights[child] || weights[child] > costToChild) {
          weights[child] = costToChild;
          path[child] = node;
        }
      }
    
      visited.push(node);
  
      node = findLowestCostNode(weights, visited);
    }

    delete path[start];
    let optimalPath = [[finish]];
    let parent = path[finish];

    // eslint-disable-next-line
    for (let i in path) {
      if (parent) {
        optimalPath.push([parent]);
        parent = path[parent];
      }
    }
    optimalPath.reverse();
    
    // console.log(optimalPath);
    // optimalPath[0][0] = '0:00'

    // for (let i = 1; i < optimalPath; i++) {
    //   const element = array[index];
      
    // }

    return [weights[finish], optimalPath]
  }

  const letsTravel = () => {
    if (stations.includes(startStation) && stations.includes(finishStation)) {
      setError(false);
      if (startStation !== finishStation) {
        const answer = findingPath(startStation, finishStation);
        dispatch(setMiles(answer[0]));
        dispatch(setPath(answer[1]));
      }
    } else {
      setError(true);
    }
  }

  const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

  useEffect(() => {
    placeToLocalStorage('settingsStore', settingsStore);
  }, [settingsStore]);

  useEffect(() => {
    if (startStation !== '' && finishStation !== '') letsTravel();
    // eslint-disable-next-line
  }, [customPrices, customRails, finishStation, startStation]);

  return (
    <main>
      <SearchForm stations={stations} />
      {error ? <span className='error-message'>One or both stations doesn't exist</span> : ''}
      {miles && !error ? <AnswerOutput /> : ''}
      <Settings />
    </main>
  );
}

export default App;
