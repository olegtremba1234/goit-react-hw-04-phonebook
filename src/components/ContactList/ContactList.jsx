import PropTypes from "prop-types";
import style from "./ContactList.module.css";
import { ReactComponent as Delete } from "./delete-icon.svg";

export default function ContactList({ contacts, onDeleteContact }) {
    return (
        <ul className={style.list}>
            {contacts.map(({ id, name, number }) => (
                <li key={id} className={style.item}>
                    <p className={style.contact}>
                        {name}............
                        {number}
                    </p>
                    <button
                        className={style.btn}
                        type="submit"
                        onClick={() => onDeleteContact(id)}
                    >
                        <Delete
                          style={{
                            width: '26px',
                            height: '20px',
                          }}
                        />
                    </button>
                </li>
            ))}
        </ul>
    )
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onDeleteContact: PropTypes.func.isRequired
};