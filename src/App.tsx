import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ContactPage from './Pages/ContactsPage';
import ChartsAndMapsPage from './Pages/ChartsAndMapsPage';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import ContactList from './Components/ContactList';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contacts" element={<ContactPage />} />
              <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const HomePage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const navigate = useNavigate();

  const handleCreateContact = () => {
    navigate('/contacts');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {contacts.length > 0 ? (
        <ContactList />
      ) : (
        <div>
          <p>No Contact Found. Please create a contact.</p>
          <button 
            onClick={handleCreateContact} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default App;