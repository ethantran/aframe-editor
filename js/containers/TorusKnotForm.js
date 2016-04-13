import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class TorusKnotForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>p</label>
          <input type="number" {...this.props.fields.geometry.p}/>
        </div>
        <div style={{width:'100%'}}>
          <label>q</label>
          <input type="number" {...this.props.fields.geometry.q}/>
        </div>
        <div style={{width:'100%'}}>
          <label>radius</label>
          <input type="number" {...this.props.fields.geometry.radius}/>
        </div>
        <div style={{width:'100%'}}>
          <label>radiusTubular</label>
          <input type="number" {...this.props.fields.geometry.radiusTubular}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsRadial</label>
          <input type="number" {...this.props.fields.geometry.segmentsRadial}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsTubular</label>
          <input type="number" {...this.props.fields.geometry.segmentsTubular}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'TorusKnotForm',
  fields: [
    'key',
    'geometry.p',
    'geometry.q',
    'geometry.radius',
    'geometry.radiusTubular',
    'geometry.segmentsRadial',
    'geometry.segmentsTubular'
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
})(TorusKnotForm)
