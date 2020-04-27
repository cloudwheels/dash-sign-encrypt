const Dash = require('dash');
const ECIES = require('bitcore-ecies-dash');


/*
* ECIES
*/

(async()=>{

  const message = 'some secret message';
  
  const vendorIdentityName = 'admin';
  const vendorMnemonic = 'onion price educate farm area price enact faint fancy edge strike tiger';
  const vendorClient = new Dash.Client({network: 'testnet', mnemonic: vendorMnemonic});
  const vendorIdentityId = 'AP6djNhdR5SqR2c6J8YWiWwxE36HiRQe5rj1tyYGAKgL'
  const vendorIdentity =  await vendorClient.platform.identities.get(vendorIdentityId)
  
  const vendorPublicKeyFromId = await vendorIdentity.getPublicKeyById(1);
  const vendorPublicKeyFromIdData = await vendorPublicKeyFromId.getData();//base 64 enc public key
  
  //getOwnPrivateKey
  const vendorIdentityPrivateKey = await vendorClient.account.getIdentityHDKey(0,'user').privateKey;
  const vendorIdentityPublicKeyFromPrivateKey = new Dash.Core.PublicKey(vendorIdentityPrivateKey);
  
  console.log('vendorPublicKeyFromId',vendorPublicKeyFromId );
  console.log('vendorPublicKeyFromIdData',vendorPublicKeyFromIdData);
  
  const vendorPublicKeyBuffer = Buffer.from(vendorPublicKeyFromIdData, 'base64')
  console.log('vendorPublicKeyBuffer',vendorPublicKeyBuffer )
  const vendorPublicKeyFromBuffer = new Dash.Core.PublicKey(vendorPublicKeyBuffer)
  console.log('vendorPublicKeyFromBuffer', vendorPublicKeyFromBuffer)
  
  console.log('vendorIdentityPrivateKey',vendorIdentityPrivateKey)
  console.log('vendorIdentityPublicKeyFromPrivateKey',vendorIdentityPublicKeyFromPrivateKey)
  
  const vendorAddress = new Dash.Core.Address(vendorPublicKeyFromBuffer,Dash.Core.Networks.testnet);
  console.log('vendorAddress:', vendorAddress);
  
  

  const userIdentityName = 'user';
  const userMnemonic = 'snack immune develop side proof air dune melt replace cover apology joke';
  const userClient = new Dash.Client({network: 'testnet', mnemonic: userMnemonic});
  const userIdentityId = '36bwi6CqK5N94DzMxSMTae8Tax3s9y9zGq7zwAXP9ibQ';
  const userIdentity =  await userClient.platform.identities.get(userIdentityId);
  
  const userPublicKeyFromId = await userIdentity.getPublicKeyById(1);
  const userPublicKeyFromIdData = await userPublicKeyFromId.getData();//base 64 enc public key
  
  //getOwnPrivateKey
  const userIdentityPrivateKey = await userClient.account.getIdentityHDKey(0,'user').privateKey;
  
  
  const userIdentityPublicKeyFromPrivateKey = new Dash.Core.PublicKey(userIdentityPrivateKey);
  
  console.log('userPublicKeyFromId',userPublicKeyFromId )
  console.log('userPublicKeyFromIdData',userPublicKeyFromIdData);
  
  const userPublicKeyBuffer = Buffer.from(userPublicKeyFromIdData, 'base64')
  console.log('userPublicKeyBuffer',userPublicKeyBuffer )
  const userPublicKeyFromBuffer = new Dash.Core.PublicKey(userPublicKeyBuffer)
  console.log('userPublicKeyFromBuffer', userPublicKeyFromBuffer)
  
  console.log('userIdentityPrivateKey',userIdentityPrivateKey)
  console.log('userIdentityPublicKeyFromPrivateKey',userIdentityPublicKeyFromPrivateKey)
  
  
  //vendor encrypts
  const vendor = ECIES()
    .privateKey(vendorIdentityPrivateKey)
    .publicKey(userPublicKeyFromBuffer);//(userIdentityPublicKeyFromPrivateKey);
  
  const encrypted = vendor.encrypt(message);
  console.log('encrypted:',encrypted);
  
  //user decrypts
  const user = ECIES()
    .privateKey(userIdentityPrivateKey)
    .publicKey(vendorPublicKeyFromBuffer)//(vendorIdentityPublicKeyFromPrivateKey);
  const decrypted = user
    .decrypt(encrypted)
    .toString();
    
  console.log('decrypted:',decrypted);
  

})()



