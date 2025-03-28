'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox, Column, FlexGrid, Form, PasswordInput, Row, TextInput, Tile } from "@carbon/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import './login.scss';

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      router.push("/Dashboard");
    },
  });

  return (
    <FlexGrid className="loginContainer">
      <Tile className="imageTile">
        <img src={'/login.jpg'} alt="Login Illustration" />
      </Tile>

      <Tile className="loginTile">
        <Row>
          <Column lg={8} className="formSection">
            <Tile className="loginForm">
              <h2 id="heading">Welcome Back!!</h2>

              <Form onSubmit={formik.handleSubmit}>
                <TextInput
                  id="username"
                  labelText="Username"
                  placeholder="Enter username"
                  {...formik.getFieldProps('username')}
                  invalid={formik.touched.username && !!formik.errors.username}
                  invalidText={formik.errors.username}
                />
                <br></br>

                <PasswordInput
                  id="password"
                  labelText="Password"
                  autoComplete="true"
                  placeholder="Enter the password"
                  {...formik.getFieldProps('password')}
                  invalid={formik.touched.password && !!formik.errors.password}
                  invalidText={formik.errors.password}
                />
                <br></br>
                <div className="checkbox-group">
                  <Checkbox labelText="Remember Me" id="remember_me" /><br></br>
                  <Link href="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>

                <Button id="btn" kind="primary" type="submit">Login</Button>

                <p className="signup-link">
                  Don't have an account? <Link href="/signup">Sign up</Link>
                </p>
              </Form>
            </Tile>
          </Column>
        </Row>
      </Tile>
    </FlexGrid>
  );
}
