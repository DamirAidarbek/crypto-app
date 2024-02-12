import { Divider, Modal, Tag, Typography } from 'antd'
import CoinInfo from './CoinInfo.jsx'


const CoinInfoModal = ({ coin, open, onCancel }) => {
    return (
        <Modal open={open} onCancel={onCancel} footer={null}>
            <CoinInfo coin={coin} />
            <Divider />
            <Typography.Paragraph>
                <Typography.Text strong>1 hour : </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                <Typography.Text strong>1 day : </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
                <Typography.Text strong>1 week : </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                {coin.marketCap}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Contract Address : </Typography.Text>
                {coin.symbol}
            </Typography.Paragraph>
        </Modal>
    )
}

export default CoinInfoModal
