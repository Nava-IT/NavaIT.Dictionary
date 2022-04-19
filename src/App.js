import './App.css';
import DashboardLayout from './components/Layout/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import Worksheet from './components/Worksheet/Worksheet';
import RTL from './RTL';

function App() {
  return (
    <RTL>
      <div className="App">
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Worksheet />} />
            {/* <Route path="/test" element={<Patients />} /> */}
          </Routes>
        </DashboardLayout>
      </div>
    </RTL>
  );
}

export default App;
