import React from 'react';
import styles from '../styles/LinkCard.module.css';

const LinkCard = ({ link, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <h3 className={styles.title}>{link.title}</h3>
      </a>
      <p className={styles.description}>{link.description}</p>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(link)}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(link._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default LinkCard;