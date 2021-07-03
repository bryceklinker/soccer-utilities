import { CosmosOptions } from '@soccer-utilities/data-access';

export default (): {cosmos: CosmosOptions} => ({
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT || 'https://accountname.documents.azure.com:443/',
    key: process.env.COSMOS_KEY || ''
  }
})
