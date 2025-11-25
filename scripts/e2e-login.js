const { chromium } = require('playwright')
const { chromium } = require('playwright')
(async () => {
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
  await page.waitForSelector('text=Products', { timeout: 8000 })

  console.log('E2E: Login succeeded — Products page visible')
  await browser.close()
  process.exit(0)
  } catch (err) {
  console.error('E2E failed:', err)
  await browser.close()
  process.exit(2)
  }
})()


(async () => {
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
    await page.waitForSelector('text=Products', { timeout: 8000 })

    console.log('E2E: Login succeeded — Products page visible')
    await browser.close()
    process.exit(0)
  } catch (err) {
    console.error('E2E failed:', err)
    await browser.close()
    process.exit(2)
  }
})()
