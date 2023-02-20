import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'modules/Searchbar/Searchbar';
import pixaBayApi from 'shared/api/pixabay-api';
import ImageGallery from 'shared/components/ImageGallery/ImageGallery';
import Button from 'shared/components/Button/Button';
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const resetToDefault = () => {
    setPage(1);
    setItems([]);
    setLoading(false);
    setIsLoadMore(false);
  };

  const handleFormSubmit = value => {
    if (query !== value) {
      setQuery(value);

      resetToDefault();
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setIsLoadMore(false);

    if (query !== '') {
      setLoading(true);

      pixaBayApi
        .getImagesByName(query, page)
        .then(response => response.data)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            toast.warn('Nothing found. Try another query.');
          }
          const totalPages = totalHits / 12;
          if (page >= totalPages) {
            setIsLoadMore(false);
          } else {
            setIsLoadMore(true);
          }
          setItems(prevState => [...prevState, ...hits]);
        })
        .catch(error => console.log(error.messages))
        .finally(() => setLoading(false));
    }
  }, [page, query]);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <main>
        <section>
          <ImageGallery images={items} />
          {isLoadMore && (
            <Button type="button" title="Load more" onClick={loadMore} />
          )}
          {loading && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperClass={styles.loader}
              visible="true"
            />
          )}
        </section>
      </main>

      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
