import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setReqParams } from "../Config/MyMethod";

const Login = ({ logado = false }) => {

  const handleLogin = async (values) => {

    try {
      let url  = "http://localhost:3001/login"
      let data = {
        email: values.email,
        password: values.password,
      }
      
      setReqParams(url,data)
      await Axios.post(url,data).then((response) => {
        const status = response.status

        if (status === 200) {
          // localStorage.setItem('@user', JSON.stringify(response.config.data));
          // window.location.reload();
          toast.success(response.data.msg)
        } else {
          // toast.info(`${response.data.msg}`, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
          toast.error(response.data.msg)
        }

      });
    } catch (e) {
        console.log(e)
        toast.error(e.response.data.msg)
    }
    
  };


  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("E-mail invalid")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "Password must be 8 character")
      .required("A senha é obrigatória"),
  });


  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />

      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/signin">Sign In</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
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

              <button className="button" type="submit">
                LogIn
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default Login;