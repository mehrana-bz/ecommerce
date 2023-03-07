import {  Outlet } from 'react-router-dom';
import Header from '../Header/Header';
const Layout = () => {
    return (
        <main>
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </main>
    );
}

export default Layout;