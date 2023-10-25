import { useEffect, useState, useCallback } from 'react';

import styles from './App.module.scss';
import UserList from './components/user/UserList';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    const apiUrl = 'https://6511a930b8c6ce52b394dc63.mockapi.io/api/users/users';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error when fetching data.');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading ? (
        <p className={styles.loader}>Loading...</p>
      ) : (
        <UserList data={data} />
      )}
    </>
  );
}

export default App;
