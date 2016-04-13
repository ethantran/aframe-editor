import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class GeometryForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>buffer</label>
          <input type="checkbox" {...this.props.fields.geometry.buffer}/>
        </div>
        <div style={{width:'100%'}}>
          <label>primitive</label>
          <input type="text" {...this.props.fields.geometry.primitive}/>
        </div>
        <div style={{width:'100%'}}>
          <label>skipCache</label>
          <input type="checkbox" {...this.props.fields.geometry.skipCache}/>
        </div>
        <label>translate</label>
        <div style={{width:'100%'}}>
          <label>x</label>
          <input type="number" {...this.props.fields.geometry.translate[0]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>y</label>
          <input type="number" {...this.props.fields.geometry.translate[1]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>z</label>
          <input type="number" {...this.props.fields.geometry.translate[2]}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'geometry',
  fields: [
    'key',
    'geometry.translate[]',
    'geometry.buffer',
    'geometry.primitive',
    'geometry.skipCache'
  ],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, geometry:{
      ...values.geometry,
      translate: `${values.geometry.translate[0]} ${values.geometry.translate[1]} ${values.geometry.translate[2]}`
    }})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      geometry: {
        ...selectedEntity.props.geometry,
        translate: (selectedEntity.props.geometry.translate || '0 0 0').match(/[0-9]+/gi),
      }
    }
  }
})(GeometryForm)
