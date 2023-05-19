import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { Provider } from "react-redux";
import user from "../reducers/user";
import allreleases from "../reducers/allreleases";
import profile from "../reducers/profile";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Release from "../components/Release";
import Artist from "../components/Artist";
import MyArtists from "../components/MyArtists";
import Home from "../components/Home";
import Search from "../components/Search";
import Calendar from "../components/Calendar";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

const reducers = combineReducers({ user, allreleases, profile });
const persistConfig = { key: "albumRelease", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Oops! The page you're searching is not here</p>
    </div>
  );
}

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Album release</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/release/:mbid" element={<Release />} />
            <Route path="/artist/:mbid" element={<Artist />} />
            <Route path="/myartists" element={<MyArtists />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
