import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class BoxForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>depth</label>
          <input type="number" {...this.props.fields.geometry.depth}/>
        </div>
        <div style={{width:'100%'}}>
          <label>width</label>
          <input type="number" {...this.props.fields.geometry.width}/>
        </div>
        <div style={{width:'100%'}}>
          <label>height</label>
          <input type="number" {...this.props.fields.geometry.height}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'BoxForm',
  fields: [
    'key',
    'geometry.depth',
    'geometry.width',
    'geometry.height'
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
})(BoxForm)
