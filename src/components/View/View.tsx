interface Contact {
  firstName: string
  lastName: string
  phoneNo: string
  landline: string
}

interface ContactListViewProps {
  contactsList: Contact[];
  onDelete: (index: number) => void; // Function to handle delete action
  onEdit: (index: number) => void; // Function to handle edit action
}

const ContactListView: React.FC<ContactListViewProps> = ({ contactsList, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contactsList.map((contact, index) => (
          <table>
          <tr key={index}>
            <td><button className="click" onClick={() => onDelete(index)}>Delete</button> {/* Delete button */}</td>
            <td><button className="click" onClick={() => onEdit(index)}>Edit</button> {/* Edit button */} </td>
            <td>{contact.firstName} {contact.lastName} {contact.phoneNo}</td>
          </tr>
          </table>
        ))}
      </ul>
    </div>
  );
};

export default ContactListView;
