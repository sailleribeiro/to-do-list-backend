export class Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;

  constructor(id: number, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
