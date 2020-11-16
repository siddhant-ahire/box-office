import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { Navs } from './components/Navs';
import { Home } from './pages/Home';
import { Starred } from './pages/Starred';


function App() {
  return (
    <Navs>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/starred"><Starred/></Route>
        <Route>
          404 Page Not Found
        </Route>
      </Switch>
    </Navs>
  );
}

export default App;
