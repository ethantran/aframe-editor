import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'

function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const defaultProps = {
  geometry: {
    translate: [0, 0, 0]
  },
  material: {
    color: 'gray',
    metalness: 0,
    opacity: 1,
    roughness: 0.5,
    shader: 'standard',
    // src: 'None',
    transparent: 'true'
  },
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1]
}

function entities(state = [], action) {
  switch (action.type) {
    case 'box/create':
      return state.concat({
        key: makeid(),
        name: 'entity.' + state.length + '.box',
        props: {
          ...defaultProps,
          geometry: {
            ...defaultProps.geometry,
            primitive: 'box'
          }
        }
      })
    default:
      return state
  }
}

function selectedEntity(state = null, action) {
  switch (action.type) {
    case 'entity/select':
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  form,
  entities,
  selectedEntity
})

export default rootReducer
