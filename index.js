
//const idPrivateKey = '90708725740cc7c5c013a4abc4f6156ea61a2adf178f147cf3d27c4185860c07'
const Dash = require('dash');
var clientOpts = {};
var client = null;

// This is the End User name previously registered in DPNS.
const enduserIdentityName = 'user';
const enduserMnemonic = 'snack immune develop side proof air dune melt replace cover apology joke';

const dappownerIdentityName = 'admin';
const memodappOwnerMnenomic = 'onion price educate farm area price enact faint fancy edge strike tiger';



 
 

//main funtion



(async() => {
  console.log('1. EndUser visits dapp webpage for first time over https\/\/:\n');
  console.log('2. EndUser requests registration of their username (@cloudwheels) by sumbmitting form to vendor\'s server\n');
  
  console.log('3. Vendor\'s server:\n');
  console.log('  a) starts a session  >>>\n\n');
  //vendor's start seesion with unautheicated claim
  
  console.log('  b) resolves EndUser Dash name to identity id >>>\n\n');
  //vendor's server resolves claimed username to identity
  const clientOpts = {
    network: 'testnet',
    mnemonic: 'onion price educate farm area price enact faint fancy edge strike tiger',
    apps: {
      loginContract: {
        contractId: '7kXTykyrTW192bCTKiMuEX2s15KExZaHKos8GrWCF21D'
      },
      memoContract: {
        contractId: '8y4BgoMmx484VMpfLMYj1rkRF7M7Dx8rhrN2GTJjWzZd'
      },
    }
  };
  client = new Dash.Client(clientOpts);
  var endUserIdenity = await client.isReady().then(await getIdentity(enduserIdentityName));
  
  
  console.log('\n\n  c) generates a unique code /OTP /shared secret and sends it to the browser over  https\/\/: with instructions>>>\n\n');
  //vendor's server generates unqiue code & send as response
  var uniqueCode = '123456';
  console.log('Your secret OTP is:', uniqueCode)
  
  console.log('\n\n  d) creates & signs a \'subscription request\' document ST \n\n');
  //vendor's server creates & signs a 'subscription request' document ST
  var dappownerIdentity = await client.isReady().then(await getIdentity(dappownerIdentityName));
  
  console.log('\n\nsending login document');
  await client.isReady().then(await submitLoginDocument('login',dappownerIdentity));
  
  console.log('\n\nget exising login documents');
  await client.isReady().then(await getDocuments());
  
  
})()





async function getIdentity(dashName) {
  try {
    const { identities, names } = client.platform;
    const identityId = (await names.get(dashName)).data.records
      .dashIdentity;
    console.log("identityid", identityId);
    const identity = await identities.get(identityId);
    console.log("identity", JSON.stringify(identity));
    return identity;
  } catch(e) {
    console.log("error", e);
  }
}


async function submitLoginDocument(msg, signingId) {

//    const platform = client.platform;
//    await client.isReady();
  
    try {
      const identity = await client.platform.identities.get('AP6djNhdR5SqR2c6J8YWiWwxE36HiRQe5rj1tyYGAKgL');

      docProperties = {
        message: msg + ' ' + new Date().toUTCString()
      }
      console.log('doc props', docProperties)
      // Create the note document
      const loginDocument = await client.platform.documents.create(
        'loginContract.login',
        identity,
        docProperties,
      );
      console.log('document created');
      console.dir({loginDocument});
      // Sign and submit the document
      await client.platform.documents.broadcast(loginDocument, identity);
      console.log('document submitted');
    } catch(e) {
      console.log('Something went wrong:', e);
    }
  }
  
async function getDocuments() {
  try {
    //await client.isReady();
    
    const queryOpts = {
      //limit: 1 // Only retrieve 1 document
    };
    const documents = await client.platform.documents.get(
      'loginContract.login',
      queryOpts
    );
    console.log('docs:',documents);
  } catch (e) {
    console.error('Something went wrong:', e);
  } finally {
    client.disconnect();
  }
}



/*
const client = new Dash.Client(clientOpts);

const message = new Dash.Core.Message('hello, world');


const signAndVerify = async function () {
  const {account} = client;
  

//  const mnemonic = wallet.exportWallet();
//  console.log('Mnemonic:', mnemonic);

//  const idKey = account.getIdentityHDKey()
  
//  const idPrivateKey = idKey.privateKey;
  
  const idPrivateKey = new Dash.Core.PrivateKey('90708725740cc7c5c013a4abc4f6156ea61a2adf178f147cf3d27c4185860c07');
  
  const idAddress = idPrivateKey.toAddress().toString()
  console.log('address', idAddress);

  const signed = message.sign(idPrivateKey);
  console.log('sig:',signed);
  const verify = message.verify(idAddress, signed.toString());
  console.log('verify:',verify);
};
client.isReady().then(signAndVerify);
*/




