import { useDroppable as useKitDroppable } from '@dnd-kit/core';

export function useDroppable({ id }) {
  const { setNodeRef } = useKitDroppable({ id });

  return {
    dropNodeProps: { ref: setNodeRef }
  };
}