import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

const types = ['ambient', 'directional', 'hemisphere', 'point', 'spot']

class LightForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>angle</label>
          <input type="number" {...this.props.fields.light.angle}/>
        </div>
        <div style={{width:'100%'}}>
          <label>color</label>
          <input type="string" {...this.props.fields.light.color}/>
        </div>
        <div style={{width:'100%'}}>
          <label>decay</label>
          <input type="number" {...this.props.fields.light.decay}/>
        </div>
        <div style={{width:'100%'}}>
          <label>distance</label>
          <input type="number" {...this.props.fields.light.distance}/>
        </div>
        <div style={{width:'100%'}}>
          <label>exponent</label>
          <input type="number" {...this.props.fields.light.exponent}/>
        </div>
        <div style={{width:'100%'}}>
          <label>groundColor</label>
          <input type="string" {...this.props.fields.light.groundColor}/>
        </div>
        <div style={{width:'100%'}}>
          <label>intensity</label>
          <input type="number" {...this.props.fields.light.intensity}/>
        </div>
        <div style={{width:'100%'}}>
          <label>type</label>
          <select {...this.props.fields.light.type}>
            {types.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'LightForm',
  fields: [
    'key',
    'light.angle',
    'light.color',
    'light.decay',
    'light.distance',
    'light.exponent',
    'light.groundColor',
    'light.intensity',
    'light.type',
  ],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, light:values.light})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      light: selectedEntity.props.light,
    }
  }
})(LightForm)
