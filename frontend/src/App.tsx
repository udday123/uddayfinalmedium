import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Blogwrapper } from './pages/Blogs'
import { Signupfinal } from './pages/SignupFinal'
import {Signinfinal} from './pages/SigninFinal'
import { WholeBlog } from './pages/Wholeblog'
import { CompletEditor } from './pages/EditorApp'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signinfinal/>}></Route>
      <Route path='/signup' element={<Signupfinal/>}></Route>
      <Route path='/blogs' element={<Blogwrapper/>}></Route>
      <Route path='/blog/:id' element={<WholeBlog />}></Route>
      <Route path='/createnewblog' element={<CompletEditor />} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
