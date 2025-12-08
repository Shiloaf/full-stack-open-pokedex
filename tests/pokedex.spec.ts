import { test, expect } from "@playwright/test";

test.describe("Pokedex Front Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page).toHaveTitle(/Pokemon/);
    await expect(page.getByText("Bulbasaur")).toBeVisible();
  });
});

test.describe("Pokedex Pokemon Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("pokemon page can be opened", async ({ page }) => {
    await page.getByRole("link", { name: "Bulbasaur" }).click();
    await expect(page.getByText("Bulbasaur")).toBeVisible();
    await expect(page.getByText("Chlorophyll")).toBeVisible();
  });

  test("pokemon page can navigate back to home", async ({ page }) => {
    await page.getByRole("link", { name: "Bulbasaur" }).click();
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page.getByText("Bulbasaur")).toBeVisible();
  });

  test("pokemon page can navigate to next pokemon", async ({ page }) => {
    await page.getByRole("link", { name: "Bulbasaur" }).click();
    await page.getByRole("link", { name: "Next" }).click();
    await expect(page.getByText("Ivysaur")).toBeVisible();
  });

  test("pokemon page can navigate to previous pokemon", async ({ page }) => {
    await page.getByRole("link", { name: "Ivysaur" }).click();
    await page.getByRole("link", { name: "Previous" }).click();
    await expect(page.getByText("Bulbasaur")).toBeVisible();
  });

  test("1st pokemon page doesn't have previous button", async ({ page }) => {
    await page.getByRole("link", { name: "Bulbasaur" }).click();
    await expect(page.getByRole("link", { name: "Previous" })).toHaveCount(0);
  });

  test("last pokemon page doesn't have next button", async ({ page }) => {
    await page.getByRole("link", { name: "Diglett" }).click();
    await expect(page.getByRole("link", { name: "Next" })).toHaveCount(0);
  });
});
