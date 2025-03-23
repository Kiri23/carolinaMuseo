import { usePageBuilder } from "../../context/PageBuilderContext";

const MODAL_FUNCTIONS = {
  openModal: (modalId) => `Opens Modal ${modalId}`,
  alertHello: () => `Shows 'Hello!' alert`,
  logMessage: () => `Logs to console`,
};

export default function ComponentEditor({ componentId }) {
  const { components, updateComponent } = usePageBuilder();
  const component = components.find(c => c.id === componentId);

  if (!component) return null;

  const handlePropChange = (propName, value) => {
    updateComponent(componentId, { [propName]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePropChange('imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonFunction = (functionType, modalId = null) => {
    let newOnClick;
    switch (functionType) {
      case 'openModal':
        newOnClick = () => updateComponent(modalId, { isOpen: true });
        break;
      case 'alertHello':
        newOnClick = () => alert('Hello!');
        break;
      case 'logMessage':
        newOnClick = () => console.log('Button clicked!');
        break;
      default:
        newOnClick = () => {};
    }
    updateComponent(componentId, { onClick: newOnClick });
  };

  const renderButtonEditor = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Button Text</label>
        <input
          type="text"
          value={component.props.children || ''}
          onChange={(e) => handlePropChange('children', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">On Click Action</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleButtonFunction(e.target.value)}
        >
          <option value="">Select an action</option>
          {Object.entries(MODAL_FUNCTIONS).map(([key, description]) => (
            <option key={key} value={key}>{description()}</option>
          ))}
        </select>
      </div>
      {/* If openModal is selected, show modal selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Target Modal (if opening modal)</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleButtonFunction('openModal', e.target.value)}
        >
          <option value="">Select a modal</option>
          {components
            .filter(comp => comp.type === 'Modal')
            .map(modal => (
              <option key={modal.id} value={modal.id}>
                {modal.props.title || modal.id}
              </option>
            ))}
        </select>
      </div>
    </>
  );

  const renderModalEditor = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Modal Title</label>
        <input
          type="text"
          value={component.props.title || ''}
          onChange={(e) => handlePropChange('title', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Modal Content</label>
        <textarea
          value={component.props.children || ''}
          onChange={(e) => handlePropChange('children', e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
    </>
  );

  const renderVideoPlayerEditor = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Video URL</label>
        <input
          type="text"
          value={component.props.src || ''}
          onChange={(e) => handlePropChange('src', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Poster Image URL</label>
        <input
          type="text"
          value={component.props.poster || ''}
          onChange={(e) => handlePropChange('poster', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Video Title</label>
        <input
          type="text"
          value={component.props.title || ''}
          onChange={(e) => handlePropChange('title', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </>
  );

  const renderBackgroundEditor = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload Background Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
      </div>
      {component.props.imageUrl && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Background</label>
          <img 
            src={component.props.imageUrl} 
            alt="Background preview" 
            className="w-full h-40 object-cover rounded"
          />
        </div>
      )}
    </>
  );

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-bold mb-2">Edit {component.type}</h3>
      {component.type === 'Background' && renderBackgroundEditor()}
      {component.type === 'Button' && renderButtonEditor()}
      {component.type === 'Modal' && renderModalEditor()}
      {component.type === 'VideoPlayer' && renderVideoPlayerEditor()}
    </div>
  );
}
