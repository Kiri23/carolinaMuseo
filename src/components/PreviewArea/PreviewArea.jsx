import { usePageBuilder } from "../../context/PageBuilderContext";
import Button from "../ui/button";
import Modal from "../ui/Modal";
import VideoPlayer from "../ui/VideoPlayer";
import Background from "../ui/Background";
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const COMPONENT_MAP = {
  Background,
  Button,
  Modal,
  VideoPlayer,
};

function DraggableComponent({ component }) {
  const Component = COMPONENT_MAP[component.type];
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: component.id,
    data: component
  });
  
  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    position: 'absolute',
    left: component.position?.x || 0,
    top: component.position?.y || 0,
    zIndex: 1
  } : {
    position: 'absolute',
    left: component.position?.x || 0,
    top: component.position?.y || 0
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Component {...component.props} />
    </div>
  );
}

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
  
  const backgroundComponent = components.find(comp => comp.type === 'Background');
  const otherComponents = components.filter(comp => comp.type !== 'Background');

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
  };

  return (
    <div className="min-h-screen">
      <DndContext onDragEnd={handleDragEnd}>
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
      </DndContext>
    </div>
  );
}
