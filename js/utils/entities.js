export const getSelectedEntityKey = state => state.entities.selected
export const getSelectedEntity = state => state.entities.byKey[state.entities.selected]
export const getAllEntities = state => state.entities.list
