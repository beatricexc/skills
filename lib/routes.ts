import {
    ClipboardList,
    Users,
    FolderKanban,
    LogOut,
    LayoutDashboard,
    Filter,
    LucideIcon,
    BarChart,
    FileDown
  } from 'lucide-react';


export type NavLink = {
  text: string;
  href: string;
  icon: LucideIcon;
  requiresAdmin?: boolean;
}

export const adminLinks: NavLink[] = [
    {
      text: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      requiresAdmin: true,
    },
    {
      text: 'Users',
      href: '/admin/users',
      icon: Users,
      requiresAdmin: true,
    },
    {
      text: 'Category',
      href: '/admin/skill-category',
      icon: FolderKanban,
      requiresAdmin: true,
    },
    {
      text: 'User skills',
      href: '/admin/user-skills',
      icon: Filter,
      requiresAdmin: true,
    },
      {
      text: 'Stats',
      href: '/admin/skill-stats',
      icon: BarChart,
      requiresAdmin: true,
    },
    {
      text: 'Export',
      href: '/admin/export-tool',
      icon: FileDown,
      requiresAdmin: true
    },
    {
      text: 'Sign out',
      href: '/api/auth/signout',
      icon: LogOut,
    },
];

export const userLinks: NavLink[] = [
  {
    text: 'Dashboard',
    href: '/user/dashboard',
    icon: LayoutDashboard,
  },
  {
    text: 'Survey',
    href: '/user/survey',
    icon: ClipboardList,
  },
  {
    text: 'Sign out',
    href: '/api/auth/signout',
    icon: LogOut,
  },
]