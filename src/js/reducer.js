import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import _ from 'lodash'
import makeid from './utils/makeid'

const defaultMeshAttributes = {
  geometry: {
    translate: '0 0 0'
  },
  material: {
    color: 'gray',
    metalness: 0,
    opacity: 1,
    roughness: 0.5,
    shader: 'standard',
    // src: undefined,
    transparent: true
  }
}

const defaultCanvas = {
  canvas: null,
  height: 100,
  width: 100
}

const defaultCursor = {
  fuse: false,
  maxDistance: 1000,
  timeout: 1500
}

const defaultFog = {
  type: 'linear',
  color: '#000',
  near: 1,
  far: 1000,
  density: 0.00025
}

const defaultGeometry =  {
  buffer: true,
  // primitive: undefined,
  skipCache: false
}

const defaultKeyboardShortcuts = {
  enterVR: true,
  resetSensor: true
}

const defaultLight = {
  angle: 60,
  color: '#fff',
  decay: 1,
  distance: 0,
  exponent: 10,
  groundColor: '#fff',
  intensity: 1,
  type: 'directional'
}

const defaultLookControls = {
  enabled: true
}

const defaultMaterial = {
  depthTest: true,
  opacity: 1,
  transparent: false,
  shader: 'standard',
  side: 'front'
}

const defaultPosition = [0, 0, 0]

const defaultRotation = [0, 0, 0]

const defaultScale = [1, 1, 1]

const defaultSound = {
  autoplay: false,
  on: 'click',
  loop: 'false',
  src: null,
  volume: 1
}

const defaultVisible = true

const defaultVrModeUi = {
  enabled: true
}

const defaultWasdControls = {
  acceleration: 65,
  adAxis: 'x',
  adInverted: false,
  easing: 20,
  enabled: true,
  fly: false,
  wsAxis: 'z',
  wsInverted: false
}

export const defaultPrimitiveGeometry = {
  box: {
    depth: 1,
    height: 1,
    width: 1
  },
  circle: {
    radius: 1,
    segments: 32,
    thetaLength: 360,
    thetaStart: 0
  },
  cone: {
    height: 1.5,
    openEnded: false,
    radiusBottom: 0.75,
    radiusTop: 0.75,
    segmentsHeight: 1,
    segmentsRadial: 36,
    thetaLength: 360,
    thetaStart: 0
  },
  curvedimage: {
    height: 1,
    radius: 2,
    segmentsRadial: 48,
    thetaLength: 360,
    thetaStart: 0
  },
  cylinder: {
    height: 1.5,
    openEnded: false,
    radius: 0.75,
    segmentsHeight: 1,
    segmentsRadial: 36,
    thetaLength: 360,
    thetaStart: 0
  },
  image: {
    height: 1.75,
    width: 1.75
  },
  plane: {
    height: 1,
    width: 1
  },
  ring: {
    radiusInner: 0.08,
    radiusOuter: 1.2,
    segmentsPhi: 8,
    segmentsTheta: 32,
    thetaLength: 360,
    thetaStart: 0
  },
  sky: {
    radius: 5000,
    segmentsHeight: 64,
    segmentsWidth: 64
  },
  sphere: {
    radius: 0.85,
    segmentsHeight: 18,
    segmentsWidth: 36
  },
  torus: {
    arc: 360,
    radius: 1,
    radiusTubular: 0.2,
    segmentsRadial: 36,
    segmentsTubular: 8
  },
  torusKnot: {
    p: 2,
    q: 3,
    radius: 1,
    radiusTubular: 0.2,
    segmentsRadial: 36,
    segmentsTubular: 0
  },
  video: {
    height: 1.75,
    width: 3
  },
  videosphere: {
    radius: 5000,
    segmentsHeight: 64,
    segmentsWidth: 64
  }
}

const createMeshPrimitiveEntityCreator = (primitive) => () => {
  return {
    key: makeid(),
    props: {
      position: defaultPosition,
      rotation: defaultRotation,
      scale: defaultScale,
      visible: defaultVisible,
      geometry: {
        primitive,
        ...defaultGeometry,
        ...defaultMeshAttributes.geometry,
        ...defaultPrimitiveGeometry[primitive]
      },
      material: {
        ...defaultMaterial,
        ...defaultMeshAttributes.material
      }
    }
  }
}

