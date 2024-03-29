import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useEffect } from 'react';
import {DevTool} from '@hookform/devtools'
import ContactListPage from './View/View';
import {FormValues} from '../App';

export const ContactForm = ({ contactsList, setContactsList}: {contactsList: FormValues[], setContactsList: React.Dispatch<React.SetStateAction<FormValues[]>>}) => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues:{
      firstName: "",
      lastName: "",
      phoneNo: "",
      landline: ""
    },
  });

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState  

  const onSubmit = (data: FormValues) => {
    setContactsList((oldContacts) => {
      if(oldContacts.length) {
        return [...oldContacts.filter(contact => !(contact.firstName === data.firstName && contact.lastName === data.lastName)), data]
      }
      return [...oldContacts, data]
    });
    form.reset();
    navigate('/')
  };
  

  useEffect(() => {
    console.log('Updated contacts list:', contactsList);
  }, [contactsList]); // Log contactsList whenever it changes

  return (
  
    <div>    
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
      <DevTool control={control} />
    </div>
  );
};
