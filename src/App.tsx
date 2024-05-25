import { useState } from 'react'
import './App.css'
import Home from './templates/Home'
import NavBar from './templates/NavBar'
import Sell from './templates/Sell'
import Auction from './templates/Auction'
import About from './templates/About'
import Contact from './templates/Contact'
import MyAuction from './templates/MyAuction'

const App = () => {

  const [component,setComponnent] = useState (<Home/>)
  
  return (
    <div>
      <NavBar 
      homeButtonOnAction={()=>setComponnent(<Home/>)} 
      auctionButtonOnAction={()=>setComponnent(<Auction/>)}
      sellButtonOnAction={()=>setComponnent(<Sell/>)} 
      myAuctionButtonOnAction={()=>setComponnent(<MyAuction/>)} 
      aboutButtonOnAction={()=>setComponnent(<About/>)} 
      contactButtonOnAction={()=>setComponnent(<Contact/>)} />
      {component}
    </div>
  )
}

export default App
