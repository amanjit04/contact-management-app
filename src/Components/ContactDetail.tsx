import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  contactId: string;
}

const ContactDetail: React.FC<Props> = ({ contactId }) => {
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((contact) => contact.id === contactId)
  );

  if (!contact) return <p>Contact not found</p>;

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Contact Details</h2>
      <p className="font-semibold">Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.status}</p>
    </div>
  );
};

export default ContactDetail;