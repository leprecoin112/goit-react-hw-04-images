import styles from './SearchForm.module.scss';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your request.');
      return;
    }

    onSubmit(query);
  };
  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles['SearchForm-button']}>
        <BsSearch className={styles['SearchForm-button-icon']} />
      </button>

      <input
        value={query}
        name="search"
        onChange={handleSearchChange}
        className={styles['SearchForm-input']}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchForm;
