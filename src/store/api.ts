import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetBoardsResponse,
  GetTasksOnBoardResponse,
  GetTasksResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
  GetTaskByIdResponse,
  GetTeamsResponse,
  GetTeamResponse,
  GetUsersResponse,
  GetUserTasksResponse,
} from './types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  tagTypes: ['Boards', 'Tasks', 'Teams', 'Users'],
  endpoints: (builder) => ({
    // BOARDS
    getBoards: builder.query<GetBoardsResponse[], void>({
      query: () => '/boards',
      transformResponse: (rawResult: { data: GetBoardsResponse[] }) =>
        rawResult.data,
      providesTags: ['Boards'],
    }),

    getBoardTasks: builder.query<GetTasksOnBoardResponse[], number>({
      query: (boardId) => `/boards/${boardId}`,
      transformResponse: (rawResult: { data: GetTasksOnBoardResponse[] }) =>
        rawResult.data,
      providesTags: ['Tasks'],
    }),

    // TASKS
    getTasks: builder.query<GetTasksResponse[], void>({
      query: () => '/tasks',
      transformResponse: (rawResult: { data: GetTasksResponse[] }) =>
        rawResult.data,
      providesTags: (
        result
      ): Array<'Tasks' | { type: 'Tasks'; id: number }> => {
        if (result) {
          return [
            ...result.map((t) => ({
              type: 'Tasks' as const,
              id: t.id,
            })),
            'Tasks',
          ];
        }
        return ['Tasks'];
      },
    }),

    createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
      query: (task) => ({
        url: '/tasks/create',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks', 'Boards'],
    }),

    updateTask: builder.mutation<
      UpdateTaskResponse,
      { id: number; data: UpdateTaskRequest }
    >({
      query: ({ id, data }) => ({
        url: `/tasks/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    getTaskById: builder.query<GetTaskByIdResponse, number>({
      query: (taskId: number) => `/tasks/${taskId}`,
      transformResponse: (rawResult: { data: GetTaskByIdResponse }) =>
        rawResult.data,
    }),

    updateTaskStatus: builder.mutation<
      void,
      { taskId: number; data: UpdateTaskStatusRequest }
    >({
      query: ({ taskId, data }) => ({
        url: `/tasks/updateStatus/${taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    // TEAMS
    getTeams: builder.query<GetTeamsResponse[], void>({
      query: () => '/teams',
      providesTags: ['Teams'],
    }),

    getTeamById: builder.query<GetTeamResponse, number>({
      query: (teamId) => `/teams/${teamId}`,
    }),

    // USERS
    getUsers: builder.query<GetUsersResponse[], void>({
      query: () => '/users',
      transformResponse: (rawResult: { data: GetUsersResponse[] }) =>
        rawResult.data,
      providesTags: ['Users'],
    }),

    getUserTasks: builder.query<GetUserTasksResponse[], number>({
      query: (userId) => `/users/${userId}/tasks`,
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetTasksQuery,
  useGetBoardTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskStatusMutation,
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useGetUsersQuery,
  useGetUserTasksQuery,
} = api;

export default api;
