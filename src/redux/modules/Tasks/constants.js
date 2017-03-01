const module = 'TASKS';
const actionTypes = [
  'CREATE_TASK',
  'UPDATE_TASK',
  'DELETE_TASK',
  'GET_TASK',
  'DELETE_TASK',
  'GET_LIST'
];

const statusTypes = ['PENDING', 'SUCCESS', 'ERROR'];
const constants = {};

for (let actionType of actionTypes) {
  for (let statusType of statusTypes) {
    constants[actionType + '_' + statusType] = module + '_' + actionType + '_' + statusType
  }
}

constants['LOGOUT'] = module + '_' + 'LOGOUT';
constants['APPLY_DATE_FILTER'] = module + '_' + 'APPLY_DATE_FILTER';
constants['RESET'] = module + '_' + 'RESET';

export default constants;
