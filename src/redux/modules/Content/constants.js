const module = 'CONTENT';
const actionTypes = [
];
const statusTypes = ['PENDING', 'SUCCESS', 'ERROR'];
const constants = {};

for (let actionType of actionTypes) {
  for (let statusType of statusTypes) {
    constants[actionType + '_' + statusType] = module + '_' + actionType + '_' + statusType
  }
}

constants['SWITCH_LANGUAGE'] = module + '_' + 'SWITCH_LANGUAGE';

export default constants;
