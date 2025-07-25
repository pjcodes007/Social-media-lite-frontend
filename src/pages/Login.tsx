import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Camera,
} from "lucide-react";

interface loginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | null>("");

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrormsg("");

    try {
      const res = await axios.post(
        "https://social-media-lite-f238.onrender.com/users/login",
        formData
      );
      const data = res.data;
      localStorage.setItem("token", data.token);
      navigate("/feed", { replace: true }); // ✅ navigation here
    } catch (err: any) {
      setError(true);
      if (err.response) {
        const status = err.response.status;
        switch (status) {
          case 400:
            setErrormsg("Missing email or password.");
            break;
          case 401:
            setErrormsg("Invalid email or password.");
            break;
          case 403:
            setErrormsg("Access denied. Please contact support.");
            break;
          case 404:
            setErrormsg("User not found.");
            break;
          case 500:
            setErrormsg("Server error. Please try again later.");
            break;
          default:
            setErrormsg("An unexpected error occurred.");
        }
      } else {
        setErrormsg("Error: " + err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-muted relative overflow-hidden w-full justify-self-center">
      {/* Doodle Icons */}
      <Camera className="absolute top-4 left-6 w-20 h-20 opacity-10 text-muted-foreground rotate-[-15deg]" />
      {/* ...other doodles... */}
      {/* Login Card */}
      <div className="bg-white w-[90vw] max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6 z-10">
        <h2 className="text-xl font-bold text-center">Welcome Back</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" onChange={handleChange} />
          </div>
          {error && <p className="text-sm text-red-500 text-center -mt-2">{errormsg || "Something went wrong"}</p>}
          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          Sign Up
        </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
