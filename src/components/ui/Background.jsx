export default function Background({ imageUrl, children }) {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {children}
    </div>
  );
}