import constants from './constants'

const initialState = {
  comments: {
    tasks: [],
    projects: []
  },
  selectedTaskId: null,
  selectedProjectId: null,
  taskList: [],
  projectList: [],
  showPanel: false,
  error: false,
  pending: false
};

const CommentReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SHOW_HIDE_PANEL:
      return {
        ...state,
        showPanel: !state.showPanel
      };

    case constants.GET_ALL_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case constants.GET_ALL_SUCCESS:
      return {
        ...state,
        taskList: action.payload.tasks,
        projectList: action.payload.projects,
        pending: false,
        error: false
      };

    case constants.GET_ALL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case constants.SEND_COMMENT_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case constants.SEND_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false
      };

    case constants.SEND_COMMENT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case constants.GET_COMMENTS_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case constants.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments:{
          tasks: action.payload.taskComments,
          projects: action.payload.projectComments
        },
        pending: false,
        error: false
      };

    case constants.GET_COMMENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case constants.CLEAR_NEW_COMMENT_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case constants.CLEAR_NEW_COMMENT_SUCCESS:
      let tasks = state.comments.tasks;
      let projects = state.comments.projects;

      if (action.payload.taskComment){
        tasks = [
          action.payload.taskComment,
          ...state.comments.tasks.filter((task) => (task.id != action.payload.taskComment.id))
        ]
      }
      else{
        projects =  [
          action.payload.projectComment,
          ...state.comments.projects.filter((project) => ( project.id != action.payload.projectComment.id))
        ]
      }

      return {
        ...state,
        comments:{
          tasks: tasks,
          projects: projects
        },
        pending: false,
        error: false
      };

    case constants.CLEAR_NEW_COMMENT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case constants.SELECT_TASK:
      return {
        ...state,
        selectedTaskId: action.payload.taskId
      };

    case constants.SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload.projectId
      };


    default:
      return state
  }
};

export default CommentReducer;
