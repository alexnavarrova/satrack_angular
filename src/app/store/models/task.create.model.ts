export interface TaskCreateModel {
  id:           string | null;
  title:        string;
  description:  string;
  categoryId:   string;
  dueDate:      Date;
}
