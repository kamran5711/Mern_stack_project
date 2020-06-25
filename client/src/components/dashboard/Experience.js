import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { deleteExperience } from '../../actions/profile';


const Experience = ({ experience, deleteExperience }) => {
=======


const Experience = ({ experience }) => {
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5

    const experiences = experience.map(exp=>(
    <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className='hide-sm'>{exp.title}</td>
        <td>
<<<<<<< HEAD
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment>{' - '} {!exp.to ? 'Now': <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
        </td>
        <td>
            <button onClick={ ()=> deleteExperience(exp._id)} className='btn btn-danger'>Delete</button>
=======
            <Moment format='YYYY/MM/DD'> { exp.from } </Moment>
             - {' '}
            { exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'> { exp.to } </Moment>) } 
        </td>
        <td>
            <button className='btn btn-danger'>Delete</button>
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
        </td>
    </tr>
    ))
    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
            <thead><th>Company</th><th className='hide-sm'>Title</th><th className='hide-sm'>Years</th><th></th></thead><tbody>{ experiences }</tbody></table>
        </Fragment>
    )
}

Experience.propTypes = {
experience: PropTypes.array.isRequired,
<<<<<<< HEAD
deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience)
=======
}

export default Experience
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
