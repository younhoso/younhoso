import { Helmet } from "react-helmet";
import ToasterProvider from "../contexts/ToasterProvider";
import { AuthProvider } from "../contexts/AuthProvider";

function Providers({ children }) {
  return (
    <ToasterProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToasterProvider>
  );
}

function App({ children }) {
  return (
    <Providers>
      <Helmet>
        <title>avtr</title>
      </Helmet>
      {children}
    </Providers>
  );
}

export default App;
