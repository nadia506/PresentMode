import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));

    reset();
  };

  const userEmail = {
    required: "This field is required.",
  };

  const userPassword = {
    required: "This field is required.",
    minLength: {
      value: 6,
      message: "A password must include a minimum of six characters",
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center">
          Sign in to your account
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span className="text-red-500">{errors.email.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 relative">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                {...register("password", userPassword)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                onClick={togglePasswordVisibility}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors?.password && (
              <div>
                <span className="text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700"
            >
              SIGN IN
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't Have An Account Yet?{" "}
            <a href="/register" className="font-medium hover:underline">
              REGISTER
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
