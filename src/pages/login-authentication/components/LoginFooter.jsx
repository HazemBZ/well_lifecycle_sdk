import React from "react";

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-8 text-center text-sm text-neutral-500">
      <p>
        &copy; {currentYear} Well Lifecycle SDK. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="hover:text-primary-600 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-primary-600 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-primary-600 transition-colors">
          Help Center
        </a>
      </div>
    </footer>
  );
};

export default LoginFooter;