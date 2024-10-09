const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(50000);

Before(async function () {
  const browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 50 
    });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 50000,
  });
});

When("user choose date", async function () {
  return await clickElement(this.page, "body nav a:nth-child(2)");
});
When("user choose time", async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
});
When("user choose a sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(1) span:nth-child(1)");
});
When("user choose a first sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(4) span:nth-child(5)"
  );
});
When("user choose a second sit", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(4) span:nth-child(2)"
  );
});
When('user choose a third sit', async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(4) span:nth-child(3)"
  );
});  
When('user book a seat that is occupied', async function () {
  await clickElement(
    this.page, 
    "div:nth-child(1) span:nth-child(1)"
  );
});
When("user click on the booking button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});
When("user click on the button to get booking code", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});
Then("user get the code and text {string}", async function (string) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});
Then('book button is inactive', async function () {
  const buttonStatus = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});


