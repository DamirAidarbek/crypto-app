import { Layout, Card, Statistic, List, Typography, Tag } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useCrypto } from "../context/CryptoContext.jsx";

const AppSider = () => {
    const { assets } = useCrypto()

    return (
        <Layout.Sider width="25%" style={{ padding: '1rem' }}>
            {assets?.map(asset => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }} bordered={false}>
                    <Statistic
                        title={asset.name}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                        }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        dataSource={[
                            { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                            { title: 'Asset Amount', value: asset.amount, isPlain: true }
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text strong>{item.title}</Typography.Text>
                                {item.isPlain
                                    ? <Typography.Text>{item.value}</Typography.Text>
                                    : (
                                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                        {item.withTag && (
                                            <Tag color={asset.grow ? 'green' : 'red'}>
                                                {asset.growPercent} %
                                            </Tag>
                                        )}
                                        {item.value.toFixed(2)}%
                                    </Typography.Text>
                                )}
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}

export default AppSider
