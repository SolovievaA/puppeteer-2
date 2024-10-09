const puppeteer = require("puppeteer");
const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(50000);
});

afterEach(() => {
  page.close();
});

describe("Ticket booking test", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("The user must book one available movie ticket", async () => {
    await clickElement(page, "body nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, ".buying-scheme__wrapper div:nth-child(1) span:nth-child(1)");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    const expected = "Электронный билет";
    expect(actual).toContain(expected);
  });

  test("The user must book three available movie tickets", async () => {
    await clickElement(page, "body nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, ".buying-scheme__wrapper div:nth-child(4) span:nth-child(5)");
    await clickElement(page, ".buying-scheme__wrapper div:nth-child(4) span:nth-child(2)");
    await clickElement(page, ".buying-scheme__wrapper div:nth-child(4) span:nth-child(3)");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    const expected = "Электронный билет";
    expect(actual).toContain(expected);
  });

  test("The user must try to book a ticket for an occupied seat", async () => {
    await clickElement(page, "body nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, "div:nth-child(1) span:nth-child(1)");
    await clickElement(page, "button.acceptin-button");
    const buttonStatus = await this.page.$eval(".acceptin-button",(el) => el.disabled);
    expect(buttonStatus).equal(true);
  });
});