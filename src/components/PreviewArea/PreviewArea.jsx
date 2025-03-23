import { usePageBuilder } from "../../context/PageBuilderContext";
import Button from "../ui/button";
import Modal from "../ui/Modal";
import VideoPlayer from "../ui/VideoPlayer";
import Background from "../ui/Background";
import { useDroppable } from '../../hooks/useDroppable';
import { DraggableComponent } from './DraggableComponent';

const COMPONENT_MAP = {
  Background,
  Button,
  Modal,
  VideoPlayer,
};

function DroppableArea({ children }) {
  const { dropNodeProps } = useDroppable({
    id: 'preview-area'
  });

  return (
    <div 
      {...dropNodeProps}
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
    const { id, delta } = event;
    const component = components.find(c => c.id === id);
    
    if (component) {
      const currentPosition = component.position || { x: 0, y: 0 };
      updateComponent(id, {
        position: {
          x: currentPosition.x + delta.x,
          y: currentPosition.y + delta.y
        }
      });
    }
  };

  return (
    <div className="min-h-screen">
      {backgroundComponent ? (
        <Background {...backgroundComponent.props}>
          <DroppableArea>
            {otherComponents.map((comp) => (
              <DraggableComponent 
                key={comp.id} 
                component={comp} 
                onDragEnd={handleDragEnd}
              />
            ))}
          </DroppableArea>
        </Background>
      ) : (
        <DroppableArea>
          {otherComponents.map((comp) => (
            <DraggableComponent 
              key={comp.id} 
              component={comp} 
              onDragEnd={handleDragEnd}
            />
          ))}
        </DroppableArea>
      )}
    </div>
  );
}
