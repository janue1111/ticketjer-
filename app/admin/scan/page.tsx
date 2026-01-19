'use client';

import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { validateTicket } from '@/lib/actions/ticket.actions';

type ScanResult = 'success' | 'error' | null;

export default function ScanPage() {
    const [result, setResult] = useState<ScanResult>(null);
    const [message, setMessage] = useState<string>('');
    const [isScanning, setIsScanning] = useState<boolean>(true);
    const [buyerName, setBuyerName] = useState<string>('');

    const handleScan = async (text: string) => {
        if (!text || !isScanning) return;

        setIsScanning(false); // Pausar escaneo mientras procesamos

        try {
            const response = await validateTicket(text);

            if (response.success) {
                setResult('success');
                setMessage(response.message || 'Acceso Permitido');
                // Extraer nombre si el mensaje tiene el formato "Acceso Permitido - [Nombre]"
                const nameMatch = response.message?.split('-')[1]?.trim();
                if (nameMatch) setBuyerName(nameMatch);
            } else {
                setResult('error');
                setMessage(response.message || 'Ticket Inválido');
            }
        } catch (error) {
            console.error(error);
            setResult('error');
            setMessage('Error al procesar el ticket');
        }
    };

    const resetScan = () => {
        setResult(null);
        setMessage('');
        setBuyerName('');
        setIsScanning(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Escáner de Tickets</h1>

            {/* Área del Escáner */}
            {result === null && (
                <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md">
                    <p className="text-center mb-4 text-gray-600">Apunta la cámara al código QR</p>
                    <div className="overflow-hidden rounded-lg">
                        <Scanner
                            onScan={(detectedCodes) => {
                                const value = detectedCodes?.[0]?.rawValue;
                                if (value) handleScan(value);
                            }}
                            allowMultiple={true}
                            scanDelay={2000}
                        />
                    </div>
                </div>
            )}

            {/* Resultado Exitoso */}
            {result === 'success' && (
                <div className="w-full max-w-md bg-green-500 p-8 rounded-xl shadow-lg text-center text-white animate-in fade-in zoom-in duration-300">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-3xl font-bold mb-2">¡ACCESO PERMITIDO!</h2>
                    <p className="text-xl opacity-90">{buyerName}</p>
                    <p className="mt-4 text-sm opacity-75">{message}</p>

                    <button
                        onClick={resetScan}
                        className="mt-8 bg-white text-green-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-sm"
                    >
                        Escanear Siguiente
                    </button>
                </div>
            )}

            {/* Resultado Error */}
            {result === 'error' && (
                <div className="w-full max-w-md bg-red-500 p-8 rounded-xl shadow-lg text-center text-white animate-in fade-in zoom-in duration-300">
                    <div className="text-6xl mb-4">🔴</div>
                    <h2 className="text-3xl font-bold mb-2">ACCESO DENEGADO</h2>
                    <p className="text-xl font-semibold mt-2">{message}</p>

                    <button
                        onClick={resetScan}
                        className="mt-8 bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-red-50 transition-colors shadow-sm"
                    >
                        Intentar de Nuevo
                    </button>
                </div>
            )}
        </div>
    );
}
