import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ContactList from '../Components/ContactList';
import ContactForm from '../Components/CreateContactForm';

const ContactPage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div>
      <ContactForm />
      {contacts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          
        </div>
      ) : (
        <ContactList />
      )}
    </div>
  );
};

export default ContactPage;
