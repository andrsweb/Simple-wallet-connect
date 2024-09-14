export interface WalletConnectOptions {
	signClient: {
		projectId: string
	}
}

export interface SessionOptions {
	duration: number
	callback?: () => void
}

export interface CosmosKitWindow extends Window {
	cosmosKit?: {
		wallets: any[]
	}
}