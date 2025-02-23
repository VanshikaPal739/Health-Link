'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          toast.success('Login Success');
          router.push('/browse-doctor');
          localStorage.setItem('token', response.data.token);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8 flex flex-col justify-center w-full bg-white">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={loginForm.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative group">
              <input
                type="text"
                id="email"
                name="email"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                placeholder=" "
                className="peer block w-full appearance-none border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email Address
              </label>
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {loginForm.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                placeholder=" "
                className="peer block w-full appearance-none border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {loginForm.errors.password}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="w-28 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </button>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                Forgot password?
              </a>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="signup"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;