"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Download, CheckCircle, Package, Printer } from "lucide-react"

export default function TicketPage() {
    const [ticket, setTicket] = useState<any>(null)
    const [generatingPDF, setGeneratingPDF] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const savedTicket = localStorage.getItem('lastTicket')
        if (savedTicket) {
            setTicket(JSON.parse(savedTicket))
        } else {
            router.push('/')
        }
    }, [router])

    const generatePDF = async () => {
        if (!ticket) return null

        setGeneratingPDF(true)

        try {
            const pdfMakeModule = await import('pdfmake/build/pdfmake')
            const pdfFontsModule = await import('pdfmake/build/vfs_fonts')

            const pdfMake: any = pdfMakeModule.default
            const pdfFonts: any = pdfFontsModule.default

            pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts

            const docDefinition: any = {
                content: [
                    {
                        text: 'Psyduck ft PePla',
                        style: 'header',
                        alignment: 'center',
                        color: '#9333ea'
                    },
                    {
                        text: 'Tu Tienda de Videojuegos Favorita',
                        style: 'subheader',
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    },

                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 0,
                                x2: 515, y2: 0,
                                lineWidth: 2,
                                lineColor: '#9333ea'
                            }
                        ],
                        margin: [0, 0, 0, 20]
                    },

                    {
                        text: 'Información del Pedido',
                        style: 'sectionHeader',
                        margin: [0, 10, 0, 10]
                    },

                    {
                        columns: [
                            {
                                width: '50%',
                                stack: [
                                    { text: 'Número de Orden', style: 'label' },
                                    { text: ticket.orderNumber, style: 'value', margin: [0, 0, 0, 10] },
                                    { text: 'Fecha y Hora', style: 'label' },
                                    { text: ticket.date, style: 'value' }
                                ]
                            },
                            {
                                width: '50%',
                                stack: [
                                    { text: 'Cliente', style: 'label' },
                                    { text: ticket.customer.name, style: 'value', margin: [0, 0, 0, 10] },
                                    { text: 'Email', style: 'label' },
                                    { text: ticket.customer.email, style: 'value' }
                                ]
                            }
                        ],
                        margin: [0, 0, 0, 20]
                    },

                    {
                        text: 'Productos Comprados',
                        style: 'sectionHeader',
                        margin: [0, 10, 0, 10]
                    },

                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto'],
                            body: [
                                [
                                    { text: 'Producto', style: 'tableHeader' },
                                    { text: 'Precio', style: 'tableHeader', alignment: 'right' }
                                ],
                                ...ticket.items.map((item: any) => [
                                    {
                                        stack: [
                                            { text: item.productName, style: 'productName' },
                                            { text: item.origin, style: 'productOrigin' }
                                        ]
                                    },
                                    { text: `$${item.price}`, style: 'price', alignment: 'right' }
                                ])
                            ]
                        },
                        layout: {
                            fillColor: (rowIndex: number) =>
                                rowIndex === 0 ? '#f3f4f6' : rowIndex % 2 === 0 ? '#f9fafb' : null,
                            hLineWidth: () => 0.5,
                            vLineWidth: () => 0,
                            hLineColor: () => '#e5e7eb'
                        },
                        margin: [0, 0, 0, 20]
                    },

                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 0,
                                x2: 515, y2: 0,
                                lineWidth: 1,
                                dash: { length: 5 }
                            }
                        ],
                        margin: [0, 10, 0, 10]
                    },

                    {
                        columns: [
                            { text: 'TOTAL:', style: 'totalLabel', width: '*' },
                            { text: `$${ticket.total}`, style: 'totalValue', width: 'auto' }
                        ],
                        margin: [0, 0, 0, 20]
                    },

                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [{
                                    text: [
                                        { text: 'Nota: ', bold: true },
                                        'Conserva este ticket como comprobante de tu compra. Tu pedido será procesado en las próximas 24-48 horas.'
                                    ],
                                    style: 'note'
                                }]
                            ]
                        },
                        layout: {
                            fillColor: '#eff6ff',
                            hLineWidth: () => 1,
                            vLineWidth: () => 1,
                            hLineColor: () => '#bfdbfe',
                            vLineColor: () => '#bfdbfe'
                        }
                    },

                    {
                        text: '¡Gracias por tu compra!',
                        style: 'footer',
                        alignment: 'center',
                        margin: [0, 30, 0, 0]
                    }
                ],

                styles: {
                    header: { fontSize: 28, bold: true, margin: [0, 0, 0, 5] },
                    subheader: { fontSize: 12, color: '#6b7280' },
                    sectionHeader: { fontSize: 16, bold: true, color: '#1f2937' },
                    label: { fontSize: 10, color: '#6b7280', margin: [0, 0, 0, 2] },
                    value: { fontSize: 12, color: '#111827', bold: true },
                    tableHeader: { fontSize: 11, bold: true, color: '#374151', margin: [5, 5, 5, 5] },
                    productName: { fontSize: 11, color: '#111827', margin: [5, 5, 5, 2] },
                    productOrigin: { fontSize: 9, color: '#6b7280', margin: [5, 0, 5, 5] },
                    price: { fontSize: 12, bold: true, color: '#16a34a', margin: [5, 5, 5, 5] },
                    totalLabel: { fontSize: 18, bold: true, color: '#111827' },
                    totalValue: { fontSize: 24, bold: true, color: '#16a34a' },
                    note: { fontSize: 10, color: '#1e40af', margin: [10, 10, 10, 10] },
                    footer: { fontSize: 14, bold: true, color: '#9333ea' }
                }
            }

            return pdfMake.createPdf(docDefinition)

        } catch (error) {
            console.error('Error generando PDF:', error)
            alert('Error al generar el PDF. Por favor intenta de nuevo.')
            return null
        } finally {
            setGeneratingPDF(false)
        }
    }

    const handleDownload = async () => {
        const pdf = await generatePDF()
        if (pdf) {
            pdf.download(`Ticket-${ticket.orderNumber}.pdf`)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    if (!ticket) return (
        <div className="max-w-4xl mx-auto sm:px-24 py-16 text-center">
            <p>Cargando...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-24">
                <div className="text-center mb-12 no-print">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                        <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ¡Compra Exitosa!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        Tu pedido <span className="font-bold">{ticket.orderNumber}</span> ha sido confirmado
                    </p>
                    <p className="text-sm text-gray-500">
                        Recibirás un email de confirmación en breve
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center">
                        <Package size={48} className="mx-auto mb-3" />
                        <h2 className="text-3xl font-black mb-1">Psyduck ft PePla</h2>
                        <p className="text-sm opacity-90">Tu Tienda de Videojuegos Favorita</p>
                    </div>

                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg border-b pb-2">Información del Pedido</h3>
                                <div>
                                    <p className="text-sm text-gray-500">Número de Orden</p>
                                    <p className="font-mono font-bold">{ticket.orderNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fecha y Hora</p>
                                    <p className="font-medium">{ticket.date}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-lg border-b pb-2">Información del Cliente</h3>
                                <div>
                                    <p className="text-sm text-gray-500">Nombre</p>
                                    <p className="font-medium">{ticket.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{ticket.customer.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Teléfono</p>
                                    <p className="font-medium">{ticket.customer.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg border-b pb-2 mb-4">Productos Comprados</h3>
                            <div className="space-y-3">
                                {ticket.items.map((item: any, index: number) => (
                                    <div key={index} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div>
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-xs text-gray-500">{item.origin}</p>
                                        </div>
                                        <p className="font-bold text-green-600">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-black">TOTAL:</span>
                                <span className="text-3xl font-black text-green-600">${ticket.total}</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                                <strong>Nota:</strong> Conserva este ticket como comprobante de tu compra. Tu pedido será procesado en las próximas 24-48 horas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 no-print">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                            onClick={handleDownload}
                            size="lg"
                            disabled={generatingPDF}
                        >
                            <Download size={20} className="mr-2" />
                            {generatingPDF ? 'Generando PDF...' : 'Descargar PDF'}
                        </Button>
                        <Button
                            onClick={handlePrint}
                            size="lg"
                            variant="outline"
                        >
                            <Printer size={20} className="mr-2" />
                            Imprimir
                        </Button>
                    </div>

                    <Button onClick={() => router.push('/')} size="lg" variant="outline">
                        Volver al inicio
                    </Button>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        margin: 0;
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    )
}