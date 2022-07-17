import TeamLogo from '../images/landingPage.svg';

const LandingPage = () => {
  return (
    <div className="container pt-4 mx-auto px-10 flex flex-col items-center justify-between h-screen">
      <div className='flex flex-row justify-between items-center'>
        <div>
          <div className="flex items-center">
            <h1 className="text-gray-600 text-3xl font-bold">
              SkillHub
            </h1>
            <span className="w-4 h-6 ml-1 bg-green-600 block"></span>
          </div>

          <p className="text-gray-500 text-4xl leading-snug my-12">
            Matching developers <br/> with great companies.
          </p>

          <div className='flex flex-col md:flex-row-reverse md:items-center md:gap-5 gap-14'>
            <div className='mr-8'>
              <img 
                src={TeamLogo}
                alt="Team Logo"
              />
            </div>

            <div className='basis-1/2'>
              <h2 className='text-gray-600 font-bold text-2xl mb-3'>
                For Developers
              </h2>
              <p className='text-sm text-gray-500'>
                Join developers, practice coding skills, prepare for interviews and get hired.
              </p>
              <a href='signup'>
                <button className='text-green-600 bg-white border-solid border-2 border-green-600 font-simibold text-xl py-2 px-6 mt-9 rounded hover:text-green-400 hover:border-green-400 focus:outline-none'>
                  Sign Up &amp; Code
                </button>
              </a>
              <div className='text-sm text-gray-600 mt-4'>
                Already have account? 
              </div>
              <a href='signin'>
                <button className='text-green-600 bg-white border-solid border-2 border-green-600 font-simibold text-xl py-2 px-6 mt-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none'>
                  Sign In
                </button>
              </a>
            </div>

            <div className='basis-1/2'>
              <h2 className='text-gray-600 font-bold text-2xl mb-3'>
                For Companies
              </h2>
              <p className='text-sm text-gray-500'>
                We are the market-leading techniacal interview platform to identify and hire developers wherever they are.
              </p>
              <a href='signup-company'>
                <button className='text-white bg-green-600 font-simibold text-xl py-2 px-6 mt-4 rounded hover:bg-green-400 focus:outline-none'>
                  Sign Up &amp; Hire
                </button>
              </a>
              <div className='text-sm text-gray-600 mt-4'>
                Already have account? 
              </div>
              <a href='signin-company'>
                <button className='text-white bg-green-600 font-simibold text-xl py-2 px-6 mt-1 rounded hover:bg-green-400 focus:outline-none'>
                  Sign In
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-8 text-gray-700 mt-10 md:mt-0">
        <p className='text-center'>All Copyright Resertced @2022</p>
      </div>
    </div>
  );
}
 
export default LandingPage;