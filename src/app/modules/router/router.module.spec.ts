import { AppRouterModule } from './router.module';

describe('AppRouterModule', () => {
  let routerModule: AppRouterModule;

  beforeEach(() => {
    routerModule = new AppRouterModule();
  });

  it('should create an instance', () => {
    expect(routerModule).toBeTruthy();
  });
});
