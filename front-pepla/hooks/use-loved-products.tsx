import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'sonner'
import { ProductType } from '@/types/product'

interface LovedProductsStore {
    lovedItems: ProductType[]
    addLoveItem: (data: ProductType) => void
    removeLoveItem: (id: number) => void
    removeAll: () => void
}

export const useLovedProducts = create(
    persist<LovedProductsStore>(
        (set, get) => ({
            lovedItems: [],
            
            addLoveItem: (data: ProductType) => {
                const currentItems = get().lovedItems
                const existingItem = currentItems.find((item) => item.id === data.id)
                
                if (existingItem) {
                    set({
                        lovedItems: currentItems.filter((item) => item.id !== data.id)
                    })
                    toast.success("Producto eliminado de favoritos 💔")
                } else {
                    set({
                        lovedItems: [...currentItems, data]
                    })
                    toast.success("Producto agregado a favoritos ❤️")
                }
            },
            
            removeLoveItem: (id: number) => {
                set({ 
                    lovedItems: [...get().lovedItems.filter((item) => item.id !== id)] 
                })
                toast.success("Producto eliminado de favoritos 💔")
            },
            
            removeAll: () => {
                set({ lovedItems: [] })
                toast.success("Todos los favoritos han sido eliminados")
            }
        }),
        {
            name: "loved-products-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)