import { Layout } from 'antd';
import AppSider from "./AppSider.jsx";
import AppHeader from "./AppHeader.jsx";
import AppContent from "./AppContent.jsx";


const AppLayout = () => (

        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>

);

export default AppLayout;
