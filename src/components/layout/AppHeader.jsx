import { Button, Drawer, Flex, Layout, Modal, Select, Space } from 'antd'
import { useCrypto } from '../context/CryptoContext.jsx'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal.jsx'
import { AddAssetForm } from '../AddAssetForm.jsx'

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 65,
    padding: '1rem',
    backgroundColor: '#23518a',
};

const AppHeader = () => {
    const { crypto } = useCrypto()
    const [coin, setCoin] = useState({});
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [select, setSelect] = useState(false);

    const toggleSelect = () => {
        setSelect(prev => !prev);
    };

    const cancelModal = () => {
        setModal(false)
    }

    const handleChange = (value) => {
        setCoin(crypto.find((coin) => coin.id === value))
        setModal(true)
    };

    const openDrawer = () => {
        setDrawer(true)
    }

    const closeDrawer = () => {
        setDrawer(false)
    }

    useEffect(() => {
        function keypress(event) {
            if (event.key === '/') {
                toggleSelect()
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    return (
        <Layout.Header style={headerStyle}>
            <Flex align='center' justify='space-between'>
                <Select
                    style={{
                        width: '200px',
                    }}
                    onClick={toggleSelect}
                    placeholder="PRESS / to select coin"
                    onSelect={handleChange}
                    optionLabelProp="label"
                    open={select}
                    options={crypto.map(coin => ({
                        label: coin.name,
                        value: coin.id,
                        emoji: coin.icon,
                    }))}
                    optionRender={(option) => {
                        return (
                            <Space>
                                <img
                                    src={option.data.emoji}
                                    alt={option.data.name}
                                    style={{ width: 20 }}
                                />
                                {option.data.label}
                            </Space>
                    )}}
                />
                <Button onClick={openDrawer}>
                    Add asset
                </Button>
            </Flex>

            <CoinInfoModal
                coin={coin}
                open={modal}
                onCancel={cancelModal}
                footer={null}
            />

            <Drawer title="Add asset" onClose={closeDrawer} open={drawer} destroyOnClose>
                <AddAssetForm onClose={closeDrawer} />
            </Drawer>

        </Layout.Header>
    )
}

export default AppHeader
