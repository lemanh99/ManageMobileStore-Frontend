import { MDBDataTable } from "mdbreact";
import React from "react";
import TabPaneNew from "../../../components/UI/TabPane";
import { ConvertIOStoDate } from "./ConvertStringToTime";
// codeBill: "MDHUQRU6NgCX"
// createdAt: "2021-03-24T13:26:40.953Z"
// customerId: "60419d220a7638345cf98f18"
// orderStatus: Array(4)
// 0: {type: "ordered", isCompleted: true, _id: "605b3e10ef356a1474391275", date: "2021-03-24T13:26:40.938Z"}
// 1: {type: "packed", isCompleted: false, _id: "605b3e10ef356a1474391276"}
// 2: {type: "shipped", isCompleted: false, _id: "605b3e10ef356a1474391277"}
// 3: {type: "delivered", isCompleted: false, _id: "605b3e10ef356a1474391278"}
// length: 4
// __proto__: Array(0)
// paymentStatus: "pending"
// paymentType: "cod"
// productDetail: Array(1)
// 0: {_id: "605b3e10ef356a1474391274", productId: "6057243832c8f328b472e32e", payablePrice: 1000, purchasedQty: 30}
// length: 1
// __proto__: Array(0)
// totalAmount: 1000
// updatedAt: "2021-03-24T13:26:40.953Z"
// __v: 0
// _id: "605b3e10ef356a1474391273"
// __proto__: Object
// 1:
// codeBill: "MDHUQRU6NgCX"
// createdAt: "2021-03-24T13:27:04.553Z"
// customerId: "60419d220a7638345cf98f18"
// orderStatus: (4) [{…}, {…}, {…}, {…}]
// paymentStatus: "pending"
// paymentType: "cod"
// productDetail: [{…}]
// totalAmount: 1000
// updatedAt: "2021-03-24T13:27:04.553Z"
// __v: 0
// _id: "605b3e28ef356a1474391279"
// __proto__: Object
// 2: {codeBill: "MDHUQRU6NgCX", paymentStatus: "pending", paymentType: "cod", _id: "605b3e2cef356a147439127f", totalAmount: 1000, …}
// 3: {codeBill: "MDHUQRU6NgCX", paymentStatus: "pending", paymentType: "cod", _id: "605b3e3aef356a1474391285", totalAmount: 1000, …}
// length: 4
const PendingTable = (props) => {
  const { listOrder, listCustomer, handleShow } = props;
  const rowTable = (orders) => {
    const all = [];
    let index = 0;
    for (let order of orders) {
      if (order.paymentStatus === "pending") {
        const customer = listCustomer.find(
          (customer) => customer._id === order.customerId
        );
        var element = {
          sr: ++index,
          invoice: order.codeBill,
          customer: customer
            ? customer.firstName + " " + customer.lastName
            : null,
          total_products: order.productDetail.length,
          total_amount: order.totalAmount,
          date: ConvertIOStoDate(order.createdAt),
          status: <span class="badge badge-warning">Pending</span>,
          btn: (
            <div class="project-actions  text-center">
              <button
                class="btn btn-primary btn-sm"
                value={order._id}
                onClick={handleShow}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder"></i>
                View
              </button>

              <button
                class="btn btn-danger btn-sm"
                value={order._id}
                // onClick={handleShowDelete}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-trash"></i>
                Cancel
              </button>
            </div>
          ),
        };
        all.push(element);
      }
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
        label: "Invoice",
        field: "invoice",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
        width: 200,
      },
      {
        label: "Total products",
        field: "total_products",
        sort: "asc",
        width: 50,
      },
      {
        label: "Total Amount",
        field: "total_amount",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "btn",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rowTable(listOrder),
  };
  return (
    <TabPaneNew>
      <MDBDataTable
        entries={5}
        // displayEntries={false}
        entriesOptions={[5, 10, 15, 20, 25, 50]}
        searching={false}
        striped
        bordered
        hover
        // barReverse
        noBottomColumns
        data={data}
      />
    </TabPaneNew>
  );
};

export default PendingTable;
