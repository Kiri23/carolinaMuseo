export default function Button({
  imageUrl,
  size = "md",
  variant = "default",
  onClick,
  alt = "button image",
  ...props
}) {
  const baseClasses = "bg-blue-500 text-gray-700 text-xl font-bold";
  const variantClasses = {
    circular: "w-40 h-40 rounded-full",
    default: "px-6 py-3 rounded-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={alt} 
          className={`object-cover ${variant === 'circular' ? 'w-full h-full' : 'w-6 h-6 inline-block mr-2'}`} 
        />
      )}
      {props.children}
    </button>
  );
}
