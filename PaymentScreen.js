import { StripeProvider } from '@stripe/stripe-react-native'
import { useEffect } from 'react'
import { fetchPubliashbleKey } from '../src/contexts/helpers'

export default function App() {
    const [publishableKey, setPublishableKey] = useState('')
    useEffect(() => {
        async function init() {
            const publishableKey = await fetchPublishableKey()
            if (publishableKey) {
                setPublishableKey(publishableKey)
            }
        }
    })

    return (
        <StripeProvider publishableKey={publishableKey}>

        </StripeProvider>
    )
}