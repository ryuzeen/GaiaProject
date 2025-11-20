import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  Coffee, 
  MessageSquare, 
  TrendingUp, 
  User, 
  Users, 
  Leaf, 
  Award,
  Menu,
  X
} from 'lucide-react';

// Componente Principal
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'gaia', text: 'Olá! Notei que você trabalhou 4 horas seguidas. Que tal uma pausa de 10 minutos para respirar? 🌱' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Simulação de envio de mensagem
  const handleSend = () => {
    if (!inputMsg.trim()) return;
    
    const newMsg = { id: Date.now(), sender: 'user', text: inputMsg };
    setMessages([...messages, newMsg]);
    setInputMsg('');

    // Resposta simulada da IA
    setTimeout(() => {
      const iaResponse = { 
        id: Date.now() + 1, 
        sender: 'gaia', 
        text: 'Interessante. Baseado no seu perfil, essa habilidade será crucial em 2026. Adicionei um módulo curto sobre isso na sua trilha de Reskilling.' 
      };
      setMessages(prev => [...prev, iaResponse]);
    }, 1500);
  };

  // Navegação
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'learning': return <LearningPath />;
      case 'wellbeing': return <WellBeing />;
      case 'community': return <Community />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 w-64 h-full bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-lg md:shadow-none`}>
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Gaia<span className="text-emerald-500">.ai</span></h1>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <SidebarItem icon={<Activity />} label="Visão Geral" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setSidebarOpen(false)}} />
          <SidebarItem icon={<Brain />} label="Trilha de Futuro" active={activeTab === 'learning'} onClick={() => {setActiveTab('learning'); setSidebarOpen(false)}} />
          <SidebarItem icon={<Coffee />} label="Bem-Estar & Saúde" active={activeTab === 'wellbeing'} onClick={() => {setActiveTab('wellbeing'); setSidebarOpen(false)}} />
          <SidebarItem icon={<Users />} label="Comunidade Híbrida" active={activeTab === 'community'} onClick={() => {setActiveTab('community'); setSidebarOpen(false)}} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">GM</div>
            <div>
              <p className="text-sm font-medium">Grupo Modelo</p>
              <p className="text-xs text-slate-500">Estudante</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Mobile */}
        <header className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold">Gaia</h1>
          </div>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="text-slate-600" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Chat Floating Widget */}
      <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[500px]">
        <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            <span className="font-medium">Gaia Assistant</span>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 h-64 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input 
            type="text" 
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre sua carreira..." 
            className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button onClick={handleSend} className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components
const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
  >
    {React.cloneElement(icon, { size: 20 })}
    {label}
  </button>
);

const Dashboard = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Olá, Grupo 👋</h2>
        <p className="text-slate-500">Seu índice de prontidão para o futuro é <span className="text-emerald-600 font-bold">Alto</span>.</p>
      </div>
      <div className="flex gap-3">
        <span className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
          🌱 Sustentabilidade: Nível 4
        </span>
        <span className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
          🚀 Tech Skills: 85%
        </span>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <Card title="Próximas Profissões Detectadas" icon={<TrendingUp className="text-indigo-500" />}>
        <ul className="space-y-3 mt-2">
          <JobItem title="Arquiteto de Realidade Mista" growth="+45%" color="bg-indigo-100 text-indigo-700" />
          <JobItem title="Mediador de Ética em IA" growth="+30%" color="bg-indigo-100 text-indigo-700" />
          <JobItem title="Gestor de Bio-Dados" growth="+12%" color="bg-indigo-100 text-indigo-700" />
        </ul>
      </Card>

      <Card title="Seu Equilíbrio Vital" icon={<Activity className="text-rose-500" />}>
        <div className="mt-4 flex items-end justify-between h-24 gap-2">
          <Bar height="h-12" label="Seg" />
          <Bar height="h-16" label="Ter" />
          <Bar height="h-20" label="Qua" />
          <Bar height="h-14" label="Qui" />
          <Bar height="h-24" active label="Hoje" />
        </div>
        <p className="text-xs text-center text-slate-500 mt-2">Você está 15% mais equilibrado que semana passada.</p>
      </Card>

      <Card title="Meta da Semana" icon={<Award className="text-amber-500" />}>
        <div className="mt-2 text-center">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-100 border-t-emerald-500 mx-auto flex items-center justify-center">
            <span className="text-lg font-bold text-emerald-600">75%</span>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-800">Curso: Liderança Inclusiva</p>
          <p className="text-xs text-slate-500">Faltam 2 módulos</p>
        </div>
      </Card>
    </div>
    
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Oportunidade de Reskilling</h3>
        <p className="text-indigo-100 mb-6 max-w-lg">A IA detectou que suas habilidades em Gestão de Projetos podem ser potencializadas com ferramentas de Automação No-Code. Quer iniciar um micro-treinamento?</p>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors">
          Iniciar Jornada
        </button>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
        <Brain size={300} />
      </div>
    </div>
  </div>
);

const LearningPath = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-900">Sua Trilha Evolutiva</h2>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="space-y-8">
        <PathItem 
          status="completed" 
          title="Fundamentos de ESG" 
          desc="Compreensão básica de economia verde e impacto social."
        />
        <PathItem 
          status="current" 
          title="Colaboração Humano-IA" 
          desc="Aprendendo a delegar tarefas operacionais para agentes autônomos."
        />
        <PathItem 
          status="locked" 
          title="Design de Mundos Imersivos" 
          desc="Criação de espaços de trabalho em VR."
        />
      </div>
    </div>
  </div>
);

const WellBeing = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-900">Centro de Regeneração</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
        <h3 className="font-bold text-rose-800 mb-2">Pausa Inteligente</h3>
        <p className="text-rose-600 text-sm mb-4">O sistema detectou fadiga ocular. Sugerimos uma desconexão de 15 minutos.</p>
        <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Ativar Modo Zen</button>
      </div>
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
        <h3 className="font-bold text-emerald-800 mb-2">Monitoramento de Humor</h3>
        <p className="text-emerald-600 text-sm mb-4">Seu nível de estresse reduziu após as reuniões síncronas da manhã.</p>
      </div>
    </div>
  </div>
);

const Community = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-900">Comunidade Global</h2>
    <div className="grid gap-4">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-slate-200 rounded-full" />
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">Squad de Inovação #{i}</h4>
            <p className="text-sm text-slate-500">Focados em soluções para Cidades Inteligentes.</p>
          </div>
          <button className="text-indigo-600 font-medium text-sm">Conectar</button>
        </div>
      ))}
    </div>
  </div>
);

// Helper components
const Card = ({ title, children, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{title}</h3>
      {icon}
    </div>
    {children}
  </div>
);

const JobItem = ({ title, growth, color }) => (
  <li className="flex justify-between items-center">
    <span className="text-slate-600 font-medium text-sm">{title}</span>
    <span className={`text-xs font-bold px-2 py-1 rounded-md ${color}`}>{growth}</span>
  </li>
);

const Bar = ({ height, active, label }) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    <div className={`w-full rounded-t-lg transition-all duration-500 ${height} ${active ? 'bg-rose-500' : 'bg-slate-200'}`} />
    <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
  </div>
);

const PathItem = ({ status, title, desc }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
        status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' :
        status === 'current' ? 'bg-white border-indigo-500 text-indigo-500' :
        'bg-slate-100 border-slate-300 text-slate-300'
      }`}>
        {status === 'completed' ? '✓' : status === 'current' ? '●' : '○'}
      </div>
      <div className="w-0.5 h-full bg-slate-200 -mt-2" />
    </div>
    <div className="pb-8">
      <h4 className={`font-bold ${status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);