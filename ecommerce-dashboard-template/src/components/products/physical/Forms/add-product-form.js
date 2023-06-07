import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

import MDEditor from "@uiw/react-md-editor";

import { saveData } from "../../../../services/APIservices";

const CategoryEnum = ["Electronics", "Clothing", "Home", "Beauty", "Books"];
const typeEnum = [
  "electronics",
  "furniture",
  "jewellery",
  "fashion",
  "beauty",
  "tools",
  "watch",
  "shoes",
  "bags",
  "kids",
  "eyeware",
  "light",
  "all",
];
const availabilityEnum = ["Available", "Out of stock"];

function Add_product_form({ images, setProductId }) {
  // product info
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [type, setType] = useState("electronics");
  const [category, setCategory] = useState("Electronics");
  const [isNew, setIsNew] = useState(false);
  const [sale, setSale] = useState(false);
  const [availability, setAvailability] = useState("Available");

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("You have upload atleast one photo!");
      return;
    }
    if (description.length === 0) {
      alert("description required");
      return;
    }
    const formData = {
      name,
      brand,
      description,
      price,
      discount,
      type,
      category,
      new: isNew,
      sale,
      images,
      ratings: [],
      reviews: [],
      availability,
      variants: [],
    };

    try {
      const data = await saveData(
        "http://localhost:9001/api/products",
        formData
      );
      if (data) {
        setProductId(data._id);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      alert(err);
      console.error("Error:", err);
    }

    resetChanges();
  };

  const resetChanges = () => {
    setName("");
    setBrand("");
    setDescription("");
    setPrice(0);
    setDiscount(0);
    setType("electronics");
    setCategory("Electronics");
    setIsNew(false);
    setSale(false);
    setAvailability("Available");
  };

  return (
    <Form
      className="needs-validation add-product-form"
      onSubmit={handleValidSubmit}
    >
      <div className="form form-label-center">
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Product Name :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control"
              name="product_name"
              id="validationCustom01"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Brand Name :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control"
              name="brand_name"
              id="validationCustom01"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4">Add Description :</Label>
          <div className="col-xl-8 col-sm-7 description-sm">
            <MDEditor
              value={description}
              onChange={(e) => {
                setDescription(e);
              }}
              required
            />
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Price :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control mb-0"
              name="price"
              id="validationCustom02"
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Discount :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control "
              name="discount"
              id="validationDiscount"
              type="number"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">
            Select Product Type :
          </Label>
          <div className="col-xl-8 col-sm-7">
            <select
              className="form-control digits"
              id="exampleFormControlSelect1"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {typeEnum.map((type, id) => (
                <option key={id}>{type}</option>
              ))}
            </select>
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">
            Select Product Category :
          </Label>
          <div className="col-xl-8 col-sm-7">
            <select
              className="form-control digits"
              id="exampleFormControlSelect1"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {CategoryEnum.map((type, id) => (
                <option key={id}>{type}</option>
              ))}
            </select>
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">New Product? :</Label>
          <div className="col-xl-8 col-sm-7">
            <input
              type="checkbox"
              name="option1"
              value={isNew}
              onChange={(e) => {
                setIsNew((prev) => !prev);
              }}
            />
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">On Sale? :</Label>
          <div className="col-xl-8 col-sm-7">
            <input
              type="checkbox"
              name="option1"
              value={sale}
              onChange={(e) => {
                setSale((prev) => !prev);
              }}
            />
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Availability :</Label>
          <div className="col-xl-8 col-sm-7">
            <select
              className="form-control digits"
              id="exampleFormControlSelect1"
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
              }}
            >
              {availabilityEnum.map((type, id) => (
                <option key={id}>{type}</option>
              ))}
            </select>
          </div>
        </FormGroup>
      </div>
      <div className="offset-xl-3 offset-sm-4">
        <Button type="submit" color="primary">
          Add
        </Button>
        <Button type="button" color="light">
          Discard
        </Button>
      </div>
    </Form>
  );
}

export default Add_product_form;
