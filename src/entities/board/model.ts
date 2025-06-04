export interface BoardVM {
  name: string;
  statuses: StatusVM[];
}

export interface StatusVM {
  name: string;
  tasks: TaskVM[];
}

export interface TaskVM {
  name: string;
  description: string;
}
