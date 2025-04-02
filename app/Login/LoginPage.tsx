'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox, Column, FlexGrid, Form, PasswordInput, Row, TextInput, Tile } from "@carbon/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginPageProps {
  onLogin?: (credentials: { username: string; password: string }) => void; // Optional prop for testing
}

export default function LoginPage({ onLogin }: Readonly<LoginPageProps>) {
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

      // Call the onLogin prop if provided (for testing purposes)
      if (onLogin) {
        onLogin({ username: values.username, password: values.password });
      } else {
        router.push("/Dashboard"); // Default behavior
      }
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
                  labelText="username"
                  placeholder="Enter username"
                  {...formik.getFieldProps('username')}
                  invalid={formik.touched.username && !!formik.errors.username}
                  invalidText={formik.errors.username}
                />
                <br />

                <PasswordInput
                  id="password"
                  labelText="password"
                  autoComplete="true"
                  placeholder="Enter the password"
                  {...formik.getFieldProps('password')}
                  invalid={formik.touched.password && !!formik.errors.password}
                  invalidText={formik.errors.password}
                />
                <br />
                <div className="checkbox-group">
                  <Checkbox
                    labelText="Remember Me"
                    id="remember_me"
                    {...formik.getFieldProps('rememberMe')}
                  />
                  <br />
                  <Link href="/" className="forgot-password">Forgot Password?</Link>
                </div>

                <Button id="btn" kind="primary" type="submit">Login</Button>

                <p className="signup-link">
                  Don't have an account? <Link href="/">Sign up</Link>
                </p>
              </Form>
            </Tile>
          </Column>
        </Row>
      </Tile>
    </FlexGrid>
  );
}