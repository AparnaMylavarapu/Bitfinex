import { createStore } from 'redux';
import book from './reducer/book';

const store = createStore(book)

export default store;