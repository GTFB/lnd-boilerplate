// Core exports
export * from './components'
export * from './templates'
export * from './design-systems'
export * from './config'
export * from './examples'

// Export specific components to avoid conflicts
export { 
  Sidebar as UISidebar,
  SidebarContent as UISidebarContent,
  SidebarFooter as UISidebarFooter,
  SidebarGroup as UISidebarGroup,
  SidebarGroupContent as UISidebarGroupContent,
  SidebarGroupLabel as UISidebarGroupLabel,
  SidebarHeader as UISidebarHeader,
  SidebarInset as UISidebarInset,
  SidebarMenu as UISidebarMenu,
  SidebarMenuButton as UISidebarMenuButton,
  SidebarMenuItem as UISidebarMenuItem,
  SidebarMenuSub as UISidebarMenuSub,
  SidebarMenuSubButton as UISidebarMenuSubButton,
  SidebarMenuSubItem as UISidebarMenuSubItem,
  SidebarProvider as UISidebarProvider
} from './components/ui'
