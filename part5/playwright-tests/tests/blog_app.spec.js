const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')

    const user = {
      username: 'test',
      name: 'Test User',
      password: 'Test Password'
    }
    await request.post('http://localhost:5173/api/users', {
      data: user
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()

    await expect(page.locator('#login-form')).toBeVisible();
  })

  describe('Login', () => {
    test('succeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('textbox').first().fill('test')
      await page.getByRole('textbox').last().fill('Test Password')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('user logged in.')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('textbox').first().fill('wrong user')
      await page.getByRole('textbox').last().fill('wrong password')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})