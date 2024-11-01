import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IdManager() {
  const [ids, setIds] = useState([]);
  const [newId, setNewId] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const vite_validate_url = import.meta.env.VITE_VALIDATE_URL;

  useEffect(() => {
    axios.get(`${vite_validate_url}/get-all-ids`, {
      headers: {
        'Access-Key': accessKey
      }
    })
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setIds(data);
        } else if (data !== null && data !== undefined) {
          setIds([data]);
        } else {
          setIds([]);
        }
      })
      .catch(error => {
        console.error(error);
        setIds([]); // Set ids to an empty array on error
      });
  }, [accessKey]);

  const handleAddId = () => {
    axios.post(`${vite_validate_url}/add-id`, {
      id: newId,
      access_key: accessKey
    })
      .then(response => {
        setIds([...ids, newId]);
        setNewId('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteId = (id) => {
    axios.post(`${vite_validate_url}/delete-id`, {
      id,
      access_key: accessKey
    })
      .then(response => {
        setIds(ids.filter((id) => id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>ID Manager</h1>
      <input
        type="text"
        value={newId}
        onChange={(e) => setNewId(e.target.value)}
        placeholder="Enter new ID"
      />
      <br />
      <input
        type="text"
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
        placeholder="Enter access key"
      />
      <br />
      <button className="btn btn-success" onClick={handleAddId}>Add ID</button>
      <br />

      <ul>
        {ids.length > 0 ? (
          ids.map((id) => (
            <li key={id}>
              {id}
              <button className="btn btn-danger" onClick={() => handleDeleteId(id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No ids</li>
        )}
      </ul>
    </div>
  );
}

export default IdManager;