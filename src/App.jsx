import AppLayout from "./components/layout/AppLayout.jsx";
import {CryptoProvider} from "./components/context/CryptoContext.jsx";

function App() {
  return (
    <CryptoProvider>
      <AppLayout />
    </CryptoProvider>
  )
}

export default App
