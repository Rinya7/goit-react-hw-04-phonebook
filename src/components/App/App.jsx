import { Container } from './App.styled';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState(readFromLocalstoredg());
  const [filter, setFilter] = useState('');

  function readFromLocalstoredg() {
    const localContacts = JSON.parse(localStorage.getItem('thisStat'));
    return localContacts ? JSON.parse(localStorage.getItem('thisStat')) : [];
  }

  useEffect(() => {
    window.localStorage.setItem('thisStat', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactSubmits = (name, number) => {
    const simpleContact = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
        contact.number === number
    );

    if (simpleContact) {
      return alert(`${name} or ${number} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
  };

  const filterState = evt => {
    setFilter(evt.target.value);
  };

  const filterByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactsForm onSubmitForm={handleContactSubmits} />
      <h2>Contacts</h2>
      <Filter filter={filter} filterForm={filterState} />
      <ContactList contacts={filterByName()} buttonDelete={deleteContact} />
    </Container>
  );
}
