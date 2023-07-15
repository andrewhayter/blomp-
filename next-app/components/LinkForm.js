import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/LinkForm.module.css';

const LinkForm = ({ link, onSuccess }) => {
  const [title, setTitle] = useState(link ? link.title : '');
  const [url, setUrl] = useState(link ? link.url : '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = link
        ? await axios.put(`/api/links/${link._id}`, { title, url })
        : await axios.post('/api/links', { title, url });

      onSuccess(res.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>
        {link ? 'Update' : 'Add'} Link
      </button>
    </form>
  );
};

export default LinkForm;