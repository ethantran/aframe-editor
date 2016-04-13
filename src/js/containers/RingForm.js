import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class RingForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>radiusInner</label>
          <input type="number" {...this.props.fields.geometry.radiusInner}/>
        </div>
        <div style={{width:'100%'}}>
          <label>radiusOuter</label>
          <input type="number" {...this.props.fields.geometry.radiusOuter}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsPhi</label>
          <input type="number" {...this.props.fields.geometry.segmentsPhi}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segmentsTheta</label>
          <input type="number" {...this.props.fields.geometry.segmentsTheta}/>
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
  form: 'RingForm',
  fields: [
    'key',
    'geometry.radiusInner',
    'geometry.radiusOuter',
    'geometry.segmentsPhi',
    'geometry.segmentsTheta',
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
})(RingForm)
