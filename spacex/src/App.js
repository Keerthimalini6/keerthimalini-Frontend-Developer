
import './App.css';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import 'tailwindcss/tailwind.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Capsule } from './Components/Capsule';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/capsule" element={<Capsule/>} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
