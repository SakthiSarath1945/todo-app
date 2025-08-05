import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginScreen from '@/components/LoginScreen';
import TaskScreen from '@/components/TaskScreen';
import AddEditTaskScreen from '@/components/AddEditTaskScreen';

type Screen = 'splash' | 'login' | 'tasks' | 'addTask' | 'editTask';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSplashComplete = () => {
    // In a real app, check if user is logged in here
    setCurrentScreen(isLoggedIn ? 'tasks' : 'login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('tasks');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleAddTask = () => {
    setEditingTask(undefined);
    setCurrentScreen('addTask');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentScreen('editTask');
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    // In a real app, save to database here
    console.log('Saving task:', taskData);
    setCurrentScreen('tasks');
  };

  const handleCancelTask = () => {
    setCurrentScreen('tasks');
  };

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'login':
      return <LoginScreen onLogin={handleLogin} />;
    
    case 'tasks':
      return (
        <TaskScreen 
          onLogout={handleLogout}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
        />
      );
    
    case 'addTask':
    case 'editTask':
      return (
        <AddEditTaskScreen 
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCancelTask}
        />
      );
    
    default:
      return null;
  }
};

export default Index;
