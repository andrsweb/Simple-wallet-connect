import { useState, useEffect } from "react"
import { ChainProvider } from "@cosmos-kit/react"
import { ThemeProvider } from "@interchain-ui/react"
import { ChainRegistryClient } from "@chain-registry/client"
import { wallets as keplr } from "@cosmos-kit/keplr"
import { wallets as leap } from "@cosmos-kit/leap"
import ConnectButton from "../../components/buttons/ConnectButton/ConnectButton"
import "@interchain-ui/react/styles"
import { sessionOptions } from "./functions"
import { walletConnectOptions } from "./functions"

const client = new ChainRegistryClient({
	chainNames: ['stargaze'],
})

const Header = () => {
	const [chains, setChains] = useState<any[]>([])
	const [assets, setAssets] = useState<any[]>([])

	useEffect(() => {
		(async () => {
			await client.fetchUrls()
			const chainData = client.getChain('stargaze')
			const assetListData = client.getChainAssetList('stargaze')

			setChains([chainData])
			setAssets([assetListData])
		})()
	}, [])

	if (chains.length === 0 || assets.length === 0) {
		return <div>Loading...</div>
	}

	return (
		<ThemeProvider
			themeDefs={[
				{
					name: 'custom',
					vars: {
						colors: {
							primary500: '#1a73e8'
						},
						space: {
							sm: '8px',
							lg: '24px'
						}
					},
				}
			]}
			customTheme="custom"
		>
			<ChainProvider
				chains={chains}
				assetLists={assets}
				wallets={[...keplr, ...leap]}
				walletConnectOptions={walletConnectOptions}
				sessionOptions={sessionOptions}
			>
				<header>
					<nav>
						{chains.length > 0 && <ConnectButton chainName={chains[0].chain_name} />}
					</nav>
				</header>
			</ChainProvider>
		</ThemeProvider>
	)
}

export default Header