import './App.css';
import AuthUser from './components/backend/Auth/AuthUser';
import Guest from './components/Guest';
import Admin from './components/pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const {getToken} = AuthUser();

  if(!getToken()){
    return (
    <Guest/>
    )
  }
  return (
    <Admin/>
  );
}

export default App;
