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
    setContactsList(prevContacts => [...prevContacts, data]);
  };

  useEffect(() => {
    console.log('Updated contacts list:', contactsList);
  }, [contactsList]); // Log contactsList whenever it changes

  const handleDelete = (index: number) => {
    setContactsList(prevContacts => prevContacts.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    // Your edit logic here
    console.log('Edit contact at index:', index);
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
