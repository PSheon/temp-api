/* eslint handle-callback-err: "off"*/

const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const User = require('../app/models/user')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  admin: {
    id: '5faf82f3a279e8d89983ee45',
    email: 'admin@gmail.com',
    password: '!@Admin123456'
  },
  staff: {
    id: '5faf82f3a279e8d89983ee46',
    email: 'staff@gmail.com',
    password: '!@Admin123456'
  },
  user: {
    id: '5faf82f3a279e8d89983ee47',
    email: 'user@gmail.com',
    password: '!@Admin123456'
  },
  demo: {
    id: '5faf82f3a279e8d89983ee48',
    email: 'demo@gmail.com',
    password: '!@Admin123456'
  }
}
const tokens = {
  admin: '',
  staff: '',
  user: '',
  demo: ''
}

const email = faker.internet.email()
const createdID = []

chai.use(chaiHttp)

describe('*********** USERS ***********', () => {
  describe('/POST login', () => {
    it('it should GET token as admin', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginDetails.admin)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          tokens.admin = res.body.token
          done()
        })
    })
    it('it should GET token as staff', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginDetails.staff)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          tokens.staff = res.body.token
          done()
        })
    })
    it('it should GET token as user', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginDetails.user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          tokens.user = res.body.token
          done()
        })
    })
    it('it should GET token as demo', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginDetails.demo)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          tokens.demo = res.body.token
          done()
        })
    })
  })
  describe('/GET users', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the users with admin', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET all the users with staff', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${tokens.staff}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the users with filters', (done) => {
      chai
        .request(server)
        .get('/api/users?filter=admin&fields=email,displayName,phone')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('email').eql('admin@admin.com')
          done()
        })
    })
  })
  describe('/POST user', () => {
    it('it should NOT POST a user without name', (done) => {
      const user = {}
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a user ', (done) => {
      const user = {
        memberId: faker.internet.password().replace(/_/g, ''),
        email,
        password: faker.internet.password(),
        displayName: faker.random.words(),
        role: 'admin',
        phone: faker.phone.phoneNumber('+8869########')
      }
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'memberId',
            'email',
            'google',
            'role',
            'photoURL',
            'phone',
            'shortcuts',
            'referralParent',
            'referralChildList',
            'lastPasswordUpdatedAt',
            'verified',
            'verification',
            'active'
          )
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a user with email that already exists', (done) => {
      const user = {
        memberId: faker.internet.password().replace(/_/g, ''),
        email,
        password: faker.internet.password(),
        displayName: faker.random.words(),
        role: 'admin'
      }
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should NOT POST a user with not known role', (done) => {
      const user = {
        memberId: faker.internet.password().replace(/_/g, ''),
        email,
        password: faker.internet.password(),
        displayName: faker.random.words(),
        role: faker.random.words()
      }
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/GET/:_id user', () => {
    it('it should GET a user by the given _id with admin', (done) => {
      const _id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/api/users/${_id}`)
        .set('Authorization', `Bearer ${tokens.admin}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('memberId')
          res.body.should.have.property('_id').eql(_id)
          done()
        })
    })
    it('it should GET a user by the given _id with staff', (done) => {
      const _id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/api/users/${_id}`)
        .set('Authorization', `Bearer ${tokens.staff}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('memberId')
          res.body.should.have.property('_id').eql(_id)
          done()
        })
    })
  })
  describe('/PATCH/:_id user', () => {
    it('it should UPDATE a user given the _id', (done) => {
      const _id = createdID.slice(-1).pop()
      const user = {
        displayName: 'JS123456',
        phone: faker.phone.phoneNumber('+8869########'),
        shortcuts: ['bot-setting']
      }
      chai
        .request(server)
        .patch(`/api/users/${_id}`)
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(_id)
          res.body.should.have.property('displayName').eql(user.displayName)
          res.body.should.have.property('phone').eql(user.phone)
          res.body.should.have.property('shortcuts').eql(user.shortcuts)
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT UPDATE another user if be an user', (done) => {
      const _id = createdID.slice(-1).pop()
      const user = {
        name: faker.random.words(),
        email: 'toto@toto.com',
        role: 'user'
      }
      chai
        .request(server)
        .patch(`/api/users/${_id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should NOT UPDATE another user if be an demo', (done) => {
      const _id = createdID.slice(-1).pop()
      const user = {
        name: faker.random.words(),
        email: 'toto@toto.com',
        role: 'user'
      }
      chai
        .request(server)
        .patch(`/api/users/${_id}`)
        .set('Authorization', `Bearer ${tokens.demo}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/DELETE/:_id user', () => {
    it('it should DELETE a user given the _id', (done) => {
      const user = {
        memberId: faker.internet.password().replace(/_/g, ''),
        email: faker.internet.email(),
        password: faker.internet.password(),
        displayName: faker.random.words(),
        role: 'admin',
        phone: faker.phone.phoneNumber('+8869########')
      }
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'memberId',
            'email',
            'google',
            'role',
            'photoURL',
            'phone',
            'shortcuts',
            'referralParent',
            'referralChildList',
            'lastPasswordUpdatedAt',
            'verified',
            'verification',
            'active'
          )
          chai
            .request(server)
            .delete(`/api/users/${res.body._id}`)
            .set('Authorization', `Bearer ${tokens.admin}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach((id) => {
      User.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
