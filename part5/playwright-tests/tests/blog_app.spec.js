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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.getByRole('textbox').first().fill('test')
      await page.getByRole('textbox').last().fill('Test Password')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByRole('textbox').first().fill('Test Blog')
      await page.getByRole('textbox').last().fill('http://testurl.com')
      await page.getByRole('button', { name: 'post blog' }).click()

      await expect(page.getByText('a new blog \'Test Blog\' by Test User added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByRole('textbox').first().fill('Test Blog')
      await page.getByRole('textbox').last().fill('http://testurl.com')
      await page.getByRole('button', { name: 'post blog' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()


      await expect(page.getByText('added like to \'Test Blog\' by Test User.')).toBeVisible()
    })

    test.only('a user can delete a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByRole('textbox').first().fill('Test Blog')
      await page.getByRole('textbox').last().fill('http://testurl.com')
      await page.getByRole('button', { name: 'post blog' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('You are about to delete Test Blog by Test User. Continue?');
        await dialog.accept();
      });

      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('\'Test Blog\' by Test User was removed from the records.')).toBeVisible()
    })
  })
})