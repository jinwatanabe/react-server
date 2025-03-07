import { join } from "node:path";

import { hostname, page, server, waitForHydration } from "playground/utils";
import { expect, test } from "vitest";

process.chdir(join(process.cwd(), "../examples/spa"));

test("single-page application load", async () => {
  await server("./src/index.jsx");
  await page.goto(hostname);
  await waitForHydration();

  const title = page.getByText("single-page application");
  await title.waitFor({ state: "visible" });
  expect(await title.isVisible()).toBe(true);
});
