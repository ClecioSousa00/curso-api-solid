import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDataBaseURl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('invalid DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDataBaseURl(schema)

    process.env.DATABASE_URL = databaseURL
    execSync('npx prisma migrate deploy')
    console.log('executou')
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}"  CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
