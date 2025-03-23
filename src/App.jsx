import "./App.css";
import { Cuartos, PageBuilder } from "./components/pages";
const { BorinquenPanel } = Cuartos;

function App() {
  return (
    <>
      <PageBuilder />
      <BorinquenPanel />
    </>
  );
}

export default App;
