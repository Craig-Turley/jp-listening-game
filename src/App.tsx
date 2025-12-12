import { Route, Switch } from 'wouter'
import './App.css'
import Index from './pages'
import { WithLayouts } from './layouts/with-layouts'
import MainLayout from './layouts/main-layout'
import { Toaster } from './components/ui/sonner'
import { ScoreProvider } from './contexts/score-context'
import TimePage from './pages/time'
import DatePage from './pages/date'
import NumberPage from './pages/number'

function App() {
  return (
    <ScoreProvider>
      <Switch>
        <Route path="/" >
          <WithLayouts page={Index} layouts={MainLayout} />
        </Route>

        <Route path="/date">
          <WithLayouts page={DatePage} layouts={MainLayout} />
        </Route>

        <Route path="/time">
          <WithLayouts page={TimePage} layouts={MainLayout} />
        </Route>

        <Route path="/number">
          <WithLayouts page={NumberPage} layouts={MainLayout} />
        </Route>
      </Switch>

      <Toaster position='top-center' />
    </ScoreProvider>
  )
}

export default App
