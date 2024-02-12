import { Form, Button, InputNumber, DatePicker, Select, Space, Result } from 'antd'
import { useRef, useState } from 'react'
import { useCrypto } from './context/CryptoContext.jsx'
import CoinInfo from './CoinInfo.jsx'

const validateMessage = {
    required: '${label} is required',
    types: {
        number: '${label} is not valid number'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

export const AddAssetForm = ({ onClose }) => {
    const [form] = Form.useForm()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { crypto, addAsset } = useCrypto()
    const assetRef = useRef()

    const selectCoin = (coin) => {
        setCoin(crypto.find(c => c.id === coin))
    }

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    };

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset added"
                subTitle={`Added ${assetRef.current?.amount} of ${coin.name} by price ${assetRef.current?.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Go Back
                    </Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{
                    width: '200px',
                }}
                placeholder="Select coin"
                onSelect={selectCoin}
                optionLabelProp="label"
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
        )
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2)
            }}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessage}
        >

            <CoinInfo coin={coin} />

            <Form.Item
                style={{ marginTop: '1rem' }}
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number'
                    },
                ]}
            >
                <InputNumber onChange={handleAmountChange} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item
                label="Date & Time"
                name="date"
            >
                <DatePicker showTime />
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add asset
                </Button>
            </Form.Item>
        </Form>
    )
}
