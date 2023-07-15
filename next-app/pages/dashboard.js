```javascript
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import LinkForm from '../components/LinkForm';
import LinkCard from '../components/LinkCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [session, loading] = useSession();
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState('');

  const fetchLinks = async () => {
    const res = await axios.get('/api/links');
    setLinks(res.data);
  };

  const addLink = async (link) => {
    const res = await axios.post('/api/links', link);
    fetchLinks();
    setMessage('LINK_ADD_SUCCESS');
  };

  const editLink = async (id, updatedLink) => {
    const res = await axios.put(`/api/links/${id}`, updatedLink);
    fetchLinks();
    setMessage('LINK_EDIT_SUCCESS');
  };

  const deleteLink = async (id) => {
    const res = await axios.delete(`/api/links/${id}`);
    fetchLinks();
    setMessage('LINK_DELETE_SUCCESS');
  };

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>You must be logged in to view this page.</div>;

  return (
    <div>
      <Header />
      <h1>Welcome, {session.user.name}</h1>
      <LinkForm addLink={addLink} />
      <div id="linkList">
        {links.map((link) => (
          <LinkCard key={link._id} link={link} editLink={editLink} deleteLink={deleteLink} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
```