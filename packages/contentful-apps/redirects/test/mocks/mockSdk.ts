const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  window: { startAutoResizer: jest.fn(), stopAutoResizer: jest.fn() },
  ids: {
    app: 'test-app',
  },
}

export { mockSdk }
