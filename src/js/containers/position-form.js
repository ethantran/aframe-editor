import React from 'react';
import {reduxForm} from 'redux-form'

class PositionForm extends React.Component {
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
  form: 'position',
  fields: ['x', 'y', 'z']
},
(state)=>{
  return {
    initialValues: {
      x: state.selectedEntity.props.position[0],
      y: state.selectedEntity.props.position[1],
      z: state.selectedEntity.props.position[2],
    }
  }
})(PositionForm)
