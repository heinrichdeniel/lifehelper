const module = 'User';
const actionTypes = [
  'LOGIN',
  'REGISTRATION',
  'UPDATE_PROFILE',
  'GET_PROFILE',
  'UPDATE_GENERAL_SETTINGS',
  'UPDATE_ACCOUNT_SETTINGS'
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
constants['REMOVE_ERROR'] = module + '_' + 'REMOVE_ERROR';

export default constants;
