import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class RotationForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>x</label>
          <input type="number" {...this.props.fields.rotation[0]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>y</label>
          <input type="number" {...this.props.fields.rotation[1]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>z</label>
          <input type="number" {...this.props.fields.rotation[2]}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'rotation',
  fields: ['key', 'rotation[]'],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, rotation:values.rotation})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      rotation: selectedEntity.props.rotation
    }
  }
})(RotationForm)
