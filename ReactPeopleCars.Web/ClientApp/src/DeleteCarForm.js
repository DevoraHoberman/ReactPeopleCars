import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CarRow from './CarRow';

class DeleteCarForm extends React.Component {
    state = {
        cars: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            cars: []
        }
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecar/getcars?id=${id}`);
        this.setState({ cars: data });
    }

    onDeleteButtonClick = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecar/getpersonbyid?id=${id}`);
        this.setState({ person: data });       
        await axios.post('/api/peoplecar/deletecars', this.state.person);
        this.props.history.push('/');
    }


    render() {
        return (
            <div className='container'>
                <table className='table table-hover table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c => {
                            return <CarRow
                                car={c}
                                key={c.id} />
                        })}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Are you sure you want to delete all these cars?</h1>
                    </div>
                    <div className='col-md-6'>
                        <Link to={'/'}>
                            <button className='btn btn-primary btn-block'>No</button>
                        </Link>
                    </div>
                    <div className='col-md-6'>
                        <button onClick={this.onDeleteButtonClick} className='btn btn-danger btn-block'>Yes</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default DeleteCarForm;