import React from 'react';
import {connect} from 'react-redux'
import PositionForm from './PositionForm'
import RotationForm from './RotationForm'
import ScaleForm from './ScaleForm'
import MaterialForm from './MaterialForm'
import GeometryForm from './GeometryForm'
import BoxForm from './BoxForm'
import CircleForm from './CircleForm'
import ConeForm from './ConeForm'
import CylinderForm from './CylinderForm'
import PlaneForm from './PlaneForm'
import RingForm from './RingForm'
import SphereForm from './SphereForm'
import TorusForm from './TorusForm'
import TorusKnotForm from './TorusKnotForm'
import LightForm from './LightForm'

const renderPrimitiveForm = {
  box: () => <BoxForm/>,
  circle: () => <CircleForm/>,
  cone: () => <ConeForm/>,
  cylinder: () => <CylinderForm/>,
  plane: () => <PlaneForm/>,
  ring: () => <RingForm/>,
  sphere: () => <SphereForm/>,
  torus: () => <TorusForm/>,
  torusKnot: () => <TorusKnotForm/>
}

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
        <p style={{fontWeight:'bold'}}>{this.props.selectedEntity.name}</p>
        <p style={{fontWeight:'bold'}}>position</p>
        <PositionForm/>
        <p style={{fontWeight:'bold'}}>rotation</p>
        <RotationForm/>
        <p style={{fontWeight:'bold'}}>scale</p>
        <ScaleForm/>
        <p style={{fontWeight:'bold'}}>material</p>
        <MaterialForm/>
        <p style={{fontWeight:'bold'}}>geometry</p>
        <GeometryForm/>
        {renderPrimitiveForm[this.props.selectedEntity.props.geometry.primitive] ? (
          <div>
            <p style={{fontWeight:'bold'}}>primitive attributes</p>
            {renderPrimitiveForm[this.props.selectedEntity.props.geometry.primitive]()}
          </div>
        ) : null}
        {this.props.selectedEntity.props.light ? (
          <div>
            <p style={{fontWeight:'bold'}}>light attributes</p>
            <LightForm/>
          </div>
        ) : null}
      </div>
    ) : <div/>
  }
}

export default connect(
(state)=>{
  return {
    selectedEntity: state.entities.byKey[state.entities.selected]
  }
})(EntityView)