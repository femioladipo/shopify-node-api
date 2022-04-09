export enum DeliveryMethod {
  Http = 'http',
  EventBridge = 'eventbridge',
  PubSub = 'pubsub',
}

type WebhookHandlerFunction = (
  topic: Topic,
  shop_domain: string,
  body: string,
) => Promise<void>;

export interface RegisterOptions {
  // See https://shopify.dev/docs/admin-api/graphql/reference/events/webhooksubscriptiontopic for available topics
  topic: Topic;
  path: string;
  shop: string;
  accessToken: string;
  deliveryMethod?: DeliveryMethod;
}

export interface ShortenedRegisterOptions {
  // See https://shopify.dev/docs/admin-api/graphql/reference/events/webhooksubscriptiontopic for available topics
  shop: string;
  accessToken: string;
  deliveryMethod?: DeliveryMethod;
}

export type RegisterReturn = {
  [topic in Topic]: {
    success: boolean;
    result: unknown;
  };
};

export interface WebhookRegistryEntry {
  path: string;
  webhookHandler: WebhookHandlerFunction;
}

interface WebhookCheckResponseNode<
  T = {
    endpoint:
    | {
      __typename: 'WebhookHttpEndpoint';
      callbackUrl: string;
    }
    | {
      __typename: 'WebhookEventBridgeEndpoint';
      arn: string;
    }
    | {
      __typename: 'WebhookPubSubEndpoint';
      pubSubProject: string;
      pubSubTopic: string;
    };
  },
  > {
  node: {
    id: string;
  } & T;
}

export interface WebhookCheckResponse<T = WebhookCheckResponseNode> {
  data: {
    webhookSubscriptions: {
      edges: T[];
    };
  };
}

export type Topic = "APP_PURCHASES_ONE_TIME_UPDATE" |
  "APP_SUBSCRIPTIONS_UPDATE" |
  "APP_UNINSTALLED" |
  "ATTRIBUTED_SESSIONS_FIRST" |
  "ATTRIBUTED_SESSIONS_LAST" |
  "BULK_OPERATIONS_FINISH" |
  "CARTS_CREATE" |
  "CARTS_UPDATE" |
  "CHANNELS_DELETE" |
  "CHECKOUTS_CREATE" |
  "CHECKOUTS_DELETE" |
  "CHECKOUTS_UPDATE" |
  "COLLECTIONS_CREATE" |
  "COLLECTIONS_DELETE" |
  "COLLECTIONS_UPDATE" |
  "COLLECTION_LISTINGS_ADD" |
  "COLLECTION_LISTINGS_REMOVE" |
  "COLLECTION_LISTINGS_UPDATE" |
  "COLLECTION_PUBLICATIONS_CREATE" |
  "COLLECTION_PUBLICATIONS_DELETE" |
  "COLLECTION_PUBLICATIONS_UPDATE" |
  "CUSTOMERS_CREATE" |
  "CUSTOMERS_DELETE" |
  "CUSTOMERS_DISABLE" |
  "CUSTOMERS_ENABLE" |
  "CUSTOMERS_MARKETING_CONSENT_UPDATE" |
  "CUSTOMERS_UPDATE" |
  "CUSTOMER_GROUPS_CREATE" |
  "CUSTOMER_GROUPS_DELETE" |
  "CUSTOMER_GROUPS_UPDATE" |
  "CUSTOMER_PAYMENT_METHODS_CREATE" |
  "CUSTOMER_PAYMENT_METHODS_REVOKE" |
  "CUSTOMER_PAYMENT_METHODS_UPDATE" |
  "DISPUTES_CREATE" |
  "DISPUTES_UPDATE" |
  "DOMAINS_CREATE" |
  "DOMAINS_DESTROY" |
  "DOMAINS_UPDATE" |
  "DRAFT_ORDERS_CREATE" |
  "DRAFT_ORDERS_DELETE" |
  "DRAFT_ORDERS_UPDATE" |
  "FULFILLMENTS_CREATE" |
  "FULFILLMENTS_UPDATE" |
  "FULFILLMENT_EVENTS_CREATE" |
  "FULFILLMENT_EVENTS_DELETE" |
  "INVENTORY_ITEMS_CREATE" |
  "INVENTORY_ITEMS_DELETE" |
  "INVENTORY_ITEMS_UPDATE" |
  "INVENTORY_LEVELS_CONNECT" |
  "INVENTORY_LEVELS_DISCONNECT" |
  "INVENTORY_LEVELS_UPDATE" |
  "LOCALES_CREATE" |
  "LOCALES_UPDATE" |
  "LOCATIONS_CREATE" |
  "LOCATIONS_DELETE" |
  "LOCATIONS_UPDATE" |
  "MARKETS_CREATE" |
  "MARKETS_DELETE" |
  "MARKETS_UPDATE" |
  "ORDERS_CANCELLED" |
  "ORDERS_CREATE" |
  "ORDERS_DELETE" |
  "ORDERS_EDITED" |
  "ORDERS_FULFILLED" |
  "ORDERS_PAID" |
  "ORDERS_PARTIALLY_FULFILLED" |
  "ORDERS_UPDATED" |
  "ORDER_TRANSACTIONS_CREATE" |
  "PAYMENT_TERMS_CREATE" |
  "PAYMENT_TERMS_DELETE" |
  "PAYMENT_TERMS_UPDATE" |
  "PRODUCTS_CREATE" |
  "PRODUCTS_DELETE" |
  "PRODUCTS_UPDATE" |
  "PRODUCT_LISTINGS_ADD" |
  "PRODUCT_LISTINGS_REMOVE" |
  "PRODUCT_LISTINGS_UPDATE" |
  "PRODUCT_PUBLICATIONS_CREATE" |
  "PRODUCT_PUBLICATIONS_DELETE" |
  "PRODUCT_PUBLICATIONS_UPDATE" |
  "PROFILES_CREATE" |
  "PROFILES_DELETE" |
  "PROFILES_UPDATE" |
  "REFUNDS_CREATE" |
  "SCHEDULED_PRODUCT_LISTINGS_ADD" |
  "SCHEDULED_PRODUCT_LISTINGS_REMOVE" |
  "SCHEDULED_PRODUCT_LISTINGS_UPDATE" |
  "SEGMENTS_CREATE" |
  "SEGMENTS_DELETE" |
  "SEGMENTS_UPDATE" |
  "SELLING_PLAN_GROUPS_CREATE" |
  "SELLING_PLAN_GROUPS_DELETE" |
  "SELLING_PLAN_GROUPS_UPDATE" |
  "SHIPPING_ADDRESSES_CREATE" |
  "SHIPPING_ADDRESSES_UPDATE" |
  "SHOP_UPDATE" |
  "SUBSCRIPTION_BILLING_ATTEMPTS_CHALLENGED" |
  "SUBSCRIPTION_BILLING_ATTEMPTS_FAILURE" |
  "SUBSCRIPTION_BILLING_ATTEMPTS_SUCCESS" |
  "SUBSCRIPTION_CONTRACTS_CREATE" |
  "SUBSCRIPTION_CONTRACTS_UPDATE" |
  "TAX_SERVICES_CREATE" |
  "TAX_SERVICES_UPDATE" |
  "TENDER_TRANSACTIONS_CREATE" |
  "THEMES_CREATE" |
  "THEMES_DELETE" |
  "THEMES_PUBLISH" |
  "THEMES_UPDATE" |
  "VARIANTS_IN_STOCK" |
  "VARIANTS_OUT_OF_STOCK";
