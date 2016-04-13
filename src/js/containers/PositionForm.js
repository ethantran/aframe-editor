import React from 'react';
import {reduxForm} from 'redux-form'
import {getSelectedEntityKey, getSelectedEntity} from '../utils/entities'

class PositionForm extends React.Component {
  render() {
    return (
      <form onChange={()=>setTimeout(() => this.props.handleSubmit())}>
        <div style={{width:'100%'}}>
          <label>x</label>
          <input type="number" {...this.props.fields.position[0]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>y</label>
          <input type="number" {...this.props.fields.position[1]}/>
        </div>
        <div style={{width:'100%'}}>
          <label>z</label>
          <input type="number" {...this.props.fields.position[2]}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'position',
  fields: ['key', 'position[]'],
  onSubmit(values, dispatch) {
    dispatch({type:'entity/update', key:values.key, position:values.position})
  }
},
(state)=>{
  const selectedEntity = getSelectedEntity(state)
  return {
    initialValues: {
      key: getSelectedEntityKey(state),
      position: selectedEntity.props.position
    }
  }
})(PositionForm)
