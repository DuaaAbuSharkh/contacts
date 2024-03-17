import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactForm } from './components/ContactForm';

function App() {
  const [contactsList, setContactsList] = useState([]); // Define contactsList state

  return (
    <Router>
      <Routes>
        {/* Pass setContactsList as a prop to ContactForm */}
        <Route path="/" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;