import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  User, 
  LogOut, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  Trash2,
  Edit3,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

interface TaskScreenProps {
  onLogout: () => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const TaskScreen = ({ onLogout, onAddTask, onEditTask }: TaskScreenProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project presentation',
      description: 'Prepare slides for the quarterly review meeting',
      dueDate: '2024-12-15',
      priority: 'high',
      completed: false,
      createdAt: '2024-12-10'
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, bread, eggs, and vegetables',
      dueDate: '2024-12-12',
      priority: 'medium',
      completed: false,
      createdAt: '2024-12-11'
    },
    {
      id: '3',
      title: 'Book dentist appointment',
      description: 'Regular checkup and cleaning',
      dueDate: '2024-12-20',
      priority: 'low',
      completed: true,
      createdAt: '2024-12-08'
    }
  ]);

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    toast({
      title: task?.completed ? "Task reopened" : "Task completed!",
      description: task?.title,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: task?.title,
    });
  };

  const openTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glass transition-all duration-300 group animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToggleComplete(task.id)}
              className="mt-0.5 hover:scale-110"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-base ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                  {task.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(task.dueDate)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEditTask(task)}
              className="h-8 w-8 hover:scale-110"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTask(task.id)}
              className="h-8 w-8 text-destructive hover:scale-110"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12 animate-fade-in">
      <CheckCircle2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Tasks
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium hidden sm:block">John Doe</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onLogout}
              className="hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="open" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-auto grid-cols-2 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="open" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Open Tasks ({openTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={onAddTask}
              variant="floating"
              size="lg"
              className="shadow-elegant"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </Button>
          </div>

          <TabsContent value="open" className="space-y-4">
            {openTasks.length > 0 ? (
              openTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <EmptyState message="No open tasks. Great job!" />
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <EmptyState message="No completed tasks yet" />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TaskScreen;