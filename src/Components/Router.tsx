import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import pages from '../utils/consts/pages';

const Stub = () => <h1 style={{color: 'white'}}>
	Сервис в разработке
</h1>;

const defaultPage = pages[0].name;

const Router = () => (<Routes>
	<Route path="/" element={<Navigate to={defaultPage} />} />
	{pages.map(page => 
		<Route key={page.name} path={page.name} element={page.Component ? <page.Component /> : <Stub />} />
	)}
	<Route path="*" element={<Navigate to={defaultPage} />} />
</Routes>)

export default Router