import ipfsAPI, { IpfsApiInstance } from 'ipfs-api'
let ipfs: IpfsApiInstance | void
const getIPFSGateway = async () => {
  if (ipfs) {
    return ipfs
  }
  ipfs = await ipfsAPI('localhost', '5001', { protocol: 'http' })
  return ipfs
}
export default getIPFSGateway
