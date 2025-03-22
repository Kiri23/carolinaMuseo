export default function Button({
  imageUrl,
  size = "md",
  onClick,
  alt = "button image",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className="w-40 h-40 rounded-full 
                bg-blue-500 text-gray-700 text-xl font-bold"
      {...props}
    >
      {imageUrl && (
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      )}
      {props.children}
    </button>
  );
}
