import { createServer } from 'http'
import { connect, set } from 'mongoose'
import Core from './core'

// Creating new instance of core
const core = new Core()

export const start = async () => {
  try {
    // Setup database and set configurations mongodb
    set('strictQuery', false)
    await connect(process.env.DATABASE_URL)
    console.log('Database connected')

    // Running server
    const port = process.env.PORT
    await createServer(core.getApp()).listen(port, () =>
      console.log(`Server is running on ${port}`)
    )
  } catch (error) {
    throw error
  }
}
