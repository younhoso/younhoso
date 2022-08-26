import Hello from "./component/Hello.tsx";
import styles from './App.module.css'

function App() {
  return (
    <div className="App">
      <Hello />
      <div className={styles.box}></div>
    </div>
  );
}

export default App;
