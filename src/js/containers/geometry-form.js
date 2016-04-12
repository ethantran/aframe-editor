import React from 'react';
import {reduxForm} from 'redux-form'

class GeometryForm extends React.Component {
  render() {
    return (
      <div>
        <div style={{width:'100%'}}>
          <label>translate</label>
          <input type="text" {...this.props.fields.translate}/>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'geometry',
  fields: ['translate']
},
(state)=>{
  return {
    initialValues: {
      ...state.selectedEntity.props.geometry
    }
  }
})(GeometryForm)
