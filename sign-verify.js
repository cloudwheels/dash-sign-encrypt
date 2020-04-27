const Dash = require('dash');


const signerIdenityId='8xMwTCEfx41He8gJQk7bT4MXxu64CXJ4eoqdFAJYrZUg';

const signerMnemonic='reason ordinary reward number true unknown govern valve enact olympic recycle ask';

var signerIdenity = null;



const clientOpts = {
  network: 'testnet',
  mnemonic: signerMnemonic,
}

const client = new Dash.Client(clientOpts);


(async()=>{
  await client.isReady().then(async()=>{
    signerIdenity =  await client.platform.identities.get(signerIdenityId)
    
    const curIdentityHDKey = await client.account.getIdentityHDKey(0,'user').privateKey //.hdPublicKey; //var hdPublicKey = hdPrivateKey.hdPublicKey;
    
    //var derived = curIdentityHDKey.deriveChild("m/9'/1'/5'")
    
    var pubKeyDerived = curIdentityHDKey.publicKey
    
    var idenityPubKey = signerIdenity.getPublicKeyById(1)
    
    console.log(curIdentityHDKey);
    
    //console.log('derived:',derived);
    
    console.log('pubKeyDerived:', pubKeyDerived)
    
    console.log('idenityPubKey', idenityPubKey);
    
  });
  
  console.dir(signerIdenity);
  
  

})()





