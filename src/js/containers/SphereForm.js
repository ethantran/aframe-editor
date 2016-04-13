import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class SphereForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>radius</label>
          <input type="number" {...this.props.fields.geometry.radius}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsHeight</label>
          <input type="number" {...this.props.fields.geometry.segmentsHeight}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsWidth</label>
          <input type="number" {...this.props.fields.geometry.segmentsWidth}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'SphereForm',
  fields: [
    'key',
    'geometry.radius',
    'geometry.segmentsHeight',
    'geometry.segmentsWidth'
  ],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, geometry:values.geometry})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      geometry: selectedEntity.props.geometry,
    }
  }
})(SphereForm)
