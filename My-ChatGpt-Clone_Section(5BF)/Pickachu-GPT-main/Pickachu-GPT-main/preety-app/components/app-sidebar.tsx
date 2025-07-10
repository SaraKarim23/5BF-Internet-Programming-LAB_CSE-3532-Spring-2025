import * as React from "react"
import { Github, Cat } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThreadList } from "./assistant-ui/thread-list"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="https://www.moodtracker.com/" target="_blank">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Cat className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Pika Mood</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="pb-4">
        {/* Bot Info */}
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src="/bot.png"
            alt="NazranaasBot Avatar"
            className="w-10 h-10 rounded-full border border-white shadow-md"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-sidebar-foreground">NNahreen Pika</h2>
            <p className="text-sm text-muted-foreground">Your Pika-powered buddy </p>
          </div>
        </div>

        {/* Chat Threads */}
        <ThreadList />

        {/* GitHub Link Moved Here */}
        <div className="px-4 pt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="https://github.com/nazrana-nahreen" target="_blank">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Github className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold text-sm">View My GitHub</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  )
}
