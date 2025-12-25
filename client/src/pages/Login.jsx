import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserLogin } from "../axios/api";
import { useUser } from "../zustand/useUser";

const Login = () => {
  const navigate = useNavigate();

  const setUser = useUser((state) => state.setUser);
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email.current.value || !password.current.value) {
        toast.info("All fields are compulsory");
      } else {
        const res = await fetchUserLogin({
          email: email.current.value,
          password: password.current.value,
        });
        if (res.status === 200) {
          const { token } = res.data;
          localStorage.setItem("token", token);
          setUser({token, user: res?.data?.user});
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.warning(res?.data?.message);
        }
      }
    } catch (err) {
      toast.error(err);
      email.current.value = "";
      password.current.value = "";
    }
  };

  return (
    <div className="flex items-center justify-center  py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-2xl min-w-sm max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            ref={email}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            ref={password}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <Link to={"/signup"} className="text-indigo-500">
            Don't Have an Account
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
