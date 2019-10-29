import React, { useState } from "react";
import { Formik, Field } from "formik";
import { Form, Button, Badge } from "react-bootstrap";
import styled from "styled-components";
import {
  textRequired,
  checkboxRequired,
  addressValidation,
  descriptionValidation,
  selectValidation
} from "../../utils/validation";

import { parseDescription } from "../../utils/parseDescription";

const StyledForm = styled(Form)`
  width: 500px;
  margin: 0 auto;
  background-color: rgb(239, 241, 243);
  padding: 30px;
`;

const FirstHomeForm = ({ data }) => {
  const [success, setSuccess] = useState(null);
  const [request, setRequest] = useState({});

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          type: "",
          first_home_buyer: "",
          description: "",
          address: ""
        }}
        onSubmit={async (values, {setSubmitting }) => {
          try {
            const payload = {
              ...values,
              description: parseDescription(values.description)
            };
            const response = await fetch("http://localhost:4000/v1/customer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            });
            const data = await response.json();
            setSuccess(data);
            setRequest(payload);
          } catch (e) {
            setSuccess(false);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleSubmit, handleChange, errors, touched }) => {
          return (
            <StyledForm onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Full name</Form.Label>
                <Field
                  name="name"
                  validate={
                    data.ui_definition.mandatory_fields.includes("name") &&
                    textRequired
                  }
                >
                  {({ form }) => {
                    return (
                      <>
                        <Form.Control
                          type="text"
                          onChange={e =>
                            form.setFieldValue("name", e.target.value)
                          }
                          onBlur={() => form.setFieldTouched("name", true)}
                        />
                        {touched.name && errors.name && (
                          <Badge pill variant="danger">
                            {errors.name}
                          </Badge>
                        )}
                      </>
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group controlId="type">
                <Form.Label>User type</Form.Label>
                <Field
                  name="type"
                  validate={
                    data.ui_definition.mandatory_fields.includes("type") &&
                    selectValidation
                  }
                >
                  {({ form }) => {
                    return (
                      <>
                        <Form.Control
                          as="select"
                          onBlur={() => form.setFieldTouched("type", true)}
                          onChange={handleChange}
                        >
                          {data.ui_definition.user_types.map(type => (
                            <option
                              key={type.key}
                              onClick={e =>
                                form.setFieldValue("type", type.value)
                              }
                            >
                              {type.value}
                            </option>
                          ))}
                        </Form.Control>
                        {touched.type && errors.type && (
                          <Badge pill variant="danger">
                            {errors.type}
                          </Badge>
                        )}
                      </>
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Full address</Form.Label>
                <Field name="address" validate={addressValidation}>
                  {({ form }) => {
                    return (
                      <>
                        <Form.Control
                          type="text"
                          onChange={e =>
                            form.setFieldValue("address", e.target.value)
                          }
                          onBlur={() => form.setFieldTouched("address", true)}
                        />
                        {touched.address && errors.address && (
                          <Badge pill variant="danger">
                            {errors.address}
                          </Badge>
                        )}
                      </>
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Field name="description" validate={descriptionValidation}>
                  {({ form }) => {
                    return (
                      <>
                        <Form.Control
                          as="textarea"
                          rows="5"
                          onChange={e =>
                            form.setFieldValue("description", e.target.value)
                          }
                          onBlur={() =>
                            form.setFieldTouched("description", true)
                          }
                        />
                        {touched.description && errors.description && (
                          <Badge pill variant="danger">
                            {errors.description}
                          </Badge>
                        )}
                      </>
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group controlId="firstHome">
                <Form.Label>First home buyer</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Field
                    name="first_home_buyer"
                    validate={
                      data.ui_definition.mandatory_fields.includes(
                        "first_home_buyer"
                      ) && checkboxRequired
                    }
                  >
                    {({ form }) => {
                      return (
                        <Form.Check
                          inline
                          label="Yes"
                          type="radio"
                          id={`inline-radio-1`}
                          onChange={() =>
                            form.setFieldValue("first_home_buyer", "yes")
                          }
                          onBlur={() =>
                            form.setFieldTouched("first_home_buyer", true)
                          }
                          checked={values.first_home_buyer === "yes"}
                        />
                      );
                    }}
                  </Field>
                  <Field
                    name="first_home_buyer"
                    validate={
                      data.ui_definition.mandatory_fields.includes(
                        "first_home_buyer"
                      ) && checkboxRequired
                    }
                  >
                    {({ form }) => {
                      return (
                        <Form.Check
                          inline
                          label="No"
                          type="radio"
                          id={`inline-radio-2`}
                          onChange={() =>
                            form.setFieldValue("first_home_buyer", "no")
                          }
                          onBlur={() =>
                            form.setFieldTouched("first_home_buyer", true)
                          }
                          checked={values.first_home_buyer === "no"}
                        />
                      );
                    }}
                  </Field>
                  {touched.first_home_buyer && errors.first_home_buyer && (
                    <Badge pill variant="danger">
                      {errors.first_home_buyer}
                    </Badge>
                  )}
                </div>
              </Form.Group>

              <Button variant="danger" type="submit">
                Submit
              </Button>
            </StyledForm>
          );
        }}
      </Formik>
      {success && <p>You have successfully submit the request {JSON.stringify(request)}</p>}
      {success === false && <p>There was an error submitting the data</p>}
    </>
  );
};

export default FirstHomeForm;
