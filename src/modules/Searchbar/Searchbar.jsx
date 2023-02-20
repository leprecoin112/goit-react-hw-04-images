import SearchForm from './SearchForm/SearchForm';
import styles from './Searchbar.module.scss';
function Searchbar({ onSubmit }) {
  return (
    <header className={styles.Searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
}

export default Searchbar;
