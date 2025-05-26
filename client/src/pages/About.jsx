import React from 'react'

const About = () => {
  return (
     <section className="w-full bg-white dark:bg-black py-12 px-6 md:px-20 mt-10" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Placeholder Box */}
        <div className="w-full md:w-1/2 h-64 bg-zinc-200 rounded-xl flex items-center justify-center text-gray-500 text-lg overflow-hidden">
         <img className='h-full w-full object-cover ' src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Welcome to our store! We’re passionate about delivering quality products
            and a seamless shopping experience. Whether you're looking for the latest
            trends or timeless essentials, we’ve got you covered.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to bring value and satisfaction to every customer. 
            We’re constantly innovating and improving to make your experience even better.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About