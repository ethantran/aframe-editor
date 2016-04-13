import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class CylinderForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>height</label>
          <input type="number" {...this.props.fields.geometry.height}/>
        </div>
        <div style={{width:'100%'}}>
          <label>openEnded</label>
          <input type="checkbox" {...this.props.fields.geometry.openEnded}/>
        </div>
        <div style={{width:'100%'}}>
          <label>radius</label>
          <input type="number" {...this.props.fields.geometry.radius}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsHeight</label>
          <input type="number" {...this.props.fields.geometry.segmentsHeight}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsRadial</label>
          <input type="number" {...this.props.fields.geometry.segmentsRadial}/>
        </div>
        <div style={{width:'100%'}}>
          <label>thetaLength</label>
          <input type="number" {...this.props.fields.geometry.thetaLength}/>
        </div>
        <div style={{width:'100%'}}>
          <label>thetaStart</label>
          <input type="number" {...this.props.fields.geometry.thetaStart}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'CylinderForm',
  fields: [
    'key',
    'geometry.height',
    'geometry.openEnded',
    'geometry.radius',
    'geometry.segmentsHeight',
    'geometry.segmentsRadial',
    'geometry.thetaLength',
    'geometry.thetaStart'
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
})(CylinderForm)
