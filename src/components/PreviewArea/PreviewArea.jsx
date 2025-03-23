import { usePageBuilder } from "../../context/PageBuilderContext";
import Button from "../ui/button";
import Modal from "../ui/Modal";
import VideoPlayer from "../ui/VideoPlayer";
import Background from "../ui/Background";

const COMPONENT_MAP = {
  Background,
  Button,
  Modal,
  VideoPlayer,
};

export default function PreviewArea() {
  const { components } = usePageBuilder();
  
  // Find background component
  const backgroundComponent = components.find(comp => comp.type === 'Background');
  // Filter out non-background components
  const otherComponents = components.filter(comp => comp.type !== 'Background');

  return (
    <div className="min-h-screen">
      {backgroundComponent ? (
        <Background {...backgroundComponent.props}>
          <div className="flex justify-center items-center min-h-full p-4">
            {otherComponents.map((comp) => {
              const Component = COMPONENT_MAP[comp.type];
              return <Component key={comp.id} {...comp.props} />;
            })}
          </div>
        </Background>
      ) : (
        <div className="flex justify-center items-center min-h-full p-4">
          {otherComponents.map((comp) => {
            const Component = COMPONENT_MAP[comp.type];
            return <Component key={comp.id} {...comp.props} />;
          })}
        </div>
      )}
    </div>
  );
}
