import './Style.scss';
import { Provider } from 'react-redux';
import store from './configureStore';
import Home from './Home';


function App() {
  return (
    <Provider store={store}>
      <div>
      <Home></Home>
      </div>
    </Provider>
    
  );
}

export default App;
