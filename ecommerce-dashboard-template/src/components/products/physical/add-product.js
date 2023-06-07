import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import AddVariantForm from "./Forms/add-variant-form";
import AddProductForm from "./Forms/add-product-form";

import { saveImageToBackend } from "../../../services/APIservices";

const Add_product = () => {
  const [productId, setProductId] = useState(null);
  const [images, setImages] = useState([]);

  const [mainImage, setMainImage] = useState(one);
  const [file, setFile] = useState();
  const [dummyimgs, setDummyimgs] = useState([
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
  ]);

  const _handleImgChange = async (e, i) => {
    e.preventDefault();
    let reader = new FileReader();
    const image = e.target.files[0];
    try {
      const data = await saveImageToBackend(image);
      setImages((prev) => [...prev, data]);
      setMainImage(data.src);
    } catch (err) {
      alert(err);
      console.error("Error:", err);
    }
    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      setFile({ file: file });
      setDummyimgs(dummyimgs);
    };
    reader.readAsDataURL(image);
  };

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Physical" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{productId ? "Add Variant" : "Add Product"}</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  <Col xl="5">
                    <div className="add-product">
                      <Row>
                        <Col xl="9 xl-50" sm="6 col-9">
                          <img
                            src={mainImage}
                            alt=""
                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                          />
                        </Col>
                        {!productId && (
                          <Col xl="3 xl-50" sm="6 col-3">
                            <ul className="file-upload-product">
                              {dummyimgs.map((res, i) => {
                                return (
                                  <li key={i}>
                                    <div className="box-input-file">
                                      <Input
                                        className="upload"
                                        type="file"
                                        onChange={(e) => _handleImgChange(e, i)}
                                      />
                                      <img
                                        alt=""
                                        src={res.img}
                                        style={{ width: 50, height: 50 }}
                                      />
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Col>
                  <Col xl="7">
                    {!productId ? (
                      <AddProductForm
                        images={images}
                        setProductId={setProductId}
                      />
                    ) : (
                      <AddVariantForm
                        productId={productId}
                        images={images}
                        setProductId={setProductId}
                        setMainImage={setMainImage}
                        setDummyimgs={setDummyimgs}
                      />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Add_product;
