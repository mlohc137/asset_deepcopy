import * as React from 'react'
import App from 'next/app'
import type { AppContext } from 'next/app'
import '../styles/tailwind.css'
import 'tailwindcss/utilities.css'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }: AppContext) {
        let pageProps = {}
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
    
        return { pageProps }
      }
    
    render() {
        const { Component, pageProps } = this.props
        return (
            <Component {...pageProps} />
        )
    }
}

export default MyApp