import logo from './logo.svg';
import './App.css';
import HomeLogin from './components/HomeLogin';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HomeLogin />
      </AuthProvider>
    </div>
  );
}

export default App;
