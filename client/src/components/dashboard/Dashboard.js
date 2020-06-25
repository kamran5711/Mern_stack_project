import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
=======
import { getCurrentProfile } from '../../actions/profile';
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

<<<<<<< HEAD
const Dashboard = ({ getCurrentProfile, auth:{user}, profile: { loading, profile}, deleteAccount }) => {
    useEffect(()=>{
        getCurrentProfile();
    }, [getCurrentProfile]);
    
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead "><i className="fas fa-user"></i> welcome { user && user.name}</p>
{ profile != null ? (<Fragment>
    <DashboardActions />
    <Experience experience={ profile.experiences }/>
    <Education education={ profile.education }/>
    <div className='my-2'>
        <button className='btn btn-danger' onClick={ ()=>{ deleteAccount()} }><i className='fa fa-user-minus'></i>Delete my account!</button>
    </div>
    </Fragment>) : (<Fragment><p>You haven't setup profile yet! please add some info</p>
=======
const Dashboard = ({ getCurrentProfile, auth:{user}, profile: { loading, profile} }) => {
    useEffect(()=>{
        getCurrentProfile();
    }, []);
    const experiences = [{
        company: "somecompany name",
        current: true,
        description: "some description",
        from: "2020-06-02T11:06:54.650Z",
        location: "peshawar",
        title: "junior developer",
        to: null,
        _id: "5edc7c48a0018f0d9c438d14"
    }];
    const educations = [{
        current: true,
        degree: "master",
        description: "some description",
        from: "2020-06-02T00:00:00.000Z",
        school: "university of peshawar",
        to: null,
        _id: "5ed750a683186717209cea9c"
    }]

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead "><i className="fas fa-user"></i> welcome { user && user.name}</p>
{ profile !== null ? (<Fragment><DashboardActions /><Experience experience={ experiences }/><Education education={ educations }/></Fragment>) : (<Fragment><p>You haven't setup profile yet! please add some info</p>
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link></Fragment>) }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
<<<<<<< HEAD
    deleteAccount: PropTypes.func.isRequired,
=======
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

<<<<<<< HEAD
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
=======
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
