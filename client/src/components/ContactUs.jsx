import React from 'react'

const ContactUs = () => {
  return (
    <div className="px-6 py-10 dark:bg-blue-950 ">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:px-36 font-semibold">
        <form className="w-full lg:w-1/2 space-y-2">
          <div className="text-center lg:text-left">
            <h1 className="font-bold text-4xl mr-3">Contact <span className="text-orange-600">Us!</span></h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <input
              type="text"
              id="name"
              name="name"
              className="rounded p-3 w-full lg:w-1/2 text-sm bg-slate-500 placeholder:text-white placeholder:font-semibold"
              required
              placeholder="Name"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="rounded p-3 w-full lg:w-1/2 text-sm bg-slate-500 placeholder:text-white placeholder:font-semibold"
              required
            />
          </div>
          
          <div>
            <input
              type="text"
              id="subject"
              name="subject"
              className="rounded-lg p-3 w-full text-sm bg-slate-500 placeholder:text-white placeholder:font-semibold"
              required
              placeholder="Email Subject"
            />
          </div>
          
          <div>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="p-4 w-full text-sm bg-slate-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-white placeholder:font-semibold resize-none"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button className="text-white bg-slate-500 p-3 px-6 hover:bg-slate-600 rounded-3xl transition-all duration-300">
              Send Message
            </button>
          </div>
        </form>
        
        {/* Image Section (Hidden on Mobile, Visible on Larger Screens) */}
        <div className="hidden lg:block w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10  justify-center items-center">
  <img
    src="/contactmewebp.jpg"
    alt="Contact Us"
    className="w-full max-h-96 object-contain rounded-lg"
  />
</div>

      </div>
    </div>
  );
}

export default ContactUs;
