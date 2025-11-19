"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardStatsCard } from "@/components/admin/dashboard-stats-card"
import { RecentActivity } from "@/components/admin/recent-activity"
import { DashboardChart } from "@/components/admin/dashboard-chart"
import { TopVenues } from "@/components/admin/top-venues"
import { Users, Building2, Calendar, CreditCard, TrendingUp, Clock } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if ( decoded.role !== "admin") {
          router.push("admin/login"); // not authorized
        }
      } catch (err) {
        router.push("/login");
      }
    }, [router]);
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl  font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your wedding platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardStatsCard title="Total Users" value="1,234" change="12%" changeType="positive" icon={Users} />
          <DashboardStatsCard title="Active Venues" value="567" change="8%" changeType="positive" icon={Building2} />
          <DashboardStatsCard
            title="This Month Bookings"
            value="89"
            change="15%"
            changeType="positive"
            icon={Calendar}
          />
          <DashboardStatsCard
            title="Monthly Revenue"
            value="₹4,56,789"
            change="23%"
            changeType="positive"
            icon={CreditCard}
          />
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardChart type="bar" />
          <DashboardChart type="line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <TopVenues />
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Pending Approvals</h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">12</p>
            <p className="text-sm text-muted-foreground">Venues waiting for approval</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Growth Rate</h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">+18%</p>
            <p className="text-sm text-muted-foreground">Compared to last month</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Active Today</h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">156</p>
            <p className="text-sm text-muted-foreground">Users online right now</p>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  )
}
