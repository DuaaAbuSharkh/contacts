import { useNavigate } from "react-router-dom";
import {FormValues} from '../App';
import ContactListPage from './View/View'
const ListContacts = ({ contactsList, setContactsList}: {contactsList: FormValues[], setContactsList: React.Dispatch<React.SetStateAction<FormValues[]>>}) => {
  const navigate = useNavigate();
  const handleDelete = (index: number) => {
    setContactsList(prevContacts => prevContacts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Contact List</h2>
      {contactsList.length === 0 && <h3>Theres no contacts</h3>}
        <ContactListPage contactsList={contactsList} onDelete={handleDelete} />
        <button onClick={() => navigate('/new')}>Add new contact</button>
      </div>
  )
}

export default ListContacts;