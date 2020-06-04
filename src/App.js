import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchForm from './containers/SearchForm/SearchForm';
import AnswerOutput from './components/AnswerOutput/AnswerOutput';
import Settings from './components/Settings/Settings';

import './App.scss';

import { mainSelector, setMiles, setPath } from './slices/main';
import { settingsSelector} from './slices/settings';

const App = () => {

  const { distanceSource } = useSelector(settingsSelector);

  const dispatch = useDispatch();
  const { startStation, finishStation, miles, rails4E, rails3E } = useSelector(mainSelector);

  const rails = () => {
    switch (distanceSource) {
      case '3E':
        console.log(123)
        return rails3E;
      default:
        return rails4E;
    }
  }

  const stations = Object.keys(rails4E);

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
    let weights = {...rails()[start], [start]: 0};
    let visited = [];

    for (let i = 0; i < stations.length; i++) {
      if (!Object.keys(weights).includes(stations[i])) {
        weights = {...weights, [stations[i]]: Infinity};
      }
    }

    let path = {};
    for (let child in rails()[start]) {
      path[child] = start;
    }

    let node = findLowestCostNode(weights, visited);

    while (node) {
      let costToReachNode = weights[node];
      let childrenOfNode = rails()[node];
    
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
    if (startStation === finishStation) {
      dispatch(setMiles(0));
      dispatch(setPath([]));
    } else {
      const answer = findingPath(startStation, finishStation);
      dispatch(setMiles(answer[0]));
      dispatch(setPath(answer[1]));
    }
  }

  useEffect(() => {
    if (stations.includes(startStation) && stations.includes(finishStation)) letsTravel();
  }, [startStation, finishStation, distanceSource]);

  // const addStation = (first, second, dist) => {
  //   if (!rails2[first]) {
  //     rails2 = {...rails2, [first]: {[second]: dist}}
  //   } else {
  //     rails2 = {...rails2, [first]: {...rails2[first], [second]: dist}}
  //   }

  //   if (!rails2[second]) {
  //     rails2 = {...rails2, [second]: {[first]: dist}}
  //   } else {
  //     rails2 = {...rails2, [second]: {...rails2[second], [first]: dist}}
  //   }
  //   console.log(rails2);
  // }

  return (
    <main>
      <SearchForm stations={stations}/>
      {miles ? <AnswerOutput /> : ''}
      <Settings />
    </main>
  );
}

export default App;
