import service from '../common/util/ServiceUtil'
import config from '../config'
import Hashes from 'jshashes'

export default {
  login: data => service.postNoAuth(config.URI.SESSION, { username: data.username, password: data.password }),

  register: data => {
    let SHA1 = new Hashes.SHA1()
    let passwordHash = data.password === '' ? '' : SHA1.hex(data.password)
    let confirmPasswordHash = data.confirmPassword === '' ? '' : SHA1.hex(data.confirmPassword)

    return service.post(config.URI.ACCOUNT, { username: data.username, password: passwordHash, confirmPassword: confirmPasswordHash })
  },

  logout: () => service.erase(config.URI.SESSION),
  
  changePassword: data => {
    let SHA1 = new Hashes.SHA1()
    let oldPasswordHash = data.oldPassword === '' ? '' : SHA1.hex(data.oldPassword)
    let newPasswordHash = data.newPassword === '' ? '' : SHA1.hex(data.newPassword)
    let confirmPasswordHash = data.confirmPassword === '' ? '' : SHA1.hex(data.confirmPassword)

    return service.post(config.URI.CHANGE_PASSWORD, { oldPassword: oldPasswordHash, newPassword: newPasswordHash, confirmPassword: confirmPasswordHash })
  }
}
