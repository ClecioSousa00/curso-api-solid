// import { app } from '@/app'
// import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
// import request from 'supertest'
// import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// describe('Search Gym (e2e)', () => {
//   beforeAll(async () => {
//     await app.ready()
//   })

//   afterAll(async () => {
//     await app.close()
//   })

//   it('should be able to search gyms by title ', async () => {
//     const { token } = await createAndAuthenticateUser(app)

//     // await request(app.server)
//     //   .post('/gyms')
//     //   .set('Authorization', `Bearer ${token}`)
//     //   .send({
//     //     title: 'gym - teste',
//     //     description: 'teste',
//     //     phone: '12345678901',
//     //     latitude: -27.2092052,
//     //     longitude: -49.6401091,
//     //   })

//     const response = await request(app.server)
//       .post('/gyms')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         title: 'gym - teste',
//         description: 'teste',
//         phone: '12345678901',
//         latitude: -27.2092052,
//         longitude: -49.6401091,
//       })

//     expect(response.statusCode).toEqual(201)

//     // const response = await request(app.server)
//     //   .get('/gyms/search')
//     //   .query({
//     //     query: 'gym',
//     //   })
//     //   .set('Authorization', `Bearer ${token}`)
//     //   .send()

//     expect(response.statusCode).toEqual(201)

//     // expect(response.statusCode).toEqual(200)

//     // expect(response.body.gyms).toHaveLength(1)

//     // expect(response.body.gyms).toEqual([
//     //   expect.objectContaining({
//     //     title: 'gym - teste2',
//     //   }),
//     // ])
//   })

// })

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym ', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym - teste',
        description: 'teste',
        phone: '12345678901',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
