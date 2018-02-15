import loadIpfs from './ipfs-gateway'
export default async function uploadTextToIPFS(text: string, options?: Object) {
  const ipfs = await loadIpfs()
  const response = await ipfs.files.add(new Buffer(text), options)
  const ipfsId: string = response[0].hash
  return ipfsId
}
