'use client'

import Script from 'next/script'

declare global {
  interface Window {
    $: any
    jQuery: any
  }
}

export default function RevealBIScripts() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // Load RevealBI after jQuery
          const revealScript = document.createElement('script')
          revealScript.src =
            'https://dl.revealbi.io/reveal/libs/1.7.2/infragistics.reveal.js'
          revealScript.onload = () => {
            // Initialize RevealBI after script is loaded
            window.$?.ig?.RevealSdkSettings?.setBaseUrl(
              'http://localhost:5111/'
            )
          }
          document.body.appendChild(revealScript)
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
