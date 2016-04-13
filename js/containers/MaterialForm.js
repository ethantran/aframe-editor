import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

const sides = ['front', 'back', 'double']
const shaders = ['standard', 'flat']

class MaterialForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>color</label>
          <input type="text" {...this.props.fields.material.color}/>
        </div>
        <div style={{width:'100%'}}>
          <label>metalness</label>
          <input type="number" {...this.props.fields.material.metalness}/>
        </div>
        <div style={{width:'100%'}}>
          <label>opacity</label>
          <input type="number" {...this.props.fields.material.opacity}/>
        </div>
        <div style={{width:'100%'}}>
          <label>roughness</label>
          <input type="number" {...this.props.fields.material.roughness}/>
        </div>
        <div style={{width:'100%'}}>
          <label>shader</label>
          <select {...this.props.fields.material.shader}>
            {shaders.map(shader => <option key={shader} value={shader}>{shader}</option>)}
          </select>
        </div>
        <div style={{width:'100%'}}>
          <label>src</label>
          <input type="text" {...this.props.fields.material.src}/>
        </div>
        <div style={{width:'100%'}}>
          <label>transparent</label>
          <input type="checkbox" {...this.props.fields.material.transparent}/>
        </div>
        <div style={{width:'100%'}}>
          <label>depthTest</label>
          <input type="checkbox" {...this.props.fields.material.depthTest}/>
        </div>
        <div style={{width:'100%'}}>
          <label>side</label>
          <select {...this.props.fields.material.side}>
            {sides.map(side => <option key={side} value={side}>{side}</option>)}
          </select>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'material',
  fields: [
    'key',
    'material.color',
    'material.metalness',
    'material.opacity',
    'material.roughness',
    'material.shader',
    'material.src',
    'material.transparent',
    'material.depthTest',
    'material.side'
  ],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, material:values.material})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      material: selectedEntity.props.material
    }
  }
})(MaterialForm)
