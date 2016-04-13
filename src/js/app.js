import 'aframe';
import 'babel-polyfill';
import {Animation, Entity} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'
import reducer from './reducer'
import SceneView from './containers/SceneView'
import PrimitivesView from './containers/PrimitivesView'
import EntitiesView from './containers/EntitiesView'
import EntityView from './containers/EntityView'
const initialState = {}
let middleware = [
  // thunkMiddleware,
  // promiseMiddleware(),
  createSagaMiddleware(saga),
  createLogger({collapsed: true})
]
const store = createStore(reducer, applyMiddleware(...middleware))

class BoilerplateScene extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <SceneView/>
          <PrimitivesView/>
          <EntitiesView/>
          <EntityView/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
