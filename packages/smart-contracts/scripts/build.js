var solc = require('solc')
var fs = require('fs')
var {join} = require('path')
const chalk = require('chalk')
const rimraf = require('rimraf')
// paths
const CONTRACT_PATH = join(__dirname, '../src/')
const OUT_PATH = join(process.env.PWD, './build/')

const files = fs.readdirSync(CONTRACT_PATH)
const input = files.filter(fileName => fileName.split('.').pop() === 'sol').reduce((i, fileName) => {
  i[fileName] = fs.readFileSync(join(CONTRACT_PATH, fileName)).toString()
  return i
}, {})

function findImports (path) {
  try {
    return {contents: fs.readFileSync(join(process.env.PWD, path)).toString()}
  } catch (error) {
    console.error('error reading path', join(process.env.PWD, path), error)
    return {error}
  }
}

var output = solc.compile({ sources: input }, 1, findImports)
output.errors.forEach((error) => console.error(chalk.red(error)))
rimraf.sync(join(OUT_PATH, '*'))
Object.keys(output.contracts).forEach(contract => {
  const contractOut = output.contracts[contract]
  const contractName = contract.split(/\\|\//).pop()
  const outContractPath = join(OUT_PATH, contractName.replace(':', '-'))
  fs.mkdirSync(outContractPath)
  Object.keys(contractOut).forEach(key => {
    let srcData
    if (key === 'interface' || key === 'metadata') {
      srcData = JSON.stringify(JSON.parse(contractOut[key]), null, 2)
    } else if (typeof contractOut[key] === 'string') {
      srcData = contractOut[key]
    } else {
      srcData = JSON.stringify(contractOut[key], null, 2)
    }
    fs.writeFileSync(join(outContractPath, key + '.json'), srcData)
  })
})
