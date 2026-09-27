export interface ProductItem {
  id: number;
  name: string;
  price: number;
  category: string;
  imageResId: string; // e.g. R.drawable.ic_laptop
  iconKey: 'laptop' | 'smartphone' | 'headphones' | 'watch' | 'camera' | 'speaker' | 'tablet' | 'gaming' | 'keyboard' | 'monitor';
  description: string;
  inStock: boolean;
  rating: number;
}

export type ViewMode = 'listview' | 'recyclerview_linear' | 'recyclerview_grid';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'V' | 'D' | 'I' | 'W' | 'E';
  tag: string;
  message: string;
}

export type ActiveToolTab = 'logcat' | 'debugger' | 'inspector' | 'profiler';

export type MainTab = 'emulator' | 'tasks' | 'code' | 'comparison' | 'report';

export interface LabTask {
  id: number;
  title: string;
  timeMinutes: number;
  objective: string;
  deliverable: string;
  completed: boolean;
  details: string[];
  keyConcept: string;
}
