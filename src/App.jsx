import 'modern-normalize';
import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchQuery } from './api/fetchQuery';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Idle } from './components/Idle/Idle';
import { LoaderSpinner } from './components/common/Loader/Loader';
import { UncorrectSearch } from './components/UncorrectSearch/UncorrectSearch';
import { PrimaryButton } from './components/common/PrimaryButton.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    if (q === '') {
      return;
    } else {
      setStatus('loading');
      fetchQuery({
        q: q,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      }).then(response => {
        setTotalHits(response.data.totalHits);
        setLastPage(Math.ceil(response.data.totalHits / 12));
        setHits(prevHits =>
          page === 1
            ? [...response.data.hits]
            : [...prevHits, ...response.data.hits]
        );
        setStatus('resolved');
      });
    }
  }, [q, page]);

  const handlerSearchbarSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Please, enter something!');
      return;
    } else {
      setPage(1);
      setStatus('loading');
      setQ(value);
      setHits([]);
      setTotalHits(null);
      setLastPage(null);
    }
  };

  const handlerLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handlerSearchbarSubmit} />
      {status === 'idle' && <Idle />}
      {status === 'resolved' && totalHits === 0 && <UncorrectSearch />}
      {totalHits > 0 && <ImageGallery items={hits} />}
      {status === 'loading' && <LoaderSpinner />}
      {totalHits > 12 && page !== lastPage && (
        <PrimaryButton type="button" onClick={handlerLoadMoreClick}>
          Load more
        </PrimaryButton>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
