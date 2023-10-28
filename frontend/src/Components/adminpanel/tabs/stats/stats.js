import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import CategoryChart from './graphs/categorychart';
import ViewChart from './graphs/viewchart';

import userService from "./../../../../services/user.service"
import fileService from "./../../../../services/file.service"

import girlImage from './../../../../assets/girl-stats.png';

import './stats.css'

export default function StatsPanel() {
	const [newUserCount, setNewUserCount] = useState(0);
	const [newFileCount, setNewFileCount] = useState(0);
	const [newReportCount, setNewReportCount] = useState(0);

	const fetchData = useCallback(async () => {
		try {
			const newUserCountData = await userService.getUsersCountLastWeek();
			setNewUserCount(newUserCountData[0][0].userCount);
			const newFileCountData = await fileService.getFileCountLastWeek();
			setNewFileCount(newFileCountData[0][0].fileCount);
			const newReportCountData = await fileService.getReportCountLastWeek();
			setNewReportCount(newReportCountData[0][0].reportCount);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

  return (
    <>
		<div className='adminDataPanel'>
			<div className='adminDataTitle'>
				<h1>Últimos 7 días ...</h1>
			</div>
			<div className='adminDataContainer'>
				<div className='adminDataInfo'>
					<h3>Nuevos usuarios</h3>
					<h1>{newUserCount}</h1>
				</div>
				<div className='adminDataInfo'>
					<h3>Nuevos archivos</h3>
					<h1>{newFileCount}</h1>
				</div>
				<div className='adminDataInfo'>
					<h3>Nuevos reportes</h3>
					<h1>{newReportCount}</h1>
				</div>
				<img className='girlImage' src={girlImage} alt="Student" />
			</div>
		</div>
		<div className='statsChart'>
			<CategoryChart />
			<ViewChart />
		</div>
    </>
  );
  
}