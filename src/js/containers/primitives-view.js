import React from 'react';
import {connect} from 'react-redux'

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
        <button onClick={()=>this.props.dispatch({type:'box/create'})}>box</button>
        <button onClick={()=>this.props.dispatch({type:'camera/create'})}>camera</button>
        <button onClick={()=>this.props.dispatch({type:'collada-model/create'})}>collada-model</button>
        <button onClick={()=>this.props.dispatch({type:'cone/create'})}>cone</button>
        <button onClick={()=>this.props.dispatch({type:'cursor/create'})}>cursor</button>
        <button onClick={()=>this.props.dispatch({type:'curvedimage/create'})}>curvedimage</button>
        <button onClick={()=>this.props.dispatch({type:'cylinder/create'})}>cylinder</button>
        <button onClick={()=>this.props.dispatch({type:'image/create'})}>image</button>
        <button onClick={()=>this.props.dispatch({type:'light/create'})}>light</button>
        <button onClick={()=>this.props.dispatch({type:'obj-model/create'})}>obj-model</button>
        <button onClick={()=>this.props.dispatch({type:'plane/create'})}>plane</button>
        <button onClick={()=>this.props.dispatch({type:'ring/create'})}>ring</button>
        <button onClick={()=>this.props.dispatch({type:'sky/create'})}>sky</button>
        <button onClick={()=>this.props.dispatch({type:'sphere/create'})}>sphere</button>
        <button onClick={()=>this.props.dispatch({type:'torus/create'})}>torus</button>
        <button onClick={()=>this.props.dispatch({type:'video/create'})}>video</button>
        <button onClick={()=>this.props.dispatch({type:'videosphere/create'})}>videosphere</button>
      </div>
    )
  }
}

export default connect()(PrimitiveToolbar)