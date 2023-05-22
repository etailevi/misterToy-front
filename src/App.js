import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/css/main.css';

import { store } from './store/store';
import AppHeader from './cmps/app-header';
import ToyIndex from './views/toy-index';
import ToyEdit from './views/toy-edit';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          {/* <AppHeader /> */}
          <main>
            <Routes>
              {/* <Route element={<HomePage />} path="/" /> */}
              {/* <Route element={<AboutUs />} path="/about" /> */}
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/:todoId" />
              {/* <Route element={<ToyEdit />} path="/toy/edit/:toyId" /> */}
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}