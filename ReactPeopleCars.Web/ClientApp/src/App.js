import React from 'react';
import { Route } from 'react-router-dom';
import PeopleCarTable from './PeopleCarTable';
import AddPersonForm from './AddPersonForm';
import AddCarForm from './AddCarForm';
import DeleteCarForm from './DeleteCarForm';
import Layout from './Layout';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PeopleCarTable} />
            <Route exact path='/addperson' component={AddPersonForm} />
            <Route exact path='/addcar/:id' component={AddCarForm} />
            <Route exact path='/deletecars/:id' component={DeleteCarForm} />
        </Layout>
    )
}

export default App;