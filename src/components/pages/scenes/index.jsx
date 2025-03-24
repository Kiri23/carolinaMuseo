import Cuartos from "../cuartos";

// Mock data for thumbnails
const KIOSK_METADATA = {
  BorinquenPanel: {
    title: "Borinquen Kiosk",
    thumbnail: "/carolinaMuseo/assets/cuartos/1/panel.jpg",
    description: "Interactive kiosk about Borinquen",
  },
};

export default function Scenes() {
  const availableKiosks = Object.keys(Cuartos).map((kioskId) => ({
    id: kioskId,
    ...KIOSK_METADATA[kioskId],
  }));

  const handleOpenKiosk = (kioskId) => {
    window.open(`/carolinaMuseo/kiosk/${kioskId}`, "_blank");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Kiosks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableKiosks.map((kiosk) => (
          <div
            key={kiosk.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={kiosk.thumbnail}
              alt={kiosk.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{kiosk.title}</h2>
            <p className="text-gray-600 mb-4">{kiosk.description}</p>
            <button
              onClick={() => handleOpenKiosk(kiosk.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Kiosk
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
