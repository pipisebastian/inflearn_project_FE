import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { NotePage } from './pages/Note';
import { Outlet, Routes, Route } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<NotePage />} />
      </Route>
    </Routes>
  );
}

export default App;
