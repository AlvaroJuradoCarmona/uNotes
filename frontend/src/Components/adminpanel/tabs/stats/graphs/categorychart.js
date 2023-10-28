import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto"

import fileService from './../../../../../services/file.service'

export default function CategoryChart() {
   const [fileCountByCategory, setFileCountByCategory] = useState([]);
   const [labels, setLabels] = useState([]);
   const canvasRef = useRef(null);

   async function fetchData() {
        try {
            const fileCountCategory = await fileService.getFileCountByCategory();
            setLabels(fileCountCategory[0].map(category => category.name))
			setFileCountByCategory(fileCountCategory[0].map(category => category.total_files));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
    fetchData();
    }, []);

    useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
        label: 'Cantidad',
        data: fileCountByCategory,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(61, 197, 197)',
            'rgb(153, 102, 255)'
        ],
        hoverOffset: 4
        }]
      }
    });
    })

    return (
        <canvas ref={canvasRef} />
    );
}