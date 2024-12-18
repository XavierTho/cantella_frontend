import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyLogForm from './components/study-tracker/studylogform';
import StudyProgress from './components/study-tracker/studyprogress';

const App = () => (
    <Router>
        <Switch>
            <Route path="/study-tracker">
                <h1>Study Tracker</h1>
                <StudyLogForm />
                <StudyProgress />
            </Route>
        </Switch>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));