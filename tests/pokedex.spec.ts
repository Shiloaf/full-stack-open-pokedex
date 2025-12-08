import { test, expect } from "@playwright/test";

test.describe("Pokedex Front Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page).toHaveTitle(/Pokemon/);
    await expect(page.getByText("Bulbasaur")).toBeVisible();
  });

  test("pokemon page has next and previous buttons to navigate pokemons", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toBeVisible();
  });

  test("can't click previous button on first page", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  test("can't click next button on last page", async ({ page }) => {
    const totalPresses = Math.floor(1328 / 50);
    let count = 0;
    const nextButton = page.getByRole("button", { name: "Next" });
    while (count < totalPresses) {
      await nextButton.click();
      count++;
    }
    await expect(nextButton).toBeDisabled();
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

  test("pokemon page shouldn't have next and previous page navigation buttons", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Bulbasaur" }).click();
    await expect(page.getByRole("button", { name: "Next" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Previous" })).toHaveCount(0);
  });
});

test.describe("Pokemon Router Errors", () => {
  test("invalid text after /pokemon/", async ({ page }) => {
    await page.goto("/pokemon/invalid");
    await expect(page.getByText("Pokemon not found")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Previous" })).toHaveCount(0);
  });

  test("invalid text after /", async ({ page }) => {
    await page.goto("/invalid");
    await expect(page.getByText("This page does not exist")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Previous" })).toHaveCount(0);
  });
});
