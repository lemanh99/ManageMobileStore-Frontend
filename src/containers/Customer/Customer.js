import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCustomer } from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";

const Customer = () => {
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const [listCustomer, setListCustomer] = useState([]);
  const [message, setMessage] = useState("");
  const [handleShow, setHandleShow] = useState(false);

  useEffect(() => {
    if (!customer.loading) {
      dispatch(getListCustomer());
    }
  }, []);
  useEffect(() => {
    setListCustomer(customer.listCustomer);
  }, [customer.listCustomer]);

  const rowTable = (customers) => {
    const all = [];
    for (let [index, customer] of customers.entries()) {
      var element = {
        sr: index + 1,
        username: customer.username,
        email: customer.email,
        fullName: customer.fullName,
        btnButton: (
          <div style={{textAlign:"center"}}>
            <button type="button" class="btn btn-default " style={{ marginRight:"4px"}}>
               Detail
            </button>
            <button type="button" class="btn btn-default">
               Block
            </button>
          </div>
        ),
        //   a
      };
      all.push(element);
    }
    return all;
  };
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Username",
        field: "username",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Full name",
        field: "fullName",
        sort: "asc",
        width: 270,
      },
      {
        label: "",
        field: "btnButton",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rowTable(listCustomer),
  };

  return (
    <Layout title="Manage customer">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShow}
                    >
                      New A Customer
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      <Notification type="success" message={message} />
                    ) : null}
                  </div>
                </div>
                <div className="card-body">
                  {customer.loading ? (
                    <div class="overlay">
                      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                  ) : (
                    <MDBDataTable
                      className=""
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      striped
                      bordered
                      noBottomColumns
                      data={data}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <AddAdminModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Admin"}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        listAdmin={listAdmin}
      />
      <DeleteAdminModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle={"Delete Admin"}
        onSubmit={handleCloseDelete}
        adminDelete={adminDelete}
        setAdminDelete={setAdminDelete}
      /> */}
    </Layout>
  );
};

export default Customer;
