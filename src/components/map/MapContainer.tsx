import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet-custom.css';
import { CulturalWorkWithDetails } from '@/lib/supabase';

// Configurar ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ícones personalizados por categoria
const createCategoryIcon = (category: string, color: string) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
      ">
        ${category.charAt(0)}
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

// Mapeamento de cores por categoria
const categoryColors: Record<string, string> = {
  'Artes Visuais': '#FF6B6B',
  'Literatura': '#4ECDC4',
  'Música': '#45B7D1',
  'Teatro e Performance': '#96CEB4',
  'Artesanato': '#FFEAA7',
  'Patrimônio Cultural': '#DDA0DD',
  'Manifestações Populares': '#98D8C8',
  'Arte Digital': '#F7DC6F',
};

interface MapContainerProps {
  works: CulturalWorkWithDetails[];
  onWorkClick: (work: CulturalWorkWithDetails) => void;
  onMapClick?: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  enableAddMode?: boolean;
  selectedWork?: CulturalWorkWithDetails | null;
}

// Componente para capturar cliques no mapa
function MapClickHandler({ onMapClick, enableAddMode }: { onMapClick?: (lat: number, lng: number) => void; enableAddMode?: boolean }) {
  useMapEvents({
    click: (e) => {
      if (enableAddMode && onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  
  return null;
}

const InteractiveMap: React.FC<MapContainerProps> = ({
  works,
  onWorkClick,
  onMapClick,
  center = [-19.9167, -43.9345], // Belo Horizonte como centro padrão
  zoom = 10,
  height = '500px',
  enableAddMode = false,
  selectedWork,
}) => {
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Aguardar um pouco para o mapa carregar completamente
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Ajustar o mapa para mostrar todas as obras
  useEffect(() => {
    if (mapReady && mapRef.current && works.length > 0) {
      const map = mapRef.current;
      const bounds = L.latLngBounds(works.map(work => [work.latitude, work.longitude]));
      
      // Adicionar um padding ao bounds
      const paddedBounds = bounds.pad(0.1);
      map.fitBounds(paddedBounds);
    }
  }, [works, mapReady]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onMapClick={onMapClick} enableAddMode={enableAddMode} />
        
        {works.map((work) => {
          const isSelected = selectedWork && selectedWork.id === work.id;
          const categoryColor = categoryColors[work.category.name] || '#6B7280';
          const icon = createCategoryIcon(work.category.name, categoryColor);
          
          return (
            <Marker
              key={work.id}
              position={[work.latitude, work.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onWorkClick(work),
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className="mb-2">
                    {work.image_urls && work.image_urls.length > 0 && (
                      <img
                        src={work.image_urls[0]}
                        alt={work.title}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-[#004A24] mb-1">{work.title}</h3>
                  <p className="text-sm text-[#121A0F] mb-1">
                    <strong>Autor:</strong> {work.author}
                  </p>
                  <p className="text-sm text-[#121A0F] mb-1">
                    <strong>Categoria:</strong> {work.category.name}
                  </p>
                  <p className="text-sm text-[#121A0F] mb-1">
                    <strong>Tipo:</strong> {work.type.name}
                  </p>
                  <p className="text-sm text-[#121A0F] mb-1">
                    <strong>Região:</strong> {work.region.name}
                  </p>
                  {work.description && (
                    <p className="text-sm text-[#121A0F] mt-2 line-clamp-3">
                      {work.description}
                    </p>
                  )}
                  {work.address && (
                    <p className="text-xs text-gray-600 mt-2">
                      📍 {work.address}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {enableAddMode && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-10 border-l-4 border-[#BB4514]">
          <p className="text-sm font-medium text-[#004A24]">
            🎯 Clique no mapa para adicionar uma nova obra
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
