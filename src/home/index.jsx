import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import Header from '../components/custom/Header'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaRegCheckCircle, FaUserPlus, FaFileAlt, FaEdit, FaDownload } from 'react-icons/fa'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import Sad from '../assets/sad.webp'
import Oprah from '../assets/oprah.gif'


const Home = () => {
  const { user, isSignedIn } = useUser()

  const FeatureItem = ({ text }) => (
    <span className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm">
      <FaRegCheckCircle size={20} className="text-green-600" />
      <p className="text-sm sm:text-base text-black">{text}</p>
    </span>
  )

  const steps = [
    { icon: <FaUserPlus className="text-3xl text-purple-600" />, title: 'Sign Up', description: 'Create an account to get started.' },
    { icon: <FaFileAlt className="text-3xl text-purple-600" />, title: 'Choose a Template', description: 'Select from a variety of templates.' },
    { icon: <FaEdit className="text-3xl text-purple-600" />, title: 'Customize Your Resume', description: 'Tailor your resume using our tools.' },
    { icon: <FaDownload className="text-3xl text-purple-600" />, title: 'Download and Share', description: 'Export and share your resume.' },
  ]

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="w-full h-170 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 sm:px-6 py-16 text-center rounded-xl shadow-md">
        <h1 className="mt-25 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 max-w-5xl mx-auto leading-tight">
          Create clean <span className="text-purple-600">resumes</span> in a minute!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
          Expert-crafted resumes designed to impress recruiters and beat ATS. <span className="font-medium text-gray-800">Stand out. Get noticed. Land your dream job.</span>
        </p>
        <div className="mt-4">
          <Link to={isSignedIn ? '/dashboard' : '/auth/sign-in'}>
            <Button variant="secondary" size="lg" className="rounded-lg">
              Start Building
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <FeatureItem text="Tailored resumes" />
          <FeatureItem text="Customizable Options" />
          <FeatureItem text="AI assistance" />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-purple-400 to-purple-900 py-16 px-4 rounded-bl-[10rem] text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Why Choose Us?</h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <img src={Sad} alt="Without Resumate" className="w-full h-auto rounded-3xl object-cover shadow-lg" />
            <div className="bg-white text-gray-700 p-6 sm:p-8 mt-5 rounded-2xl w-full max-w-md shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">You without <span className="text-purple-700">Resumate</span></h2>
              {['Resumes don’t stand out', 'Too much grunt work', 'Can’t fine-tune to your taste', 'No amazing results'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-lg mb-3">
                  <ThumbsDown size={22} className="text-gray-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img src={Oprah} alt="With Resumate" className="w-full h-auto rounded-3xl object-cover shadow-lg" />
            <div className="bg-white text-gray-800 p-6 sm:p-8 mt-5 rounded-2xl w-full max-w-md shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">You with <span className="text-purple-700">Resumate</span></h2>
              {['Create beautiful resumes in no time', 'AI powered assistance', 'Customize and edit as you please', 'Impress recruiters'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-lg mb-3">
                  <ThumbsUp size={22} className="text-purple-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600 text-center mb-4">How It Works</h1>
        <h2 className="text-md md:text-xl font-semibold text-center max-w-2xl mx-auto mb-10">
          Your dream job is just a few steps away. Let Resumate help you craft the perfect resume in minutes.
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      <video
  className="w-full text-black max-w-6xl mx-auto mt-12 rounded-xl shadow-2xl"
  autoPlay
  loop
  muted
  controls
  playsInline
>
  <source type="video/mp4"  alt='Video Tutorial on Resumate'/>
  Your browser does not support the video tag.
</video>
      </section>

      {/* Testimonials */}
    <div className="bg-gradient-to-br h-auto py-16 flex flex-col justify-center from-purple-100 to-blue-100 py-16 px-4">
  <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-12">
    What Our Users Say
  </h1>

  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Testimonial 1 */}
    <div className="bg-white p-6 border-r-2 border-purple-600 rounded-tl-3xl rounded-bl-3xl shadow-xl text-center">
      <div className="flex justify-center mb-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="User"
          className="w-16 h-16 rounded-full border-2 border-purple-300"
        />
      </div>
      <p className="text-gray-700 text-base mb-4">
        “Resumate has completely transformed my job search. The AI assistance and customizable options made it so easy to create a standout resume!”
      </p>
      <div className="flex justify-center gap-1 text-yellow-400 text-xl">
        ⭐⭐⭐⭐⭐
      </div>
      <p className="mt-2 text-sm text-gray-500">— Zion Omogbeme</p>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-white p-6 border-r-2 border-l-2 border-purple-600 rounded-3xl shadow-xl text-center">
      <div className="flex justify-center mb-4">
        <img
          src="https://i.pravatar.cc/100?img=20"
          alt="User"
          className="w-16 h-16  border-2 border-purple-300"
        />
      </div>
      <p className="text-gray-700 text-base mb-4">
        “I love how quick and easy it is to build a professional resume with Resumate. The templates are beautiful and the AI suggestions are spot on!”
      </p>
      <div className="flex justify-center gap-1 text-yellow-400 text-xl">
        ⭐⭐⭐⭐⭐
      </div>
      <p className="mt-2 text-sm text-gray-500">— Sochima Ezetah-Dare</p>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-white p-6 rounded-tr-3xl border-l-2 border-purple-600 rounded-br-3xl shadow-xl text-center">
      <div className="flex justify-center mb-4">
        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="User"
          className="w-16 h-16 rounded-full border-2 border-purple-300"
        />
      </div>
      <p className="text-gray-700 text-base mb-4">
        “Finally, a resume builder that understands what recruiters want. Resumate helped me land my dream job!”
      </p>
      <div className="flex justify-center gap-1 text-yellow-400 text-xl">
        ⭐⭐⭐⭐⭐
      </div>
      <p className="mt-2 text-sm text-gray-500">— Stephanie Lewis</p>
    </div>
  </div>
</div>


      {/* Call to Action */}
      <div className='bg-gradient-to-br h-auto from-purple-100 to-blue-100'>
      <div className="bg-gradient-to-b h-120 flex justify-center flex-col  rounded-tl-[10rem] from-purple-900 to-purple-400 py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">What are you waiting for?</h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Join thousands of users who have transformed their job search with Resumate. Whether you're a fresh graduate or a seasoned pro, we've got your back.
          </p>
          <Link to={isSignedIn ? '/dashboard' : '/auth/sign-in'}>
            <Button variant="destructive" size="lg" className="rounded-lg">
              Start Building 
            </Button>
          </Link>
        </div>
      </div>
      </div>
      <footer className="bg-gradient-to-tr from-purple-100 to-blue-100 text-gray-800 pt-16 pb-8 px-6 md:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    
    {/* Logo & Description */}
    <div>
      <h4 className="text-2xl font-bold text-purple-700">Resumate</h4>
      <p className="mt-4 text-gray-600 text-sm">
        Build job-winning resumes effortlessly with AI-powered guidance and stunning templates.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Resources</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Templates</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
      <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for tips and updates.</p>
      <form className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Subscribe
        </button>
      </form>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
    {/* Copyright */}
    <p>&copy; {new Date().getFullYear()} Resumate. All rights reserved.</p>

    {/* Social Icons */}
    <div className="flex space-x-4 mt-4 sm:mt-0">
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </div>
</footer>
     
    </>
  )
}

export default Home
