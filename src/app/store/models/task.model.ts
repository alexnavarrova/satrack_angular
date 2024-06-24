export interface TaskModel {
  id:           string;
  title:        string;
  description:  string;
  categoryId:   string;
  categoryName: string;
  isCompleted:  boolean;
  dueDate:      Date;
  createdDate:  Date;
}
