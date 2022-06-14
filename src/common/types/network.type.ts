import { Signer, providers } from 'ethers'

export type Address = string
export type TVL = string
export type APY = string
export type APR = string

export type SignerOrProvider = Signer | providers.Provider