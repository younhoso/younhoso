import { useState } from "react";
import Router from './Router';
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  return (
    <Router isAuthenticated={isAuthenticated} />
  );
}

export default App;
