import React from 'react';
import {connect} from 'react-redux'
import {getSelectedEntityKey, getAllEntities} from '../utils/entities'

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
        {this.props.entities.map((e, i)=>(
          <div key={e.key} style={{width:'100%'}}>
            <span style={{fontWeight: this.props.selectedEntityKey === e.key ? 'bold': 'normal'}}>{e.name}</span>
            <button onClick={()=>this.props.dispatch({type:'entity/select', key:e.key, index:i})}>select</button>
            <button onClick={()=>this.props.dispatch({type:'entity/delete', key:e.key, index:i})}>delete</button>
            <span>visible</span>
            <input type="checkbox" checked={e.props.visible} onChange={()=>this.props.dispatch({type:'entity/update', key:e.key, index:i, visible:!e.props.visible})}/>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(
(state)=>{
  return {
    entities: getAllEntities(state),
    selectedEntityKey: getSelectedEntityKey(state)
  }
})(EntitiesView)