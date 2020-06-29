import React, { } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';
const CommentItem = ({ postId, comment:{ _id, text, name, avator, user, date }, deleteComment, auth}) => {
    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avator}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            { text }
          </p>
           <p className="post-date">
    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        { !auth.loading && user === auth.user._id && (<button onClick={
              e=>{
                  deleteComment(postId, _id);
              }
          } type="button" className="btn btn-danger">X</button>) }
        </div>
      </div>
    )
    console.log('auth:', auth);
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,

}
const mapStateToProps = state =>({ 
    auth:state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
