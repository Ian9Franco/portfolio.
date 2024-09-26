import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes } from 'react-icons/fa'

// Contexto para el tema
const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} })

// Proveedor del tema
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const toggleTheme = () => setIsDark(!isDark)
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook personalizado para usar el tema
const useTheme = () => useContext(ThemeContext)

const App = () => {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isButtonFloating, setIsButtonFloating] = useState(true)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top
        setIsButtonFloating(footerTop > window.innerHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Efecto para manejar el desplazamiento suave
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')
      if (href) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll)
      })
    }
  }, [])

  // Datos de experiencia
  const experiences = [
    {
      logo: "/placeholder.svg",
      title: "Fullstack Digital Products Developer",
      company: "The_FullStack",
      period: "Feb 2024 to Present - 8 months",
      description: "I am passionate about crafting innovative software solutions that drive business growth and user engagement. With extensive experience in product development, I leverage cutting-edge technologies like Cloud Computing, Web Development, AI and Blockchain to create efficient and scalable systems. My background in digital marketing complements my technical expertise, ensuring a holistic approach to building impactful digital products that meet both market needs and strategic goals. Enthusiastic about continuously learning and pushing the boundaries of technology, I thrive in environments where creativity meets functionality."
    },
    {
      logo: "/placeholder.svg",
      title: "Product Owner at Unired",
      company: "Unired",
      period: "Oct 2022 to Jun 2023 - 9 months",
      description: "As a Product Owner, I have had the privilege of leading a top-tier team of developers while utilizing the Scrum methodology. My primary focus has been on enhancing user experiences across existing digital channels and developing new services. These initiatives aim to increase the average ticket size of our current customers and attract new clients, driving growth and ensuring customer satisfaction."
    },
    {
      logo: "/placeholder.svg",
      title: "Product Manager at Unired",
      company: "Unired",
      period: "Dec 2021 to Sept 2022 - 10 months",
      description: "As part of the commercial team at Unired, I focused on developing the Marketplace project with the goal of generating new business lines and increasing the company's revenue. This role marked my entry into the exciting world of Fintech and payment methods, providing me with a solid foundation in financial technology and digital transactions."
    },
    {
      logo: "/placeholder.svg",
      title: "Junior Analyst at Atento",
      company: "Atento",
      period: "Jan 2008 to Jul 2009 - 1 year, 7 months",
      description: "As an Analyst in the Business Development department at Atento, the leading call center in the country at that time, I played a key role in developing proposals for new business opportunities to expand our service offerings. I collaborated with various major companies across multiple industries to integrate their needs into our services. This role allowed me to hone my analytical skills, enhance my proficiency in Excel, SAP, and PowerPoint, and contribute to the business growth and strategic development of Atento while gaining valuable experience in a collaborative team environment."
    }
  ]

  // Datos de educación
  const educations = [
    {
      type: "Specialization Course",
      institution: "Coderhouse",
      logo: "/placeholder.svg",
      program: "Advanced Backend Development I",
      date: "Aug 2024",
      category: "Web Development"
    },
    {
      type: "Specialization Course",
      institution: "Talento Digital",
      logo: "/placeholder.svg",
      program: "Full Stack Python Web Apps Development",
      date: "Jul 2024",
      category: "Web Development"
    },
    {
      type: "Specialization Course",
      institution: "Deeplearning.ai",
      logo: "/placeholder.svg",
      program: "Generative AI with Large Language Models",
      date: "Jun 2024",
      category: "Artificial Intelligence"
    },
    {
      type: "Specialization Course",
      institution: "MIT Sloan School of Management",
      logo: "/placeholder.svg",
      program: "Blockchain and Crypto Applications: From Decentralized Finance to Web 3",
      date: "Oct 2023",
      category: "Blockchain"
    },
    {
      type: "Specialization Course",
      institution: "CertiProf",
      logo: "/placeholder.svg",
      program: "Scrum Product Owner Professional Certificate (SPOPC)",
      date: "Feb 2023",
      category: "Agile Methodologies"
    },
    {
      type: "Diploma",
      institution: "Universidad de Chile",
      logo: "/placeholder.svg",
      program: "Digital Marketing & e-Business",
      date: "Jul 2020",
      category: "Marketing"
    },
    {
      type: "Diploma",
      institution: "Universidad de Chile",
      logo: "/placeholder.svg",
      program: "International trade and logistics",
      date: "Jan 2018",
      category: "Business"
    },
    {
      type: "Bs. Degree",
      institution: "Universidad Diego Portales",
      logo: "/placeholder.svg",
      program: "Business Engineering - Approved with Distinction",
      date: "Dec 2017",
      category: "Business"
    }
  ]

  // Función para obtener el color del botón basado en las etiquetas del proyecto
  const getButtonColor = (tags: string[]) => {
    if (tags.includes('React')) return 'bg-cyan-500 hover:bg-cyan-600'
    if (tags.includes('JavaScript')) return 'bg-yellow-500 hover:bg-yellow-600'
    if (tags.includes('Python')) return 'bg-blue-500 hover:bg-blue-600 border-2 border-yellow-500'
    return 'bg-gray-500 hover:bg-gray-600'
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `url('/public/fondo/${isDark ? 'oscuro' : 'claro'}.jpg')`,
        }}
      ></div>
      <div className={`relative z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <style>{`
          @keyframes wave {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .wave-gradient {
            background: linear-gradient(45deg, #ff9a9e, #fad0c4, #ffecd2);
            background-size: 400% 400%;
            animation: wave 15s ease infinite;
          }
          .cursor-glow {
            position: relative;
            overflow: hidden;
          }
          .cursor-glow::after {
            content: '';
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .cursor-glow:hover::after {
            opacity: 1;
          }
        `}</style>

        {/* Encabezado */}
        <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold flex items-center">
                <img src="/placeholder.svg" alt="Logo" className="w-8 h-8 mr-2" />
                The_FullStack
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#experience" className={`hover:text-purple-400 ${isDark ? 'text-white' : 'text-gray-900'}`}>Experience</a>
                <a href="#projects" className={`hover:text-purple-400 ${isDark ? 'text-white' : 'text-gray-900'}`}>Projects</a>
                <a href="#education" className={`hover:text-purple-400 ${isDark ? 'text-white' : 'text-gray-900'}`}>Education & Certifications</a>
                <a href="#" className={`hover:text-purple-400 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume</a>
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex items-center transition duration-300 focus:outline-none shadow mr-4`}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <div
                    className={`w-6 h-6 relative rounded-full transition duration-500 transform p-1 text-white ${
                      isDark ? 'bg-yellow-500 translate-x-6' : 'bg-gray-700 -translate-x-2'
                    }`}
                  >
                    {isDark ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-2xl"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden mt-4">
                <a href="#experience" className="block py-2 hover:text-purple-400">Experience</a>
                <a href="#projects" className="block py-2 hover:text-purple-400">Projects</a>
                <a href="#education" className="block py-2 hover:text-purple-400">Education & Certifications</a>
                <a href="#" className="block py-2 hover:text-purple-400">Resume</a>
              </div>
            )}
          </nav>
        </header>

        {/* Contenido principal */}
        <main className="pt-20 px-4 md:px-0">
          {/* Sección de héroe */}
          <div className="container mx-auto py-20 max-w-5xl">
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="w-32 h-48 bg-blue-600 rounded-lg shadow-lg flex flex-col items-center justify-center">
                  <img src="/placeholder.svg" alt="Alvaro" className="w-20 h-20 rounded-full mb-2" />
                  <p className="text-sm font-semibold">Alvaro Acevedo</p>
                  <p className="text-xs">Full-Stack Developer</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-24">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hey, I'm Alvaro <span className="inline-block bg-purple-600 text-white text-sm py-1 px-3 rounded-full ml-2">Let's work together</span></h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                As a Business Engineer and Web Developer with over 10 years of experience working for startups and corporates companies, I specialize in crafting unique digital products using cutting-edge technologies.
              </p>
              <p className="text-lg mb-8">
                Based in Santiago, Chile 🇨🇱, I am committed to transforming ideas into successful solutions that drive business growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className={`cursor-glow ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-inherit font-bold py-2 px-4 rounded-full flex items-center`}>
                  <FaLinkedin className="mr-2" /> LinkedIn
                </a>
                <a href="#" className={`cursor-glow ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-inherit font-bold py-2 px-4 rounded-full flex items-center`}>
                  <FaGithub className="mr-2" /> GitHub
                </a>
                <a href="#" className={`cursor-glow ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-inherit font-bold py-2 px-4 rounded-full flex items-center`}>
                  <FaEnvelope className="mr-2" /> alvaro.acevedo.ing@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Sección de proyectos */}
          <div id="projects" className="container mx-auto py-20 max-w-5xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Latest Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Spirit Store",
                  description: "Spirit Store is an advanced ecommerce platform developed with React, TypeScript, and Tailwind CSS, and hosted on Netlify. It offers a modern interface and intuitive navigation through categories and detailed product pages. It provides an efficient shopping cart and checkout process, ensuring a smooth and secure shopping experience.",
                  image: "/placeholder.svg?height=300&width=400",
                  tags: ["React", "TypeScript", "Tailwind", "Firebase", "Netlify"],
                  color: "bg-pink-500"
                },
                {
                  title: "Genzee",
                  description: "Genzee is a real estate portal tailored for Generation Z's rental preferences, featuring a minimalistic and modern style. Developed with Python, Django, Postgres, and styled with Bootstrap, it's hosted on Render. This platform enables landlords to post properties and tenants to efficiently find and manage rental requests.",
                  image: "/placeholder.svg?height=300&width=400",
                  tags: ["Python", "Django", "Bootstrap", "Postgres", "Render"],
                  color: "bg-blue-500"
                },
                {
                  title: "SweetCake",
                  description: "SweetCake is an ecommerce site for cakes and cupcakes, developed with Python, Django, and Bootstrap, and deployed on Render. It offers registered users a personal page with exclusive deals and highlights the most visited products on the home page. Additionally, it allows full administrative management through the Django admin session.",
                  image: "/placeholder.svg?height=300&width=400",
                  tags: ["Python", "Django", "Bootstrap", "Postgres", "Render"],
                  color: "bg-yellow-500"
                }
              ].map((project, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-800 bg-opacity-75' : 'bg-white bg-opacity-75'}`}>
                  <div className={`p-4 ${project.color}`}>
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`text-xs font-semibold inline-block py-1 px-2 rounded ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                    <a
                      href="#"
                      className={`cursor-glow inline-block ${getButtonColor(project.tags)} text-white font-bold py-2 px-4 rounded`}
                    >
                      GitHub Repository →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de experiencia */}
          <section id="experience" className="container mx-auto py-20 max-w-5xl">
            <h2 className="text-4xl font-bold mb-8">Experience</h2>
            <div className="space-y-12 relative">
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              {experiences.map((exp, index) => (
                <div key={index} className="flex relative">
                  <div className="flex-shrink-0 mr-4 z-10">
                    <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-gray-800 bg-opacity-75' : 'bg-gray-200 bg-opacity-75'} flex items-center justify-center`}>
                      <img src={exp.logo} alt={exp.company} className="w-12 h-12" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <p className="text-purple-500">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección de educación */}
          <section id="education" className="container mx-auto py-20 max-w-5xl">
            <h2 className="text-4xl font-bold mb-8">Education & Certifications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Institution</th>
                    <th className="px-4 py-2">Program</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {educations.map((edu, index) => (
                    <tr key={index} className={`${isDark ? 'bg-gray-800 bg-opacity-75' : 'bg-white bg-opacity-75'} border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} transition-colors duration-200 ease-in-out hover:${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <td className="px-4 py-2">{edu.type}</td>
                      <td className="px-4 py-2 flex items-center">
                        <img src={edu.logo} alt={edu.institution} className="w-8 h-8 mr-2" />
                        {edu.institution}
                      </td>
                      <td className="px-4 py-2">{edu.program}</td>
                      <td className="px-4 py-2">{edu.date}</td>
                      <td className="px-4 py-2">{edu.category}</td>
                      <td className="px-4 py-2">
                        <button className="cursor-glow bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition-colors duration-200 ease-in-out">
                          Certificate →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* Pie de página */}
        <footer ref={footerRef} className={`${isDark ? 'bg-gray-900' : 'bg-gray-300'} py-8`}>
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img src="/placeholder.svg" alt="Logo" className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">The_FullStack</span>
              </div>
              <div>
                <button className="cursor-glow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaDownload className="mr-2" />
                  Check out my resume
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>© 2024 The Fullstack™. Made with ❤️ by myself.</p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </footer>

        {/* Floating Resume Button */}
        <div
          className={`fixed right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out ${
            isButtonFloating ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-lg flex items-center transform -rotate-90 origin-left"
          >
            <FaDownload className="mr-2" />
            Check out my resume
          </button>
        </div>
      </div>
    </div>
  )
}

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

export default AppWrapper