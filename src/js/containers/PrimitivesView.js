import React from 'react';
import {connect} from 'react-redux'

const primitives = [
    'box',
    'camera',
    'circle',
    'collada-model',
    'cone',
    'cursor',
    'curvedimage',
    'cylinder',
    'image',
    'light',
    'obj-model',
    'plane',
    'sky',
    'sphere',
    'torus',
    'torusKnot',
    'video',
    'videosphere'
]

class PrimitiveToolbar extends React.Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        border: '1px solid black'
      }}>
        <span>
            <button onClick={()=>this.props.dispatch({type:'entity/create'})}>entity</button>
        </span>
        {primitives.map((e)=>(
            <span key={e}>
                <button onClick={()=>this.props.dispatch({type:'entity/create', primitive:e})}>{e}</button>
            </span>
        ))}
      </div>
    )
  }
}

export default connect()(PrimitiveToolbar)