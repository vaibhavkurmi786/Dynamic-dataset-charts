import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ChartComponent = ({ filter, dataUpdated }) => {
    const [data, setData] = useState([]);


    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`/api/get-points?filter=${filter}`);
            console.log("Received data:", res.data);
            const processedData = res.data.map(item => ({
                ...item,
                price: item.price || 0,
                timestamp: new Date(item.timestamp).toLocaleString()
            }));
            setData(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [filter]);

  useEffect(() => {
        fetchData();
    }, [fetchData, dataUpdated]);


    console.log("Data in ChartComponent:", data);

    return (
        <ResponsiveContainer  height={500} className={`-ml-9 sm:w-5/6`}>
            {data.length > 0 ? (

                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                ) : (
                <div>No data available</div>
            )}
        </ResponsiveContainer>
    );
};

export default ChartComponent;
