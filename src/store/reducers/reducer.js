import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  isAuth: false,
  favoriteBooks: {},
  loading: false,
  userId: null,
  token: null,
  message: null
}

const reducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case actionTypes.GET_BOOKS:
      newState.books = action.books;
      newState.loading = false;
      return newState;
    case actionTypes.GET_FAVORITES:
      newState.favoriteBooks = {...state.favoriteBooks, ...action.favoriteBooks}
      return newState;
    case actionTypes.AUTH_SUCCESS:
      newState = {...newState,
        token: action.idToken,
        userId: action.userId,
        loading: false
      }
      return newState;
    case actionTypes.AUTH_LOGOUT:
      newState.token = null;
      newState.userId = null;
      newState.favoriteBooks = {}
      newState.books = [];
      return newState;
    case actionTypes.SET_MESSAGE:
      newState.message = {
        text: action.message,
        messageType: action.messageType
      };
      newState.loading = false;
      return newState;
    case actionTypes.UNSET_MESSAGE:
      newState.message = null;
      return newState;
    case actionTypes.LOADING_START:
      newState.loading = true;
      return newState;
    case actionTypes.TOGGLE_FAVORITE:
      newState.favoriteBooks = {...state.favoriteBooks};
      newState.loading = false;
      if (action.favoriteItem.title === null) {
        delete newState.favoriteBooks[action.favoriteItem.id];
      } else {
        newState.favoriteBooks[action.favoriteItem.id] = {title: action.favoriteItem.title};
      }
      return newState;
    default:
      return newState;
  }
}

export default reducer;