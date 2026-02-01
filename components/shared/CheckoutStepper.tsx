'use client'

import { Check } from 'lucide-react'

interface CheckoutStepperProps {
    currentStep: number
}

const steps = [
    { number: 1, label: 'Cantidad' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Pago' },
    { number: 4, label: 'Confirmación' },
]

const CheckoutStepper = ({ currentStep }: CheckoutStepperProps) => {
    return (
        <div className="w-full mb-6 md:mb-8">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                        {/* Círculo del paso */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all
                  ${step.number < currentStep
                                        ? 'bg-green-500 text-white'
                                        : step.number === currentStep
                                            ? 'bg-pink-500 text-white ring-4 ring-pink-200'
                                            : 'bg-gray-300 text-gray-600'
                                    }
                `}
                            >
                                {step.number < currentStep ? (
                                    <Check className="w-5 h-5 md:w-6 md:h-6" />
                                ) : (
                                    step.number
                                )}
                            </div>
                            {/* Label */}
                            <p
                                className={`
                  mt-2 text-xs md:text-sm font-medium whitespace-nowrap
                  ${step.number <= currentStep
                                        ? 'text-gray-900'
                                        : 'text-gray-500'
                                    }
                `}
                            >
                                {step.label}
                            </p>
                        </div>

                        {/* Línea conectora */}
                        {index < steps.length - 1 && (
                            <div
                                className={`
                  w-12 h-1 md:w-16 mx-2 md:mx-3 rounded transition-all
                  ${step.number < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                    }
                `}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CheckoutStepper
