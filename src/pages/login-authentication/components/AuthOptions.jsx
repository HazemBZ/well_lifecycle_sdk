import React from "react";
import Icon from "../../../components/AppIcon";

const AuthOptions = () => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-neutral-50 text-neutral-500">Or continue with</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <Icon name="Github" size={20} />
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <Icon name="Linkedin" size={20} />
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <Icon name="Globe" size={20} />
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Contact your administrator
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthOptions;