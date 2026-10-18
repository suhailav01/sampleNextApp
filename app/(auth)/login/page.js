import { cookies } from 'next/headers'
import React from 'react'

export default async function Login() {
    const cookie = await cookies()
    const token = cookie.get("auth")
    return (
        <div>
            <h1>Profile Page</h1>
            <p>
                cookie: {token ? token.value : "No cookie found"}
            </p>
        </div>
    )
}
