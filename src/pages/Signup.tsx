import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useState } from "react";
import {
  Camera,
  Image,
  Heart,
  Clapperboard,
  Palette,
} from "lucide-react";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  dob: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignUpData>({
    username: "",
    email: "",
    password: "",
    dob: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | null>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrormsg("");

    try {
    const res = await axios.post(
      "https://social-media-lite-f238.onrender.com/users/signup",
      formData
    );
    const data = res.data;
    localStorage.setItem("token", data.token);
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 400) {
        setError(true);
        setErrormsg("Please fill all the fields correctly.");
      } else if (status === 401) {
        setError(true);
        setErrormsg("Email already exists. Please log in.");
      } else if (status === 500) {
        setError(true);
        setErrormsg("Server error. Please try again later.");
      } 
    } else {
      setError(true);
      setErrormsg("Unexpected error occurred.");
    }
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted relative overflow-hidden w-full">
      {/* 🎨 Background Doodles */}
      <Camera className="absolute top-6 left-6 w-20 h-20 opacity-10 text-muted-foreground rotate-[-15deg]" />
      <Heart className="absolute top-[12%] left-[20%] w-14 h-14 opacity-10 text-muted-foreground rotate-[5deg]" />
      <Image className="absolute top-[18%] left-[8%] w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Image className="absolute top-4 right-6 w-20 h-20 opacity-10 text-muted-foreground rotate-[30deg]" />
      <Clapperboard className="absolute top-[20%] right-[18%] w-16 h-16 opacity-10 text-muted-foreground rotate-[12deg]" />
      <Palette className="absolute top-[10%] right-[5%] w-14 h-14 opacity-10 text-muted-foreground rotate-[-10deg]" />
      <Camera className="absolute top-[45%] left-[10%] w-24 h-24 opacity-10 text-muted-foreground rotate-[10deg]" />
      <Heart className="absolute top-[50%] right-[15%] w-20 h-20 opacity-10 text-muted-foreground rotate-[-20deg]" />
      <Palette className="absolute bottom-[15%] left-[8%] w-20 h-20 opacity-10 text-muted-foreground rotate-[25deg]" />
      <Clapperboard className="absolute bottom-[8%] left-[18%] w-16 h-16 opacity-10 text-muted-foreground rotate-[5deg]" />
      <Image className="absolute bottom-10 right-10 w-24 h-24 opacity-10 text-muted-foreground rotate-[-25deg]" />
      <Heart className="absolute bottom-[20%] right-[25%] w-16 h-16 opacity-10 text-muted-foreground rotate-[15deg]" />
      <Camera className="absolute bottom-[5%] right-[15%] w-20 h-20 opacity-10 text-muted-foreground rotate-[8deg]" />

      {/* Signup Card */}
      <div className="bg-white w-[90vw] max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6 z-10">
        <h2 className="text-xl font-bold text-center">Create an Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="@john"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-fit">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="justify-between"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center -mt-2">
              {errormsg || "Something went wrong"}
            </p>
          )}

          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="underline text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
