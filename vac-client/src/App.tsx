import { Route, Routes } from 'react-router-dom'
import { useState, useMemo } from 'react'



import { Chart } from './pages/charts/chartPage'


import { Login } from './pages/login/login'


import { UserContext } from "./UserContext";

import store from './redux_features/store'
import { Provider } from 'react-redux'
import { AddVacationForm } from './pages/addVacations/addVacation'
import { Header } from './components/header'
import { Register } from './pages/register/registr'
import { Vacations } from './pages/vacs/vacations'


function App() {
  const [value, setValue] = useState<any>('hallo from context')
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue])

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={providerValue}>
          <Header />
          <main className="container content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registration" element={<Register />} />
              <Route path="/vacationsmain" element={<Vacations />} />
              <Route path="/postvacationForm" element={<AddVacationForm />} />
              <Route path="/chart" element={<Chart />} />

            </Routes>
          </main>
        </UserContext.Provider>
      </Provider>
    </>
  );
}

export default App;
