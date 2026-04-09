const crypto = require("crypto");

const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "spki",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
    },
});

process.stdout.write(
    JSON.stringify(
        {
            privateKey: keyPair.privateKey,
            publicKey: keyPair.publicKey,
        },
        null,
        4,
    ),
);
