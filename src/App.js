import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchForm from './containers/SearchForm/SearchForm';
import AnswerOutput from './components/AnswerOutput/AnswerOutput';
import Settings from './components/Settings/Settings';

import './App.scss';

import { mainSelector, setMiles, setPath, setCombinedRails } from './slices/main';
import { settingsSelector } from './slices/settings';

const App = () => {

  const { distanceSource, customRails } = useSelector(settingsSelector);

  const dispatch = useDispatch();
  const { startStation, finishStation, miles, rails4E, rails3E, combinedRails } = useSelector(mainSelector);

  const settingsStore = useSelector(settingsSelector)

  const getRails = () => {
    switch (distanceSource) {
      case '3E':
        console.log(123)
        return rails3E;
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

    // console.log(railsCombined)
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
    let optimalPath = [finish];
    let parent = path[finish];
    for (let i in path) {
      if (parent) {
        optimalPath.push(parent);
        parent = path[parent];
      }
    }
    optimalPath.reverse();

    return [weights[finish], optimalPath]
  }

  const letsTravel = () => {
    if (stations.includes(startStation) && stations.includes(finishStation)) {
      const answer = findingPath(startStation, finishStation);
      dispatch(setMiles(answer[0]));
      dispatch(setPath(answer[1]));
    }
  }

  const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

  window.onbeforeunload = () => {
    placeToLocalStorage('settingsStore', settingsStore);
  };

  return (
    <main>
      <SearchForm stations={stations} letsTravel={letsTravel}/>
      {miles ? <AnswerOutput /> : ''}
      <Settings />
    </main>
  );
}

export default App;
