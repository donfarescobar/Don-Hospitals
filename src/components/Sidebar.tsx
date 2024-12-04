import { useState } from 'react';
import { Home, Users, Calendar, FileText, Settings, LogOut, Activity, Pill, Stethoscope, Menu } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: 'dashboard' | 'patients' | 'appointments' | 'vitals' | 'medications' | 'records' | 'settings') => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary-600 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className={`
        fixed top-0 left-0 z-40
        sm:relative
        bg-white border-r border-gray-200 text-secondary-600
        w-64 min-h-screen p-4
        transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 sm:max-h-screen sm:opacity-100'}
        ${isOpen ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'}
        overflow-hidden
        shadow-lg sm:shadow-none
      `}>
        <div className="flex items-center gap-2 mb-8">
          <Stethoscope className="w-8 h-8 text-primary-600" />
          <div>
            <span className="text-xl font-bold text-primary-600">Don Hospital</span>
            <span className="text-xs block text-secondary-500">Healthcare System</span>
          </div>
        </div>
        
        <nav className="space-y-1">
          {[
            { icon: Home, label: 'Dashboard', value: 'dashboard' },
            { icon: Users, label: 'Patients', value: 'patients' },
            { icon: Calendar, label: 'Appointments', value: 'appointments' },
            { icon: Activity, label: 'Vitals', value: 'vitals' },
            { icon: Pill, label: 'Medications', value: 'medications' },
            { icon: FileText, label: 'Records', value: 'records' },
            { icon: Settings, label: 'Settings', value: 'settings' },
          ].map(({ icon: Icon, label, value }) => (
            <button
              key={label}
              onClick={() => {
                onNavigate(value as any);
                if (window.innerWidth < 640) setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                currentPage === value
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'hover:bg-gray-50 text-secondary-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6 px-3">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=40&h=40"
              alt="Doctor profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-secondary-900">Dr. Sarah Smith</p>
              <p className="text-xs text-secondary-500">Cardiologist</p>
            </div>
          </div>

          <button className="flex items-center gap-3 w-full p-3 text-secondary-600 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}