import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SiteNavbar from './components/SiteNavbar/SiteNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content/Content'
import Graph from './components/Graph/Graph';

ReactDOM.render(
  <React.StrictMode>
    <SiteNavbar></SiteNavbar>
    <Content>
    </Content>
    <Graph/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
