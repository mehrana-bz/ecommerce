import {  Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <main>
            <div className="content">
                <Outlet/>
            </div>
        </main>
    );
}

export default Layout;