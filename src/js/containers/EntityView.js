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

const renderComponentForm = {
  material: () => <MaterialForm/>,
  geometry: () => <GeometryForm/>,
  light: () => <LightForm/>
}

const components = ['material', 'geometry', 'light']

class EntityView extends React.Component {
  renderComponentSection(component) {
    return (
      <div key={component} style={{marginBottom: 10}}>
        <span style={{fontWeight:'bold'}}>{component}</span>
        <button onClick={()=>this.props.dispatch({
          type:'entity/component/toggle',
          key:this.props.selectedEntity.key,
          component
        })}>
          {this.props.selectedEntity.props[component] ? 'remove' : 'add'}
        </button>
        {this.props.selectedEntity.props[component] ? renderComponentForm[component]() : null}
      </div>
    )
  }
  render() {
    if (!this.props.selectedEntity)
      return null
    let primitiveForm;
    if (this.props.selectedEntity.props.geometry
      && this.props.selectedEntity.props.geometry.primitive
      && renderPrimitiveForm[this.props.selectedEntity.props.geometry.primitive])
      primitiveForm = renderPrimitiveForm[this.props.selectedEntity.props.geometry.primitive]()
    return (
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
        <div style={{marginBottom: 10}}>
          <span style={{fontWeight:'bold'}}>{this.props.selectedEntity.name}</span>
        </div>
        <div style={{marginBottom: 10}}>
          <span style={{fontWeight:'bold'}}>position</span>
          <PositionForm/>
        </div>
        <div style={{marginBottom: 10}}>
          <span style={{fontWeight:'bold'}}>rotation</span>
          <RotationForm/>
        </div>
        <div style={{marginBottom: 10}}>
          <span style={{fontWeight:'bold'}}>scale</span>
          <ScaleForm/>
        </div>
        {components.map(::this.renderComponentSection)}
        {primitiveForm ? (
          <div>
            <span style={{fontWeight:'bold'}}>primitive attributes</span>
            {primitiveForm}
          </div>
        ) : null}
      </div>
    )
  }
}

export default connect(
(state)=>{
  return {
    selectedEntity: state.entities.byKey[state.entities.selected]
  }
})(EntityView)