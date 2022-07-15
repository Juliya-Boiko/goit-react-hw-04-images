import 'modern-normalize';
import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchQuery, searchParams } from './API/fetchQuery';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Idle } from './components/Idle/Idle';
import { LoaderSpinner } from './components/common/Loader/Loader';
import { UncorrectSearch } from './components/UncorrectSearch/UncorrectSearch';
import { PrimaryButton } from './components/common/PrimaryButton.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    q: '',
    page: 1,
    hits: [],
    totalHits: null,
    status: 'idle',
    lastPage: null,
  };

  componentDidUpdate(_, prevState) {
    const { page } = this.state;
    if (page !== 1 && prevState.page !== page) {
      this.setState({
        status: 'loading',
      });
      searchParams.page = page;
      fetchQuery(searchParams).then(response => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.data.hits],
          status: 'resolved',
        }));
      });
    }
  }

  handlerSearchbarSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Please, enter something!');
      return;
    } else {
      this.setState({
        status: 'loading',
        q: value,
        page: 1,
      });
      searchParams.q = value;
      fetchQuery(searchParams).then(response => {
        this.setState({
          lastPage: Math.ceil(response.data.totalHits / 12),
          hits: [...response.data.hits],
          totalHits: response.data.totalHits,
          status: 'resolved',
        });
      });
    }
  };

  handlerLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, lastPage, hits, totalHits, status } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handlerSearchbarSubmit} />
        {status === 'idle' && <Idle />}
        {status === 'resolved' && totalHits === 0 && <UncorrectSearch />}
        {totalHits > 0 && <ImageGallery items={hits} />}
        {status === 'loading' && <LoaderSpinner />}
        {totalHits > 12 && page !== lastPage && (
          <PrimaryButton type="button" onClick={this.handlerLoadMoreClick}>
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
}
