import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { getListAdmin } from "../../actions";
/**
* @author
* @function Home
**/

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getListAdmin());
  })
  return (
    // <Layout sidebar>
    <Layout>
    </Layout>
  )

}

export default Home