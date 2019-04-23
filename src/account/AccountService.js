import service from '../common/util/ServiceUtil';
import config from '../config';
import Hashes from 'jshashes';

export default {
  login: (data) => service.postNoAuth(config.URI.SESSION, {username: data.username, password: data.password}),

  register: (data) => {
    const SHA1 = new Hashes.SHA1();
    const passwordHash = data.password === '' ? '' : SHA1.hex(data.password);
    const confirmPasswordHash = data.confirmPassword === '' ? '' : SHA1.hex(data.confirmPassword);

    return service.post(config.URI.ACCOUNT, {username: data.username, password: passwordHash, confirmPassword: confirmPasswordHash});
  },

  logout: () => service.erase(config.URI.SESSION),

  changePassword: (data) => {
    const SHA1 = new Hashes.SHA1();
    const oldPasswordHash = data.oldPassword === '' ? '' : SHA1.hex(data.oldPassword);
    const newPasswordHash = data.newPassword === '' ? '' : SHA1.hex(data.newPassword);
    const confirmPasswordHash = data.confirmPassword === '' ? '' : SHA1.hex(data.confirmPassword);

    return service.post(config.URI.CHANGE_PASSWORD, {oldPassword: oldPasswordHash, newPassword: newPasswordHash, confirmPassword: confirmPasswordHash});
  },
};
