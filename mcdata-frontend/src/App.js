import React from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage } from './homepage/homepage.js';
import { DataPage } from './datasets/datasets.js';
import { AboutPage } from './about/about.js';
import { AccountPage } from './account/account.js';


export default function App() {
  return (
    <Routes>
        <Route index element={<HomePage />} />
        <Route path="data" element={<DataPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="account" element={<AccountPage />} />
    </Routes>
  );
}