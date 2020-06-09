import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

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
        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link></Fragment>) }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);