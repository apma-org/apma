import React from 'react';

export const SignUp = () => {
  return (    
    <div className="max-w-sm mx-auto bg-blue-200 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl">SIGN UP</h1>
      </div>
      
      <form /*onClick*/>
        <div className="mt-5">
          <label className="font-serif">Email</label>
          <input type="text" class="block w-full p-2 border rounded-lg border-gray-500"/>
        </div>
        <div className="mt-5">
          <label className="font-serif">Password</label>
          <input type="text" class="block w-full p-2 border rounded-lg border-gray-500"/>
        </div>
        <div className="mt-10">
          <input type="submit" class="py-3 bg-blue-300 text-white w-full hover:bg-blue-400 rounded-xl font-serif"/>
        </div>
      </form>
    </div>
  );
}