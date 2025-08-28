// Components exports
export * from './marketing'
export * from './ecommerce'
export * from './mdx'

// Header Components
export * from './header'

// Sidebar Components
export * from './sidebar'

// Content Components
export * from './content'

// Footer Components
export * from './footer'

// Export UI components with specific names to avoid conflicts
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
} from './ui'
