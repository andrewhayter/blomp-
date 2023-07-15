import React from 'react';
import styles from '../styles/ProfileCard.module.css';

const ProfileCard = ({ user, links }) => {
  return (
    <div className={styles.profileCard}>
      <h2 className={styles.userName}>{user.name}</h2>
      <ul className={styles.linkList}>
        {links.map((link, index) => (
          <li key={index} className={styles.linkItem}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCard;