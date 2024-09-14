import { WalletConnectOptions, SessionOptions, CosmosKitWindow } from "./types"

export const walletConnectOptions: WalletConnectOptions = {
	signClient: {
		projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "",
	}
}

export const sessionOptions: SessionOptions = {
    duration: 1800000, 
    callback: () => {
        const cosmosWindow = window as CosmosKitWindow
        const wallets = cosmosWindow?.cosmosKit?.wallets || []
        wallets.forEach((w: any) => w.disconnectAll(false))
        window?.localStorage.removeItem("cosmos-kit@2:core//current-wallet")
		window.localStorage.removeItem("cosmos-kit@2:core//accounts")
    },
}