import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useEffect, useState} from 'react';
import {DevTool} from '@hookform/devtools'
import {FormValues} from '../App';
import {useParams} from "react-router-dom"

export const EditContactForm = ({ contactsList, setContactsList}: {contactsList: FormValues[], setContactsList: React.Dispatch<React.SetStateAction<FormValues[]>>}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<FormValues|null>(null);
  const { id } = useParams();

  useEffect(() => {
    setCurrentUser(contactsList.find((contact) => contact.phoneNo === id) ?? null);
  }, []);

  const form = useForm<FormValues>({
    defaultValues:{
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phoneNo: currentUser?.phoneNo,
      landline: currentUser?.landline
    },
  });

  useEffect(() => {
    if(currentUser){
      form.setValue('firstName', currentUser.firstName);
      form.setValue('lastName', currentUser.lastName);
      form.setValue('phoneNo', currentUser.phoneNo);
      form.setValue('landline', currentUser.landline);
    }
  }, [currentUser]);

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

  return (
    
    <div>
      <div>
      <h2> Edit contact </h2>
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

        <p><button>Edit</button></p>

      </form>
      </div>
      <DevTool control={control} />
    </div>


  );
};
