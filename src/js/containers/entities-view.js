import React from 'react';
import {connect} from 'react-redux'

class EntitiesView extends React.Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 50,
        right: 0,
        width: '30%',
        height: '40vh',
        backgroundColor: 'white',
        border: '1px solid black',
        overflowY: 'scroll',
      }}>
        {this.props.entities.map((e)=>(
            <div key={e.key} style={{width:'100%'}}>
                <button onClick={()=>this.props.dispatch({
                    type: 'entity/select',
                    payload: e
                })}>{e.name}</button>
            </div>
        ))}
      </div>
    )
  }
}

export default connect(
(state)=>{
  return {
    entities: state.entities
  }
})(EntitiesView)