// import logo from './logo.svg';
// import './App.css';
import RubusApp from './RubusApp';
import { AuthProvider } from './contexts/AuthContext';

function App() {  
  return (
    <div className="App">
      <AuthProvider>
        <RubusApp />
      </AuthProvider>
    </div>
  );
}

export default App;
