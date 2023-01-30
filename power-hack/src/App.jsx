import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './component/layout/layout';
import Signin from './component/auth/signin';
import PrivateOutlet from './gurd/privateOutlet';
import Home from './component/pages/home';
import Registration from './component/auth/registration';
import Bill from './component/bill/bill';

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="billings" element={<PrivateOutlet />}>
          <Route path="/billings" element={<Layout children={<Bill />} />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
