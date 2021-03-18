import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <NavLink to={"/"} className="brand-link">
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/phone.jpg`}
          alt="Avatar"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">
          Mobile Store Manager
        </span>
      </NavLink>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/avatar.jpg`}
              className="img-circle elevation-2"
              alt="Admin Image"
            />
          </div>
          <div className="info">
            <a href="{{url_for('admin_manager')}}" className="d-block">
              {auth.authenticate ? auth.user.fullName : "NULL"}
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to={`/manage-admin`} className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Admin</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-customer`} className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Customer</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-category`} className="nav-link">
                <i className="nav-icon fas fa-plus-square"></i>
                <p>Category</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-brand`} className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                <p>Brand</p>
              </NavLink>
            </li>
            <li className="nav-item has-treeview">
              <a href="{{url_for('product')}}" className="nav-link">
                <i className="nav-icon fas fa-barcode"></i>
                <p>
                  Product
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="{{url_for('product')}}" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Product Manager</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="{{url_for('addproduct')}}" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Product</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="{{ url_for('orders_manager')}}" className="nav-link">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Orders</p>
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link ">
                <i className="nav-icon fas fa-cog"></i>
                <p>Settings</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/signout`} className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
export default Sidebar;
