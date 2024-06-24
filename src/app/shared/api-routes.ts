import {environment} from "../../environments/environment";

const BASE_API_URL = environment.apiUrl;

export const API_ROUTES = {
  AUTH: {
    SIGNIN: `${BASE_API_URL}/account/login`,
    SIGNUP: `${BASE_API_URL}/account/register`,
  },

  TASK: {
    GET_TASKS: `${BASE_API_URL}/task`,
    GET_TASKS_BY_CATEGORY_ID: (categoryId: string) => `${BASE_API_URL}/task/category/${categoryId}`,
    COMPLETE_TASK: () => `${BASE_API_URL}/task/complete`,
    POST_TASK: `${BASE_API_URL}/task`,
    PUT_TASK: () => `${BASE_API_URL}/task`,
    DELETE_TASK: (taskId: string) => `${BASE_API_URL}/task/${taskId}`,
  },

  CATEGORY: {
    GET_CATEGORIES: `${BASE_API_URL}/category`,
    POST_CATEGORY: `${BASE_API_URL}/category`,
  },
};
