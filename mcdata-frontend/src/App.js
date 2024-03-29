import React from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage } from './homepage/homepage.js';
import { DatasetHomepage } from './datasets/datasets.js';
import { AboutPage } from './about/about.js';
import { AccountPage } from './account/account.js';
import { DataHomepage } from './datasets/datahomepage.js';


export default function App() {
  return (
    <Routes>
        <Route index element={<HomePage />} />
        <Route path="data" element={<DataHomepage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="datasethomepage" element={<DatasetHomepage />} />
    </Routes>
  );
}