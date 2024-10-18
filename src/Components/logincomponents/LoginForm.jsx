import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { loginSchema } from "../../utils/validations/adminSchemas";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import { useAdminContext } from "../../contexts/AdminContext";

export default function LoginForm() {
  const { setAdmin } = useAdminContext();

  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await authServices.login(data, setAdmin);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-10">
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
          className={`input input-bordered w-full ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
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
          className={`input input-bordered w-full ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
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
          className="text-xl md:text-3xl mx-auto w-3/4  shadow-sm rounded-lg"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
