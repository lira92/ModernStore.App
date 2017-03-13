import { ModenWebAppsPage } from './app.po';

describe('moden-web-apps App', () => {
  let page: ModenWebAppsPage;

  beforeEach(() => {
    page = new ModenWebAppsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
