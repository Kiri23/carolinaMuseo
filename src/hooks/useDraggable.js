import { useDraggable as useKitDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function useDraggable({ id, data }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useKitDraggable({
    id,
    data
  });

  return {
    isDragging,
    dragHandleProps: { ...attributes, ...listeners },
    dragNodeProps: { ref: setNodeRef },
    style: transform ? {
      transform: CSS.Transform.toString(transform),
      position: 'absolute',
      zIndex: 1,
      opacity: isDragging ? 0 : 1,
      touchAction: 'none'
    } : {
      position: 'absolute'
    }
  };
}