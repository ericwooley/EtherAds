declare module 'ipfs-api' {
  // https://github.com/ipfs/js-ipfs-api
  export interface IpfsApiInstance {
    files: {
      // ipfs.files.add(data, [options], [callback]). Alias to ipfs.add.
      add(data: Buffer, options?: any, callback?: Function): any
      // ipfs.files.addReadableStream([options])
      addReadableStream(options?: Object): any
      // ipfs.files.addPullStream([options])
      addPullStream(options?: Object): any
      // ipfs.files.cat(ipfsPath, [options], [callback]). Alias to ipfs.cat.
      cat(ipfsPath: string, options?: Object, callback?: Function): any
      // ipfs.files.catReadableStream(ipfsPath, [options])
      catReadableStream(ipfsPath: string, options?: Object): any
      // ipfs.files.catPullStream(ipfsPath, [options])
      catPullStream(ipfsPath: string, options?: Object): any
      // ipfs.files.get(ipfsPath, [options], [callback]). Alias to ipfs.get.
      get(ipfsPath: string, options?: Object, callback?: Function): any
      // ipfs.files.getReadableStream(ipfsPath, [options])
      getReadableStream(ipfsPath: string, options?: Object): any
      // ipfs.files.getPullStream(ipfsPath, [options])
      getPullStream(ipfsPath: string, options?: Object): any
      // ipfs.ls(ipfsPath, [callback])
      ls(ipfsPath: string, callback?: Function): any
    }
  }
  function IpfsApi(
    host: string,
    port: string | number,
    options: { protocol: string }
  ): IpfsApiInstance
  function IpfsApi(connectionString: string): IpfsApiInstance

  export default IpfsApi
}
