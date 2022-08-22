import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components"
import App from "./App";
import GlobalStyles from "@/styles/GlobalStyle"
import theme from "@/styles/theme"

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<App />
	</ThemeProvider>
);