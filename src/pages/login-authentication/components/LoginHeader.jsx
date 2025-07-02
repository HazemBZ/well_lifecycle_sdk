import React from "react";
import Icon from "../../../components/AppIcon";

const LoginHeader = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="bg-primary-600 text-white p-2 rounded-md mr-3">
          <Icon name="Layers" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Well Lifecycle SDK</h1>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome back</h2>
        <p className="text-neutral-600">
          Sign in to your account to continue working on your projects
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;