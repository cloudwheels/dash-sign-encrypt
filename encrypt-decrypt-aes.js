
/*
* AES

const Dash = require('dash');

const userMnemonic='reason ordinary reward number true unknown govern valve enact olympic recycle ask';

const userName = '@user';

const vendorMnemonic = 'snack immune develop side proof air dune melt replace cover apology joke';

const PIN = 'secret';

const userClient = new Dash.Client({network: 'testnet', mnemonic: userMnemonic});

const vendorClient = new Dash.Client({network: 'testnet', mnemonic: vendorMnemonic});


console.log('userName:', userName);
console.log('shared secret / PIN:', PIN);

const encrypted = userClient.account.encrypt('aes',userName, PIN); //U2FsdGVkX19rurPNLStNm+NC8bEvMk1Da+584urEvU0=
console.log('encrypted:', encrypted);

const decrypted = vendorClient.account.decrypt('aes','U2FsdGVkX19rurPNLStNm+NC8bEvMk1Da+584urEvU0=', PIN);
console.log('decrypted:', decrypted);

console.log('decrypted === userName:', decrypted === userName); //true


*/