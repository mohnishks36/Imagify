
import { createRoot } from 'react-dom/client'
import AppContextProvider from './context/AppContext.jsx';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
      <App />
  </AppContextProvider>
  </BrowserRouter>

  ,
)
