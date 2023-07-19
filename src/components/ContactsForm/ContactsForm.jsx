import PropTypes from 'prop-types';
import { Form, FildInput, Label, Button, Div } from './ContactsForm.styled';
const { useState } = require('react');

export function ContactsForm({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNamber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNamber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmitForm(name, number);
    setName('');
    setNamber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Div>
        <Label htmlFor="Name">Name</Label>
        <FildInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor="Number">Number</Label>
        <FildInput
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Div>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}

 

ContactsForm.protoType = {
  onSubmitForm: PropTypes.func,
};
