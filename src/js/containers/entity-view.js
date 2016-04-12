import React from 'react';
import {connect} from 'react-redux'
import PositionForm from './position-form'
import RotationForm from './rotation-form'
import ScaleForm from './scale-form'
import MaterialForm from './material-form'
import GeometryForm from './geometry-form'

class EntityView extends React.Component {
  render() {
    return this.props.selectedEntity ? (
      <div style={{
        position: 'absolute',
        top: '50vh',
        right: 0,
        width: '30%',
        height: '40vh',
        backgroundColor: 'white',
        border: '1px solid black',
        overflowY: 'scroll',
      }}>
        <p>{this.props.selectedEntity.name}</p>
        <p>position</p>
        <PositionForm/>
        <p>rotation</p>
        <RotationForm/>
        <p>scale</p>
        <ScaleForm/>
        <p>material</p>
        <MaterialForm/>
        <p>geometry</p>
        <GeometryForm/>
      </div>
    ) : <div/>
  }
}

export default connect(
(state)=>{
  return {
    selectedEntity: state.selectedEntity
  }
})(EntityView)