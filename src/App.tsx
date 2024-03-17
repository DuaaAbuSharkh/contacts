import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactForm } from './components/ContactForm';
import ContactListView from "./components/View/View.tsx"

function App() {
  const [contactsList, setContactsList] = useState([]); // Define contactsList state

  return (
    <Router>
      <Routes>
        {/* Pass setContactsList as a prop to ContactForm */}
        <Route path="/" element={<ContactForm />} />
        {/* Pass contactsList as a prop to ContactListView */}
        <Route path="/view-contacts" element={<ContactListView contactsList={contactsList} />} /> 
      </Routes>
    </Router>
  );
}

export default App;