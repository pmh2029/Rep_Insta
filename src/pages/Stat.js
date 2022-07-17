import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import BarChart from '../components/Chart/Chart';

const Stat = () => {

    console.log("Getting stat");
    return (
        <div>
            <Helmet>
                <title>Instagram | Stat</title>
            </Helmet>
            <div className="h-screen overflow-auto">
                <Header />
                <BarChart />
            </div>

        </div>
    );
};

export default Stat;
