import React, { useEffect, useState } from 'react';
import { Authenticator } from '../../authenticator';

const StudyProgress = ({ progress }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasJoinedClass, setHasJoinedClass] = useState(false);

    useEffect(() => {
        const baseurl = window.location.origin;
        const authenticator = new Authenticator(baseurl);

        const checkAuth = async () => {
            const authStatus = await authenticator.isAuthenticated();
            const classStatus = await authenticator.hasJoinedClass();
            setIsAuthenticated(authStatus);
            setHasJoinedClass(classStatus);
        };

        checkAuth();
    }, []);

    if (!isAuthenticated) {
        return <div>Please log in to view your study progress.</div>;
    }

    if (!hasJoinedClass) {
        return <div>Please join a class to view your study progress.</div>;
    }

    return (
        <ul>
            {progress.map((log, index) => (
                <li key={index}>
                    {log.date}: {log.subject} - {log.hours} hours
                </li>
            ))}
        </ul>
    );
};

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyProgress from './components/study-tracker/studyprogress';

const App = () => (
    <Router>
        <Switch>
            <Route path="/study-progress" component={StudyProgress} />
            {/* Add other routes here */}
        </Switch>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default StudyProgress;