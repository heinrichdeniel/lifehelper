const module = 'PROJECTS';
const actionTypes = [
  'CREATE_PROJECT',
  'UPDATE_PROJECT',
  'DELETE_PROJECT',
  'GET_LIST'
];

const statusTypes = ['PENDING', 'SUCCESS', 'ERROR'];
const constants = {};

for (let actionType of actionTypes) {
  for (let statusType of statusTypes) {
    constants[actionType + '_' + statusType] = module + '_' + actionType + '_' + statusType
  }
}

constants['SELECT_PROJECT'] = module + '_' + 'SELECT_PROJECT';
constants['RESET'] = module + '_' + 'RESET';


export default constants;
