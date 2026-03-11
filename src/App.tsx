import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  GraduationCap, 
  Target,
  Layers,
  Globe,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  User,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ProjectPage from '@/pages/ProjectPage';

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre-mim', label: 'Sobre' },
    { href: '#formacao', label: 'Formação' },
    { href: '#habilidades', label: 'Habilidades' },
    { href: '#projetos', label: 'Projetos' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-light tracking-[0.2em] uppercase">
          Jéssica Paz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border py-6">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 text-center relative z-10">
        <div className="animate-fade-in-up opacity-0-init">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-6">
            Portfólio Acadêmico
          </p>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 animate-fade-in-up opacity-0-init delay-100">
          Jéssica <span className="font-extralight italic">Paz</span>
        </h1>
        
        <div className="animate-fade-in-up opacity-0-init delay-200">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Estudante de Arquitetura e Urbanismo
          </p>
          <p className="text-sm text-muted-foreground/70 tracking-wide">
            Universidade Presbiteriana Mackenzie · 9º Semestre
          </p>
        </div>

        <div className="mt-16 animate-fade-in-up opacity-0-init delay-300">
          <a 
            href="#projetos" 
            className="inline-flex items-center gap-3 text-sm tracking-wide group"
          >
            <span className="relative">
              Ver Projetos
              <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}

// Sobre Mim Section
function SobreMimSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="sobre-mim" className="py-24 md:py-32 bg-secondary/30">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-1 items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <img 
                  src="/images/minha foto.jpeg" 
                  alt="Jéssica de Sousa Paz"
                  className="w-full h-full rounded-full object-cover object-top shadow-lg"
                />
              </div>
            </div>
            <div className="md:pl-0">
              <div className="flex items-center gap-3 mb-8">
                <User size={20} className="text-muted-foreground" />
                <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Um Pouco Sobre Mim</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
                Jéssica de Sousa Paz
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sou estudante de Arquitetura e Urbanismo na Universidade Presbiteriana Mackenzie, atualmente no 9º semestre. Minha formação também inclui o curso técnico em Design de Interiores pela ETEC de Artes, que ampliou meu olhar para estética, ergonomia e funcionalidade dos espaços.
                </p>
                <p>
                  Tenho interesse em processos criativos e trabalhos manuais, além de acompanhar tendências em arte, arquitetura e design, que servem como fonte constante de inspiração. Busco desenvolver projetos sensíveis ao contexto e às pessoas, com especial interesse em sustentabilidade, requalificação urbana e arquitetura social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Objetivo Section
function ObjetivoSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 md:py-32">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Target size={20} className="text-muted-foreground" />
            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Objetivo Profissional</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-8 leading-tight">
            Construindo o futuro através da arquitetura
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Aplicar meus conhecimentos acadêmicos, desenvolver habilidades práticas 
            e contribuir para projetos inovadores e sustentáveis, enquanto adquiro 
            experiência e crescimento profissional na área.
          </p>
        </div>
      </div>
    </section>
  );
}

