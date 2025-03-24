import { PageBuilderProvider, DndKitProvider } from "../../../context";
import { PageBuilder, PreviewArea } from "../../organism";
import { usePageBuilder } from "../../../context/PageBuilderContext";
import { DragOverlay } from "../../organism/dragAndDrop/DragOverlay";
import { COMPONENT_MAP } from "../../organism/pageBuilder/constants";

function PageBuilderContent({ variant = "previewTop" }) {
  const { components, updateComponent } = usePageBuilder();

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const component = components.find((c) => c.id === active.id);

    if (component) {
      const currentPosition = component.position || { x: 0, y: 0 };
      updateComponent(active.id, {
        position: {
          x: currentPosition.x + delta.x,
          y: currentPosition.y + delta.y,
        },
      });
    }
  };

  const renderDragOverlay = (activeId) => {
    const component = components.find((c) => c.id === activeId);
    if (!component) return null;

    const Component = COMPONENT_MAP[component.type];
    return (
      <DragOverlay>
        <Component {...component.props} />
      </DragOverlay>
    );
  };

  return (
    <DndKitProvider
      onDragEnd={handleDragEnd}
      renderDragOverlay={renderDragOverlay}
    >
      <div className="flex flex-col h-screen">
        {variant === "previewTop" ? (
          <>
            <div className="flex-1">
              <PreviewArea />
            </div>
            <div className="h-64 border-t">
              <PageBuilder />
            </div>
          </>
        ) : (
          <>
            <div className="h-64">
              <PageBuilder />
            </div>
            <div className="flex-1">
              <PreviewArea />
            </div>
          </>
        )}
      </div>
    </DndKitProvider>
  );
}

export default ({ variant }) => {
  return (
    <PageBuilderProvider>
      <PageBuilderContent variant={variant} />
    </PageBuilderProvider>
  );
};
