import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCatgeory,
  deleteCategory,
  getListCatergory,
} from "../../actions/Category/category.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { generatePublicUrl } from "../../urlConfig";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

const Category = () => {
  const category = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryDelete, setCategoryDelete] = useState({});
  const [listCategory, setListCatergory] = useState([]);
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!category.loading) {
      dispatch(getListCatergory());
    }
  }, []);
  useEffect(() => {
    setMessage(category.messages);
  });
  useEffect(() => {
    setListCatergory(category.listCategory);
  }, [category.listCategory]);
  //show Modal

  const handleShowAdd = () => {
    setName("");
    setCategoryImage("");
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    const form = new FormData();
    console.log(categoryImage);
    form.append("name", name);
    form.append("categoryImage", categoryImage);
    dispatch(addCatgeory(form));
    setShowAdd(false);
    setName("");
    setCategoryImage("");
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const cat = category.listCategory.find(
      (category) => category._id === id
    );
    setCategoryDelete(cat);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    dispatch(deleteCategory(categoryDelete._id));
    setCategoryDelete({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  //row table
  const rowTable = (categories) => {
    const all = [];
    for (let [index, category] of categories.entries()) {
      var element = {
        sr: index + 1,
        name: category.name,
        image: (
          <img
            src={generatePublicUrl(category.categoryImage)}
            alt={category.categoryImage}
            width="50"
            height="50"
          ></img>
        ),
        btnEdit: (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-warning "
              value={category._id}
              style={{ marginRight: "4px" }}
              // onClick={handleShow}
            >
              Edit
            </button>
          </div>
        ),
        btnDelete: (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-danger"
              value={category._id}
              onClick={handleShowDelete}
            >
              Delete
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
        label: "Name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Image",
        field: "image",
        sort: "asc",
        width: 50,
      },
      {
        label: "Edit",
        field: "btnEdit",
        sort: "asc",
        width: 50,
      },
      {
        label: "Delete",
        field: "btnDelete",
        sort: "asc",
        width: 50,
      },
    ],
    rows: rowTable(listCategory),
  };
  return (
    <Layout title="Manage category">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShowAdd}
                    >
                      New A Category
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      category.error !== "" ? (
                        <Notification type="danger" message={message} />
                      ) : (
                        <Notification type="success" message={message} />
                      )
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="card-body">
                    <MDBDataTable
                      entries={5}
                      // displayEntries={false}
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      // searching={false}
                      striped
                      bordered
                      hover
                      // barReverse
                      noBottomColumns
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
      <AddCategoryModal
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Category"}
        name={name}
        setName={setName}
        listCategory={listCategory}
        categoryImage={categoryImage}
        handleCategoryImage={handleCategoryImage}
      />
      <DeleteCategoryModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle={"Delete Category"}
        onSubmit={handleCloseDelete}
        categoryDelete={categoryDelete}
      />
    </Layout>
  );
};

export default Category;
