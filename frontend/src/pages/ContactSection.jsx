import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        
        {/* Left Side */}
        <div className="bg-gradient-to-b from-lime-400 to-gray-200 rounded-2xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold mb-10">Get in touch</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold">Visit Us</h3>
              <p className="text-sm mt-2 text-gray-700">
                Jl. Ahmad Yani No. 10, Medan
              </p>
              <p className="text-sm text-gray-700">
                Rumah Sakit Umum Sehat Sentosa
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Chat to us</h3>
              <p className="text-sm mt-2 text-gray-700">
                admin@rumahsakit.com
              </p>
              <p className="text-sm text-gray-700">
                support@rumahsakit.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Call Us</h3>
              <p className="text-sm mt-2 text-gray-700">
                +62 812 3456 7890
              </p>
              <p className="text-sm text-gray-700">
                +62 821 9876 5432
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Social media</h3>
              <div className="flex gap-3">
                <div className="p-3 bg-white rounded-md shadow">
                  <FaFacebookF />
                </div>
                <div className="p-3 bg-white rounded-md shadow">
                  <FaInstagram />
                </div>
                <div className="p-3 bg-white rounded-md shadow">
                  <FaTwitter />
                </div>
                <div className="p-3 bg-white rounded-md shadow">
                  <FaWhatsapp />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-white rounded-2xl p-10 shadow-lg">
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Company Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full border border-gray-300 rounded-md p-3"
              ></textarea>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-1" />
              <p>
                Saya setuju untuk dihubungi kembali terkait pesan yang saya kirim.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;