import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import { loginUser } from "../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, name }) => {
    const body = {
      email,
      password,
      name,
      images: "https://via.placeholder.com/600x400?text=no+user+image",
    };

    try {
      await dispatch(registerUser(body));
      await dispatch(loginUser(body));
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
    }

    reset();
  };

  const userEmail = {
    required: "Email is required.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };

  const userName = {
    required: "Name is required.",
  };

  const userPassword = {
    required: "Password is required.",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  };

  const passwordMatch = {
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center">Create Account</h1>
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

          <div className="mb-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("name", userName)}
            />
            {errors?.name && (
              <div>
                <span className="text-red-500">{errors.name.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span className="text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("confirmPassword", {
                ...userPassword,
                ...passwordMatch,
              })}
            />
            {errors?.confirmPassword && (
              <div>
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!isDirty}
              className={`w-full px-4 py-2 text-white duration-200 rounded-md ${
                isDirty
                  ? "bg-black hover:bg-gray-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              REGISTER
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Already Have An Account?{" "}
            <a href="/login" className="font-medium hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
