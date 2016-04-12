import React from 'react';
import {connect} from 'react-redux'
import {Animation, Entity, Scene} from 'aframe-react';

import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';

class RootScene extends React.Component {
  render() {
    return (
      <Scene>
        <Camera position={[0, 0, 5]}><Cursor/></Camera>
        <Sky/>
        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>
        <Entity position={[0, 0, 0]}>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0, 0, 0]} material={{color:'red'}}/>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0, 0.5, 0.5]} rotation={[90, 0, 0]} material={{color:'green'}}/>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0.5, 0.5, 0]} rotation={[0, 0, 90]} material={{color:'blue'}}/>
        </Entity>
        {this.props.entities.map((e)=><Entity key={e.key} {...e.props}/>)}
      </Scene>
    )
  }
}

export default connect(
(state)=>{
  return {
    entities: state.entities
  }
})(RootScene)
