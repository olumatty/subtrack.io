import { Link,} from "react-router-dom";
import { useState } from "react";
import Password from "../Components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
        setError("Please enter the password");
        return;
    }

    setError("");

    try {
      const response = await axios.post("https://subscriptiontrack-1.onrender.com/api/auth/login", { email, password });
      const { token, userId } = response.data;
    
      localStorage.setItem("token", token);
      console.log("Login successful, user ID:", userId);
      setEmail("");
      setPassword("");
      window.location.href = '/dashbaoard';

    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError("Invalid email or password.");
        } else {
          setError("An error occurred: " + err.response.data.message || "Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className=" w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
