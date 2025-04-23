# API Configuration

## Environment Setup

Create a `.env.local` file in the root of your project with the following content:

```
# API Configuration
NEXT_PUBLIC_API_URL=https://api.csg.upcebu.edu.ph
```

Replace the URL with your actual API endpoint.

## How the API Client Works

1. The API client is initialized using the `ApiProvider` component, which is wrapped around the application in `app/layout.tsx`.
2. The initialization happens in a client-side effect and sets up Axios with interceptors for authentication.
3. You can check if the API is properly initialized in any component:

```tsx
'use client'

import { useApi } from '@/components/ApiProvider'

export default function MyComponent() {
    const { isInitialized, error } = useApi()

    if (error) {
        return <div>Error initializing API: {error.message}</div>
    }

    if (!isInitialized) {
        return <div>Loading API...</div>
    }

    return <div>API is ready to use!</div>
}
```

## Troubleshooting

If you encounter issues with the API:

1. Check if your `.env.local` file exists and has the correct API URL
2. Verify network connectivity to the API endpoint
3. Check the browser console for any initialization errors
4. Verify that the API provider is properly wrapped in your application layout
