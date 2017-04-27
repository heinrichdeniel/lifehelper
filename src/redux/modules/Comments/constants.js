const module = 'Comments';
const actionTypes = [
  "GET_ALL",
  "SEND_COMMENT",
  "GET_COMMENTS",
  "CLEAR_NEW_COMMENT"
];
const statusTypes = ['PENDING', 'SUCCESS', 'ERROR'];
const constants = {};

for (let actionType of actionTypes) {
  for (let statusType of statusTypes) {
    constants[actionType + '_' + statusType] = module + '_' + actionType + '_' + statusType
  }
}

constants['SHOW_HIDE_PANEL'] = module + '_' + 'SHOW_HIDE_PANEL';
constants['SELECT_TASK'] = module + '_' + 'SELECT_TASK';
constants['SELECT_PROJECT'] = module + '_' + 'SELECT_PROJECT';


export default constants;
