import React from "react";

const Toast = ({ message, type, index }) => {
  console.log(index);
  return (
    <div
      className={`absolute left-0 bottom-3 w-[600px] px-2 transform transition-transform translate-y-0 opacity-90 animate-slide-up`}
    >
      <div className="border delay-10  bg-white border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-all ">
        <div className="flex p-4">
          <div className="flex-shrink-0">
            {type === "success" && (
              <svg
                class="w-6 h-6 fill-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            )}
            {type === "error" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 fill-amber-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="ms-3">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
