import Page from 'components/Layout/PageLayout';
import React from 'react';
import './Dashboard.scss';

const Home = () => {
  return (
    <Page classNameExtension='dashboard'>
      <div className='frame'>
      </div>
      <div className='stage'>
        <div className='box'>
        </div>
        <div className='box'>
        </div>
        <div className='box'>
        </div>
        <div className='box'>
        </div>
      </div>
    </Page>
  )
}

export default Home;