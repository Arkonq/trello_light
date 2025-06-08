export interface BoardVM {
  id?: string;
  name: string;
  statuses: StatusVM[];
}

export interface StatusVM {
  id?: string;
  name: string;
  tasks: TaskVM[];
  boardId: string;
}

export interface TaskVM {
  id?: string;
  name: string;
  description: string;
  statusId: string;
}
