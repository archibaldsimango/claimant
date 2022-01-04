import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import googleImage from '../../Images/google.svg'
import facebookImage from '../../Images/facebook.png'
import registerBackground from '../../Images/register_bg_2.png'
import logo from '../../Images/blueLogo.png'
import axios from 'axios'


function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState()
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMsg('Password Do Not Match')
    }
    else if (password.length < 6) {
      setMsg('Password less Than 6')
    }
    axios.post("http://localhost:5050/api/v1/auth/register", {
      username: username,
      password: password,
      email: email,
      password2: confirmPassword
    })
      .then(function (response) {
        setMsg(response.message)
        setTimeout(() => {
          history.push('/login')
        }, 2000);
      })
      .catch(function (error) {
        setMsg('Account Exists')
        console.log(error)
      });
  }


  return (
    <>
      <div className="flex flex-row justify-between items-center px-24 bg-gray-800 py-2 text-gray-200 text-bold uppercase">
        <Link to='/'>
          <img src={logo} alt="logo" className="w-8" />
        </Link>
        <Link to='/'>
          <p>Home</p>
        </Link>
      </div>
      <main>
        <section className=" w-full h-full bg-gray-800 py-10"
          style={{
            backgroundImage: `url(${registerBackground})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            minHeight: '100vh'
          }}
        >
          <div
            className="top-0 w-full h-full"

          ></div>
          <div className="container mx-auto h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-1/2 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign Un With
                        </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={facebookImage}
                        />
                          facebook
                        </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={googleImage}
                        />
                          Google
                        </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  {msg ? (<p className="p-1 bg-blue-400 text-center w-5/6 self-center rounded-md border border-blue-800">{msg}</p>) : null}
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign un with credentials</small>
                    </div>

                    {/* the sign up form */}
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                          </label>
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                          </label>
                        <input
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Username"
                          style={{ transition: "all .15s ease" }}
                          onChange={e => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                          </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                          </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          onClick={handleSubmit}
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Register
                          </button>
                      </div>
                      <div className="flex flex-wrap mt-6">
                        <div className="w-1/2">
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="customCheckLogin"
                                type="checkbox"
                                defaultChecked='off'
                                className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                                style={{ transition: "all .15s ease" }}
                                onChange={e => setAgree(e.target.value)}
                              />
                              <small className="ml-2 text-gray-700">
                                Agree to our terms?
                            </small>
                            </label>
                          </div>
                        </div>
                        <div className="w-1/2 text-right">
                          <Link to='/login'
                            className="text-gray-700"
                          >
                            <small>Already Registered?</small>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}


export default Register
