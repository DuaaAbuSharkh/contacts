interface Contact {
  firstName: string
  lastName: string
  phoneNo: string
  landline: string
}

interface ContactListViewProps {
  contactsList: Contact[];
}

const ContactListView: React.FC<ContactListViewProps> = ({ contactsList }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contactsList.map((contact, index) => (
          <li key={index}>
            {contact.firstName} {contact.phoneNo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactListView;

/*
import React from 'react';
import { ContactForm } from '../ContactForm';


const ContactListView = () => {
  return (
    <div>
      <h2>Contact List</h2>
        <ContactsListPage contactsList={ContactForm.firstName} />
    </div>
  );
};

export default ContactListView;
*/