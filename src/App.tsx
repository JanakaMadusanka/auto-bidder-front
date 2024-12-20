import { useState } from 'react'
import './App.css'
import Home from './components/templates/Home'
import NavBar from './components/templates/NavBar'
import Sell from './components/templates/Sell'
import Auction from './components/templates/Auction'
import About from './components/templates/About'
import Contact from './components/templates/Contact'
import MyAuction from './components/templates/MyAuction'
import Footer from './components/templates/Footer'

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
      <Footer 
      homeButtonOnAction={() => setComponent(<Home />)}
      auctionButtonOnAction={() => setComponent(<Auction />)}
      sellButtonOnAction={() => setComponent(<Sell />)}
      myAuctionButtonOnAction={() => setComponent(<MyAuction />)}
      aboutButtonOnAction={() => setComponent(<About />)}
      contactButtonOnAction={() => setComponent(<Contact />)}
      />
    </div>
  )
}

export default App
