import React from 'react';
import {reduxForm} from 'redux-form'

class MaterialForm extends React.Component {
  render() {
    return (
      <div>
        <div style={{width:'100%'}}>
          <label>color</label>
          <input type="text" {...this.props.fields.color}/>
        </div>
        <div style={{width:'100%'}}>
          <label>metalness</label>
          <input type="number" {...this.props.fields.metalness}/>
        </div>
        <div style={{width:'100%'}}>
          <label>opacity</label>
          <input type="number" {...this.props.fields.opacity}/>
        </div>
        <div style={{width:'100%'}}>
          <label>roughness</label>
          <input type="number" {...this.props.fields.roughness}/>
        </div>
        <div style={{width:'100%'}}>
          <label>shader</label>
          <input type="text" {...this.props.fields.shader}/>
        </div>
        <div style={{width:'100%'}}>
          <label>src</label>
          <input type="text" {...this.props.fields.src}/>
        </div>
        <div style={{width:'100%'}}>
          <label>transparent</label>
          <input type="checkbox" {...this.props.fields.transparent}/>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'material',
  fields: ['color', 'metalness', 'opacity', 'roughness', 'shader', 'src', 'transparent']
},
(state)=>{
  return {
    initialValues: {
      ...state.selectedEntity.props.material
    }
  }
})(MaterialForm)
