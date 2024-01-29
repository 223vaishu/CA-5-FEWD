import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Form from "./Components/Form";
import Home from "./Components/Home"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </Router>
  )
}
export default App

