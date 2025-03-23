import { createContext, useContext, useState } from 'react';

const PageBuilderContext = createContext();

export function PageBuilderProvider({ children }) {
  const [components, setComponents] = useState([]);

  const addComponent = (component) => {
    // Add default position if not provided
    const withPosition = {
      ...component,
      position: component.position || {
        x: 50,
        y: 50
      }
    };
    setComponents(prev => [...prev, withPosition]);
  };

  const removeComponent = (componentId) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  const updateComponent = (componentId, newProps) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { 
            ...comp, 
            props: { ...comp.props, ...newProps },
            position: newProps.position || comp.position 
          } 
        : comp
    ));
  };

  return (
    <PageBuilderContext.Provider value={{ 
      components, 
      addComponent, 
      removeComponent,
      updateComponent 
    }}>
      {children}
    </PageBuilderContext.Provider>
  );
}

export const usePageBuilder = () => {
  const context = useContext(PageBuilderContext);
  if (!context) {
    throw new Error('usePageBuilder must be used within a PageBuilderProvider');
  }
  return context;
};
