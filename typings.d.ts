interface User {
  user_id: string;
  username: string;
  password_hash: string;
}

interface Task {
  task_id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: Date | null;
  priority: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Category {
  category_id: string;
  user_id: string;
  name: string;
}

interface TaskCategory {
  task_id: string;
  category_id: string;
}
