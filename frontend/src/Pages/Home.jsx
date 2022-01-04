import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import background from '../Images/register_bg_2.png'
import 'react-multi-carousel/lib/styles.css';
import covid from '../Images/covidess.jpg'
import pharmacySvg from '../Images/pharmacy.svg'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import DesktopLayout from '../Layout/DesktopLayout';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import { useStateValue } from '../StateContext/StateProvider';
import Loading from '../Components/Loading/Loading';


//home page parent container
function Home() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = () => {
    setLoading(true)
    axios.get("http://localhost:5050/api/v1/drug/all")
      .then(function (response) {
        setProducts(response.data.products)
      })
      .catch(function (error) {
        console.log(error);
      });
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <DesktopLayout>
        <div className="below_header md:block hidden">
          <ul className="flex flex-row py-2 justify-between items-center px-3">
            <li>Covid Essentials</li>
            <li>Diabetes</li>
            <li>Fitness</li>
            <li>Eyewear</li>
            <li>Sexual Wellness</li>
            <li>Mom and Baby</li>
            <li>Diagnistic Packages</li>
          </ul>
        </div>
        <div className="items-center bg-gradient-to-b w-full min-h-screen from-blue-800 to-gray-50"  >
          <div className="bg-opacity-75 justify-between flex flex-col p-8 md:flex-row" style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh"
          }}>
            <div className="left py-8">
              <p className="text-4xl text-gray-900 font-bold">Your Wellness, Our Heartbeat</p>
              <p className="mt-8 w-2/3 text-gray-900">Quickly find where your medicals are located and Stop wasting time</p>
              <p className="w-2/3 text-gray-900">Claimant is free to use for everyone in need of medication</p>
              <div className="flex flex-row justify-between px-8 w-1/2">
                <Link to='/pharmacies' className="p-2 bg-blue-700 text-white rounded-md text-center mt-8 hover:bg-yellow-600 hover:text-gray-900 outline-none flex flex-row items-center">
                  <LocationSearchingIcon />
                  <p>Pharmacies</p>
                </Link>
                <div className="mr-8"></div>
                <Link to='/register' className="p-2 bg-blue-700 text-white mt-8 rounded-md text-center hover:bg-yellow-600 hover:text-gray-900 outline-none flex flex-row items-center">
                  <PersonAddIcon />
                  <p>Register</p>
                </Link>
              </div>
            </div>
            <div className="right w-1/2">
              <img src={pharmacySvg} alt="undraw" />
            </div>
          </div>

        </div>

        {/* //component for showinng products */}
        <div className="below px-8 mb-8">
          <div className="flex flex-col bg-white shadow p-4 rounded">
            <span className="flex flex-row justify-between">
              <p className="text-gray-500 text-sm uppercase font-bold">Shop Now</p>
              <Link to='/homeproducts' className="flex flex-row text-yellow-700 text-sm">
                <p>View All</p>
                <ArrowForwardOutlinedIcon fontSize="small" />
              </Link>
            </span>
            <p className="text-xs capitalize text-gray-700">Stay safe</p>
            <div className="mb-2"></div>
            <div className="flex flex-col items-center">
              {loading === false ? (<div className="container flex flex-row flex-wrap items-center justify-between">
                {products?.map(product => (
                  <HomeProducts
                    key={product._id}
                    name={product.name}
                    picture={`http://localhost:5050/${product.drugPictures[0].img}`}
                    category={product.category}
                    price={product.price}
                    discount={product.discountPrice}
                    description={product.description}
                    id={product._id}
                    owner={product.createdBy}
                    benefits={product.benefits}
                    dosage={product.dosage}
                    precaution={product.precaution}
                  />
                ))}
              </div>) : (<Loading />)}
            </div>
          </div>
        </div>

        {/* //component for showing categories */}
        <div className="below px-8">
          <div className="flex flex-col bg-white shadow p-4 rounded">
            <span className="flex flex-row justify-between">
              <p className="text-gray-500 text-sm uppercase font-bold">Our Categories</p>
              <Link to='/homeproducts' className="flex flex-row text-yellow-700 text-sm">
                <p>View All</p>
                <ArrowForwardOutlinedIcon fontSize="small" />
              </Link>
            </span>
            <p className="text-xs capitalize text-gray-700">Stay safe</p>
            <div className="mb-2"></div>
            {loading === false ? (<div className="container flex flex-row flex-wrap items-center justify-between">
              {products?.map(product =>(
                <HomeCategories
                name={product.category}
                picture={covid}
                description={product.description.slice(0, 50)}
              />
              ))}
            </div>): (<Loading/>)}
          </div>
        </div>
      </DesktopLayout>
    </div>
  )
}

//component for products
const HomeProducts = ({ id, name, picture, category, price, discount, description, owner, benefits, dosage, precaution }) => {

  const [{ }, dispatch] = useStateValue()
  const history = useHistory()

  const addToBasket = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        name: name,
        description: description,
        price: price,
        picture: picture,
        owner: owner,
        discount: discount,
        category: category
      }
    })
  }

  const setDesc = (e) => {
    e.preventDefault()
    const desc = {
      id: id,
      name: name,
      description: description,
      price: price,
      picture: picture,
      owner: owner,
      discount: discount,
      category: category,
      benefits: benefits,
      dosage: dosage,
      precaution: precaution
    }
    localStorage.setItem('desc', JSON.stringify(desc))
    history.push('/description')
  }

  return (
    <div className="border border-gray-300 rounded-md p-2 w-48 flex flex-col m-3">
      <span className="flex flex-col cursor-pointer" onClick={setDesc}>
        <div className="poicture" style={{ width: '160px', height: '160px' }} className="flex self-center flex-col justify-center">
          <img src={picture} alt="product__image" className="w-full self-center" />
        </div>
        <div className="mb-2"></div>
        <p className="text-sm text-gray-800 font-bold">{name}</p>
      </span>
      <span className="flex flex-row text-left">
        <p className="text-gray-500 text-sm">Cat:</p>
        <div className="mr-4"></div>
        <p className="text-gray-500 text-sm">{category}</p>
      </span>
      <span className="flex flex-row justify-between">
        <p className="text-gray-400">${price}</p>
        <p className="text-pink-500 text-lg font-bold">${discount}</p>
      </span>
      <div className="mb-2"></div>
      <button onClick={addToBasket} className="p-1 text-white bg-blue-700 w-5/6 self-center rounded flex flex-row hover:bg-blue-500 items-center justify-around">
        <AddShoppingCartOutlinedIcon fontSize="small" />
        <p>Add To Cart</p>
      </button>
    </div>
  )
}

//componet for categories
const HomeCategories = ({ name, picture, description }) => {
  return (
    <div className="border border-gray-300 rounded-md p-2 w-48 flex flex-col m-3">
      <div className="poicture" className="flex self-center flex-col justify-center">
        <img src={picture} alt="product__image" className="w-full self-center" />
      </div>
      <div className="mb-2"></div>
      <p className="text-gray-700 font-bold">{name}</p>
      <span className="flex flex-row justify-between">
        <p className="text-gray-400 text-xs">{description}...</p>
      </span>
      <div className="mb-2"></div>
      <button className="p-1 text-white bg-blue-700 w-5/6 self-center rounded flex flex-row hover:bg-blue-500 items-center justify-around">
        <p>Explore</p>
      </button>
    </div>
  )
}
export default Home
