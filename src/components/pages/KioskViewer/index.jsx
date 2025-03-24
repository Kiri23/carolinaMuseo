import { useParams, Navigate } from 'react-router-dom';
import Cuartos from '../cuartos';

export default function KioskViewer() {
  const { kioskId } = useParams();
  
  // Get the kiosk component
  const KioskComponent = Cuartos[kioskId];

  // If kiosk doesn't exist, redirect to scenes page
  if (!KioskComponent) {
    return <Navigate to="/admin/scenes" replace />;
  }

  return (
    <div className="min-h-screen">
      <KioskComponent />
    </div>
  );
}