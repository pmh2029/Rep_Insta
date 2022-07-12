import React from 'react';
import { Helmet } from 'react-helmet';
import GroupBody from '../components/GroupBody';
import Header from '../components/Header';

const Dashboard = () => (
    <div>
        <Helmet>
            <title>Instagram | Dashboard</title>
        </Helmet>
        <div className="h-screen overflow-auto">
            <Header />
            <GroupBody />
        </div>
    </div>
);
export default Dashboard;
