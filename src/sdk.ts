import { ethers } from 'ethers'
import { providers } from '@0xsequence/multicall'
import { Signer } from '@ethersproject/abstract-signer'
import { Networkish } from '@ethersproject/providers'
import { SDKProvider } from '@common'

export interface SDKOptions {
  baseURL?: string
  network: Networkish
  provider: SDKProvider | string
}

export class ArcSDK {
  public sdkProvider: SDKProvider
  public provider: providers.MulticallProvider
  public rpc: string
  public chainId: number

  constructor({ network, provider, baseURL }: SDKOptions) {
    const sdkProvider = this.sdkProvider = ArcSDK.getSDKProvider(provider)
    this.rpc = provider as string
    this.provider = new providers.MulticallProvider(sdkProvider)
    this.chainId = 1
  }

  private static getSDKProvider(provider: SDKProvider | string): SDKProvider {
    let sdkProvider: SDKProvider
    if (typeof provider === 'string') {
      sdkProvider = new ethers.providers.JsonRpcProvider(provider)
    } else {
      sdkProvider = provider
    }
    return sdkProvider
  }
}