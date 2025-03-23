// Interface/Types for our drag and drop system
export interface DragAndDropState {
  isDragging: boolean;
  transform?: { x: number; y: number };
}

export interface DragAndDropEvents {
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, delta: { x: number; y: number }) => void;
}

export interface DraggableProps {
  id: string;
  data?: any;
}

export interface DroppableProps {
  id: string;
}

// Abstract provider interface
export interface DragAndDropProviderProps {
  children: React.ReactNode;
  onDragStart?: (event: { id: string; data?: any }) => void;
  onDragEnd?: (event: { id: string; delta: { x: number; y: number } }) => void;
}

// Hook interfaces
export interface UseDraggableResult {
  isDragging: boolean;
  dragHandleProps: any;
  dragNodeProps: any;
  style: React.CSSProperties;
}

export interface UseDroppableResult {
  dropNodeProps: any;
}