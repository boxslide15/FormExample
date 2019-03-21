import React from 'react'
import { withFormik, Form, Field } from 'formik'
import { LogInValidation } from '../Validators/ValidationSchema'
import axios from 'axios'

const LogIn = ({ touched, errors, isSubmitting, componentChange }) => {
    return (
        <Form>
            <div>
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>Submit</button>
                <button type="button" onClick={componentChange}>Sign Up</button>
            </div>
        </Form>
    )
}

export const LogInForm = withFormik({
    mapPropsToValues() {
        return {
            email: "",
            password: ""
        }
    },
    validationSchema: LogInValidation,
    handleSubmit(values, { resetForm, setSubmitting }) {
        axios.post("https://jsonplaceholder.typicode.com/posts", {
                email: values.email,
                password: values.password
              })
              .then(response => {
                resetForm()
                console.log(response.data)
              })
              .catch(error => {
                console.log(error)
                setSubmitting(true)
                let promise = new Promise(resolve => {
                    setTimeout(() => resolve(true), 1000);
                })
                promise.then(value => {
                    setSubmitting(value)
                    resetForm()
                })
            })
    }
})(LogIn)

export default LogInForm;