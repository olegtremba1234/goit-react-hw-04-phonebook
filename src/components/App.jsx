import React, { useState, useEffect } from "react";
import shortid from "shortid";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import Notification from "./Notification/Notification";
import style from "./App.module.css"

export default function App () {

  const [contacts, setContacs] = useState(
    JSON.parse( localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

    useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])


  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let isAdded = false;
    contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is alredy in contacts`);
        isAdded = true;
      }
    });

    if (isAdded) {
      return
    };

    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    setContacs(prevContacts => [...prevContacts, contact]);
  };

    const changeFilter = e => {
    setFilter(e.currentTarget.value.trim());
    };
  
   const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
   };
  
  const deleteContact = todoId => {
    setContacs(prevState => 
      prevState.filter(contact => contact.id !== todoId)
    );
  };

  const visibleContacts = getVisibleContacts();

    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2 className={style.titleContacts}>Contacts</h2>
        <div className={style.allContacts}>All contacts: {contacts.length}</div>
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
            />
          </>  
        ) : (
          <Notification message="Your contact list is empty! Please add new contacts!" />
        )}
      </div>
    );
  
}