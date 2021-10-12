import React, { useEffect, useState } from 'react';

import { Provider } from 'react-redux'
import store from './redux/store'

import Loading from './screens/loading';

import Navigation from './navigation/navigation'

//add dynamically generated titles for groups, post
//styles not applying in navcontainer
export default function App() {
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 500)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Provider store={store}>
      <Navigation />
   </Provider>    
  );
}
