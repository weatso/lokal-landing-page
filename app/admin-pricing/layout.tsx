import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F0F4F4] font-sans">
      <AdminSidebar />
      {/* pt-14 on mobile to offset the fixed top bar; no offset on lg (sidebar is side) */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
