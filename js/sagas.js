import {takeEvery, takeLatest} from 'redux-saga'
import {take, put, call, fork, select} from 'redux-saga/effects'


// function* watchCreateEntity({primitive}) {
//   yield* takeEvery('entity/create', createEntity, primitive)
// }

// function* createEntity(primitive) {
//   try {
//     let payload = {
//       key: makeid(),
//       props: {
//         ...defaultProps,
//         geometry: {
//           ...defaultProps.geometry,
//           primitive
//         }
//       }
//     }
//     yield put({
//       type: 'entity/create/success',
//       payload
//     })
//   } catch (payload) {
//     yield put({type: 'entity/create/failure', payload})
//   }
// }

// function* watchUpdateEntity() {
//   yield* takeEvery('entity/update', updateEntity)
// }

// function* updateEntity(args) {
//   try {
//     yield put({
//       type: 'entity/update/success',
//       payload: args
//     })
//   } catch (payload) {
//     yield put({type: 'entity/update/failure', payload})
//   }
// }

export default function* root() {
  yield [
    // fork(watchCreateEntity),
    // fork(watchUpdateEntity),
  ]
}