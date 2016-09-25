import { PwaGuideBostonPage } from './app.po';

describe('pwa-guide-boston App', function() {
  let page: PwaGuideBostonPage;

  beforeEach(() => {
    page = new PwaGuideBostonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
