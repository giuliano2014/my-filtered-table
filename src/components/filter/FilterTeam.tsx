import { useState, ChangeEvent } from 'react';

import styles from './FilterTeam.module.scss';

interface FilterTeamProps {
  checkedItems: Record<string, boolean>;
  setCheckedItems: (items: Record<string, boolean>) => void;
}

const teams = [
  {
    label: 'Managers',
    value: 'Manager'
  },
  {
    label: 'QA Testers',
    value: 'QA Tester'
  },
  {
    label: 'Interns',
    value: 'Intern'
  },
  {
    label: 'Engineers',
    value: 'Engineer'
  }
];

const FilterTeam = ({ checkedItems, setCheckedItems }: FilterTeamProps) => {
  const [showList, setShowList] = useState(false);

  const handleButtonClick = (): void => {
    setShowList(prevShowList => !prevShowList);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  const handleResetFilter = (): void => {
    const resetCheckedItems = Object.fromEntries(
        Object.keys(checkedItems).map(key => [key, false])
    );
    setCheckedItems(resetCheckedItems);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.teamButton} onClick={handleButtonClick}>
        {showList ? 'Teams -' : 'Teams +'}
      </button>
      {showList && (
        <>
          <ul className={styles.comboBox}>
            {teams.map(({ label, value }) => (
              <li key={label}>
                <input
                  checked={!!checkedItems[value]} 
                  id={value}
                  name={value} 
                  onChange={handleCheckboxChange} 
                  type="checkbox" 
                />
                <label htmlFor={value}>{label}</label>
              </li>
            ))}
            <li>
              <button className={styles.resetButton} onClick={handleResetFilter}>
                Clear filters
              </button>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default FilterTeam;
