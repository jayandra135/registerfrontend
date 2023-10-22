import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Container, Row, Col, Card } from "react-bootstrap";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

import Checkbox from "@mui/material/Checkbox";
import "../App.css";
import Button from "@mui/material/Button";

import InputGroup from "react-bootstrap/InputGroup";
// import { useDispatch } from "react-redux";
// import { addRegister } from "../redux/register/Action";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as Yup from "yup";
const RegisterForm = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [check, setCheck] = useState([]);

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    console.log(`${value} is ${checked}`);
    if (checked) {
      setCheck([...check, value]);
      console.log("check", check.length);
    } else {
      setCheck(check.filter((ele) => ele !== value));
    }
  };
  const validationSchema = Yup.object().shape({
    resume: Yup.mixed()
      .required("You must select a file")
      .test("fileType", "Only .docx files are allowed", (value) => {
        if (value) {
          return (
            value.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          );
        }
        return true;
      }),
  });

  return (
    <section className="register-section mt-3">
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card className="card-section">
              <Card.Header className="card-header">Registration</Card.Header>
              <Formik
                initialValues={{
                  name: "",
                  dob: "",
                  state: "",
                  gender: "",
                  hobbies: "",
                  address: "",
                  resume: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "name is required";
                  }
                  if (!values.dob) {
                    errors.dob = "dob is required";
                  }
                  if (!values.state) {
                    errors.state = "state is required";
                  }
                  if (!values.gender) {
                    errors.gender = "gender is required";
                  }

                  if (!values.address) {
                    errors.address = "address is required";
                  }
                  if (!values.resume) {
                    errors.resume = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("dob", values.dob);
                  formData.append("state", values.state);
                  formData.append("gender", values.gender);
                  formData.append("hobbies", check);
                  formData.append("address", values.address);
                  formData.append("resume", values.resume);

                  setTimeout(() => {
                    {
                      /*  dispatch(addRegister(formData)).then(() => {
                      navigate("/user-list");
                    }); */
                    }
                    axios
                      .post(
                        "http://localhost:8001/register/add-register",
                        formData
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          navigate("/user-list");
                        }
                      })
                      .catch((err) => console.log(err));
                    setSubmitting(false);
                  }, 400);
                }}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  resetForm,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="px-5 py-3 d-flex flex-column gap-4 flex-wrap align-items-start formdiv"
                  >
                    <div className="d-flex flex-column justify-content-start gap-2 flex-wrap ">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="text-dark"
                      >
                        Name
                      </FormLabel>
                      {/* <input
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="inputfield"
                      /> */}
                      <TextField
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        className="textfield"
                      />
                      <span className="errorcolor">
                        {" "}
                        {errors.name && touched.name && errors.name}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between w-100 flex-wrap gap-2">
                      <div className="d-flex flex-column">
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          className="text-dark"
                        >
                          Date-of-birth
                        </FormLabel>
                        <input
                          id="outlined-basic"
                          type="date"
                          name="dob"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dob}
                          className="inputfield"
                        />

                        <span className="errorcolor">
                          {" "}
                          {errors.dob && touched.dob && errors.dob}
                        </span>
                      </div>
                      <div className="d-flex flex-column justify-content-start ">
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          className="text-dark"
                        >
                          State
                        </FormLabel>
                        <select
                          name="state"
                          id="state"
                          onChange={handleChange}
                          className="inputfield optionvalue"
                          value={values.state}
                        >
                          <option>Maharashtra</option>
                          <option> Delhi</option>
                          <option>Goa</option>
                        </select>
                        <span className="errorcolor">
                          {" "}
                          {errors.state && touched.state && errors.state}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between w-100 flex-wrap">
                      <div>
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          className="text-dark"
                        >
                          Gender
                        </FormLabel>
                        <RadioGroup
                          name="radio-buttons-group"
                          className="d-flex flex-row "
                        >
                          <FormControlLabel
                            value="female"
                            name="gender"
                            control={<Radio />}
                            label="Female"
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            value="male"
                            name="gender"
                            control={<Radio />}
                            label="Male"
                            onChange={handleChange}
                          />
                        </RadioGroup>
                        <span className="errorcolor">
                          {" "}
                          {errors.gender && touched.gender && errors.gender}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-start flex-wrap">
                      <div className="d-flex flex-column justify-content-start  ">
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          className="text-dark"
                        >
                          Hobbies
                        </FormLabel>
                        <FormGroup className="d-flex flex-row ">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="sports"
                            name="hobbies.hob1"
                            value="sports"
                            onChange={handleCheck}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="books"
                            name="hobbies.hob2"
                            value="books"
                            onChange={handleCheck}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="travel"
                            name="hobbies.hob3"
                            value="travel"
                            onChange={handleCheck}
                          />
                        </FormGroup>
                        {check.length > 0 ? (
                          <span className="errorcolor">
                            {check.length <= 1 ? (
                              <span>select more than 1</span>
                            ) : (
                              ""
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-start flex-wrap">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="text-dark font-weight-bold"
                      >
                        Address
                      </FormLabel>
                      <textarea
                        variant="filled"
                        name="address"
                        className="addressfield"
                        value={values.address}
                        onChange={handleChange}
                      />
                      <span className="errorcolor">
                        {" "}
                        {errors.address && touched.address && errors.address}
                      </span>
                    </div>
                    <div className="d-flex flex-column justify-content-start flex-wrap">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="text-dark"
                      >
                        Resume
                      </FormLabel>
                      <InputGroup className="mb-3">
                        <input
                          type="file"
                          accept=".doc,.docx"
                          name="resume"
                          onBlur={handleBlur}
                          className="resumeInput"
                          onChange={(e) => {
                            setFieldValue("resume", e.currentTarget.files[0]);
                          }}
                        />
                        <ErrorMessage
                          name="file"
                          component="div"
                          className="error"
                        />
                      </InputGroup>
                      <span className="errorcolor">
                        {" "}
                        {errors.resume && touched.resume && errors.resume}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-start gap-2 w-100 flex-wrap ">
                      <Button
                        variant="contained"
                        className="buttons"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        variant="contained"
                        className="buttons"
                        type="reset"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </Card>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default RegisterForm;
