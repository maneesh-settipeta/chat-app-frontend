import Routing from "./components/Routing"
import { ProjectContext } from "./Store/ChatContext"
function App() {
  return (
    <>
      <ProjectContext>
        <Routing />
      </ProjectContext>
    </>
  )
}

export default App
