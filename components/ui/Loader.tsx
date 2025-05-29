import React from 'react'

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    text?: string
    showText?: boolean
    className?: string
    variant?: 'spinner' | 'dots' | 'pulse'
}

const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    text = 'Loading...',
    showText = true,
    className = '',
    variant = 'spinner',
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'h-4 w-4'
            case 'md':
                return 'h-6 w-6'
            case 'lg':
                return 'h-8 w-8'
            case 'xl':
                return 'h-12 w-12'
            default:
                return 'h-6 w-6'
        }
    }

    const getTextSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'text-sm'
            case 'md':
                return 'text-base'
            case 'lg':
                return 'text-lg'
            case 'xl':
                return 'text-xl'
            default:
                return 'text-base'
        }
    }

    const renderSpinner = () => (
        <svg
            className={`animate-spin ${getSizeClasses()} text-current`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    )

    const renderDots = () => (
        <div className="flex space-x-1">
            <div
                className={`${getSizeClasses()} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: '0ms' }}
            />
            <div
                className={`${getSizeClasses()} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: '150ms' }}
            />
            <div
                className={`${getSizeClasses()} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: '300ms' }}
            />
        </div>
    )

    const renderPulse = () => (
        <div
            className={`${getSizeClasses()} bg-current rounded-full animate-pulse`}
        />
    )

    const renderLoader = () => {
        switch (variant) {
            case 'spinner':
                return renderSpinner()
            case 'dots':
                return renderDots()
            case 'pulse':
                return renderPulse()
            default:
                return renderSpinner()
        }
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="flex items-center space-x-3">
                {renderLoader()}
                {showText && (
                    <span className={`${getTextSizeClasses()} text-current`}>
                        {text}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Loader
