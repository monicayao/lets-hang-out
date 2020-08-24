import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' 
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import authenticationReducer, {authenticationDefaultState} from '../reducers/authentication';

const persistConfig = {
    key: 'email',
    storage: localStorage,
    stateReconciler: hardSet,
};

export default () => {
    const persistedReducer = persistReducer(persistConfig, authenticationReducer)
  
    const store = createStore(
        persistedReducer,
        authenticationDefaultState
    )
  
    const persistor = persistStore(store)
  
    return { store, persistor }
}
