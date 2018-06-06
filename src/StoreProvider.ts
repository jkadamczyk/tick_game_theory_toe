export class StoreProvider {
  private static store;

  public static initStore(configureStore) {
    this.store = configureStore();
  }

  public static getStore() {
    return this.store;
  }

  public static getState() {
    return this.store.getState();
  }

  public static getStateKey(key) {
    return this.getState[key];
  }
}

export default StoreProvider;
