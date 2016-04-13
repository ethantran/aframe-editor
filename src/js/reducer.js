import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import _ from 'lodash'
import makeid from './utils/makeid'
import aframe from 'aframe'
console.log(aframe.components)
const components = ['position', 'rotation', 'scale', 'material', 'geometry', 'light']

function getDefaults(schema) {
  return _(schema)
  .pickBy(e=>e.default !== undefined)
  .mapValues(e=>e.default)
  .value()
}

const defaultComponentAttributes = {
  canvas: getDefaults(aframe.components.canvas.schema),
  cursor: getDefaults(aframe.components.cursor.schema),
  fog: getDefaults(aframe.components.fog.schema),
  geometry: {
    ...getDefaults(aframe.components.geometry.schema),
    translate: '0 0 0'
  },
  keyboardShortcuts: getDefaults(aframe.components['keyboard-shortcuts'].schema),
  light: getDefaults(aframe.components.light.schema),
  lookControls: getDefaults(aframe.components['look-controls'].schema),
  material: getDefaults(aframe.components['material'].schema),
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  sound: getDefaults(aframe.components['sound'].schema),
  visible: true,
  vrModeUi: getDefaults(aframe.components['vr-mode-ui'].schema),
  wasdControls: getDefaults(aframe.components['wasd-controls'].schema)
}

const defaultEntityAttributes = {
  position: defaultComponentAttributes.position,
  rotation: defaultComponentAttributes.rotation,
  scale: defaultComponentAttributes.scale,
  visible: defaultComponentAttributes.visible,
}

const defaultMeshAttributes = {
  ...defaultEntityAttributes,
  geometry: defaultComponentAttributes.geometry,
  material: {
    ...defaultComponentAttributes.material,
    color: 'gray',
    metalness: 0,
    opacity: 1,
    roughness: 0.5,
    shader: 'standard',
    transparent: true
  }
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

const createMeshPrimitiveEntityCreator = (primitive, primitiveOverride) => () => {
  return {
    key: makeid(),
    props: {
      ...defaultMeshAttributes,
      geometry: {
        ...defaultMeshAttributes.geometry,
        ...defaultPrimitiveGeometry[primitive],
        primitive: primitiveOverride || primitive,
      },
      material: {
        ...defaultMeshAttributes.material
      }
    }
  }
}

const createEntity = {
  box: createMeshPrimitiveEntityCreator('box'),
  circle: createMeshPrimitiveEntityCreator('circle'),
  cone: createMeshPrimitiveEntityCreator('cone'),
  curvedimage: createMeshPrimitiveEntityCreator('curvedimage', 'cylinder'),
  cylinder: createMeshPrimitiveEntityCreator('cylinder'),
  image: createMeshPrimitiveEntityCreator('image'),
  plane: createMeshPrimitiveEntityCreator('plane'),
  ring: createMeshPrimitiveEntityCreator('ring'),
  sky: createMeshPrimitiveEntityCreator('sky', 'sphere'),
  sphere: createMeshPrimitiveEntityCreator('sphere'),
  torus: createMeshPrimitiveEntityCreator('torus'),
  torusKnot: createMeshPrimitiveEntityCreator('torusKnot'),
  video: createMeshPrimitiveEntityCreator('video', 'plane'),
  videosphere: createMeshPrimitiveEntityCreator('videosphere', 'sphere'),
  light: () => {
    return {
      key: makeid(),
      props: {
        ...defaultEntityAttributes,
        light: defaultComponentAttributes.light
      }
    }
  }
}

function entities(state = {
  list: [],
  byKey: {},
  selected: null
}, action) {
  let updated;
  let list;
  switch (action.type) {
    case 'entity/create':
      let entity;
      if (action.primitive) {
        entity = createEntity[action.primitive]()
        entity.name = `entity.${state.list.length}.${action.primitive}`
      } else {
        entity = {
          key: makeid(),
          props: defaultEntityAttributes
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
      list = state.list.map(e => {
        if (e.key !== action.key) {
          return e
        }
        updated = {...e}
        for (let component of components) {
          if (!_.isUndefined(action[component])) {
            if (_.isArray(action[component])) {
              updated.props[component] = action[component]
            } else if (_.isObject(action[component])) {
              updated.props[component] = {...e.props[component], ...action[component]}
            } else {
              updated.props[component] = action[component]
            }
          }
        }
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
    case 'entity/component/toggle':
      list = state.list.map(e => {
        if (e.key !== action.key) {
          return e
        }
        updated = {...e}
        if (updated.props[action.component])
          updated.props[action.component] = false
        else
          updated.props[action.component] = defaultComponentAttributes[action.component]
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