const createEntity = {
  box: createMeshPrimitiveEntityCreator('box'),
  circle: createMeshPrimitiveEntityCreator('circle'),
  cone: createMeshPrimitiveEntityCreator('cone'),
  curvedimage: () => {
    return {
      key: makeid(),
      props: {
        position: defaultPosition,
        rotation: defaultRotation,
        scale: defaultScale,
        visible: defaultVisible,
        geometry: {
          primitive: 'cylinder',
          ...defaultGeometry,
          ...defaultMeshAttributes.geometry,
          ...defaultPrimitiveGeometry['curvedimage']
        },
        material: {
          ...defaultMaterial,
          ...defaultMeshAttributes.material
        }
      }
    }
  },
  cylinder: createMeshPrimitiveEntityCreator('cylinder'),
  image: createMeshPrimitiveEntityCreator('image'),
  plane: createMeshPrimitiveEntityCreator('plane'),
  ring: createMeshPrimitiveEntityCreator('ring'),
  sky: () => {
    return {
      key: makeid(),
      props: {
        position: defaultPosition,
        rotation: defaultRotation,
        scale: defaultScale,
        visible: defaultVisible,
        geometry: {
          primitive: 'sphere',
          ...defaultGeometry,
          ...defaultMeshAttributes.geometry,
          ...defaultPrimitiveGeometry['sky']
        },
        material: {
          ...defaultMaterial,
          ...defaultMeshAttributes.material
        }
      }
    }
  },
  sphere: createMeshPrimitiveEntityCreator('sphere'),
  torus: createMeshPrimitiveEntityCreator('torus'),
  torusKnot: createMeshPrimitiveEntityCreator('torusKnot'),
  video: () => {
    return {
      key: makeid(),
      props: {
        position: defaultPosition,
        rotation: defaultRotation,
        scale: defaultScale,
        visible: defaultVisible,
        geometry: {
          primitive: 'plane',
          ...defaultGeometry,
          ...defaultMeshAttributes.geometry,
          ...defaultPrimitiveGeometry['video']
        },
        material: {
          ...defaultMaterial,
          ...defaultMeshAttributes.material
        }
      }
    }
  },
  videosphere: () => {
    return {
      key: makeid(),
      props: {
        position: defaultPosition,
        rotation: defaultRotation,
        scale: defaultScale,
        visible: defaultVisible,
        geometry: {
          primitive: 'sphere',
          ...defaultGeometry,
          ...defaultMeshAttributes.geometry,
          ...defaultPrimitiveGeometry['videosphere']
        },
        material: {
          ...defaultMaterial,
          ...defaultMeshAttributes.material
        }
      }
    }
  },
  light: () => {
    return {
      key: makeid(),
      props: {
        position: defaultPosition,
        rotation: defaultRotation,
        scale: defaultScale,
        visible: defaultVisible,
        light: defaultLight
      }
    }
  }
}

function entities(state = {
  list: [],
  byKey: {},
  selected: null
}, action) {
  switch (action.type) {
    case 'entity/create':
      let entity;
      if (action.primitive) {
        entity = createEntity[action.primitive]()
        entity.name = `entity.${state.list.length}.${action.primitive}`
      } else {
        entity = {
          key: makeid(),
          props: defaultComponents
        }
        entity.name = `entity.${state.list.length}`
      }
      return {
        ...state,
        byKey: {
          ...state.byKey,
          [entity.key]: entity
        },
        list: state.list.concat(entity),
        selected: entity.key
      }
    case 'entity/select':
      return {
        ...state,
        selected: action.key
      }
    case 'entity/delete':
      return {
        ...state,
        byKey: _.omit(state.byKey, action.key),
        list: _.filter(state.list, e => {
          return e.key !== action.key
        }),
        selected: state.selected === action.key ? null : state.selected
      }
    case 'entity/update':
      let updated;
      const list = state.list.map(e => {
        if (e.key !== action.key) {
          return e
        }
        updated = {
          ...e
        }
        if (action.geometry)
          updated.props.geometry = {
            ...e.props.geometry,
            ...action.geometry
          }
        if (action.material)
          updated.props.material = action.material
        if (action.position)
          updated.props.position = action.position
        if (action.rotation)
          updated.props.rotation = action.rotation
        if (action.scale)
          updated.props.scale = action.scale
        if (action.light)
          updated.props.light = action.light
        if (typeof action.visible === 'boolean')
          updated.props.visible = action.visible
        return updated
      })
      return {
        ...state,
        byKey: {
          ...state.byKey,
          [action.key]: updated
        },
        list
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  form,
  entities,
})

export default rootReducer
