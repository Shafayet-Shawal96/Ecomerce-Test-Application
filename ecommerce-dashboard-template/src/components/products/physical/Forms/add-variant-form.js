import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import one from "../../../../assets/images/pro3/1.jpg";
import user from "../../../../assets/images/user.png";

import { saveData } from "../../../../services/APIservices";

const sizeEnum = ["S", "M", "L", "XL", "XLL"];

function Add_variant_form({
  productId,
  images,
  setProductId,
  setMainImage,
  setDummyimgs,
}) {
  // variant info
  const [color_name, setColor_name] = useState("");
  const [color_code, setColor_code] = useState("#ff0000");
  const [image_id, setImage_id] = useState(images[0].image_id);
  const [size, setSize] = useState("S");
  const [stock, setStock] = useState(0);
  const [sku, setSku] = useState("");

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      variant: {
        color: {
          color_name,
          color_code,
        },
        image_id,
        size: {
          size,
          stock,
        },
        sku,
      },
    };

    try {
      const data = await saveData(
        "http://localhost:9001/api/products/add-variant?productId=" + productId,
        formData
      );
      if (data) {
        alert("Successful");
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
    setProductId(null);
    setColor_name("");
    setColor_code("#ff0000");
    setImage_id("");
    setSize("S");
    setStock(0);
    setSku("");
    setMainImage(one);
    setDummyimgs([
      { img: user },
      { img: user },
      { img: user },
      { img: user },
      { img: user },
      { img: user },
    ]);
  };

  return (
    <Form
      className="needs-validation add-product-form"
      onSubmit={handleValidSubmit}
    >
      <div className="form form-label-center">
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Product Id :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control"
              name="color_name"
              id="validationCustom01"
              type="text"
              value={productId}
              disabled
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Select Image Id :</Label>
          <div className="col-xl-8 col-sm-7">
            <select
              className="form-control digits"
              id="exampleFormControlSelect1"
              value={image_id}
              onChange={(e) => {
                setMainImage(
                  images.find((img) => img.image_id === +e.target.value).src
                );
                setImage_id(e.target.value);
              }}
            >
              {images.map((img, id) => (
                <option key={id}>{img.image_id}</option>
              ))}
            </select>
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Color Name :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control"
              name="color_name"
              id="validationCustom01"
              type="text"
              value={color_name}
              onChange={(e) => setColor_name(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Color Code :</Label>
          <div className="col-xl-8 col-sm-7">
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={color_code}
              onChange={(e) => {
                setColor_code(e.target.value);
              }}
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Select Size :</Label>
          <div className="col-xl-8 col-sm-7">
            <select
              className="form-control digits"
              id="exampleFormControlSelect1"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {sizeEnum.map((size, id) => (
                <option key={id}>{size}</option>
              ))}
            </select>
          </div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">Stock :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control mb-0"
              name="stock"
              id="validationCustom02"
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup className="form-group mb-3 row">
          <Label className="col-xl-3 col-sm-4 mb-0">SKU :</Label>
          <div className="col-xl-8 col-sm-7">
            <Input
              className="form-control"
              name="sku"
              id="validationCustom01"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
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

export default Add_variant_form;
