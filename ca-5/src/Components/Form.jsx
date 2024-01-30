import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
import './Form.css';

function Form() {
  //element destructuring (react-hook-form)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [isFormEdited,setFormEdited] = useState(false);
  //handle function
  const onSubmit = (data) => {
    console.log(data);
    setRegisterSuccessful(true);
  };

  const handleFormChange = () => {
    setFormEdited(true);
  };
 //Conditional rendering 
  return (
    <div className='Head'>
      <Link to='/'>
        <button className='btnname'>Back to Books</button>
      </Link>
      <div className='content'>
      {registerSuccessful && (
        <div className='signup'>
          <p>Registration Successful</p>
        </div>
      )}
      <h1 className='title'>Create Account</h1>
      
      <form className='form' onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
         {/* Name input */}
        <label>Your Name:</label>
        <input type="text" name='yourName' {...register("yourName", {
          required: "Your Name is required!",
          minLength: {
            value: 3,
            message: "Your Name must be more than 3 characters"
          },
          maxLength: {
            value: 30,
            message: "Your Name cannot be more than 30 characters"
          }
        })} />
        {errors.yourName && <p className='err'>{errors.yourName.message}</p>}
          {/* Email Input */}
        <label>Email :</label>
        <input type="email" name='email' {...register("email", { required: "Email is required!", pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" } })} />
        {errors.email && <p className='err'>{errors.email.message}</p>}
          {/* Password */}
        <label>Password :</label>
        <input type="password" name='password' {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[!@#$%^&*])\w+\S+/,
            message: "Password must contain at least one special character "
          },
          minLength: {
            value: 10,
            message: "Password cannot be less than 10 characters"
          }
        })} />
        {errors.password && (<p className='err'>{errors.password.message}</p>)}
          {/* Confirmed password */}
        <label>Confirm Password :</label>
        <input
          type="password"
          name="confirmPassword"
          {...register("confirmPassword", {
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p className="err">{errors.confirmPassword.message}</p>}
        
        <button type="submit" >Sign Up</button>
      </form>
      </div>
    </div>
  )
}

export default Form;



