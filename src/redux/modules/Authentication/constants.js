const module = 'AUTHENTICATION';
const actionTypes = [
  'LOGIN',
  'REGISTRATION',
  'UPDATE_PROFILE',
  'GET_PROFILE'
];
const statusTypes = ['PENDING', 'SUCCESS', 'ERROR'];
const constants = {};

for (let actionType of actionTypes) {
  for (let statusType of statusTypes) {
    constants[actionType + '_' + statusType] = module + '_' + actionType + '_' + statusType
  }
}

constants['LOGOUT'] = module + '_' + 'LOGOUT';
constants['SET_USER'] = module + '_' + 'SET_USER';
constants['SET_USERNAME'] = module + '_' + 'SET_USERNAME';
constants['SET_EMAIL'] = module + '_' + 'SET_EMAIL';
constants['SET_PASSWORD'] = module + '_' + 'SET_PASSWORD';
constants['RESET'] = module + '_' + 'RESET';
constants['RESET_LOGIN'] = module + '_' + 'RESET_LOGIN';
constants['RESET_REGISTRATION'] = module + '_' + 'RESET_REGISTRATION';

export default constants;
