// components/layout/dashboard-sidebar.tsx
import {
  Home,
  Search,
  Heart,
  MessageSquare,
  Settings,
  PlusCircle,
  Building2,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'tenant' | 'landlord' | 'agent';
}

const TENANT_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'search', label: 'Find Properties', icon: Search },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const LANDLORD_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'properties', label: 'My Properties', icon: Building2 },
  { id: 'add-property', label: 'Add Property', icon: PlusCircle },
  { id: 'tenants', label: 'Tenants', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AGENT_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar({ activeView, onViewChange, userRole }: DashboardSidebarProps) {
  const getNavItems = () => {
    switch (userRole) {
      case 'tenant':
        return TENANT_NAV;
      case 'landlord':
        return LANDLORD_NAV;
      case 'agent':
        return AGENT_NAV;
      default:
        return TENANT_NAV;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Logo/Brand */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-900">PropertyPlatform</h1>
        <p className="text-sm text-gray-500 capitalize">{userRole}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* User section */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center px-2 py-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
