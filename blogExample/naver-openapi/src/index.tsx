import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components"
import { Provider } from 'react-redux'
import App from "./App";
import GlobalStyles from "@/styles/GlobalStyle"
import theme from "@/styles/theme"
import store from '@/modules/configStore';

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<App />
		</ThemeProvider>
	</Provider>
);