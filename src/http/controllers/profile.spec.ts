import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile ', async () => {
    await request(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonhdoe@gmail.com',
      password: '12345678',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jonhdoe@gmail.com',
      password: '12345678',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jonhdoe@gmail.com',
      }),
    )
  })
})