// Formação Section
function FormacaoSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="formacao" className="py-24 md:py-32 bg-secondary/30">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap size={20} className="text-muted-foreground" />
          <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Formação Acadêmica</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-light mb-16">
          Minha Trajetória
        </h2>

        <div className="space-y-12">
          {/* Graduação */}
          <div className="bg-background rounded-lg p-8 border border-border/50">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Bacharelado em Arquitetura e Urbanismo</h3>
                <p className="text-muted-foreground">Universidade Presbiteriana Mackenzie</p>
              </div>
              <Badge variant="outline" className="w-fit">2022 - 2026</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              9º Semestre atualmente
            </p>
          </div>

          {/* Técnico */}
          <div className="bg-background rounded-lg p-8 border border-border/50">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Técnico em Design de Interiores</h3>
                <p className="text-muted-foreground">ETEC de Artes</p>
              </div>
              <Badge variant="outline" className="w-fit">Concluído</Badge>
            </div>
          </div>

          {/* Cursos */}
          <div className="bg-background rounded-lg p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Award size={20} className="text-muted-foreground" />
              <h3 className="text-xl font-medium">Cursos Complementares</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <div>
                  <p className="font-medium">AutoCAD</p>
                  <p className="text-sm text-muted-foreground">Udemy</p>
                </div>
                <Badge variant="secondary">Concluído</Badge>
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="bg-background rounded-lg p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={20} className="text-muted-foreground" />
              <h3 className="text-xl font-medium">Idiomas</h3>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Inglês</p>
                <p className="text-sm text-muted-foreground">Nível Básico</p>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-foreground" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const softwares = [
    { name: 'SketchUp', level: 90, label: 'Avançado' },
    { name: 'AutoCAD', level: 85, label: 'Avançado' },
    { name: 'Enscape', level: 60, label: 'Intermediário' },
    { name: 'Revit', level: 60, label: 'Intermediário' },
    { name: 'ArchiCAD', level: 30, label: 'Básico' },
    { name: 'Photoshop', level: 30, label: 'Básico' },
  ];

  return (
    <section id="habilidades" className="py-24 md:py-32">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Layers size={20} className="text-muted-foreground" />
          <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Softwares</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-light mb-16">
          Habilidades Técnicas
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {softwares.map((software, index) => (
            <div 
              key={software.name}
              className="space-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{software.name}</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {software.label}
                </Badge>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-foreground rounded-full transition-all duration-1000 ease-out ${
                    isVisible ? 'w-full' : 'w-0'
                  }`}
                  style={{ 
                    width: isVisible ? `${software.level}%` : '0%',
                    transitionDelay: `${index * 150}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const projects = [
    {
      id: 'sesc-piratininga',
      number: '01',
      title: 'SESC Piratininga',
      semester: '4º Semestre',
      description: 'Projeto arquitetônico completo para unidade SESC, explorando espaços de lazer, cultura e bem-estar com integração urbana.',
      tags: ['Arquitetura', 'Espaço Público'],
      image: '/images/sesc/Enscape_2025-08-15-00-44-30.png',
    },
    {
      id: 'recinto',
      number: '02',
      title: 'Recinto',
      semester: '5º Semestre',
      description: 'Estudo de intervenção arquitetônica com foco em fluxos e experiência do usuário em espaço de transição.',
      tags: ['Intervenção', 'Fluxos'],
      image: '/images/Recinto/Recinto Prancha Final_Página_1.png',
    },
    {
      id: 'favela-do-moinho',
      number: '03',
      title: 'Requalificação Urbana - Favela do Moinho',
      semester: '7º Semestre',
      description: 'Projeto de requalificação urbana e transposição na Favela do Moinho, incluindo análise de insolação, fluxos e áreas verdes.',
      tags: ['Urbanismo', 'Requalificação', 'Social'],
      image: '/images/Requalificação urbana - Favela do moinho/INTEIRA.png',
    },
    {
      id: 'edificio-hibrido',
      number: '04',
      title: 'Edifício Híbrido + Midiateca',
      semester: '8º Semestre',
      description: 'Projeto de edifício multifuncional combinando usos residenciais, comerciais e espaço cultural de midiateca.',
      tags: ['Edifício Híbrido', 'Cultura', 'Multifuncional'],
      image: '/images/Edifício híbrido + Mídiateca/Vista 3d.png',
    },
  ];

  return (
    <section id="projetos" className="py-24 md:py-32 bg-secondary/30">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <MapPin size={20} className="text-muted-foreground" />
          <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Projetos Acadêmicos</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-light mb-16">
          Trabalhos Selecionados
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projeto/${project.id}`}
              className="group bg-background rounded-lg p-8 border border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-lg block"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl font-extralight text-muted-foreground/30 group-hover:text-foreground/20 transition-colors">
                  {project.number}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  <span className="text-xs">Ver projeto</span>
                  <ExternalLink size={14} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {project.semester}
                </Badge>
              </div>

              {project.image && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <h3 className="text-xl font-medium mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs text-muted-foreground/70 px-3 py-1 bg-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="contato" className="py-24 md:py-32">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Vamos conversar
          </h2>
          <p className="text-muted-foreground">
            Estou aberta a oportunidades de estágio, projetos colaborativos 
            e discussões sobre arquitetura e urbanismo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <a 
            href="mailto:jessicadesousapaz@gmail.com"
            className="group flex flex-col items-center p-8 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail size={22} className="text-muted-foreground" />
            </div>
            <span className="text-sm font-medium mb-1">E-mail</span>
            <span className="text-xs text-muted-foreground text-center break-all">
              jessicadesousapaz@gmail.com
            </span>
          </a>

          <a 
            href="tel:+5511969798545"
            className="group flex flex-col items-center p-8 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone size={22} className="text-muted-foreground" />
            </div>
            <span className="text-sm font-medium mb-1">Telefone</span>
            <span className="text-xs text-muted-foreground">
              (11) 96979-8545
            </span>
          </a>

          <a 
            href="https://linkedin.com/in/jessica-de-sousa-paz/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-8 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Linkedin size={22} className="text-muted-foreground" />
            </div>
            <span className="text-sm font-medium mb-1">LinkedIn</span>
            <span className="text-xs text-muted-foreground text-center">
              /in/jessica-de-sousa-paz
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-light tracking-wide mb-1">Jéssica de Sousa Paz</p>
            <p className="text-sm text-muted-foreground">
              Arquitetura e Urbanismo · Mackenzie
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:jessicadesousapaz@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
            </a>
            <a 
              href="tel:+5511969798545"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/jessica-de-sousa-paz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60">
            © 2025 Jéssica de Sousa Paz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Home Page Component
function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SobreMimSection />
        <ObjetivoSection />
        <FormacaoSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeto/:projectId" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
