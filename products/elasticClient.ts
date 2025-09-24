// elasticClient.ts
import { Client } from '@elastic/elasticsearch'

let client: Client | null = null

export const getElasticClient = () => {
  if (!client) {
    client = new Client({
      node: process.env.ELASTIC_URL || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTIC_USERNAME || 'elastic',
        password: process.env.ELASTIC_PASSWORD || 'password',
      },
    })
  }
  return client
}
