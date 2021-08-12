import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { logoutUser } from "../../actions/authActions";

const Home = ({ auth, logoutUser }) => {

  return (
    <div className='home'>
      <div className='home__image'></div>

      <div className='home__body'>
      <h1>you can logout over here <Button onClick={logoutUser} variant="danger">Logout</Button></h1>
      <h2>You need to be logged in to view this page!</h2>
      <Table striped bordered hover size='sm' className='home__entries-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {auth &&
              auth.users && auth.users.map((user, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Home);