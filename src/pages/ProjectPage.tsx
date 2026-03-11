import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProjectData {
  id: string;
  title: string;
  semester: string;
  description: string;
  fullDescription: string;
  tags: string[];
  location?: string;
  year: string;
  images: string[];
  details: {
    label: string;
    value: string;
  }[];
}

const projectsData: Record<string, ProjectData> = {
  'sesc-piratininga': {
    id: '01',
    title: 'SESC Piratininga',
    semester: '4º Semestre',
    description: 'Projeto arquitetônico completo para unidade SESC, explorando espaços de lazer, cultura e bem-estar com integração urbana.',
    fullDescription: `O projeto SESC Piratininga representa um estudo completo de arquitetura para uma unidade do Serviço Social do Comércio, focando na criação de espaços que promovam lazer, cultura, saúde e bem-estar para a comunidade.

O desenvolvimento do projeto incluiu análise de implantação urbana, estudos de fluxos de pedestres, insolação e ventilação natural. A proposta buscou integrar o edifício ao tecido urbano existente, criando uma relação harmoniosa entre o espaço construído e a cidade.

Foram projetadas áreas de convivência, espaços culturais, áreas esportivas, piscinas, teatro, biblioteca e restaurante, todos interconectados de forma a criar uma experiência fluida para os usuários.`,
    tags: ['Arquitetura', 'Espaço Público', 'Lazer', 'Cultura'],
    location: 'São Paulo, SP',
    year: '2024',
    images: [
      '/images/sesc/Enscape_2025-08-15-00-44-30.png',
      '/images/sesc/Enscape_2025-08-15-01-39-32.png',
      '/images/sesc/Anaxometria explodida (4).png',
      '/images/sesc/Corte perspectivado.png',
      '/images/sesc/Corte transversal perspectivado.png',
      '/images/sesc/corte AA.png',
    ],
    details: [
      { label: 'Área do Terreno', value: '12.500 m²' },
      { label: 'Área Construída', value: '8.200 m²' },
      { label: 'Software', value: 'AutoCAD, SketchUp, Enscape' },
    ],
  },
  'recinto': {
    id: '02',
    title: 'Recinto',
    semester: '5º Semestre',
    description: 'Estudo de intervenção arquitetônica com foco em fluxos e experiência do usuário em espaço de transição.',
    fullDescription: `O projeto Recinto explora a concepção de um espaço de transição que serve como ponto de encontro e passagem. O estudo focou na análise de fluxos de pessoas e na criação de uma experiência arquitetônica que guia o usuário através do espaço de forma intuitiva.

A proposta incluiu o desenho de circulações, áreas de permanência e elementos que criam uma identidade visual forte para o local. Foram estudados diferentes materiais e texturas para criar contrastes e definir zonas específicas dentro do recinto.

O projeto considerou aspectos de acessibilidade, conforto térmico e iluminação natural, buscando criar um ambiente acolhedor e funcional.`,
    tags: ['Intervenção', 'Fluxos', 'Espaço de Transição'],
    location: 'São Paulo, SP',
    year: '2024',
    images: [
      '/images/Recinto/Recinto Prancha Final_Página_1.png',
      '/images/Recinto/Recinto Prancha Final_Página_2.png',
      '/images/Recinto/Recinto Prancha Final_Página_3.png',
      '/images/Recinto/Recinto Prancha Final_Página_4.png',
      '/images/Recinto/Recinto Prancha Final_Página_5.png',
      '/images/Recinto/Recinto Prancha Final_Página_6.png',
    ],
    details: [
      { label: 'Área', value: '450 m²' },
      { label: 'Software', value: 'SketchUp, AutoCAD, Enscape' },
    ],
  },
  'favela-do-moinho': {
    id: '03',
    title: 'Requalificação Urbana - Favela do Moinho',
    semester: '7º Semestre',
    description: 'Projeto de requalificação urbana e transposição na Favela do Moinho, incluindo análise de insolação, fluxos e áreas verdes.',
    fullDescription: `O projeto de Requalificação Urbana na Favela do Moinho abordou os desafios complexos de intervenção em áreas de ocupação informal. O estudo incluiu análise detalhada do território, mapeamento de usos existentes, estudo de insolação, fluxos de circulação e identificação de oportunidades de melhoria.

A proposta contemplou a criação de áreas verdes, espaços públicos de convivência, melhorias na infraestrutura urbana e soluções de transposição que respeitam a topografia do terreno e as relações sociais estabelecidas.

Foram desenvolvidos estudos de viabilidade, análise de custos e propostas de implementação gradual, considerando a participação comunitária e a sustentabilidade social e ambiental do projeto.`,
    tags: ['Urbanismo', 'Requalificação', 'Social', 'Áreas Verdes'],
    location: 'Favela do Moinho, São Paulo, SP',
    year: '2025',
    images: [
      '/images/Requalificação urbana - Favela do moinho/INTEIRA.png',
      '/images/Requalificação urbana - Favela do moinho/IMPLANTAÇÃO.png',
      '/images/Requalificação urbana - Favela do moinho/ESPELHO DAGUA.png',
      '/images/Requalificação urbana - Favela do moinho/IMG_ENTRADA.png',
      '/images/Requalificação urbana - Favela do moinho/PONTE TREM.png',
      '/images/Requalificação urbana - Favela do moinho/QUADRA.png',
      '/images/Requalificação urbana - Favela do moinho/SALA DE ESTUDOS.png',
      '/images/Requalificação urbana - Favela do moinho/Enscape_2025-05-29-00-03-38.png',
      '/images/Requalificação urbana - Favela do moinho/Enscape_2025-06-02-01-14-13.png',
    ],
    details: [
      { label: 'Área de Estudo', value: '45.000 m²' },
      { label: 'Software', value: 'ArchiCad, Enscape' },
    ],
  },
  'edificio-hibrido': {
    id: '04',
    title: 'Edifício Híbrido + Midiateca',
    semester: '8º Semestre',
    description: 'Projeto de edifício multifuncional combinando usos residenciais, comerciais e espaço cultural de midiateca.',
    fullDescription: `O Edifício Híbrido + Midiateca representa um estudo avançado de arquitetura que integra múltiplos usos em um único empreendimento. O projeto combina unidades residenciais, espaços comerciais no térreo e uma midiateca como elemento de destaque cultural.

A midiateca foi concebida como um espaço híbrido que une funções de biblioteca tradicional com tecnologias digitais, áreas de coworking, espaços para eventos culturais e exposições. A integração entre os diferentes usos foi cuidadosamente planejada para criar sinergias e ativação urbana.

O projeto incluiu estudos estruturais, sistemas de circulação vertical, análise de fachada e eficiência energética, buscando uma solução sustentável e economicamente viável.`,
    tags: ['Edifício Híbrido', 'Cultura', 'Multifuncional', 'Midiateca'],
    location: 'São Paulo, SP',
    year: '2025',
    images: [
      '/images/Edifício híbrido + Mídiateca/Vista 3d.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_01.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_02.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_03.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_04.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_05.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_06.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_07.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_08.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_09.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_10.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_11.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_12.png',
      '/images/Edifício híbrido + Mídiateca/AF PROJ 8_JESSICA PAZ_Página_13.png',
    ],
    details: [
      { label: 'Área do Terreno', value: '2.800 m²' },
      { label: 'Área Construída', value: '18.500 m²' },
      { label: 'Pavimentos', value: '15' },
      { label: 'Software', value: 'ArchiCad, Enscape' },
    ],
  },
};

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Projeto não encontrado</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao portfólio
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="pt-16">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <span className="text-6xl md:text-8xl font-extralight text-white/20">
                {project.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{project.semester}</span>
              {project.location && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <MapPin size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.location}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-light mb-8">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag size={12} className="mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {project.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Gallery */}
            <div className="mt-16">
              <h2 className="text-xl font-medium mb-8">Galeria do Projeto</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div 
                        className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                          index === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Imagem ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="fixed inset-0 w-screen h-screen max-w-none max-h-none p-0 bg-black border-0 rounded-none flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${project.title} - Imagem ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-secondary/30 rounded-lg p-6">
                <h3 className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
                  Detalhes do Projeto
                </h3>
                <div className="space-y-4">
                  {project.details.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                      <span className="text-sm text-muted-foreground">{detail.label}</span>
                      <span className="text-sm font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6">
                <h3 className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
                  Ano
                </h3>
                <p className="text-2xl font-light">{project.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Jéssica de Sousa Paz. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
