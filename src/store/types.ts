export type Status = 'Backlog' | 'InProgress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface AssigneeUserForTask {
  avatarUrl?: string;
  email: string;
  fullName: string;
  id: number;
}

//GET /boards
export interface GetBoardsResponse {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

// GET /boards/{boardId}
export interface GetTasksOnBoardResponse {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: AssigneeUserForTask;
}

// GET /tasks
export interface GetTasksResponse {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: number;
  assignee: AssigneeUserForTask;
  boardId: number;
  boardName: string;
}

// GET /tasks/{taskId}
export interface GetTaskByIdResponse {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: AssigneeUserForTask;
  boardName: string;
}

export interface CreateTaskRequest {
  assigneeId: number;
  boardId: number;
  title: string;
  description: string;
  priority?: Priority;
}

export interface CreateTaskResponse {
  id: number;
}

export interface UpdateTaskRequest {
  assigneeId?: number;
  title: string;
  description: string;
  status?: Status;
  priority?: Priority;
}

export interface UpdateTaskResponse {
  message: string;
}

export interface UpdateTaskStatusRequest {
  status: Status;
}

export interface UpdateTaskStatusResponse {
  message: string;
}

//TEAMS
export interface GetTeamsResponse {
  id: number;
  name: string;
  description: string;
  boardsCount: number;
  usersCount: number;
}

export interface GetTeamBoardsResponse {
  id: number;
  name: string;
  description: string;
}

export interface GetTeamResponse {
  id: number;
  name: string;
  description: string;
  boards: GetTeamBoardsResponse[];
  users: AssigneeUserForTask[];
}

//USER
export interface GetUsersResponse {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  description: string;
  tasksCount: number;
  teamId: number;
  teamName: string;
}

export interface GetUserTasksResponse {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  boardName: string;
}
