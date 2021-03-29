import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
// import Tabs from "react-bootstrap/Tabs";
import { Tab, Tabs } from "react-bootstrap";
import PendingTable from "./components/PendingTable";
import { getListCustomer, getOrders } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import CancelTable from "./components/CancelTable";
import CompleteTable from "./components/CompleteTable";
import InvoiceModal from "./components/InvoiceModal";
import NewModal from "../../components/UI/Modal";

const Order = () => {
  const orders = useSelector((state) => state.order);
  const customers = useSelector((state) => state.customer);
  const [key, setKey] = useState("1");
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getListCustomer());
  }, []);

  const handleShow = (event) => {
    const id = event.target.value;
    console.log(id);
    const ord = orders.orders.find((order) => order._id === id);
    setOrder(ord);
    const cus = customers.listCustomer.find(
      (customer) => customer._id === ord.customerId
    );
    setCustomer(cus);

    // const prod = products.listProduct.find((product) => product._id === id);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setCustomer([]);
    setOrder([]);
  };
  return (
    <Layout title="Orders">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-tabs">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                >
                  <Tab eventKey="1" title="Approval">
                    <PendingTable
                      listOrder={orders.orders}
                      listCustomer={customers.listCustomer}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                  <Tab eventKey="2" title="Cancelled">
                    <CancelTable
                      listOrder={orders.orders}
                      listCustomer={customers.listCustomer}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                  <Tab eventKey="3" title="Completed">
                    <CompleteTable
                      listOrder={orders.orders}
                      listCustomer={customers.listCustomer}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InvoiceModal
        show={show}
        handleClose={handleClose}
        order={order}
        customer={customer}
      />
    </Layout>
  );
};

export default Order;