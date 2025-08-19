import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  User, 
  Calendar, 
  Tag, 
  Mail, 
  Phone, 
  Globe, 
  Image as ImageIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CulturalWorkWithDetails } from '@/lib/supabase';

interface WorkDetailsProps {
  work: CulturalWorkWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (work: CulturalWorkWithDetails) => void;
  canEdit?: boolean;
}

const WorkDetails: React.FC<WorkDetailsProps> = ({
  work,
  isOpen,
  onClose,
  onEdit,
  canEdit = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!work) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < work.image_urls.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : work.image_urls.length - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#004A24] pr-8">
            {work.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagens */}
          {work.image_urls && work.image_urls.length > 0 && (
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={work.image_urls[currentImageIndex]}
                  alt={`${work.title} - Imagem ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Imagem+não+encontrada';
                  }}
                />
              </div>
              
              {work.image_urls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {work.image_urls.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#004A24] mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações da Obra
                </h3>
                <div className="space-y-2">
                  <p><strong>Autor:</strong> {work.author}</p>
                  <p><strong>Categoria:</strong> {work.category.name}</p>
                  <p><strong>Tipo:</strong> {work.type.name}</p>
                  <p><strong>Região:</strong> {work.region.name}</p>
                  {work.materials && work.materials.length > 0 && (
                    <div>
                      <strong>Materiais:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {work.materials.map((material) => (
                          <Badge key={material.id} variant="outline" className="text-xs">
                            {material.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#004A24] mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Localização
                </h3>
                <div className="space-y-2">
                  <p><strong>Coordenadas:</strong> {work.latitude.toFixed(6)}, {work.longitude.toFixed(6)}</p>
                  {work.address && <p><strong>Endereço:</strong> {work.address}</p>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#004A24] mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Datas
                </h3>
                <div className="space-y-2">
                  <p><strong>Adicionado em:</strong> {new Date(work.created_at).toLocaleDateString('pt-BR')}</p>
                  {work.updated_at !== work.created_at && (
                    <p><strong>Atualizado em:</strong> {new Date(work.updated_at).toLocaleDateString('pt-BR')}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Descrição */}
              {work.description && (
                <div>
                  <h3 className="text-lg font-semibold text-[#004A24] mb-2">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{work.description}</p>
                </div>
              )}

              {/* Tags */}
              {work.tags && work.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#004A24] mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, index) => (
                      <Badge key={index} className="bg-[#E8F5E9] text-[#004A24]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contato */}
              {work.contact_info && Object.keys(work.contact_info).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#004A24] mb-2">Contato</h3>
                  <div className="space-y-2">
                    {work.contact_info.email && (
                      <a
                        href={`mailto:${work.contact_info.email}`}
                        className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {work.contact_info.email}
                      </a>
                    )}
                    {work.contact_info.phone && (
                      <a
                        href={`tel:${work.contact_info.phone}`}
                        className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {work.contact_info.phone}
                      </a>
                    )}
                    {work.contact_info.website && (
                      <a
                        href={work.contact_info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Galeria de imagens em miniatura */}
          {work.image_urls && work.image_urls.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[#004A24] mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Galeria ({work.image_urls.length} imagens)
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {work.image_urls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-[#BB4514]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Erro';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Informações técnicas */}
          <div className="border-t pt-4">
            <details className="group">
              <summary className="cursor-pointer text-[#004A24] font-medium">
                Informações técnicas
              </summary>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {work.id}</p>
                <p><strong>Status:</strong> {work.status}</p>
                {work.submitted_by && <p><strong>Adicionado por:</strong> {work.submitted_by}</p>}
                {work.approved_by && <p><strong>Aprovado por:</strong> {work.approved_by}</p>}
              </div>
            </details>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#BB4514] text-[#BB4514] hover:bg-[#BB4514] hover:text-white"
            >
              Fechar
            </Button>
            
            <Button
              onClick={() => window.open(`https://www.google.com/maps?q=${work.latitude},${work.longitude}`, '_blank')}
              variant="outline"
              className="border-[#BB4514] text-[#BB4514] hover:bg-[#BB4514] hover:text-white"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver no Maps
            </Button>

            {canEdit && onEdit && (
              <Button
                onClick={() => onEdit(work)}
                className="bg-[#BB4514] hover:bg-[#A03D12] text-white"
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkDetails;
