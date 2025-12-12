import { Route, Switch } from 'wouter'
import './App.css'
import Index from './pages'
import Date from './pages/date'
import Number from './pages/number'
import { WithLayouts } from './layouts/with-layouts'
import MainLayout from './layouts/main-layout'
import { Toaster } from './components/ui/sonner'
import { ScoreProvider } from './contexts/score-context'
import Time from './pages/time'

function App() {
  return (
    <ScoreProvider>
      <Switch>
        <Route path="/" >
          <WithLayouts page={Index} layouts={MainLayout} />
        </Route>

        <Route path="/date">
          <WithLayouts page={Date} layouts={MainLayout} />
        </Route>

        <Route path="/time">
          <WithLayouts page={Time} layouts={MainLayout} />
        </Route>

        <Route path="/number">
          <WithLayouts page={Number} layouts={MainLayout} />
        </Route>
      </Switch>

      <Toaster position='top-center' />
    </ScoreProvider>
  )
}

export default App
