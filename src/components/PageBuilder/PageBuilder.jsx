import { usePageBuilder } from "../../context/PageBuilderContext";
import ComponentEditor from './ComponentEditor';

const COMPONENT_CONFIGS = {
  Background: {
    type: 'Background',
    defaultProps: {
      imageUrl: '',
    }
  },
  Button: {
    type: 'Button',
    defaultProps: {
      children: 'New Button',
      onClick: () => console.log('Button clicked!')
    }
  },
  Modal: {
    type: 'Modal',
    defaultProps: {
      title: 'New Modal',
      isOpen: false,
      onClose: null,
      children: 'Modal content'
    }
  },
  VideoPlayer: {
    type: 'VideoPlayer',
    defaultProps: {
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: 'https://file-examples.com/storage/fed00909ee67dc5db96303f/2017/10/file_example_JPG_100kB.jpg',
      title: 'Video'
    }
  }
};

export default function PageBuilder() {
  const { addComponent, components, updateComponent } = usePageBuilder();

  const handleAddComponent = (componentType) => {
    const id = `${componentType}-${Date.now()}`;
    const newComponent = {
      id,
      type: componentType,
      props: { ...COMPONENT_CONFIGS[componentType].defaultProps }
    };

    if (componentType === 'Modal') {
      newComponent.props.onClose = () => {
        updateComponent(id, { isOpen: false });
      };
    }

    addComponent(newComponent);
  };

  return (
    <div className="bg-white border-t shadow-lg p-4">
      <div className="flex gap-4">
        {Object.keys(COMPONENT_CONFIGS).map((componentType) => (
          <button
            key={componentType}
            onClick={() => handleAddComponent(componentType)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add {componentType}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold">Components:</h3>
        {components.map(comp => (
          <ComponentEditor key={comp.id} componentId={comp.id} />
        ))}
      </div>
    </div>
  );
}
