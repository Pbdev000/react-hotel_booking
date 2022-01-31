import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getAuthErrors, signUp } from '../../../../store/users';
import Button from '../../../common/Button/Button';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import Switch from '../../../common/Switch';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'Мужчина' },
  { id: 'female', title: 'Женщина' },
];

const initialData = {
  firstName: '',
  secondName: '',
  gender: 'male',
  birthYear: Date.now(),
  email: '',
  password: '',
  subscribe: false,
};

const RegisterForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(signUp(data));
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        data={data}
        errors={errors}
        handleChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      >
        <InputField autoFocus name='firstName' label='Имя' />
        <InputField name='secondName' label='Фамилия' />
        <RadioGroup name='gender' items={genderItems} />
        <DatePickerField
          openTo='year'
          mask='__.__.____'
          label='Дата Рождения'
          name='birthYear'
          minDate={new Date('1950-01-01')}
        />
        <InputField name='email' label='Почта' />
        <InputFieldWithPassword name='password' label='Пароль' type='password' />
        <Switch name='subscribe' label='Получать спецпредложения' />
        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Зарегистрироваться
        </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  );
};

export default RegisterForm;
