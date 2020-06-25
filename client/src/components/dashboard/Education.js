import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from  'react-redux';
<<<<<<< HEAD
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
=======

const Education = ({ education }) => {
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td>{ edu.school }</td>
            <td>{ edu.degree }</td>
            <td>
<<<<<<< HEAD
            <Moment format='YYYY/MM/DD'>{edu.from}</Moment>{' - '} {!edu.to ? 'Now': <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </td>
            <td>
                <button onClick={ ()=> { deleteEducation(edu._id) }} className='btn btn-danger'>Delete</button>
=======
            <Moment format='YYYY/MM/DD'> { edu.from } </Moment>
             - {' '}
            { edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'> { edu.to } </Moment>) } 
            </td>
            <td>
                <button className='btn btn-danger'>Delete</button>
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
            </td>
        </tr>
    ))

    return (
        <Fragment>
             <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th></th>
                </thead>
                <tbody> { educations } </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
<<<<<<< HEAD
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education);
=======
}

export default Education;
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
