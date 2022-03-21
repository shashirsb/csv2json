export default class BaseController {
  public STATUS: {
    OK: true;
    KO: false;
  };
  public MESSAGE: {
      SUCCESS: {
        ADD: 'Create record successfully.',
        UPDATE: 'Update record successfully.',
      },
      ERROR: {
          USER_EXISTS: 'User already exists',
          INVALID_USER: 'Invalid username / password'
      }
  };
}   
