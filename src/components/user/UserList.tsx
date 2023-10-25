import styles from './UserList.module.scss';

export interface User {
  access: string[];
  avatar: string;
  email: string;
  groups: string[] | string;
  id: string;
  last_login: number;
  name: string;
}

interface UserListProps {
  data: User[];
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const dateString = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  const timeString = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);

  return `${dateString} - ${timeString}`;
}

const UserList = ({ data }: UserListProps) => {
  const handleMore = (): void => {
    console.log('handleMore');
  }

  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Teams</th>
            <th>Access</th>
            <th>Last Login</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ access, avatar, email, groups, id, last_login, name }) => (
            <tr key={`${name}-${id}`}> 
              <td>
                <div className={styles.user}>
                  <img src={avatar} alt={name} />
                  <div className={styles.infos}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.mail}>{email}</p>
                  </div>
                </div>
              </td>
              <td>
                { groups.length > 0 &&
                  <div className={styles.team}>
                    {groups}
                  </div>
                }
              </td>
              <td>
                <div className={styles.access}>
                  On {access.length} {access.length > 1 ? 'products' : 'product'}
                </div>
              </td>
              <td className={styles.lastLogin}>
                {formatDate(last_login)}
              </td>
              <td>
                <button
                  className={styles.more}
                  onClick={handleMore}
                >...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
