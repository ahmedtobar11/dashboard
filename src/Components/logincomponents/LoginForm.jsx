// LoginForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { schema } from "./validations/loginSchema" 
import { loginSubmit } from "./LoginService/loginSubmit"; 
import Button from "../ui/Button";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await loginSubmit(data, setIsLoading, setError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="card-body space-y-10">
      <h1 className="text-main text-center text-4xl md:text-5xl font-bold  ">
        Login  
      </h1>

      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text ">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          {...register("email")}
          className={`input input-bordered w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text ">Password</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          {...register("password")}
          className={`input input-bordered w-full ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {dataError && (
        <p className="mt-1 text-sm text-red-600 text-center">{dataError}</p>
      )}

      <div className="form-control mt-6">
        <Button
          type="submit"
          variant="fill"
          size="lg"
          text={isLoading ? "Logging in..." : "Login"}
          className="text-xl md:text-3xl "
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
