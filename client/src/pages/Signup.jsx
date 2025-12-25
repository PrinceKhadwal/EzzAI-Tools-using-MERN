import { useRef } from "react";
import { fetchUserSignUp } from "../axios/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../zustand/useUser";

const SignUp = () => {
  
  const setUser = useUser((state) => state.setUser)
  const navigate = useNavigate();

  const name = useRef("");
  const email = useRef("");
  const password = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !email.current.value ||
        !password.current.value ||
        !name.current.value
      ) {
        toast.warning("All fields are compulsory");
      } else {
        toast.info("Wait, We are creating your account..!!", {
          autoClose: 2000,
        });
        const res = await fetchUserSignUp({
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });

        if (res.status === 200) {
          const {token, user} = res?.data;
          localStorage.setItem("token", token);
          setUser({token, user});
          toast.success("Registration Successful");
          navigate("/");
        } else {
          toast.warning(res?.data?.message);
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl min-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">
            User Registration
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <section className="flex-1 mx-2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    ref={name}
                    placeholder="Enter name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    ref={email}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    ref={password}
                    placeholder="Enter your password"
                  />
                </div>
              </section>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>

              <input
                type="reset"
                value="Reset"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <Link to={"/login"} className="text-indigo-500">
                Already Have an Account? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
