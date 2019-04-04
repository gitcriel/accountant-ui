import service from '../common/util/ServiceUtil'
import config from '../config'
import Hashes from 'jshashes'

export default {
  login: data => service.postNoAuth(config.URI.SESSION, { username: data.username, password: data.password }),
  register: data => service.post(config.URI.ACCOUNT, { username: data.username, password: data.password, confirmPassword: data.confirmPassword }),
  logout: () => service.erase(config.URI.SESSION),
  changePassword: data => {
    let SHA1 = new Hashes.SHA1()
    let oldPasswordHash = SHA1.hex(data.oldPassword)
    let newPasswordHash = SHA1.hex(data.newPassword)
    let confirmPasswordHash = SHA1.hex(data.confirmPassword)

    return service.post(config.URI.CHANGE_PASSWORD, { oldPassword: oldPasswordHash, newPassword: newPasswordHash, confirmPassword: confirmPasswordHash })
  }
}
