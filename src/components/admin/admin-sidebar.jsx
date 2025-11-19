"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Menu,
  X,
  Heart,
  Building2,
  MessageSquare,
  FileText,
  CreditCard,
  Bell,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
 
  {
    title: "Compaign",
    href: "/admin/compaign",
    icon: BarChart3,
  },
  {
    title: "categories",
    href: "/admin/categories",
    icon: MessageSquare,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: BarChart3,
  },
  // {
  //   title: "Reports",
  //   href: "/admin/reports",
  //   icon: FileText,
  // },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },

  // {
  //   title: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
]

export function AdminSidebar({ className }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col border-r border-sidebar-border transition-all duration-300 bg-gray-100 ",
        isCollapsed ? "w-20" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
            <div className="flex-shrink-0">
            <div className="bg-white px-4 py-2 rounded">
              <span className="text-pink-500 text-xl font-bold italic">wedding planet</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className=" hover:bg-sidebar-accent/10"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-white",
                  isActive
                    ? "bg-primary  text-white"
                    : " hover:bg-sidebar-primary/10 hover:text-primary text-black",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.title}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-accent-foreground">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-white/70 truncate">admin@wedding.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
