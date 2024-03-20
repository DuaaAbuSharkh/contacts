import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactForm } from './components/ContactForm';
import ListContacts from './components/ListContacts';
import { EditContactForm } from './components/EditContactForm';

export type FormValues = { 
  firstName: string
  lastName: string
  phoneNo: string
  landline: string
}

function App() {
  const [contactsList, setContactsList] = useState<FormValues[]>([]); // Define contactsList state
  return (
    <Router>
      <Routes>
        {/* Pass setContactsList as a prop to ContactForm */}
        <Route path="/" element={<ListContacts contactsList={contactsList} setContactsList={setContactsList} />} />
        <Route path="/:id/edit" element={<EditContactForm contactsList={contactsList} setContactsList={setContactsList} />} />
        <Route path="/new" element={<ContactForm contactsList={contactsList} setContactsList={setContactsList} />} />
      </Routes>
    </Router>
  );
}

export default App;