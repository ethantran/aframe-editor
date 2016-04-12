import React from 'react';
import {reduxForm} from 'redux-form'

class ScaleForm extends React.Component {
  render() {
    return (
      <form onChange={setTimeout(() => this.props.handleSubmit())}>
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
      </form>
    )
  }
}

export default reduxForm({
  form: 'scale',
  fields: ['x', 'y', 'z'],
  onSubmit(values) {
    this.props.dispatch({type:'entity/scale/update', payload:values})
  }
},
(state)=>{
  return {
    initialValues: {
      x: state.selectedEntity.props.scale[0],
      y: state.selectedEntity.props.scale[1],
      z: state.selectedEntity.props.scale[2],
    }
  }
})(ScaleForm)
