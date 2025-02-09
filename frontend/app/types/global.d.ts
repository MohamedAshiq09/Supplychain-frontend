declare global {
  interface ServiceWorkerGlobalScope extends WindowOrWorkerGlobalScope {
    __WB_MANIFEST: string[];
    skipWaiting(): void;
    clients: Clients;
  }

  interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<any>): void;
  }

  interface FetchEvent extends ExtendableEvent {
    request: Request;
    respondWith(response: Promise<Response> | Response): void;
  }

  interface WindowEventMap {
    install: ExtendableEvent;
    fetch: FetchEvent;
  }
}

export {};
