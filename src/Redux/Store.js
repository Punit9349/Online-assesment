import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import userReducer from './reducer';
import authreducer from './authreducer';
import testreducer from './takeassessmentreducer';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user', 'auth'],
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authreducer,
  takeAssessment: testreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

