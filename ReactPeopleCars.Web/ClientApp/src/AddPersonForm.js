import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddPersonForm extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const newState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onSubmitClick = async (person) => {
        console.log('submit clicked')
        await axios.post('/api/peoplecar/addperson', person);
        this.props.history.push('/');
    }

    render() {
        const { firstName, lastName, age } = this.state.person;
        return (

            <div className='container mt-5'>
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    <h2>Add a New Person</h2>
                    <input
                        type='text'
                        className='form-control'
                        name='firstName'
                        value={firstName}
                        onChange={this.onTextChange}
                        placeholder="First Name" />
                    <br />
                    <input
                        type='text'
                        className='form-control'
                        name='lastName'
                        value={lastName}
                        onChange={this.onTextChange}
                        placeholder="Last Name" />
                    <br />
                    <input
                        type='text'
                        className='form-control'
                        name='age'
                        value={age}
                        onChange={this.onTextChange}
                        placeholder="Age" />
                    <br />
                    <button className='btn btn-primary btn-block' onClick={() => this.onSubmitClick(this.state.person)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default AddPersonForm;


