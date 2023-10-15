import Dropdown from '@/components/Dropdown';
import { useTheme } from '@/lib/ThemeContext';
import styles from '@/styles/Setting.module.css';
import { common } from '@/utils/common';

export default function Setting() {
  const {themeVider, setThemeVider} = useTheme();

  function handleDropdownChange(name, value) {
    const nextTheme = value;
    common.saveLocalStorage('theme', nextTheme);

    if(common.getLocalStorage('theme') === 'dark'){
      document.body.classList.remove('light');
      document.body.classList.add(nextTheme);
    } else if(common.getLocalStorage('theme') === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add(nextTheme);
    }
  };

  return (
    <>
        <h1 className={styles.title}>설정</h1>
        <section className={styles.section}>
        <h2 className={styles.sectionTitle}>테마 설정</h2>
        <Dropdown
            className={styles.dropdown}
            name="theme"
            value={themeVider}
            options={[
              { label: '다크', value: 'dark' },
              { label: '라이트', value: 'light' },
            ]}
            onChange={handleDropdownChange}
          />
      </section>
    </>
  );
}
