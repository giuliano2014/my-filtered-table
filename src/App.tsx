import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './App.module.scss';
import FilterTeam from './components/filter/FilterTeam';
import UserList, { User } from './components/user/UserList';

const App = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allUnchecked = !Object.values(checkedItems).some(value => value);

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

  const filteredTeams = useMemo(() => {
    return allUnchecked ? data : data.filter(team => checkedItems[team.groups[0]]);
  }, [allUnchecked, checkedItems, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p className={styles.loader}>Loading...</p>
      ) : (
        <>
          <FilterTeam 
            checkedItems={checkedItems} 
            setCheckedItems={setCheckedItems}
          />
          <UserList data={filteredTeams} />
        </>
      )}
    </div>
  );
}

export default App;
