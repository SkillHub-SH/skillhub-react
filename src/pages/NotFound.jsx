const NotFound = () => {
  return ( 
    <div className="flex flex-col items-center mt-10 gap-y-4">
      <div 
        className='text-7xl'
      >
        <span className="text-gray-600">4</span>
        <span className="text-green-600">0</span>
        <span className="text-gray-600">4</span>
      </div>
      <p
        className="text-2xl w-2/3 text-gray-600"
      >
        We could not find the page you were looking for, so we found something to make you laugh to make up for it.
      </p>
      <a href="/" >
        <button className='text-white bg-green-600 font-bold text-xl py-2 px-8 mt-4 rounded hover:bg-green-400 focus:outline-none'>
          Go To Home
        </button>
      </a>
    </div>
  );
}
 
export default NotFound;