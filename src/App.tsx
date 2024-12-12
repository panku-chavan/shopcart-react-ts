
import './App.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from './components/Layout/Layout'
import AppRouter from './routes/AppRouter';


function App() {

  return (
    <Layout>
      <AppRouter/>
    </Layout>
  )
}

export default App
