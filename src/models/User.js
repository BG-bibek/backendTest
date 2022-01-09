const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')

const UserSchema = new Schema(
  {
    //  (Admin, Customer) role
    name: {
      type: String,
      required: 'Please entere user name',
      trim: true,
      maxlength: 32,
    },
    address: String,
    email: {
      type: String,
      unique: true,
      required: 'Please entere user email',
      trim: true,
    },
    picture: String,
    roll: {
      type: String,
      enum: ['Admin', 'Costumer'],
      default: 'Costumer',
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
)

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return ''

    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', UserSchema)
