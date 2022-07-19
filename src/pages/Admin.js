import React from 'react';
import { Helmet } from 'react-helmet';
import Admin from '../components/Admin/Admin';
import Header from '../components/Header';

const AdminPage = () => (
    <div>
        <Helmet>
            <title>Instagram | Admin</title>
        </Helmet>
        <div className="h-screen overflow-auto">
            <Header />
            <Admin />
        </div>
    </div>
);

export default AdminPage;
