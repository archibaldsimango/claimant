import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard/Dashboard';
import Home from './Pages/Home';
import Products from './Dashboard/Products/Products';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { useStateValue } from './StateContext/StateProvider';
import PharmacyRoute from './HOC/PharmacyRoute';
import Customers from './Dashboard/Customers/Customers';
import Orders from './Dashboard/Orders/Orders';
import Settings from './Dashboard/Settings/Settings';
import Checkout from './Pages/Checkout/Checkout';
import Payment from './Pages/Payment/Payment';
import About from './Pages/About/About';
import ProductDescription from './Pages/ProductDescription/ProductDescription';
import Pharmacies from './Pages/Pharmacies/Pharmacies';
import Patients from './Dashboard/Patients/Patients';
import Notifications from './Dashboard/Notifications/Notifications';
import HomeProducts from './Pages/HomeProducts/HomeProducts';
import Loading from './Components/Loading/Loading';
import PharmacyCatalogue from './Pages/PharmacyCatalogue/PharmacyCatalogue';
// import 'react-quill/dist/quill.snow.css'; // ES6

function App() {

  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    setLoading(true)
    if (loggedInUser) {
      dispatch({
        type: 'SET_USER',
        user: loggedInUser
      })
    } else {
      dispatch({
        type: 'SET_USER',
        user: null,
      })
    }
    setLoading(false)
  }, [dispatch])

  return (
    <BrowserRouter>
      {loading === false ? (
        <div className="App">
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PharmacyRoute path='/dashboard' component={Dashboard} />
            <PharmacyRoute path='/products' component={Products} />
            <PharmacyRoute path='/customers' component={Customers} />
            <PharmacyRoute path='/orders' component={Orders} />
            <PharmacyRoute path='/settings' component={Settings} />
            <PharmacyRoute path='/patients' component={Patients} />
            <PharmacyRoute path='/notifications' component={Notifications} />
            <Route path='/pharmacy' component={PharmacyCatalogue} />
            <Route path='/pharmacies' component={Pharmacies} />
            <Route path='/homeproducts' component={HomeProducts} />
            <Route path='/description' component={ProductDescription} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/payment' component={Payment} />
            <Route path='/about' component={About} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      ): (<Loading/>)}
    </BrowserRouter>
  );
}

export default App;
