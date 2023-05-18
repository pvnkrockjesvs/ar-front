import "../styles/globals.css";
import Head from "next/head";
import Header from '../components/Header'
import { Provider } from 'react-redux';
import user from '../reducers/user';
import albums from "../reducers/albums";

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducers = combineReducers({ user, albums })
const persistConfig = { key: 'albumRelease', storage };

const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);


function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Head>
                    <title>Album release</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                      rel="stylesheet"
                    />
                </Head>
                <Header />
                <Component {...pageProps} />
        </PersistGate>
    </Provider>
  );
}

export default App;
