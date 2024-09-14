import { useEffect, useState } from "react"
import { useChain } from "@cosmos-kit/react"
import { SigningStargateClient } from "@cosmjs/stargate"
import { RPC_ENDPOINT } from "../../../global/constants"

const ConnectButton = ({ chainName }: { chainName: string }) => {
	const { connect, isWalletConnected, address, disconnect } = useChain(chainName)
	const [balance, setBalance] = useState<number>(0)
	const [isFetchingBalance, setFetchingBalance] = useState<boolean>(false)

	const handleConnect = async () => {
		if (!isWalletConnected) {
			try {
				await connect()
				if (address) {
					fetchBalance()
				}
			} catch (error) {
				console.error("Connection error:", error)
			}
		}
	}

	const fetchBalance = async () => {
		if (!address) return

		setFetchingBalance(true)

		try {
			const client = await SigningStargateClient.connect(RPC_ENDPOINT)

			const balances = await client.getAllBalances(address)

			const starBalance = balances.find(c => c.denom === "ustars")

			if (starBalance) {
				const amountInUnits = parseInt(starBalance.amount) / 1000000
				setBalance(amountInUnits)
			} else {
				setBalance(0)
			}
		} catch (error) {
			console.error("Error fetching balance:", error)
			setBalance(0)
		}

		setFetchingBalance(false)
	}

	useEffect(() => {
		if (isWalletConnected && address) {
			fetchBalance()
		}
	}, [isWalletConnected, address])

	return (
		<div>
			{isWalletConnected ? (
				<div>
					<p>Connected: {address}</p>
					{isFetchingBalance ? (
						<div className='loader'></div>
					) : (
						<p>Balance: {balance.toFixed(2)} stars</p>
					)}
					<button onClick={() => disconnect()}>Disconnect</button>
				</div>
			) : (
				<button onClick={handleConnect}>Connect to Wallet</button>
			)}
		</div>
	)
}

export default ConnectButton
