import { createContext, useContext, useState } from 'react';

const PageBuilderContext = createContext();

export function PageBuilderProvider({ children }) {
  const [components, setComponents] = useState([]);

  const addComponent = (component) => {
    setComponents(prev => [...prev, component]);
  };

  const removeComponent = (componentId) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  const updateComponent = (componentId, newProps) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId ? { ...comp, props: { ...comp.props, ...newProps } } : comp
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

export const usePageBuilder = () => useContext(PageBuilderContext);