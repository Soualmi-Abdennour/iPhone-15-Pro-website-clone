import { Hero } from "./components/Hero"
import { Navbar } from "./components/Navbar"
import { Highlights } from "./components/Highlights"
import Model from "./components/Model"

function App() {
  return (
    <main className="bg-black">
      <Navbar></Navbar>
      <Hero></Hero>
      <Highlights></Highlights>
      <Model></Model>
    </main>
  )
}

export default App
