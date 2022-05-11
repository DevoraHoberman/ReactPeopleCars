import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddCarForm extends React.Component {
    state = {
        car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        },
        person: {
            firstName: '',
            lastName: ''
        }

    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecar/getpersonbyid?id=${id}`);
        this.setState({
            person: data,
            car: { personId: id }
        });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async car => {
        console.log('submit')
        await axios.post('/api/peoplecar/addcar', car);
        this.props.history.push('/');
    }

    render() {
        const { firstName, lastName } = this.state.person;
        const { make, model, year } = this.state.car;
        return (
            <div className='container mt-5'>
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    <h2>Add a car for {firstName} {lastName} </h2>
                    <input
                        type='text'
                        className='form-control'
                        name='make'
                        value={make}
                        onChange={this.onTextChange}
                        placeholder="Make" />
                    <br />
                    <input
                        type='text'
                        className='form-control'
                        name='model'
                        value={model}
                        onChange={this.onTextChange}
                        placeholder="Model" />
                    <br />
                    <input
                        className='form-control'
                        name='year'
                        value={year}
                        onChange={this.onTextChange}
                        placeholder="Year" />
                    <br />
                    <button className='btn btn-primary btn-block' onClick={() => this.onSubmitClick(this.state.car)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default AddCarForm;