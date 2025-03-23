import { COMPONENT_MAP } from '../constants';

export function DragOverlay({ component }) {
  if (!component) return null;
  
  const Component = COMPONENT_MAP[component.type];
  
  return (
    <div 
      style={{
        position: 'relative',
        transform: 'rotate(-2deg)', // Slight rotation for visual feedback
        boxShadow: '0 0 10px rgba(0,0,0,0.2)', // Shadow for depth
        opacity: 0.8, // Semi-transparent
        pointerEvents: 'none' // Prevent interference with drop targets
      }}
      className="rounded border-2 border-blue-500"
    >
      <Component {...component.props} />
    </div>
  );
}