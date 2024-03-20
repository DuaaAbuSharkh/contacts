import {useForm} from 'react-hook-form'
import { useState, useEffect} from 'react';
import {DevTool} from '@hookform/devtools'
import { Link } from 'react-router-dom';
import React from 'react';
import ContactListPage from './View/View';

export const ContactForm = ({ }) => {
  type FormValues = { 
    firstName: string
    lastName: string
    phoneNo: string
    landline: string
  }

  const [contactsList, setContactsList] = useState<FormValues[]>([]);
  const form = useForm<FormValues>({
    defaultValues:{
      firstName: "",
      lastName: "",
      phoneNo: "",
      landline: ""
    },
  });

  const { register, control, handleSubmit, formState, getValues } = form
  const [showForm, setShowForm] = useState(false);
  const { errors } = formState  

  const onSubmit = (data: FormValues) => {
    const updatedContactsList = contactsList.filter(contact => !(contact.firstName === data.firstName && contact.lastName === data.lastName));
    
    // Add the edited contact to the list
    updatedContactsList.push(data);
  
    // Set the updated contacts list
    setContactsList(updatedContactsList);
  
    // Reset form values
    form.reset();
  };
  

  useEffect(() => {
    console.log('Updated contacts list:', contactsList);
  }, [contactsList]); // Log contactsList whenever it changes

  const handleDelete = (index: number) => {
    setContactsList(prevContacts => prevContacts.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    // Get the contact object at the specified index
    const contactToEdit = contactsList[index];
  
    // Set the form values to the values of the contact being edited
    form.setValue('firstName', contactToEdit.firstName);
    form.setValue('lastName', contactToEdit.lastName);
    form.setValue('phoneNo', contactToEdit.phoneNo);
    form.setValue('landline', contactToEdit.landline);
  
    // Show the form for editing
    setShowForm(true);
  
    // Remove the contact being edited from the contactsList
    //setContactsList(prevContacts => prevContacts.filter((_, i) => i !== index));
  };


  return (
    
    <div>
      <div>
        <ContactListPage contactsList={contactsList} onDelete={handleDelete} onEdit={handleEdit} />
        <button onClick={() => setShowForm(!showForm)}>Add new contact</button>
      </div>
      
      {showForm && (
      <div>
      <h2> Add new contact </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='firstName'>First name</label>
          <input type='text' id='firstName' {...register('firstName', { required: { value: true, message: 'First name is required' } })} />
          <p className='error'>{errors.firstName?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='lastName'>Last name</label>
          <input type='text' id='lastName' {...register('lastName')} />
        </div>

        <div className='form-control'>
          <label htmlFor='phoneNo'>Phone number</label>
          <input type='text' id='phoneNo' {...register('phoneNo', { required: { value: true, message: 'Phone number is required' } })} />
          <p className='error'>{errors.phoneNo?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='landline'>Landline</label>
          <input type='text' id='landline' {...register('landline')} />
        </div>

        <p><button>Add</button></p>

      </form>
      </div>
      )}
      <DevTool control={control} />
    </div>


  );
};
