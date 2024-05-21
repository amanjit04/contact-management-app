import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
// import { v4 as uuidv4 } from 'uuid';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addContact({ id: '', name, email, status }));
    setName('');
    setEmail('');
    setStatus('active');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-1">
      <h2 className="text-2xl font-bold text-center mb-6">Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
              className="mr-2"
            />
            <label htmlFor="active" className="mr-4">Active</label>
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
              className="mr-2"
            />
            <label htmlFor="inactive">Inactive</label>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
