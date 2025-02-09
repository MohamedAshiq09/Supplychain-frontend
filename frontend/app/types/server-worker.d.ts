interface ServiceWorkerGlobalScope {
  __WB_MANIFEST: string[];
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject
  ): void;
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

declare var self: ServiceWorkerGlobalScope;
