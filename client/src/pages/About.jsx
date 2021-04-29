import React from "react";

export const About = () => {
  return (
    <div style={{backgroundColor:'#88A17B', minHeight:"95vh", paddingBottom:'25px'}}>
      <h3 className="mb-12" style={{paddingTop:'50px', textAlign:'center', color:'white', fontSize:'50px', fontWeight:'bold'}}>APMA</h3>
      <img className="m-auto" src="https://lh3.googleusercontent.com/proxy/yVm3DVaV9yRg0bTdNvbS7erhCWZLa0jkd4Yrs6HM3Uqr4YNzuQM2IYDQ5A_sLXMCdULjv-1W4bQsu-AwEEUUdZoosQ" alt="home"/>
      <h3 className="mt-12" style={{textAlign:'center', color:'white', fontSize:'50px', fontWeight:'bold'}}>
        A Property Management App
      </h3>
      <div className="font-sans flex bg-white justify-center m-10 text-lg shadow-xl p-10 rounded-lg">
        <p>
          We are a company that helps landlords easily manage their properties and
          tenants. Our intended users/customers will be both property owners, as
          well as the people they lease these properties to. The app would allow
          both parties to communicate and exchange information with each other.
        </p>
      </div>
    </div>
  );
};
