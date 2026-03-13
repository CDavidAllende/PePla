import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Country {
    code: string
    name: string
    currency: string
    symbol: string
    flag: string
}

export const countries: Country[] = [
    { code: 'US', name: 'Estados Unidos', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽' },
    { code: 'ES', name: 'España', currency: 'EUR', symbol: '€', flag: '🇪🇸' },
    { code: 'AR', name: 'Argentina', currency: 'ARS', symbol: '$', flag: '🇦🇷' },
    { code: 'CO', name: 'Colombia', currency: 'COP', symbol: '$', flag: '🇨🇴' },
    { code: 'CL', name: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱' },
    { code: 'PE', name: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪' },
    { code: 'BR', name: 'Brasil', currency: 'BRL', symbol: 'R$', flag: '🇧🇷' },
    { code: 'GB', name: 'Reino Unido', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
    { code: 'CA', name: 'Canadá', currency: 'CAD', symbol: '$', flag: '🇨🇦' },
]

interface CurrencyStore {
    country: Country
    setCountry: (country: Country, userId?: number) => void
    loadUserCurrency: (userId: number) => void
    formatPrice: (price: number) => string
}

export const useCurrency = create<CurrencyStore>((set, get) => ({
    country: countries[1], // México por defecto

    setCountry: (country, userId) => {
        set({ country })
        
        // Si hay userId, guardar en localStorage específico del usuario
        if (userId) {
            localStorage.setItem(`currency_user_${userId}`, JSON.stringify(country))
        }
    },

    loadUserCurrency: (userId) => {
        const savedCurrency = localStorage.getItem(`currency_user_${userId}`)
        
        if (savedCurrency) {
            try {
                const parsedCountry = JSON.parse(savedCurrency)
                set({ country: parsedCountry })
            } catch (error) {
                console.error('Error al cargar moneda del usuario')
                set({ country: countries[1] }) // México por defecto
            }
        } else {
            set({ country: countries[1] }) // México por defecto
        }
    },

    formatPrice: (price) => {
        const { country } = get()
        return `${country.symbol}${price.toFixed(2)} ${country.currency}`
    }
}))