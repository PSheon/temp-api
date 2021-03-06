/* eslint handle-callback-err: "off"*/

const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const User = require('../app/models/user')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  email: 'pauljiang61020@gmail.com',
  password: '!@Admin123456'
}
let token = ''
const createdID = []
let verification = ''
let verificationForgot = ''
const email = faker.internet.email()

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
  describe('/GET /', () => {
    it('it should GET home API url', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/GET /404url', () => {
    it('it should GET 404 url', (done) => {
      chai
        .request(server)
        .get('/404url')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.an('object')
          done()
        })
    })
  })

  describe('/POST login', () => {
    it('it should GET token', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/POST register', () => {
    it('it should POST register', (done) => {
      const user = {
        memberId: faker.random.alphaNumeric(),
        email,
        password: faker.internet.password()
      }
      chai
        .request(server)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')
          res.body.should.include.keys('token', 'user')
          createdID.push(res.body.user._id)
          verification = res.body.user.verification
          done()
        })
    })
    it('it should NOT POST a register if email already exists', (done) => {
      const user = {
        memberId: faker.random.alphaNumeric(),
        email,
        password: faker.internet.password()
      }
      chai
        .request(server)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors[0].should.have
            .property('msg')
            .eql('EMAIL_ALREADY_EXISTS')
          done()
        })
    })
  })

  describe('/POST verify email', () => {
    it('it should POST verify', (done) => {
      chai
        .request(server)
        .post('/auth/verify-email')
        .send({
          verification
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('email', 'verified')
          res.body.verified.should.equal(true)
          done()
        })
    })
  })

  describe('/POST forgot', () => {
    it('it should POST request forgot password', (done) => {
      chai
        .request(server)
        .post('/auth/forgot-password')
        .send({
          email
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('msg', 'verification')
          verificationForgot = res.body.verification
          done()
        })
    })
  })

  describe('/POST reset password', () => {
    it('it should POST reset password', (done) => {
      chai
        .request(server)
        .post('/auth/reset-password')
        .send({
          verification: verificationForgot,
          password: '!@Admin12345678'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('msg').eql('PASSWORD_UPDATED')
          done()
        })
    })
  })

  describe('/POST access token', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .post('/auth/access-token')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET a fresh token', (done) => {
      chai
        .request(server)
        .post('/auth/access-token')
        .set('Authorization', `Bearer ${token}`)
        .send({
          token
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          done()
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
