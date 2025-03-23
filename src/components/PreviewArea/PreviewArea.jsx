import { usePageBuilder } from "../../context/PageBuilderContext";
import Button from "../ui/button";
import Modal from "../ui/Modal";
import VideoPlayer from "../ui/VideoPlayer";
import Background from "../ui/Background";
import { DndContext, useDroppable, DragOverlay } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { DraggableComponent } from './DraggableComponent';
import { DragOverlay as CustomDragOverlay } from './DragOverlay';

const COMPONENT_MAP = {
  Background,
  Button,
  Modal,
  VideoPlayer,
};

function DroppableArea({ children }) {
  const {setNodeRef} = useDroppable({
    id: 'preview-area',
  });

  return (
    <div 
      ref={setNodeRef} 
      className="relative w-full min-h-screen"
    >
      {children}
    </div>
  );
}

export default function PreviewArea() {
  const { components, updateComponent } = usePageBuilder();
  const [activeComponent, setActiveComponent] = useState(null);
  
  const backgroundComponent = components.find(comp => comp.type === 'Background');
  const otherComponents = components.filter(comp => comp.type !== 'Background');

  const handleDragStart = (event) => {
    const { active } = event;
    const draggedComponent = components.find(c => c.id === active.id);
    setActiveComponent(draggedComponent);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const component = components.find(c => c.id === active.id);
    
    if (component) {
      const currentPosition = component.position || { x: 0, y: 0 };
      updateComponent(component.id, {
        position: {
          x: currentPosition.x + delta.x,
          y: currentPosition.y + delta.y
        }
      });
    }
    setActiveComponent(null);
  };

  return (
    <div className="min-h-screen">
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {backgroundComponent ? (
          <Background {...backgroundComponent.props}>
            <DroppableArea>
              {otherComponents.map((comp) => (
                <DraggableComponent key={comp.id} component={comp} />
              ))}
            </DroppableArea>
          </Background>
        ) : (
          <DroppableArea>
            {otherComponents.map((comp) => (
              <DraggableComponent key={comp.id} component={comp} />
            ))}
          </DroppableArea>
        )}
        
        <DragOverlay>
          {activeComponent && (
            <CustomDragOverlay component={activeComponent} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
