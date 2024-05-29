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

  const [component, setComponent] = useState(<Home />)

  return (
    <div>
      <NavBar
        homeButtonOnAction={() => setComponent(<Home />)}
        auctionButtonOnAction={() => setComponent(<Auction />)}
        sellButtonOnAction={() => setComponent(<Sell />)}
        myAuctionButtonOnAction={() => setComponent(<MyAuction />)}
        aboutButtonOnAction={() => setComponent(<About />)}
        contactButtonOnAction={() => setComponent(<Contact />)}
      />
      <div className="pt-28"> {/* Add padding to the top to prevent content from being covered by the fixed NavBar */}
        {component}
      </div>
    </div>
  )
}

export default App
