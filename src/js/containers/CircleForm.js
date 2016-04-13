import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class CircleForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>radius</label>
          <input type="number" {...this.props.fields.geometry.radius}/>
        </div>
        <div style={{width:'100%'}}>
          <label>segments</label>
          <input type="number" {...this.props.fields.geometry.segments}/>
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
  form: 'CircleForm',
  fields: [
    'key',
    'geometry.radius',
    'geometry.segments',
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
})(CircleForm)
