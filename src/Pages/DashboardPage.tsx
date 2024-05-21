import React from 'react';
import Dashboard from '../Pages/ContactsPage';
import ContactList from '../Pages/ChartsAndMapsPage';
const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Dashboard />
      <ContactList />
    </div>
  );
};

export default DashboardPage;