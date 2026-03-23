const crypto = require('crypto')

const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
})

console.log('privateKey', keyPair.privateKey)
console.log('publicKey', keyPair.publicKey)
