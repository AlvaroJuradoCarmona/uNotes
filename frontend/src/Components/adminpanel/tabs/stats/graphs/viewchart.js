import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto"

import fileService from './../../../../../services/file.service'

export default function ViewsChart() {
   const [views, setViews] = useState([]);
   const canvasRef = useRef(null);

   async function fetchData() {
        try {
            const viewInfo = await fileService.getViewsByWeekDay();
            setViews(viewInfo[0].map(item => item.total_views))
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
        type: 'line',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [{
            label: '# de Visitas',
            data: views,
            borderColor: 'rgb(75, 192, 192)'
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                  callback: function(value) {if (value % 1 === 0) {return value;}}
              }
            }
          }
        }
      });
      }, [views])

    return (
        <canvas ref={canvasRef} />
    );
}