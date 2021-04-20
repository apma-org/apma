import React from "react";

export const Request = () => {
  return (
    <div class="flex mt-4">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
      />
      <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
        Add
      </button>
    </div>
  );
};
