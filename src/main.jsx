import React, { version } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import Reducer from './Utils/Reducer.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistConfig = {
  key:"root",
  version:1,
  storage
}

const reducer = combineReducers({
  rootReducer:persistReducer(persistConfig,Reducer),
})

const store = createStore(reducer)
const persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
