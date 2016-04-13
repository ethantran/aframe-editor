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
        <Entity position={[0, 0, 0]}>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0, 0.5, 0]} material={{color:'green'}}/>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0, 0, 0.5]} rotation={[90, 0, 0]} material={{color:'blue'}}/>
          <Entity geometry={{primitive: 'cylinder', radius: 0.01}} position={[0.5, 0, 0]} rotation={[0, 0, 90]} material={{color:'red'}}/>
        </Entity>
        {this.props.entities.map((e)=><Entity key={e.key} {...e.props}/>)}
      </Scene>
    )
  }
}

export default connect(
(state)=>{
  return {
    entities: state.entities.list
  }
})(RootScene)
