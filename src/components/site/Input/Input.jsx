import React, { useState } from 'react';
import styles from './Input.module.scss';
const Input = ({ disabled, label, form, name, rules = { required: { message: 'Обязательное поле', value: true } }, placeholder, type = 'text', classWrap = '' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = form?.formState?.errors?.[name]?.message;
  return (
    <>
      <div class={`form-group ${classWrap}`}>
        <label for={name}>{label}</label>
        <div class="position-relative">
          <input autoComplete="off" disabled={disabled} id={name} type={type == 'password' ? (showPassword ? 'text' : 'password') : type} class="form-control" name="password" placeholder={placeholder} {...form.register(name, rules)} />
          {type == 'password' && (
            <div
              class={`uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2 ${showPassword ? 'uil-eye' : ''}`}
              onClick={() => {
                setShowPassword(!showPassword);
              }}></div>
          )}
        </div>{' '}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Input;
