import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Checkbox from "./Checkbox";
import Icon from "../../../components/AppIcon";

const LoginForm = ({ onSubmit, isLoading, error, mockCredentials }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  
  const getFieldError = (field) => {
    if (!touched[field]) return "";
    
    if (field === "email" && values.email.trim() === "") {
      return "Email is required";
    }
    
    if (field === "email" && !/\S+@\S+\.\S+/.test(values.email)) {
      return "Please enter a valid email address";
    }
    
    if (field === "password" && values.password.trim() === "") {
      return "Password is required";
    }
    
    return "";
  };
  
  const emailError = getFieldError("email");
  const passwordError = getFieldError("password");
  
  const isFormValid = !emailError && !passwordError && values.email && values.password;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!emailError}
          helperText={emailError}
          required
          icon="Mail"
          iconPosition="left"
          autoComplete="email"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!passwordError}
          helperText={passwordError}
          required
          icon="Lock"
          iconPosition="left"
          autoComplete="current-password"
          disabled={isLoading}
          inputClassName="pr-10"
        />
        <div className="relative">
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
            style={{ top: "-38px" }}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
          <Icon name="AlertCircle" className="mr-2 mt-0.5 flex-shrink-0" size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <Checkbox
          id="remember-me"
          name="rememberMe"
          checked={values.rememberMe}
          onChange={handleChange}
          label="Remember me"
          disabled={isLoading}
        />
        
        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
          Forgot password?
        </a>
      </div>
      
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid || isLoading}
        >
          Sign in
        </Button>
      </div>
      
      {/* Demo credentials hint */}
      <div className="bg-neutral-100 border border-neutral-200 rounded-md p-3 text-sm text-neutral-700">
        <p className="font-medium mb-1">Demo Credentials:</p>
        <p><span className="font-medium">Email:</span> {mockCredentials.email}</p>
        <p><span className="font-medium">Password:</span> {mockCredentials.password}</p>
      </div>
    </form>
  );
};

export default LoginForm;