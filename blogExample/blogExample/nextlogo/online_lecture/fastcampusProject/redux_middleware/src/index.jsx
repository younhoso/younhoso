import ReactDOM from 'react-dom/client';
import logger from "redux-logger";
import { BrowserRouter } from 'react-router-dom';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import App from "./App";
import rootReducer from './modules';

const store = createStore(
	rootReducer, 
	composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);