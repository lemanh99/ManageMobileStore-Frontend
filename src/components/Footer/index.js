import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 3.0.5
        </div>
        <strong>
          Copyright &copy; 2014-2019{" "}
          <a href="http://adminlte.io">AdminLTE.io</a>.
        </strong>{" "}
        All rights reserved. & Design By{" "}
        <strong>
          <a
            href="https://github.com/lemanh99/WebThucTapCongNhan"
            target="_blank"
            className="copyrightlink"
          >
            Lê Xuân Mạnh
          </a>
        </strong>
      </footer>
    </>
  );
};

export default Footer;
