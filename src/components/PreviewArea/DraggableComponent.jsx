import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { COMPONENT_MAP } from '../constants';

export function DraggableComponent({ component }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: component
  });
  
  const Component = COMPONENT_MAP[component.type];
  
  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    position: 'absolute',
    left: component.position?.x || 0,
    top: component.position?.y || 0,
    zIndex: 1,
    opacity: isDragging ? 0 : 1, // Hide original when dragging
    touchAction: 'none' // Prevents touch scrolling while dragging
  } : {
    position: 'absolute',
    left: component.position?.x || 0,
    top: component.position?.y || 0
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="relative group"
    >
      <Component {...component.props} />
      {/* Optional: Add a drag handle or indicator */}
      <div className="absolute -top-2 -left-2 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          <path d="M13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
      </div>
    </div>
  );
}