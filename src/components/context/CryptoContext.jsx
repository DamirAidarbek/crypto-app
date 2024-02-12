import {createContext, useContext, useEffect, useState} from "react";
import { fetchAssets, fetchCrypto } from "../../api.js";
import { percentDifference } from "../../utils.js";

const CryptoContext = createContext({
    isLoading: false,
    crypto: [],
    assets: [],
})

export const CryptoProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            }
        })
    }

    const addAsset = (newAsset) => {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    useEffect(() => {
        async function preload() {
            setIsLoading(true)
            const { result } = await fetchCrypto()
            const assets = await fetchAssets()
            setCrypto(result)
            setAssets(mapAssets(assets, result))
            setIsLoading(false)
        }

        preload()
    }, []);

    return (
        <CryptoContext.Provider value={{ isLoading, crypto, assets, addAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}

export function useCrypto() {
    return useContext(CryptoContext)
}
