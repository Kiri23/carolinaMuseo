import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createContext, useContext, useState } from 'react';
import { DragOverlay as CustomDragOverlay } from '../components/PreviewArea/DragOverlay';
import { usePageBuilder } from '../context/PageBuilderContext';

const DragAndDropContext = createContext(null);

export function DndKitProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const { components, updateComponent } = usePageBuilder();

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const component = components.find(c => c.id === active.id);
    
    if (component) {
      const currentPosition = component.position || { x: 0, y: 0 };
      updateComponent(active.id, {
        position: {
          x: currentPosition.x + delta.x,
          y: currentPosition.y + delta.y
        }
      });
    }
    setActiveId(null);
  };

  return (
    <DragAndDropContext.Provider value={{ activeId }}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        <DragOverlay>
          {activeId && (
            <CustomDragOverlay 
              component={components.find(c => c.id === activeId)} 
            />
          )}
        </DragOverlay>
      </DndContext>
    </DragAndDropContext.Provider>
  );
}

export const useDragAndDrop = () => useContext(DragAndDropContext);
