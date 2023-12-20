import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import userReducer from './reducer';
import authreducer from './authreducer';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'], // Example: Persist only the 'auth' slice of the state
};

const rootReducer = combineReducers({
  user: userReducer,
  auth:authreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

