import { createServer } from 'http'
import Core from './core'

// Creating new instance of core
const core = new Core()

export const start = async () => {
  // Running server
  await createServer(core.getApp()).listen(process.env.PORT, () =>
    console.log('server is running')
  )
}
