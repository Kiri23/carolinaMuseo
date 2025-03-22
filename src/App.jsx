import { useState } from "react";
import "./App.css";
import Button from "./components/ui/button.jsx";
import Modal from "./components/ui/Modal.jsx";
import VideoPlayer from "./components/ui/VideoPlayer.jsx";

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleClickButton1 = () => {
    setCount((prevCount) => prevCount + 1);
    setIsModalOpen(true)
  }

  const handleClickButton2 = () => {
    setIsVideoModalOpen(true)
  }


  return (
    // this div act as layout component
    <div className="flex justify-center items-center gap-18">
      <Button onClick={handleClickButton1} >
        Button1
      </Button>
      <Button onClick={handleClickButton2} >
        Button2
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <div className="space-y-4">
          <p>This is the modal content.</p>
          <p>Count is: {count}</p>
          <Button onClick={() => setIsModalOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Example video Modal"
      >
        <div className="space-y-4">
          <p>This video describe the bunny.</p>
          <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" poster="https://file-examples.com/storage/fed00909ee67dc5db96303f/2017/10/file_example_JPG_100kB.jpg" title="Big Buck Bunny" />
        </div>
      </Modal>
    </div>
  );
}


export default App;
