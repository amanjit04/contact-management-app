import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteContact, updateContact } from '../redux/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editStatus, setEditStatus] = useState<'active' | 'inactive'>('active');
  const [emailError, setEmailError] = useState<string>('');
  const [statusError, setStatusError] = useState<string>('');

  const handleEdit = (contact: { id: string; name: string; email: string; status: 'active' | 'inactive' }) => {
    setEditId(contact.id);
    setEditName(contact.name);
    setEditEmail(contact.email);
    setEditStatus(contact.status);
  };

  const handleSave = (id: string) => {
    let valid = true;
    if (!validateEmail(editEmail)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!validateStatus(editStatus)) {
      setStatusError('Please select a valid status');
      valid = false;
    } else {
      setStatusError('');
    }
    if (valid) {
      dispatch(updateContact({ id, name: editName, email: editEmail, status: editStatus }));
      setEditId(null);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStatus = (status: string): boolean => {
    return status === 'active' || status === 'inactive';
  };

  return (
    <ul className="border-2 border-gray-300 rounded-md p-4 mt-10">
      {contacts.map(contact => (
        <li key={contact.id} className="flex justify-between items-center p-2 border-b">
          {editId === contact.id ? (
            <>
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-1 border mb-2"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="p-1 border mb-2"
                />
                {emailError && <span className="text-red-500">{emailError}</span>}
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as 'active' | 'inactive')}
                  className="p-1 border mb-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {statusError && <span className="text-red-500">{statusError}</span>}
              </div>
              <div>
                <button
                  onClick={() => handleSave(contact.id)}
                  className="bg-green-500 text-white p-2 mr-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                {contact.name} - {contact.email} - {contact.status}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(contact)}
                  className="bg-blue-500 text-white p-2 mr-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteContact(contact.id))}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;