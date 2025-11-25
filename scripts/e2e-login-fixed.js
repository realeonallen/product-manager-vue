const { chromium } = require('playwright')

const fs = require('fs')
const path = require('path')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

    // Fill login form using placeholders from Login.vue
    await page.fill('input[placeholder="kminchelle"]', 'kminchelle')
    await page.fill('input[placeholder="0lelplR"]', '0lelplR')

    // Click the sign in button (text content)
    await page.click('button:has-text("Sign In")')

    // Wait for Products page header to appear
    await page.waitForSelector('text=Products', { timeout: 10000 })

    console.log('E2E: Login succeeded — Products page visible')
    await browser.close()
    process.exit(0)
  } catch (err) {
    console.error('E2E failed:', err)
    // On failure, capture a screenshot and save HTML for debugging
    try {
      const shotsDir = path.join(__dirname, 'e2e-screenshots')
      if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true })
      const ts = new Date().toISOString().replace(/[:.]/g, '-')
      const shotPath = path.join(shotsDir, `failure-${ts}.png`)
      const htmlPath = path.join(shotsDir, `failure-${ts}.html`)
      try {
        await page.screenshot({ path: shotPath, fullPage: true })
        const html = await page.content()
        fs.writeFileSync(htmlPath, html, 'utf8')
        console.error(`Saved failure screenshot: ${shotPath}`)
        console.error(`Saved page HTML: ${htmlPath}`)
      } catch (inner) {
        console.error('Failed to capture screenshot/html:', inner)
      }
    } catch (fsErr) {
      console.error('Filesystem error while saving artifacts:', fsErr)
    }
    try { await browser.close() } catch (e) {}
    process.exit(2)
  }
})()
