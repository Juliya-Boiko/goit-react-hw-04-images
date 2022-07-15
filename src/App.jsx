import 'modern-normalize';
import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchQuery, searchParams } from './API/fetchQuery';
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
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    if (page !== 1) {
      setStatus('loading');
      searchParams.page = page;
      fetchQuery(searchParams).then(response => {
        setHits(prevHits => [...prevHits, ...response.data.hits]);
        setStatus('resolved');
      });
    }
  }, [page]);

  const handlerSearchbarSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Please, enter something!');
      return;
    } else {
      setStatus('loading');
      setQ(value);
      setPage(1);
      searchParams.q = value;
      fetchQuery(searchParams).then(response => {
        setLastPage(Math.ceil(response.data.totalHits / 12));
        setHits([...response.data.hits]);
        setTotalHits(response.data.totalHits);
        setStatus('resolved');
      });
    }
  };

  const handlerLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
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
// export class App extends Component {
//   state = {
//     q: '',
//     page: 1,
//     hits: [],
//     totalHits: null,
//     status: 'idle',
//     lastPage: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { page } = this.state;
//     if (page !== 1 && prevState.page !== page) {
//       this.setState({
//         status: 'loading',
//       });
//       searchParams.page = page;
//       fetchQuery(searchParams).then(response => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...response.data.hits],
//           status: 'resolved',
//         }));
//       });
//     }
//   }

//   handlerSearchbarSubmit = value => {
//     if (value.trim() === '') {
//       toast.warn('Please, enter something!');
//       return;
//     } else {
//       this.setState({
//         status: 'loading',
//         q: value,
//         page: 1,
//       });
//       searchParams.q = value;
//       fetchQuery(searchParams).then(response => {
//         this.setState({
//           lastPage: Math.ceil(response.data.totalHits / 12),
//           hits: [...response.data.hits],
//           totalHits: response.data.totalHits,
//           status: 'resolved',
//         });
//       });
//     }
//   };

//   handlerLoadMoreClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { page, lastPage, hits, totalHits, status } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.handlerSearchbarSubmit} />
//         {status === 'idle' && <Idle />}
//         {status === 'resolved' && totalHits === 0 && <UncorrectSearch />}
//         {totalHits > 0 && <ImageGallery items={hits} />}
//         {status === 'loading' && <LoaderSpinner />}
//         {totalHits > 12 && page !== lastPage && (
//           <PrimaryButton type="button" onClick={this.handlerLoadMoreClick}>
//             Load more
//           </PrimaryButton>
//         )}
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </div>
//     );
//   }
// }
