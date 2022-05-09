import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import getConfig from 'next/config'
import { ToastContainer } from 'react-toastify';


import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"


 

const PUBLIC_KEY = "pk_test_51KcqoWJoQcapggoAHWfJs23e0bQJXyu3rMs5OuwGqOg9e7keJgvuFLqH5EOztTS7P2FcuXCz8eBCLLuN38ZRuzY600J5tq8hep"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
 

import 'bootstrap-scss';
import '../public/assets/scss/flaticon.scss';
import '../public/assets/scss/font-awesome.scss';
import "../public/assets/scss/color-1.scss"
import '../public/assets/scss/themify.scss';
import "../public/assets/scss/slick.scss";
import "../public/assets/scss/slick-theme.scss";
import Customizer from '../containers/customizer';
import { StoreProvider } from '../utils/Store';
import UserContext from './api/userContext';
const { publicRuntimeConfig = {} } = getConfig() || {};

NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

function MyFunctionComponent({ children }) {
  const [loader, setLoader] = useState(true)
  const [goingUp, setGoingUp] = useState(false)

  useEffect(() => {
    // Page Loader
    setTimeout(() => {
      setLoader(false)
    }, 1500)

    // Tap to Top Scroll 
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 500)
        setGoingUp(true);
      else
        setGoingUp(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const tapToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    });
  }

  return (
    <>
      <Head>
        <title>Unice</title>
      </Head>
      {loader &&
        <div className="loader-wrapper">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>}
      <>{children}</>
      <div className="tap-top" style={goingUp ? { display: 'block' } : { display: 'none' }} onClick={tapToTop}>
        <div><i className="fa fa-angle-double-up"></i></div>
      </div>
    </>
  )
}

export default function MyApp({ Component, pageProps, graphql }) {
  const [context, setContext] = useState();

  return (
      <UserContext.Provider value={[context,setContext]}>
      <MyFunctionComponent>
      <StoreProvider>
      <Elements stripe={stripeTestPromise}>
        <Component {...pageProps} />
      </Elements>
        </StoreProvider>
        <Customizer />
      </MyFunctionComponent>
      <ToastContainer />
      </UserContext.Provider>
  )
}