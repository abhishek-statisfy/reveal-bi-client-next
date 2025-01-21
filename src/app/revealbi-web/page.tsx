'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    $: any
    jQuery: any
    revealDisableKeyboardManagement: boolean
  }
}

export default function ExecDashboardNew() {

  useEffect(() => {
    const loadScripts = async () => {
      // Load jQuery
      const jqueryScript = document.createElement('script')
      jqueryScript.src =
        'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js'
      await new Promise((resolve) => {
        jqueryScript.onload = resolve
        document.head.appendChild(jqueryScript)
      })

      // Load DayJS
      const dayjsScript = document.createElement('script')
      dayjsScript.src = 'https://unpkg.com/dayjs@1.8.21/dayjs.min.js'
      await new Promise((resolve) => {
        dayjsScript.onload = resolve
        document.head.appendChild(dayjsScript)
      })

      // Disable keyboard management before loading RevealBI
      window.revealDisableKeyboardManagement = true

      // Load RevealBI SDK
      const revealScript = document.createElement('script')
      revealScript.src =
        'https://dl.revealbi.io/reveal/libs/1.7.2/infragistics.reveal.js'
      await new Promise((resolve) => {
        revealScript.onload = resolve
        document.head.appendChild(revealScript)
      })

      initializeDashboard()
    }

    const initializeDashboard = () => {
      const $ = window.$
      if (!$?.ig?.RevealSdkSettings) {
        console.error('RevealBI SDK not loaded properly')
        return
      }

      const token = "SAMPLE_AUTH_TOKEN"

      // Configure RevealBI SDK
      $.ig.RevealSdkSettings.setBaseUrl('http://localhost:5111/')
      $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function () {
        return {
          authorization: `Bearer ${token}`
        }
      })

      // Initialize the RevealView
      console.log('HERE123', $.ig, document.getElementById('revealViewBI'))
      const revealView = new $.ig.RevealView('#revealViewBI')

      // Load dashboard (optional - if you want to load a specific dashboard)
      $.ig.RVDashboard.loadDashboard('46').then((dashboard: any) => {
        revealView.dashboard = dashboard
      })
    }

    loadScripts()

    // Cleanup
    return () => {
      document.querySelectorAll('script').forEach((script) => {
        if (
          script.src.includes('jquery') ||
          script.src.includes('dayjs') ||
          script.src.includes('infragistics.reveal.js')
        ) {
          script.remove()
        }
      })
    }
  }, [])

  return (
    <div className="w-full h-full">
      <div
        id="revealViewBI"
        style={{ height: 'calc(100vh - 105px)', width: '100%' }}
      />
    </div>
  )
}
