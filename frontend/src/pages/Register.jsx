import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfilePicSelector from "../componentsLib/LandingComps/ProfilePicSelector";
import { validateEmail } from "./Login.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPass: "",
  });
  const prefix = "/api/v1/auth";
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //For uploading image
  const uploadImage = async (image) => {
    const form = new FormData();
    form.append("image", image);
    try {
      const res = await fetch(prefix + "/upload-image", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmPass = formData.password === formData.confirmPass;
    if (!validateEmail(formData.email)) {
      setErrors("Please enter a valid email");
      return;
    }
    if (!formData.password || !formData.confirmPass) {
      setErrors("Please enter a password");
      return;
    }
    if (!isConfirmPass) {
      setErrors("Please check your passwords again");
      return;
    }
    try {
      let profilePicUrl = null;
      const { email, username, password } = formData;
      if (profilePic) {
        const uploadedImage = await uploadImage(profilePic);
        profilePicUrl = uploadedImage.imageURL;

        if (!profilePicUrl) {
          setErrors("Image upload failed");
          return;
        }
      }
      const res = await fetch(prefix + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          profilePicURL: profilePicUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors);
        return;
      }
      if (data.message) {
        setErrors(data.message);
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Create an account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <ProfilePicSelector
            image={profilePic}
            setImage={setProfilePic}
            preview={preview}
            setPreview={setPreview}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              type="text"
              placeholder="example"
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              type="password"
              placeholder="******"
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              name="confirmPass"
              value={formData.confirmPass}
              type="password"
              placeholder="******"
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>
          {errors && (
            <div>
              <p className="text-sm text-red-400 ">{errors}</p>
            </div>
          )}
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="bg-amber-200 text-black w-full hover:bg-amber-500"
            >
              Sign Up
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-6">
            Alredy have an account?{" "}
            <a
              href="/login"
              className="text-amber-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
