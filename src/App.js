
import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar';

import Newscomponentcwh from './components/Newscomponent/Newscomponentcwh';

import Toploader from "./components/Toploader/toploader"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  const [loadwidth,setloadwidth]= useState(0)


 const handlebar= ()=>{  
    setloadwidth(100)
    setTimeout(() => {
     setloadwidth(0)
    }, 500);
  }
  return (
  
      // <div>is first class based component made by {fname}</div>

      <Router>

        <Toploader width={loadwidth}/>

       <Navbar ></Navbar>


        <Routes>

          <Route  path='/' exact element={
        <Newscomponentcwh key={'/'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}}
        category={"general"}  badgecolor ={"primary"} apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route key={'/about'} path='/about' exact element={
        <Newscomponentcwh settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"general"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route path='/business' exact element={
        <Newscomponentcwh  key={'/business'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"business"} badgecolor ={"danger"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/entertainment' exact element={
        <Newscomponentcwh key={'/entertainment'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"entertainment"} badgecolor ={"success"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/general' exact element={
        <Newscomponentcwh key={'/general'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"general"} badgecolor ={"warning"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/health' exact element={
        <Newscomponentcwh key={'/health'} settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"health"} badgecolor ={"info"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/science' exact element={
        <Newscomponentcwh key={'/science'} settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"science"} badgecolor ={"light"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/sports' exact element={
        <Newscomponentcwh key={'/sports'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"sports"} badgecolor ={"dark"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
          <Route  path='/technology' exact element={
        <Newscomponentcwh key={'/technology'}  settopload={(value) => {value !== 100 ? setloadwidth(value) : handlebar()}} category={"technology"} badgecolor ={"secondary"}apikey={"d641fcccf15e4f24b496a13bb43d689b"}/>}>
          </Route>
        </Routes>


      </Router>


     
    )
}

export default App;
