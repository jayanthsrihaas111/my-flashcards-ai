'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { CircularProgress, Container, Typography, Box } from "@mui/material"

const ResultPage = () => {
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error?.message || 'An error occurred')
                }
            } catch (err) {
                setError('An error occurred while fetching the session')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" color={'#F4F4F9'}>Loading...</Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color={'#F4F4F9'}>
                    {error}
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            {
                session?.payment_status === "paid" ? (
                    <>
                        <Typography variant="h4" color={'#F4F4F9'}>Thank you for purchasing!!!</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" color={'#F4F4F9'}> Session ID: {session_id} </Typography>
                            <Typography color={'#F4F4F9'} variant="body1">
                                We have received your payment. You will receive an email with the order details shortly.
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography color={'#F4F4F9'} variant="h4">Payment Failed</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" color={'#F4F4F9'}> Session ID: {session_id} </Typography>
                            <Typography variant="body1" color={'#F4F4F9'}>
                                Unfortunately, your payment was not successful. Please try again.
                            </Typography>
                        </Box>
                    </>
                )
            }
        </Container>
    )
}

export default ResultPage