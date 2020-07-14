const initialState = {
  isDarkMode: false,
  modal: false
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE, isDarkMode
});

export const toggleModal = modal => ({
  type: TOGGLE_MODAL, modal
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.isDarkMode };
    case TOGGLE_MODAL:
      return { ...state, modal: action.modal };
    default:
      return state;
  }
};
