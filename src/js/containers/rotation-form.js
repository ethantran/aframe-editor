import React from 'react';
import {reduxForm} from 'redux-form'

class RotationForm extends React.Component {
  render() {
    return (
      <div>
        <div style={{width:'100%'}}>
          <label>x</label>
          <input type="text" {...this.props.fields.x}/>
        </div>
        <div style={{width:'100%'}}>
          <label>y</label>
          <input type="text" {...this.props.fields.y}/>
        </div>
        <div style={{width:'100%'}}>
          <label>z</label>
          <input type="text" {...this.props.fields.z}/>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'rotation',
  fields: ['x', 'y', 'z']
},
(state)=>{
  return {
    initialValues: {
      x: state.selectedEntity.props.rotation[0],
      y: state.selectedEntity.props.rotation[1],
      z: state.selectedEntity.props.rotation[2],
    }
  }
})(RotationForm)
