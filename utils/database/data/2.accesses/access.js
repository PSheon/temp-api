const faker = require('faker')

const accesses = [
  {
    user: '5faf82f3a279e8d89983ee45',
    memberId: 'admin',
    ip: '10.10.10.10',
    browser: 'PostmanRuntime/7.26.5',
    country: 'XX',
    method: 'GET',
    pathname: '/auth/register/',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    user: '5faf82f3a279e8d89983ee45',
    memberId: 'staff',
    ip: '10.10.10.10',
    browser: 'PostmanRuntime/7.26.5',
    country: 'XX',
    method: 'GET',
    pathname: '/api/users/',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    user: '5faf82f3a279e8d89983ee45',
    memberId: 'staff',
    ip: '10.10.10.10',
    browser: 'PostmanRuntime/7.26.5',
    country: 'XX',
    method: 'POST',
    pathname: '/auth/reset-password/',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = accesses
