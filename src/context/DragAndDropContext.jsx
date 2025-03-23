import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createContext, useContext, useState } from "react";

const DragAndDropContext = createContext(null);

export function DndKitProvider({
  children,
  onDragStart,
  onDragEnd,
  renderDragOverlay,
}) {
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    onDragStart?.(event);
  };

  const handleDragEnd = (event) => {
    onDragEnd?.(event);
    setActiveId(null);
  };

  return (
    <DragAndDropContext.Provider value={{ activeId }}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {children}
        <DragOverlay>{activeId && renderDragOverlay?.(activeId)}</DragOverlay>
      </DndContext>
    </DragAndDropContext.Provider>
  );
}

export const useDragAndDrop = () => useContext(DragAndDropContext);
