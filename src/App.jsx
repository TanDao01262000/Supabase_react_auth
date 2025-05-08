import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ProfileUpdate from './pages/ProfileUpdate';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/profileupdate' element={<ProfileUpdate/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;