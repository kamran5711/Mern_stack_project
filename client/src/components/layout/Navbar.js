import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
<<<<<<< HEAD
    <li><Link to='/profiles'>Developers</Link></li>
    <li><Link to='/posts'>Posts</Link></li>
=======
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
    <li><Link to="/dashboard"><span className='hide-sm'>Dashboard</span></Link></li>
    <li><a onClick={ logout } href="#!"><i className="fas fa sign-out"></i>{' '}<span className='hide-sm'>Logout</span></a></li>
  </ul>
  );
  const guestLink = (
    <ul>
<<<<<<< HEAD
    <li><Link to='/profiles'>Profiles</Link></li>
=======
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
    <li><a href="#!">Developers</a></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
  );
    return (
    <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
    { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLink }</Fragment>) }
    </nav>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth 
});
export default connect(mapStateToProps, { logout })(Navbar);