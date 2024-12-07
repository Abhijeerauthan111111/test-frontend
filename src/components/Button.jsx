const Button = ({btnType, btnText, handler}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm";
  
  if (btnType === 'success') {
    return (
      <button 
        className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600`}
        onClick={handler}
      >
        {btnText}
      </button>
    );
  } else if (btnType === 'danger') {
    return (
      <button 
        className={`${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700`}
        onClick={handler}
      >
        {btnText}
      </button>
    );
  }
  
  return (
    <button 
      className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600`}
      onClick={handler}
    >
      {btnText}
    </button>
  );
};

export default Button;