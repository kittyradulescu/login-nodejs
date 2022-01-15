import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main';

function App() {
    return (
        <Switch>
            <Route>
                <Route exact path="/" component={Main}/>
            </Route>
        </Switch>
    );
}

export default App;
