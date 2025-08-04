import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";
import LoginSidebar from "./components/LoginSidebar";
import AuthOptions from "./components/AuthOptions";
import { Navigator } from "components/helpers/Navigator";

const LoginAuthentication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Mock credentials
  const mockCredentials = {
    email: "admin@wellsdk.com",
    password: "Well@SDK2024"
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    setLoginError("");
    
    // Simulate API call
    setTimeout(() => {
      if (values.email === mockCredentials.email && values.password === mockCredentials.password) {
        navigate("/dashboard-project-overview");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">

    <Navigator />
      {/* Left sidebar with background image and info */}
      <LoginSidebar />
      
      {/* Right side login form */}
      <div className="flex-1 flex flex-col justify-between p-6 md:p-8 lg:p-12">
        <div className="max-w-md w-full mx-auto">
          <LoginHeader />
          
          <div className="mt-8 mb-8">
            <LoginForm 
              onSubmit={handleLogin} 
              isLoading={isLoading} 
              error={loginError}
              mockCredentials={mockCredentials}
            />
          </div>
          
          <div className="mt-6">
            <AuthOptions />
          </div>
        </div>
        
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginAuthentication;