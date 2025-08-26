// UI Components exports
export * from './Accordion'
export * from './button'
export * from './dropdown-menu'
export * from './Form'
export * from './input'
export * from './SearchModal'
export * from './separator'
export * from './sheet'
export * from './skeleton'
export * from './tabs'
export * from './ThemeToggle'
export * from './tooltip'

// Export sidebar components with UI prefix to avoid conflicts
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
  SidebarProvider as UISidebarProvider,
  SidebarRail as UISidebarRail,
  SidebarSeparator as UISidebarSeparator,
  SidebarTrigger as UISidebarTrigger,
  useSidebar as useUISidebar
} from './sidebar'
