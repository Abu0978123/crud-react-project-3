import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Home from "./components/Home";
import View from "./components/View";
export default function IndexPage3() {
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/view/:id" element={<View/>}/>
            <Route exact path="/edit/:id" element={<Edit/>}/>
          </Routes>
          </BrowserRouter> 
    </>
  )
}