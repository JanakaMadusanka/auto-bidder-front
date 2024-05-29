import { Carousel } from "@material-tailwind/react"
import img1 from "../assets/home/carosul1.png"
import img2 from "../assets/home/carosul2.png"
import img3 from "../assets/home/carosul3.png"
import img4 from "../assets/home/carosul4.png"
import img5 from "../assets/home/audi-homepage.png"




const Home = () => {
    return (
        <div>
            <Carousel>
                <img
                    src={img1}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <img
                    src={img2}
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <img
                    src={img3}
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
                <img
                    src={img4}
                    alt="image 4"
                    className="h-full w-full object-cover"
                />
                <img
                    src={img5}
                    alt="image 4"
                    className="h-full w-full object-cover"
                />
            </Carousel>
            <div className="absolute">
                <p className="text-4xl">Online Auto Auction for User Vehicle in Sri Lanka</p>
            </div>
        </div>
    )
}

export default Home