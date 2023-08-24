import { createServer } from 'http'
import Core from './core'

// Creating new instance of core
const core = new Core()

export const start = async () => {
  const port = process.env.PORT
  // Running server
  await createServer(core.getApp()).listen(port, () =>
    console.log(`server is running on ${port}`)
  )
}
