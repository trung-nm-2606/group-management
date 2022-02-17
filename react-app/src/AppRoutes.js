import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Groups from './groups';
import Home from './Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/groups" element={<Groups />}>
      <Route path="info" element={<Groups />}/>
      <Route path="fund" element={<Groups />}/>
      <Route path="members" element={<Groups />}/>
    </Route>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;
