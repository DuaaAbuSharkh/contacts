import { useNavigate } from "react-router-dom";
interface Contact {
  firstName: string
  lastName: string
  phoneNo: string
  landline: string
}

interface ContactListViewProps {
  contactsList: Contact[];
  onDelete: (index: number) => void; // Function to handle delete action
}

const ContactListView: React.FC<ContactListViewProps> = ({ contactsList, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        {contactsList.map((contact, index) => (
          <table>
          <tr key={index}>
            <td><button className="click" onClick={() => onDelete(index)}>Delete</button> {/* Delete button */}</td>
            <td><button className="click" onClick={() => navigate(`${contact.phoneNo}/edit`)}>Edit</button> {/* Edit button */} </td>
            <td>{contact.firstName} {contact.lastName} {contact.phoneNo}</td>
          </tr>
          </table>
        ))}
      </ul>
    </div>
  );
};

export default ContactListView;
