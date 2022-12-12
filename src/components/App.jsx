import React, { Component } from "react";
import shortid from "shortid";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import Notification from "./Notification/Notification";
import style from "./App.module.css"

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
    this.setState({ contacts: parsedContacts })
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.setState.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let isAdded = false;
    this.state.contacts.forEach(el => {
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
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

    changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
    };
  
   getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
   };
  
  deleteContact = todoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={style.titleContacts}>Contacts</h2>
        <div className={style.allContacts}>All contacts: {contacts.length}</div>
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
            />
          </>  
        ) : (
          <Notification message="Your contact list is empty! Please add new contacts!" />
        )}
      </div>
    );
  }
}

export default App;