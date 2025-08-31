import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Input } from "./input"
import { Button } from "./button"
import { Search } from "lucide-react"

interface SearchModalProps {
  children?: React.ReactNode
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchModal({ children, placeholder = "Search...", onSearch }: SearchModalProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const handleSearch = () => {
    onSearch?.(query)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
