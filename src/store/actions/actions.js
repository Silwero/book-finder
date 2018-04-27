import * as actionTypes from './actionTypes';
import axios from 'axios';

const setBooks = (books) => {
  return {
    type: actionTypes.GET_BOOKS,
    books: books
  }
}

const setFavoriteBooks = (books) => {
  return {
    type: actionTypes.GET_FAVORITES,
    favoriteBooks: books || {}
  }
};

const toggleFavoriteBook = (item) => {
  return {
      type: actionTypes.TOGGLE_FAVORITE,
      favoriteItem: {
        title: item.title,
        id: item.id
      }
    }
}

const loadingStart = () => {
  return {
    type: actionTypes.LOADING_START,
    loading: true
  }
};

export const showMessage = (message, type) => {
  return {
    type: actionTypes.SET_MESSAGE,
    message: message,
    messageType: type
  }
};

export const removeMessage = () => {
  return {
    type: actionTypes.UNSET_MESSAGE
  }
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logOut());
    dispatch(showMessage('Logout', 'sucess'));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 2000);
  };
};

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const getBooks = (text) => {
  if (!text) return setBooks([]);

  return dispatch => {
    dispatch(loadingStart());
    axios.get( 'https://www.googleapis.com/books/v1/volumes?q=' + text )
      .then( response => {
        dispatch(setBooks(response.data.items));
      })
      .catch( error => {
        dispatch(showMessage(error.message, 'error'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      });
  };
};


export const toggleFavorite = (title, id, token, userId) => {
  return dispatch => {
    dispatch(loadingStart());
    axios.patch('https://book-finder-e0068.firebaseio.com/favoriteBooks.json?auth=' + token, {
        [id]: {
          title: title,
          userId: userId
        }
      })
      .then( response => {
        dispatch(toggleFavoriteBook({
          title: title,
          id: id
        }));
      })
      .catch( error => {
        dispatch(showMessage(error.message, 'error'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      });
  };
};

export const getFavoriteBooks = (token, userId) => {
  return dispatch => {
    axios.get('https://book-finder-e0068.firebaseio.com/favoriteBooks.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
      .then( response => {
        dispatch(setFavoriteBooks(response.data));
      })
      .catch( error => {
        console.log(error);
        dispatch(showMessage(error.message, 'error'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      });
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(loadingStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = isSignup ?
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCDmNc59C0DZ8NJtmYfTC8CJH23YbxT-70' :
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCDmNc59C0DZ8NJtmYfTC8CJH23YbxT-70";
    axios.post(url, authData)
      .then(resp => {
        const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
        localStorage.setItem('token', resp.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', resp.data.localId);
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn));
        dispatch(getFavoriteBooks(resp.data.idToken, resp.data.localId));
        dispatch(showMessage('Authorized', 'success'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      })
      .catch(err => {
        let message = err.message;
        if (err.response) {
          switch(err.response.data.error.message) {
            case 'EMAIL_EXISTS':
              message = 'Email already exist';
              break;
            case 'INVALID_PASSWORD':
              message = 'Wrong password';
              break;
            case 'EMAIL_NOT_FOUND':
              message = 'Email not found';
              break;
            default:
              message = err.response.data.error.message;
          }
        }
        dispatch(showMessage(message, 'error'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      });
  }
};

export const authCheckState = () => {
  const token = localStorage.getItem('token');

  return dispatch => {
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const userId = localStorage.getItem('userId');
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(getFavoriteBooks(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};