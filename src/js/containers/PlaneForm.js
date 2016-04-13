import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class PlaneForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>height</label>
          <input type="number" {...this.props.fields.geometry.height}/>
        </div>
        <div style={{width:'100%'}}>
          <label>width</label>
          <input type="number" {...this.props.fields.geometry.width}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PlaneForm',
  fields: [
    'key',
    'geometry.height',
    'geometry.width',
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
})(PlaneForm)
