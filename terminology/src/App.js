import './App.css';
import DashboardLayout from './components/Layout/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import Worksheets from './components/Worksheet/Worksheets';
import RTL from './RTL';
import Worksheet from './components/Worksheet/Worksheet'

function App() {
  return (
    <RTL>
      <div>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Worksheets />} />
            <Route path="/worksheet" element={<Worksheet />} />
            <Route path="/worksheet/:id" element={<Worksheet />} />
          </Routes>
        </DashboardLayout>
      </div>
    </RTL>
  );
}

export default App;
