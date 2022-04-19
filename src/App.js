import './App.css';
import DashboardLayout from './components/Layout/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import Terminology from './components/Terminology/Terminology';
import RTL from './RTL';

function App() {
  return (
    <RTL>
      <div className="App">
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Terminology />} />
            {/* <Route path="/test" element={<Patients />} /> */}
          </Routes>
        </DashboardLayout>
      </div>
    </RTL>
  );
}

export default App;
