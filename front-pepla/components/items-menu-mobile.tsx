import { Menu } from "lucide-react"
import Link from "next/link"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "./ui/popover"

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu/>
      </PopoverTrigger>

      <PopoverContent>
        <Link href="/categorias/ps1" className="block">Ps1</Link>
        <Link href="/categorias/ps2" className="block">Ps2</Link>
        <Link href="/categorias/ps3" className="block">Ps3</Link>
        <Link href="/categorias/ps4" className="block">Ps4</Link>
        <Link href="/categorias/N64" className="block">N64</Link>
        <Link href="/categorias/Gamecube" className="block">Gamecube</Link>
        <Link href="/categorias/Wii" className="block">Wii</Link>
        <Link href="/categorias/Xbox" className="block">Xbox</Link>
        <Link href="/categorias/Xbox360" className="block">Xbox360</Link>
        <Link href="/categorias/PSP" className="block">PSP</Link>
      </PopoverContent>
    </Popover>
  )
}

export default ItemsMenuMobile
