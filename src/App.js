import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './style.css';
import Navbar from './components/Navbar';
import StudentCreate from './components/StudentCreate';
import StudentUpdate from './components/StudentUpdate';
import StudentFetch from './components/StudentFetch';
import StudentUpdateQueryParam from './components/StudentUpdateQueryParam';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/create" element={<StudentCreate />} />
          <Route path="/" redirect="/create" />
          {/* <Route path="/update" element={<StudentUpdate />} /> */}
          {/*  LOAD USING PATH VARIABLE ROUTE */}
          <Route path="/update/:idFromParam" element={<StudentUpdate />} />

          {/*  LOAD USING Request Param [queryParam] ?queryParam=${queryParam} ROUTE */}
          <Route path="/update" element={<StudentUpdateQueryParam />} />
          <Route path="/get-all" element={<StudentFetch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
