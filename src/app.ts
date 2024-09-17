import fastify from 'fastify'
import { appRoutes } from './http/route'
import { ZodError } from 'zod'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation Error !', issues: error.format() })
  }

  if (process.env.NODE_DEV !== 'production') {
    console.error()
  } else {
    // log
  }

  return response.status(500).send({ message: 'Server Internal Error' })
})
