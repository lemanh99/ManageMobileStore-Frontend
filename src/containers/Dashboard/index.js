import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getListAdmin,
  getListCustomer,
  getListProduct,
  getOrders,
} from "../../actions";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import InforBox from "./components/InforBox";

/**
 * @author
 * @function Home
 **/

const Dashboard = (props) => {
  const customer = useSelector((state) => state.customer);
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);

  const [newOder, setNewOder] = useState(0);
  const [countCustomer, setCountCustomer] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [topProduct, setTopProduct] = useState([]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getListAdmin());
  // }, []);
  useEffect(() => {
    dispatch(getListAdmin());
    dispatch(getListCustomer());
    dispatch(getOrders());
    dispatch(getListProduct());
  }, []);

  const topProductSale = (orders) => {
    let listTop = [];
    for (let order of orders) {
      for (let prod of order.productDetail) {
        var index = listTop.findIndex(
          (product) => product._id === prod.productId
        );
        if (index !== -1) {
          listTop[index]["value"] = listTop[index]["value"] + prod.purchasedQty;
        } else {
          var obj = {};
          var pr = product.listProduct.find(
            (product) => product._id === prod.productId
          );
          obj = { ...pr };
          obj["value"] = prod.purchasedQty;
          listTop.push(obj);
        }
      }
    }
    console.log(typeof listTop);
    console.log(typeof product.listProduct);
    return listTop;
  };

  useEffect(() => {
    const pending = order.orders.filter(
      (order) => order.paymentStatus === "pending"
    );
    setNewOder(pending.length);
    setCountCustomer(customer.listCustomer.length);
    setCountProduct(product.listProduct.length);
    setCountOrder(order.orders.length);
    topProductSale(order.orders);
    setTopProduct(topProductSale(order.orders));
  }, [customer.listCustomer, product.listProduct, order.orders]);
  const convert = (string) => {
    var times = new Date(string);
    return times.getDate() + "/" + times.getMonth();
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "Number of New Customers",
    },
    axisY: {
      title: "Number of Customers",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: [
          { y: 155, label: "Jan" },
          { y: 150, label: "Feb" },
          { y: 152, label: "Mar" },
          { y: 148, label: "Apr" },
          { y: 142, label: "May" },
          { y: 150, label: "Jun" },
          { y: 146, label: "Jul" },
          { y: 149, label: "Aug" },
          { y: 153, label: "Sept" },
          { y: 158, label: "Oct" },
          { y: 154, label: "Nov" },
          { y: 150, label: "Dec" },
        ],
      },
      {
        type: "spline",
        name: "2017",
        showInLegend: true,
        dataPoints: [
          { y: 172, label: "Jan" },
          { y: 173, label: "Feb" },
          { y: 175, label: "Mar" },
          { y: 172, label: "Apr" },
          { y: 162, label: "May" },
          { y: 165, label: "Jun" },
          { y: 172, label: "Jul" },
          { y: 168, label: "Aug" },
          { y: 175, label: "Sept" },
          { y: 170, label: "Oct" },
          { y: 165, label: "Nov" },
          { y: 169, label: "Dec" },
        ],
      },
    ],
  };

  return (
    // <Layout sidebar>
    <Layout title="Dashboard">
      <section class="content">
        <div class="container-fluid">
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* Info boxes */}
              <div className="row">
                <InforBox
                  icon="fas fa-shopping-bag"
                  background="bg-info"
                  title="New Order"
                  value={newOder}
                  type="increase"
                  percentage="10"
                />
                <InforBox
                  icon="fas fa-user-plus"
                  background="bg-warning"
                  title="New Registrations"
                  value={countCustomer}
                  type="increase"
                  percentage="10"
                />
                <InforBox
                  icon="fas fa-shopping-cart"
                  background="bg-success"
                  title="Sales"
                  value={countOrder}
                  type="increase"
                  percentage="10"
                />
                <InforBox
                  icon="fab fa-product-hunt"
                  background="bg-danger"
                  title="Product"
                  value={countProduct}
                  type="increase"
                  percentage="10"
                />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Monthly Recap Report</h5>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-tool dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <i className="fas fa-wrench" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-right"
                            role="menu"
                          >
                            <a href="#" className="dropdown-item">
                              Action
                            </a>
                            <a href="#" className="dropdown-item">
                              Another action
                            </a>
                            <a href="#" className="dropdown-item">
                              Something else here
                            </a>
                            <a className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                              Separated link
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="text-center">
                            <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                          </p>
                          <div className="chart">
                            <canvas
                              id="salesChart"
                              height={180}
                              style={{ height: "180px" }}
                              className="chartjs-render-monitor"
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="row">
                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success">
                              <i className="fas fa-caret-up" /> 17%
                            </span>
                            <h5 className="description-header">$35,210.43</h5>
                            <span className="description-text">
                              TOTAL REVENUE
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-warning">
                              <i className="fas fa-caret-left" /> 0%
                            </span>
                            <h5 className="description-header">$10,390.90</h5>
                            <span className="description-text">TOTAL COST</span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success">
                              <i className="fas fa-caret-up" /> 20%
                            </span>
                            <h5 className="description-header">$24,813.53</h5>
                            <span className="description-text">
                              TOTAL PROFIT
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block">
                            <span className="description-percentage text-danger">
                              <i className="fas fa-caret-down" /> 18%
                            </span>
                            <h5 className="description-header">1200</h5>
                            <span className="description-text">
                              GOAL COMPLETIONS
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        Top 5 best selling products
                      </h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <ul className="products-list product-list-in-card pl-2 pr-2">
                        {topProduct
                          .sort((a, b) => b.value - a.value)
                          .slice(0, 5)
                          .map((product, index) => {
                            return (
                              <li className="item">
                                <div className="product-img">
                                  <li className="nav-item dropdown">
                                    <div className="nav-link">
                                      <i
                                        className="far fa-star text-warning"
                                        style={{ fontSize: "33px" }}
                                      />
                                      <span
                                        className="badge badge-warning navbar-badge"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {index+1}
                                      </span>
                                    </div>
                                  </li>
                                </div>
                                <div className="product-info">
                                  <div className="product-title">
                                    {product.name}
                                    <span className="badge badge-warning float-right">
                                      ${product.price}
                                    </span>
                                  </div>
                                  <span className="product-description">
                                    Sell number:<b>{product.value}</b>
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title">Latest Orders</h3>
                      <div className="card-tools">
                        <span className="badge badge-warning">5 New Order</span>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table m-0">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>TotalAmount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orders
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt).getTime() -
                                  new Date(a.createdAt).getTime()
                              )
                              .slice(0, 5)
                              .map((order) => {
                                return (
                                  <tr>
                                    <td>{order.codeBill}</td>
                                    <td>{order.totalAmount}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                      {/* /.table-responsive */}
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer text-center">
                      <Link to={`/manage-order`}>View All Orders</Link>
                    </div>
                    {/* /.card-footer */}
                  </div>
                </div>
                {/* /.col */}
                <div className="col-md-4">
                  {/* USERS LIST */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Latest Members</h3>
                      <div className="card-tools">
                        <span className="badge badge-danger">
                          8 New Members
                        </span>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <ul className="users-list clearfix">
                        {customer.listCustomer
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt).getTime() -
                              new Date(a.createdAt).getTime()
                          )
                          .slice(0, 8)
                          .map((customer) => {
                            return (
                              <li>
                                <img
                                  src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                  alt="User Image"
                                />
                                <div className="users-list-name">
                                  Alexander Pierce
                                </div>
                                <span className="users-list-date">
                                  {convert(customer.createdAt)}
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                      {/* /.users-list */}
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer text-center">
                      <Link to={`/manage-customer`}>View All Users</Link>
                    </div>
                    {/* /.card-footer */}
                  </div>
                  {/*/.card */}
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Recently Added Products</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <ul className="products-list product-list-in-card pl-2 pr-2">
                        {product.listProduct
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt).getTime() -
                              new Date(a.createdAt).getTime()
                          )
                          .slice(0, 4)
                          .map((product) => {
                            return (
                              <li className="item">
                                <div className="product-img">
                                  <img
                                    src={
                                      product.productPictures
                                        ? generatePublicUrl(
                                            product.productPictures[0].img
                                          )
                                        : ""
                                    }
                                    alt="Product Image"
                                    className="img-size-50"
                                  />
                                </div>
                                <div className="product-info">
                                  <div className="product-title">
                                    {product.name}
                                    <span className="badge badge-warning float-right">
                                      ${product.price}
                                    </span>
                                  </div>
                                  <span className="product-description">
                                    {product.description}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>

                    {/* /.card-body */}
                    <div className="card-footer text-center">
                      <Link to={`/manage-product`}>View All Products</Link>
                    </div>
                    {/* /.card-footer */}
                  </div>
                </div>
              </div>
            </div>
            {/*/. container-fluid */}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
