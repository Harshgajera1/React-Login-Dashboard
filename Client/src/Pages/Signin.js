import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn({ logado = false }) {

  const handleRegister = async (values) => {
    try {
      let url = "http://localhost:3001/register"
      let data = {
        email: values.email,
        password: values.password,
      }
      await Axios.post(url,data).then((response) => {
        const status = response.status
        
        if (status === 200) {
          // window.location.href = '/'
          toast.success(response.data.msg)
        } else {
          toast.error(response.data.msg)

        }
      });
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.msg)
    }
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("E-mail invalid")
      .required("O e-mail é obrigatório"),
    password: yup
      .string()
      .min(8, "Password must be 8 character")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirm password is diferentes")
      .required("A confirmação da senha é obrigatória"),
  });


  return (
    <div className="body">
      <div className="left-cadastro">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>
      <div className="right-cadastro">
        <div className="card-cadastro">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/cadastro">Sign In</Link>}
            </div>
          </div>
          <h1>Sign In</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleRegister}
            validationSchema={validationsRegister}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Email</label>

                <Field name="email" type='email' className="form-field" placeholder="Enter Email" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <label form="email">Password</label>
                <Field name="password" type='password' className="form-field" placeholder="Enter Password" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              {/*Confirmação*/}

              <div className="form-group">
                <label form="email">Confirm Password</label>
                <Field name="confirmation" type='password' className="form-field" placeholder="Enter Confirm Password" />

                <ErrorMessage
                  component="span"
                  name="confirmation"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit">
                Sign In
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default SignIn;