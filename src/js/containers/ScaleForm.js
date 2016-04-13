import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class ScaleForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>x</label>
          <input type="number" {...this.props.fields.scale[0]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>y</label>
          <input type="number" {...this.props.fields.scale[1]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>z</label>
          <input type="number" {...this.props.fields.scale[2]}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'scale',
  fields: ['key', 'scale[]'],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, scale:values.scale})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      scale: selectedEntity.props.scale
    }
  }
})(ScaleForm)
