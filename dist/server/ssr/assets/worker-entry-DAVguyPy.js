import { u as usePathname, R as React, g as getLayoutSegmentContext, r as reactExports, a as React$1, b as reactDomExports, c as ReactDOM, d as useParams, e as useRouter } from "../index.js";
import "../__vite_rsc_assets_manifest.js";
import "node:async_hooks";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    if (error && typeof error === "object" && "digest" in error) {
      const digest = String(error.digest);
      if (digest === "NEXT_NOT_FOUND" || // legacy compat
      digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;") || digest.startsWith("NEXT_REDIRECT;")) {
        throw error;
      }
    }
    return { error };
  }
  reset = () => {
    this.setState({ error: null });
  };
  render() {
    if (this.state.error) {
      const FallbackComponent = this.props.fallback;
      return jsxRuntimeExports.jsx(FallbackComponent, { error: this.state.error, reset: this.reset });
    }
    return this.props.children;
  }
}
class NotFoundBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notFound: false, previousPathname: props.pathname };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pathname !== state.previousPathname && state.notFound) {
      return { notFound: false, previousPathname: props.pathname };
    }
    return { notFound: state.notFound, previousPathname: props.pathname };
  }
  static getDerivedStateFromError(error) {
    if (error && typeof error === "object" && "digest" in error) {
      const digest = String(error.digest);
      if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")) {
        return { notFound: true };
      }
    }
    throw error;
  }
  render() {
    if (this.state.notFound) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
function NotFoundBoundary({ fallback, children }) {
  const pathname = usePathname();
  return jsxRuntimeExports.jsx(NotFoundBoundaryInner, { pathname, fallback, children });
}
function LayoutSegmentProvider({ depth, children }) {
  const ctx = getLayoutSegmentContext();
  if (!ctx) {
    return children;
  }
  return reactExports.createElement(ctx.Provider, { value: depth }, children);
}
var nestedKeys = /* @__PURE__ */ new Set(["style"]);
var isNewReact = "use" in React$1;
var fixedMap = {
  srcset: "srcSet",
  fetchpriority: isNewReact ? "fetchPriority" : "fetchpriority"
};
var camelize = (key) => {
  if (key.startsWith("data-") || key.startsWith("aria-")) {
    return key;
  }
  return fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase());
};
function camelizeProps(props) {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [
      camelize(k),
      nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v
    ])
  );
}
var getSizes = (width, layout) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size, image width is the max size,
    // otherwise it's the width of the screen
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case `fixed`:
      return `${width}px`;
    // Image is always the width of the screen
    case `fullWidth`:
      return `100vw`;
    default:
      return void 0;
  }
};
var pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
var getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  background
}) => {
  const styleEntries = [
    ["object-fit", objectFit]
  ];
  if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:") || background?.startsWith("/")) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["height", pixelate(height)]);
  }
  return Object.fromEntries(
    styleEntries.filter(([, value]) => value)
  );
};
var DEFAULT_RESOLUTIONS = [
  6016,
  // 6K
  5120,
  // 5K
  4480,
  // 4.5K
  3840,
  // 4K
  3200,
  // QHD+
  2560,
  // WQXGA
  2048,
  // QXGA
  1920,
  // 1080p
  1668,
  // Various iPads
  1280,
  // 720p
  1080,
  // iPhone 6-8 Plus
  960,
  // older horizontal phones
  828,
  // iPhone XR/11
  750,
  // iPhone 6-8
  640
  // older and lower-end phones
];
var LOW_RES_WIDTH = 24;
var getBreakpoints = ({
  width,
  layout,
  resolutions = DEFAULT_RESOLUTIONS
}) => {
  if (layout === "fullWidth") {
    return resolutions;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...resolutions.filter((w) => w < doubleWidth)
    ];
  }
  return [];
};
var getSrcSetEntries = ({
  src,
  width,
  layout = "constrained",
  height,
  aspectRatio,
  breakpoints,
  format
}) => {
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints.sort((a, b) => a - b).map((bp) => {
    let transformedHeight;
    if (height && aspectRatio) {
      transformedHeight = Math.round(bp / aspectRatio);
    }
    return {
      url: src,
      width: bp,
      height: transformedHeight,
      format
    };
  });
};
var getSrcSet = (options) => {
  let { src, transformer, operations } = options;
  if (!transformer) {
    return "";
  }
  return getSrcSetEntries(options).map(({ url: _, ...transform2 }) => {
    const url = transformer(
      src,
      { ...operations, ...transform2 },
      options.options
    );
    return `${url?.toString()} ${transform2.width}w`;
  }).join(",\n");
};
function transformSharedProps({
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  ...props
}) {
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  if (priority) {
    props.loading ||= "eager";
    props.fetchpriority ||= "high";
  } else {
    props.loading ||= "lazy";
    props.decoding ||= "async";
  }
  if (props.alt === "") {
    props.role ||= "presentation";
  }
  if (aspectRatio) {
    if (width) {
      if (height) ;
      else {
        height = Math.round(width / aspectRatio);
      }
    } else if (height) {
      width = Math.round(height * aspectRatio);
    } else ;
  } else if (width && height) {
    aspectRatio = width / height;
  } else ;
  return {
    width,
    height,
    aspectRatio,
    layout,
    ...props
  };
}
function transformBaseImageProps(props) {
  let {
    src,
    transformer,
    background,
    layout,
    objectFit,
    breakpoints,
    width,
    height,
    aspectRatio,
    unstyled,
    operations,
    options,
    ...transformedProps
  } = transformSharedProps(props);
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH / aspectRatio) : void 0;
    const lowResImage = transformer(
      src,
      {
        width: LOW_RES_WIDTH,
        height: lowResHeight
      },
      options
    );
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }
  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background
  };
  transformedProps.sizes ||= getSizes(width, layout);
  if (!unstyled) {
    transformedProps.style = {
      ...getStyle(styleProps),
      ...transformedProps.style
    };
  }
  if (transformer) {
    transformedProps.srcset = getSrcSet({
      src,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      operations,
      options
    });
    const transformed = transformer(
      src,
      { ...operations, width, height },
      options
    );
    if (transformed) {
      src = transformed;
    }
    if (layout === "fullWidth" || layout === "constrained") {
      width = void 0;
      height = void 0;
    }
  }
  return {
    ...transformedProps,
    src: src?.toString(),
    width,
    height
  };
}
function normalizeImageType(type) {
  if (!type) {
    return {};
  }
  if (type.startsWith("image/")) {
    return {
      format: type.slice(6),
      mimeType: type
    };
  }
  return {
    format: type,
    mimeType: `image/${type === "jpg" ? "jpeg" : type}`
  };
}
function transformBaseSourceProps({
  media,
  type,
  ...props
}) {
  let {
    src,
    transformer,
    layout,
    breakpoints,
    width,
    height,
    aspectRatio,
    sizes,
    loading,
    decoding,
    operations,
    options,
    ...rest
  } = transformSharedProps(props);
  if (!transformer) {
    return {};
  }
  const { format, mimeType } = normalizeImageType(type);
  sizes ||= getSizes(width, layout);
  const srcset = getSrcSet({
    src,
    width,
    height,
    aspectRatio,
    layout,
    breakpoints,
    transformer,
    format,
    operations,
    options
  });
  const transformed = transformer(
    src,
    { ...operations, width, height },
    options
  );
  if (transformed) {
    src = transformed;
  }
  const returnObject = {
    ...rest,
    sizes,
    srcset
  };
  if (media) {
    returnObject.media = media;
  }
  if (mimeType) {
    returnObject.type = mimeType;
  }
  return returnObject;
}
const domains = {
  "images.ctfassets.net": "contentful",
  "cdn.builder.io": "builder.io",
  "images.prismic.io": "imgix",
  "www.datocms-assets.com": "imgix",
  "cdn.sanity.io": "imgix",
  "images.unsplash.com": "imgix",
  "cdn.shopify.com": "shopify",
  "s7d1.scene7.com": "scene7",
  "ip.keycdn.com": "keycdn",
  "assets.caisy.io": "bunny",
  "images.contentstack.io": "contentstack",
  "ucarecdn.com": "uploadcare",
  "imagedelivery.net": "cloudflare_images",
  "wsrv.nl": "wsrv"
};
const subdomains = {
  "imgix.net": "imgix",
  "wp.com": "wordpress",
  "files.wordpress.com": "wordpress",
  "b-cdn.net": "bunny",
  "storyblok.com": "storyblok",
  "kc-usercontent.com": "kontent.ai",
  "cloudinary.com": "cloudinary",
  "kxcdn.com": "keycdn",
  "imgeng.in": "imageengine",
  "imagekit.io": "imagekit",
  "cloudimg.io": "cloudimage",
  "ucarecdn.com": "uploadcare",
  "supabase.co": "supabase",
  "graphassets.com": "hygraph"
};
const paths = {
  "/cdn-cgi/image/": "cloudflare",
  "/cdn-cgi/imagedelivery/": "cloudflare_images",
  "/_next/image": "nextjs",
  "/_vercel/image": "vercel",
  "/is/image": "scene7",
  "/_ipx/": "ipx",
  "/_image": "astro",
  "/.netlify/images": "netlify",
  "/storage/v1/object/public/": "supabase",
  "/storage/v1/render/image/public/": "supabase",
  "/v1/storage/buckets/": "appwrite"
};
function roundIfNumeric(value) {
  if (!value) {
    return value;
  }
  const num = Number(value);
  if (isNaN(num)) {
    return value;
  }
  return Math.round(num);
}
const toRelativeUrl = (url) => {
  const { pathname, search } = url;
  return `${pathname}${search}`;
};
const toCanonicalUrlString = (url) => {
  return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
const toUrl = (url, base) => {
  return typeof url === "string" ? new URL(url, "http://n/") : url;
};
const escapeChar = (text) => text === " " ? "+" : "%" + text.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
const stripLeadingSlash = (str) => str?.startsWith("/") ? str.slice(1) : str;
const stripTrailingSlash = (str) => str?.endsWith("/") ? str.slice(0, -1) : str;
const addTrailingSlash = (str) => str?.endsWith("/") ? str : `${str}/`;
const createFormatter = (kvSeparator, paramSeparator) => {
  const encodedValueJoiner = escapeChar(kvSeparator);
  const encodedOperationJoiner = escapeChar(paramSeparator);
  function escape(value) {
    return encodeURIComponent(value).replaceAll(kvSeparator, encodedValueJoiner).replaceAll(paramSeparator, encodedOperationJoiner);
  }
  function format(key, value) {
    return `${escape(key)}${kvSeparator}${escape(String(value))}`;
  }
  return (operations) => {
    const ops = Array.isArray(operations) ? operations : Object.entries(operations);
    return ops.flatMap(([key, value]) => {
      if (value === void 0 || value === null) {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map((v) => format(key, v));
      }
      return format(key, value);
    }).join(paramSeparator);
  };
};
const createParser = (kvSeparator, paramSeparator) => {
  if (kvSeparator === "=" && paramSeparator === "&") {
    return queryParser;
  }
  return (url) => {
    const urlString = url.toString();
    return Object.fromEntries(urlString.split(paramSeparator).map((pair) => {
      const [key, value] = pair.split(kvSeparator);
      return [decodeURI(key), decodeURI(value)];
    }));
  };
};
function clampDimensions(operations, maxWidth = 4e3, maxHeight = 4e3) {
  let { width, height } = operations;
  width = Number(width) || void 0;
  height = Number(height) || void 0;
  if (width && width > maxWidth) {
    if (height) {
      height = Math.round(height * maxWidth / width);
    }
    width = maxWidth;
  }
  if (height && height > maxHeight) {
    if (width) {
      width = Math.round(width * maxHeight / height);
    }
    height = maxHeight;
  }
  return { width, height };
}
function extractFromURL(url) {
  const parsedUrl = toUrl(url);
  const operations = Object.fromEntries(parsedUrl.searchParams.entries());
  for (const key in ["width", "height", "quality"]) {
    const value = operations[key];
    if (value) {
      const newVal = Number(value);
      if (!isNaN(newVal)) {
        operations[key] = newVal;
      }
    }
  }
  parsedUrl.search = "";
  return {
    operations,
    src: toCanonicalUrlString(parsedUrl)
  };
}
function normaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
  if (operations.format && operations.format in formatMap) {
    operations.format = formatMap[operations.format];
  }
  if (operations.width) {
    operations.width = roundIfNumeric(operations.width);
  }
  if (operations.height) {
    operations.height = roundIfNumeric(operations.height);
  }
  for (const k in keyMap) {
    if (!Object.prototype.hasOwnProperty.call(keyMap, k)) {
      continue;
    }
    const key = k;
    if (keyMap[key] === false) {
      delete operations[key];
      continue;
    }
    if (keyMap[key] && operations[key]) {
      operations[keyMap[key]] = operations[key];
      delete operations[key];
    }
  }
  for (const k in defaults) {
    if (!Object.prototype.hasOwnProperty.call(defaults, k)) {
      continue;
    }
    const key = k;
    const value = defaults[key];
    if (!operations[key] && value !== void 0) {
      if (keyMap[key] === false) {
        continue;
      }
      const resolvedKey = keyMap[key] ?? key;
      if (resolvedKey in operations) {
        continue;
      }
      operations[resolvedKey] = value;
    }
  }
  return operations;
}
const invertMap = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
function denormaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
  const invertedKeyMap = invertMap(keyMap);
  const invertedFormatMap = invertMap(formatMap);
  const ops = normaliseOperations({
    keyMap: invertedKeyMap,
    formatMap: invertedFormatMap,
    defaults
  }, operations);
  if (ops.width) {
    ops.width = roundIfNumeric(ops.width);
  }
  if (ops.height) {
    ops.height = roundIfNumeric(ops.height);
  }
  const q = Number(ops.quality);
  if (!isNaN(q)) {
    ops.quality = q;
  }
  return ops;
}
const queryParser = (url) => {
  const parsedUrl = toUrl(url);
  return Object.fromEntries(parsedUrl.searchParams.entries());
};
function createOperationsGenerator({ kvSeparator = "=", paramSeparator = "&", ...options } = {}) {
  const formatter = createFormatter(kvSeparator, paramSeparator);
  return (operations) => {
    const normalisedOperations = normaliseOperations(options, operations);
    return formatter(normalisedOperations);
  };
}
function createOperationsParser({ kvSeparator = "=", paramSeparator = "&", defaults: _, ...options } = {}) {
  const parser = createParser(kvSeparator, paramSeparator);
  return (url) => {
    const operations = url ? parser(url) : {};
    return denormaliseOperations(options, operations);
  };
}
function createOperationsHandlers(config) {
  const operationsGenerator2 = createOperationsGenerator(config);
  const operationsParser2 = createOperationsParser(config);
  return { operationsGenerator: operationsGenerator2, operationsParser: operationsParser2 };
}
function paramToBoolean(value) {
  if (value === void 0 || value === null) {
    return void 0;
  }
  try {
    return Boolean(JSON.parse(value?.toString()));
  } catch {
    return Boolean(value);
  }
}
const removeUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== void 0));
function createExtractAndGenerate(extract2, generate2) {
  return ((src, operations, options) => {
    const base = extract2(src, options);
    if (!base) {
      return generate2(src, operations, options);
    }
    return generate2(base.src, {
      ...base.operations,
      ...removeUndefined(operations)
    }, {
      // deno-lint-ignore no-explicit-any
      ...base.options,
      ...options
    });
  });
}
const cdnDomains = new Map(Object.entries(domains));
const cdnSubdomains = Object.entries(subdomains);
const cdnPaths = Object.entries(paths);
function getProviderForUrl(url) {
  return getProviderForUrlByDomain(url) || getProviderForUrlByPath(url);
}
function getProviderForUrlByDomain(url) {
  if (typeof url === "string" && !url.startsWith("https://")) {
    return false;
  }
  const { hostname } = toUrl(url);
  const cdn = cdnDomains.get(hostname);
  if (cdn) {
    return cdn;
  }
  return cdnSubdomains.find(([subdomain]) => hostname.endsWith(subdomain))?.[1] || false;
}
function getProviderForUrlByPath(url) {
  const { pathname } = toUrl(url);
  return cdnPaths.find(([path]) => pathname.startsWith(path))?.[1] || false;
}
const VIEW_URL_SUFFIX = "/view?";
const PREVIEW_URL_SUFFIX = "/preview?";
const { operationsGenerator: operationsGenerator$o, operationsParser: operationsParser$j } = createOperationsHandlers({
  keyMap: {
    format: "output"
  },
  kvSeparator: "=",
  paramSeparator: "&"
});
const generate$q = (src, modifiers) => {
  const url = toUrl(src.toString().replace(VIEW_URL_SUFFIX, PREVIEW_URL_SUFFIX));
  const projectParam = url.searchParams.get("project") ?? "";
  const operations = operationsGenerator$o(modifiers);
  url.search = operations;
  url.searchParams.append("project", projectParam);
  return toCanonicalUrlString(url);
};
const extract$q = (url) => {
  if (getProviderForUrlByPath(url) !== "appwrite") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const operations = operationsParser$j(parsedUrl);
  delete operations.project;
  const projectParam = parsedUrl.searchParams.get("project") ?? "";
  parsedUrl.search = "";
  parsedUrl.searchParams.append("project", projectParam);
  const sourceUrl = parsedUrl.href;
  return {
    src: sourceUrl,
    operations
  };
};
const transform$r = createExtractAndGenerate(extract$q, generate$q);
const DEFAULT_ENDPOINT = "/_image";
const { operationsParser: operationsParser$i, operationsGenerator: operationsGenerator$n } = createOperationsHandlers({
  keyMap: {
    format: "f",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "cover"
  }
});
const generate$p = (src, modifiers, options) => {
  const url = toUrl(`${stripTrailingSlash(options?.baseUrl ?? "")}${options?.endpoint ?? DEFAULT_ENDPOINT}`);
  const operations = operationsGenerator$n(modifiers);
  url.search = operations;
  url.searchParams.set("href", src.toString());
  return toCanonicalUrlString(url);
};
const extract$p = (url) => {
  const parsedUrl = toUrl(url);
  const src = parsedUrl.searchParams.get("href");
  if (!src) {
    return null;
  }
  parsedUrl.searchParams.delete("href");
  const operations = operationsParser$i(parsedUrl);
  return {
    src,
    operations,
    options: { baseUrl: parsedUrl.origin }
  };
};
const transform$q = (src, operations, options = {}) => {
  const url = toUrl(src);
  if (url.pathname !== (options?.endpoint ?? DEFAULT_ENDPOINT)) {
    return generate$p(src, operations, options);
  }
  const base = extract$p(src);
  if (!base) {
    return generate$p(src, operations, options);
  }
  options.baseUrl ??= base.options.baseUrl;
  return generate$p(base.src, {
    ...base.operations,
    ...operations
  }, options);
};
const operationsGenerator$m = createOperationsGenerator({
  defaults: {
    fit: "cover",
    format: "webp",
    sharp: true
  }
});
const extract$o = extractFromURL;
const generate$o = (src, modifiers) => {
  const operations = operationsGenerator$m(modifiers);
  const url = toUrl(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const transform$p = createExtractAndGenerate(extract$o, generate$o);
const operationsGenerator$l = createOperationsGenerator({
  keyMap: {
    format: "output"
  }
});
const extract$n = extractFromURL;
const generate$n = (src, modifiers) => {
  const operations = operationsGenerator$l(modifiers);
  const url = toUrl(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const extractAndGenerate$1 = createExtractAndGenerate(extract$n, generate$n);
const transform$o = (src, operations) => {
  const { width, height } = operations;
  if (width && height) {
    operations.aspect_ratio ??= `${Math.round(Number(width))}:${Math.round(Number(height))}`;
  }
  return extractAndGenerate$1(src, operations);
};
const { operationsGenerator: operationsGenerator$k, operationsParser: operationsParser$h } = createOperationsHandlers({
  keyMap: {
    "format": "f"
  },
  defaults: {
    format: "auto",
    fit: "cover"
  },
  formatMap: {
    jpg: "jpeg"
  },
  kvSeparator: "=",
  paramSeparator: ","
});
const generate$m = (src, operations, options) => {
  const modifiers = operationsGenerator$k(operations);
  const url = toUrl(options?.domain ? `https://${options.domain}` : "/");
  url.pathname = `/cdn-cgi/image/${modifiers}/${stripLeadingSlash(src.toString())}`;
  return toCanonicalUrlString(url);
};
const extract$m = (url, options) => {
  if (getProviderForUrlByPath(url) !== "cloudflare") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const [, , , modifiers, ...src] = parsedUrl.pathname.split("/");
  const operations = operationsParser$h(modifiers);
  return {
    src: toCanonicalUrlString(toUrl(src.join("/"))),
    operations,
    options: {
      domain: options?.domain ?? (parsedUrl.hostname === "n" ? void 0 : parsedUrl.hostname)
    }
  };
};
const transform$n = createExtractAndGenerate(extract$m, generate$m);
const cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const imagedeliveryRegex = /https?:\/\/(?<host>imagedelivery.net)\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const { operationsGenerator: operationsGenerator$j, operationsParser: operationsParser$g } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f"
  },
  defaults: {
    fit: "cover"
  },
  kvSeparator: "=",
  paramSeparator: ","
});
function formatUrl(options, transformations) {
  const { host, accountHash, imageId } = options;
  if (!host || !accountHash || !imageId) {
    throw new Error("Missing required Cloudflare Images options");
  }
  const pathSegments = [
    "https:/",
    ...host === "imagedelivery.net" ? [host] : [host, "cdn-cgi", "imagedelivery"],
    accountHash,
    imageId,
    transformations
  ].filter(Boolean);
  return pathSegments.join("/");
}
const generate$l = (_src, operations, options = {}) => {
  const transformations = operationsGenerator$j(operations);
  const url = formatUrl(options, transformations);
  return toCanonicalUrlString(toUrl(url));
};
const extract$l = (url) => {
  const parsedUrl = toUrl(url);
  const matches = [
    ...parsedUrl.toString().matchAll(cloudflareImagesRegex),
    ...parsedUrl.toString().matchAll(imagedeliveryRegex)
  ];
  if (!matches[0]?.groups) {
    return null;
  }
  const { host, accountHash, imageId, transformations } = matches[0].groups;
  const operations = operationsParser$g(transformations || "");
  const options = { host, accountHash, imageId };
  return {
    src: formatUrl(options),
    operations,
    options
  };
};
const transform$m = (src, operations, options = {}) => {
  const extracted = extract$l(src);
  if (!extracted) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const newOperations = { ...extracted.operations, ...operations };
  return generate$l(extracted.src, newOperations, {
    ...extracted.options,
    ...options
  });
};
const { operationsGenerator: operationsGenerator$i, operationsParser: operationsParser$f } = createOperationsHandlers({
  keyMap: {
    format: "force_format",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    org_if_sml: 1
  }
});
const generate$k = (src, modifiers = {}, { token } = {}) => {
  if (!token) {
    throw new Error("Token is required for Cloudimage URLs" + src);
  }
  let srcString = src.toString();
  srcString = srcString.replace(/^https?:\/\//, "");
  if (srcString.includes("?")) {
    modifiers.ci_url_encoded = 1;
    srcString = encodeURIComponent(srcString);
  }
  const operations = operationsGenerator$i(modifiers);
  const url = new URL(`https://${token}.cloudimg.io/`);
  url.pathname = srcString;
  url.search = operations;
  return url.toString();
};
const extract$k = (src, options = {}) => {
  const url = toUrl(src);
  if (getProviderForUrl(url) !== "cloudimage") {
    return null;
  }
  const operations = operationsParser$f(url);
  let originalSrc = url.pathname;
  if (operations.ci_url_encoded) {
    originalSrc = decodeURIComponent(originalSrc);
    delete operations.ci_url_encoded;
  }
  options.token ??= url.hostname.replace(".cloudimg.io", "");
  return {
    src: `${url.protocol}/${originalSrc}`,
    operations,
    options
  };
};
const transform$l = createExtractAndGenerate(extract$k, generate$k);
const publicRegex = /https?:\/\/(?<host>res\.cloudinary\.com)\/(?<cloudName>[a-zA-Z0-9-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
const privateRegex = /https?:\/\/(?<host>(?<cloudName>[a-zA-Z0-9-]+)-res\.cloudinary\.com|[a-zA-Z0-9.-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
const { operationsGenerator: operationsGenerator$h, operationsParser: operationsParser$e } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f",
    quality: "q"
  },
  defaults: {
    format: "auto",
    c: "lfill"
  },
  kvSeparator: "_",
  paramSeparator: ","
});
function formatCloudinaryUrl({ host, cloudName, assetType, deliveryType, signature, transformations, version, id }) {
  const isPublic = host === "res.cloudinary.com";
  return [
    "https:/",
    host,
    isPublic ? cloudName : void 0,
    assetType,
    deliveryType,
    signature,
    transformations,
    version,
    id
  ].filter(Boolean).join("/");
}
function parseCloudinaryUrl(url) {
  let matches = url.toString().match(publicRegex);
  if (!matches?.length) {
    matches = url.toString().match(privateRegex);
  }
  if (!matches?.length) {
    return null;
  }
  return matches.groups || {};
}
const transform$k = (src, operations) => {
  const group = parseCloudinaryUrl(src.toString());
  if (!group) {
    return src.toString();
  }
  const existing = operationsParser$e(group.transformations || "");
  group.transformations = operationsGenerator$h({
    ...existing,
    ...operations
  });
  return formatCloudinaryUrl(group);
};
const operationsGenerator$g = createOperationsGenerator({
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "fill"
  }
});
const generate$j = (src, modifiers) => {
  const operations = operationsGenerator$g(modifiers);
  const url = new URL(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const extract$j = extractFromURL;
const extractAndGenerate = createExtractAndGenerate(extract$j, generate$j);
const transform$j = (src, operations) => {
  const { width, height } = clampDimensions(operations, 4e3, 4e3);
  return extractAndGenerate(src, {
    ...operations,
    width,
    height
  });
};
const operationsGenerator$f = createOperationsGenerator({
  defaults: {
    auto: "webp",
    disable: "upscale"
  }
});
const generate$i = (src, operations, { baseURL = "https://images.contentstack.io/" } = {}) => {
  if (operations.width && operations.height) {
    operations.fit ??= "crop";
  }
  const modifiers = operationsGenerator$f(operations);
  const url = toUrl(src);
  if (url.hostname === "n") {
    url.protocol = "https:";
    url.hostname = new URL(baseURL).hostname;
  }
  url.search = modifiers;
  return toCanonicalUrlString(url);
};
const extract$i = (url) => {
  const { src, operations } = extractFromURL(url) ?? {};
  if (!operations || !src) {
    return null;
  }
  const { origin } = toUrl(url);
  return {
    src,
    operations,
    options: {
      baseURL: origin
    }
  };
};
const transform$i = createExtractAndGenerate(extract$i, generate$i);
const operationsGenerator$e = createOperationsGenerator({
  defaults: {
    withoutEnlargement: true,
    fit: "cover"
  }
});
const generate$h = (src, operations) => {
  if (Array.isArray(operations.transforms)) {
    operations.transforms = JSON.stringify(operations.transforms);
  }
  const modifiers = operationsGenerator$e(operations);
  const url = toUrl(src);
  url.search = modifiers;
  return toCanonicalUrlString(url);
};
const extract$h = (url) => {
  const base = extractFromURL(url);
  if (base?.operations?.transforms && typeof base.operations.transforms === "string") {
    try {
      base.operations.transforms = JSON.parse(base.operations.transforms);
    } catch {
      return null;
    }
  }
  return base;
};
const transform$h = createExtractAndGenerate(extract$h, generate$h);
const hygraphRegex = /https:\/\/(?<region>[a-z0-9-]+)\.graphassets\.com\/(?<envId>[a-zA-Z0-9]+)(?:\/(?<transformations>.*?))?\/(?<handle>[a-zA-Z0-9]+)$/;
createOperationsHandlers({
  keyMap: {
    width: "width",
    height: "height",
    format: "format"
  },
  defaults: {
    format: "auto",
    fit: "crop"
  }
});
const extract$g = (url) => {
  const parsedUrl = toUrl(url);
  const matches = parsedUrl.toString().match(hygraphRegex);
  if (!matches?.groups) {
    return null;
  }
  const { region, envId, handle, transformations } = matches.groups;
  const operations = {};
  if (transformations) {
    const parts = transformations.split("/");
    parts.forEach((part) => {
      const [operation, params] = part.split("=");
      if (operation === "resize" && params) {
        params.split(",").forEach((param) => {
          const [key, value] = param.split(":");
          if (key === "width" || key === "height") {
            operations[key] = Number(value);
          } else if (key === "fit") {
            operations.fit = value;
          }
        });
      } else if (operation === "output" && params) {
        params.split(",").forEach((param) => {
          const [key, value] = param.split(":");
          if (key === "format") {
            operations.format = value;
          }
        });
      } else if (operation === "auto_image") {
        operations.format = "auto";
      }
    });
  }
  return {
    src: `https://${region}.graphassets.com/${envId}/${handle}`,
    operations,
    options: {
      region,
      envId,
      handle
    }
  };
};
const generate$g = (src, operations, options = {}) => {
  const extracted = extract$g(src);
  if (!extracted) {
    throw new Error("Invalid Hygraph URL");
  }
  const { region, envId, handle } = {
    ...extracted.options,
    ...options
  };
  const transforms = [];
  if (operations.width || operations.height) {
    const resize = [];
    if (operations.width && operations.height) {
      resize.push("fit:crop");
    } else if (operations.fit) {
      resize.push(`fit:${operations.fit}`);
    }
    if (operations.width)
      resize.push(`width:${operations.width}`);
    if (operations.height)
      resize.push(`height:${operations.height}`);
    if (resize.length)
      transforms.push(`resize=${resize.join(",")}`);
  }
  if (operations.format === "auto" || !operations.format && !extracted.operations.format) {
    transforms.push("auto_image");
  } else if (operations.format) {
    transforms.push(`output=format:${operations.format}`);
  }
  const baseUrl = `https://${region}.graphassets.com/${envId}`;
  const transformPart = transforms.length > 0 ? "/" + transforms.join("/") : "";
  const finalUrl = toUrl(`${baseUrl}${transformPart}/${handle}`);
  return toCanonicalUrlString(finalUrl);
};
const transform$g = createExtractAndGenerate(extract$g, generate$g);
const { operationsGenerator: operationsGenerator$d, operationsParser: operationsParser$d } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f"
  },
  defaults: {
    m: "cropbox"
  },
  kvSeparator: "_",
  paramSeparator: "/"
});
const generate$f = (src, operations) => {
  const modifiers = operationsGenerator$d(operations);
  const url = toUrl(src);
  url.searchParams.set("imgeng", modifiers);
  return toCanonicalUrlString(url);
};
const extract$f = (url) => {
  const parsedUrl = toUrl(url);
  const imgeng = parsedUrl.searchParams.get("imgeng");
  if (!imgeng) {
    return null;
  }
  const operations = operationsParser$d(imgeng);
  parsedUrl.searchParams.delete("imgeng");
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$f = createExtractAndGenerate(extract$f, generate$f);
const { operationsGenerator: operationsGenerator$c, operationsParser: operationsParser$c } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f",
    quality: "q"
  },
  defaults: {
    c: "maintain_ratio",
    fo: "auto"
  },
  kvSeparator: "-",
  paramSeparator: ","
});
const generate$e = (src, operations) => {
  const modifiers = operationsGenerator$c(operations);
  const url = toUrl(src);
  url.searchParams.set("tr", modifiers);
  return toCanonicalUrlString(url);
};
const extract$e = (url) => {
  const parsedUrl = toUrl(url);
  let trPart = null;
  let path = parsedUrl.pathname;
  if (parsedUrl.searchParams.has("tr")) {
    trPart = parsedUrl.searchParams.get("tr");
    parsedUrl.searchParams.delete("tr");
  } else {
    const pathParts = parsedUrl.pathname.split("/");
    const trIndex = pathParts.findIndex((part) => part.startsWith("tr:"));
    if (trIndex !== -1) {
      trPart = pathParts[trIndex].slice(3);
      path = pathParts.slice(0, trIndex).concat(pathParts.slice(trIndex + 1)).join("/");
    }
  }
  if (!trPart) {
    return null;
  }
  parsedUrl.pathname = path;
  const operations = operationsParser$c(trPart);
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$e = createExtractAndGenerate(extract$e, generate$e);
const { operationsGenerator: operationsGenerator$b, operationsParser: operationsParser$b } = createOperationsHandlers({
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "min",
    auto: "format"
  }
});
const extract$d = (url) => {
  const src = toUrl(url);
  const operations = operationsParser$b(url);
  src.search = "";
  return { src: toCanonicalUrlString(src), operations };
};
const generate$d = (src, operations) => {
  const modifiers = operationsGenerator$b(operations);
  const url = toUrl(src);
  url.search = modifiers;
  if (url.searchParams.has("fm") && url.searchParams.get("auto") === "format") {
    url.searchParams.delete("auto");
  }
  return toCanonicalUrlString(url);
};
const transform$d = createExtractAndGenerate(extract$d, generate$d);
const { operationsGenerator: operationsGenerator$a, operationsParser: operationsParser$a } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    quality: "q",
    format: "f"
  },
  defaults: {
    f: "auto"
  },
  kvSeparator: "_",
  paramSeparator: ","
});
const generate$c = (src, operations, options) => {
  if (operations.width && operations.height) {
    operations.s = `${operations.width}x${operations.height}`;
    delete operations.width;
    delete operations.height;
  }
  const modifiers = operationsGenerator$a(operations);
  const baseURL = options?.baseURL ?? "/_ipx";
  const url = toUrl(baseURL);
  url.pathname = `${stripTrailingSlash(url.pathname)}/${modifiers}/${stripLeadingSlash(src.toString())}`;
  return toCanonicalUrlString(url);
};
const extract$c = (url) => {
  const parsedUrl = toUrl(url);
  const [, baseUrlPart, modifiers, ...srcParts] = parsedUrl.pathname.split("/");
  if (!modifiers || !srcParts.length) {
    return null;
  }
  const operations = operationsParser$a(modifiers);
  if (operations.s) {
    const [width, height] = operations.s.split("x").map(Number);
    operations.width = width;
    operations.height = height;
    delete operations.s;
  }
  return {
    src: "/" + srcParts.join("/"),
    operations,
    options: {
      baseURL: `${parsedUrl.origin}/${baseUrlPart}`
    }
  };
};
const transform$c = (src, operations, options) => {
  const url = toUrl(src);
  const baseURL = options?.baseURL;
  if (baseURL && url.toString().startsWith(baseURL) || url.pathname.startsWith("/_ipx")) {
    const extracted = extract$c(src);
    if (extracted) {
      return generate$c(extracted.src, { ...extracted.operations, ...operations }, { baseURL: extracted.options.baseURL });
    }
  }
  return generate$c(src, operations, { baseURL });
};
const BOOLEAN_PARAMS = [
  "enlarge",
  "flip",
  "flop",
  "negate",
  "normalize",
  "grayscale",
  "removealpha",
  "olrepeat",
  "progressive",
  "adaptive",
  "lossless",
  "nearlossless",
  "metadata"
];
const { operationsGenerator: operationsGenerator$9, operationsParser: operationsParser$9 } = createOperationsHandlers({
  defaults: {
    fit: "cover"
  },
  formatMap: {
    jpg: "jpeg"
  }
});
const generate$b = (src, operations) => {
  const url = toUrl(src);
  for (const key of BOOLEAN_PARAMS) {
    if (operations[key] !== void 0) {
      operations[key] = operations[key] ? 1 : 0;
    }
  }
  url.search = operationsGenerator$9(operations);
  return toCanonicalUrlString(url);
};
const extract$b = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$9(parsedUrl);
  for (const key of BOOLEAN_PARAMS) {
    if (operations[key] !== void 0) {
      operations[key] = paramToBoolean(operations[key]);
    }
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$b = createExtractAndGenerate(extract$b, generate$b);
const { operationsGenerator: operationsGenerator$8, operationsParser: operationsParser$8 } = createOperationsHandlers({
  formatMap: {
    jpg: "jpeg"
  },
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  }
});
const generate$a = (src, operations) => {
  const url = toUrl(src);
  if (operations.lossless !== void 0) {
    operations.lossless = operations.lossless ? 1 : 0;
  }
  if (operations.width && operations.height) {
    operations.fit = "crop";
  }
  url.search = operationsGenerator$8(operations);
  return toCanonicalUrlString(url);
};
const extract$a = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$8(parsedUrl);
  if (operations.lossless !== void 0) {
    operations.lossless = paramToBoolean(operations.lossless);
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$a = createExtractAndGenerate(extract$a, generate$a);
const { operationsGenerator: operationsGenerator$7, operationsParser: operationsParser$7 } = createOperationsHandlers({
  defaults: {
    fit: "cover"
  },
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  }
});
const generate$9 = (src, operations, options = {}) => {
  const url = toUrl(`${options.baseUrl || ""}/.netlify/images`);
  url.search = operationsGenerator$7(operations);
  url.searchParams.set("url", src.toString());
  return toCanonicalUrlString(url);
};
const extract$9 = (url) => {
  if (getProviderForUrlByPath(url) !== "netlify") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const operations = operationsParser$7(parsedUrl);
  delete operations.url;
  const sourceUrl = parsedUrl.searchParams.get("url") || "";
  parsedUrl.search = "";
  return {
    src: sourceUrl,
    operations,
    options: {
      baseUrl: parsedUrl.hostname === "n" ? void 0 : parsedUrl.origin
    }
  };
};
const transform$9 = createExtractAndGenerate(extract$9, generate$9);
const { operationsGenerator: operationsGenerator$6, operationsParser: operationsParser$6 } = createOperationsHandlers({
  keyMap: {
    width: "w",
    quality: "q",
    height: false,
    format: false
  },
  defaults: {
    q: 75
  }
});
const generate$8 = (src, operations, options = {}) => {
  const url = toUrl(`${options.baseUrl || ""}/${options.prefix || "_vercel"}/image`);
  url.search = operationsGenerator$6(operations);
  url.searchParams.append("url", src.toString());
  return toCanonicalUrlString(url);
};
const extract$8 = (url, options = {}) => {
  if (!["vercel", "nextjs"].includes(getProviderForUrlByPath(url) || "")) {
    return null;
  }
  const parsedUrl = toUrl(url);
  const sourceUrl = parsedUrl.searchParams.get("url") || "";
  parsedUrl.searchParams.delete("url");
  const operations = operationsParser$6(parsedUrl);
  parsedUrl.search = "";
  return {
    src: sourceUrl,
    operations,
    options: {
      baseUrl: options.baseUrl ?? parsedUrl.origin
    }
  };
};
const transform$8 = createExtractAndGenerate(extract$8, generate$8);
const generate$7 = (src, operations, options = {}) => generate$8(src, operations, { ...options, prefix: "_next" });
const extract$7 = (url, options) => extract$8(url, options);
const transform$7 = createExtractAndGenerate(extract$7, generate$7);
const { operationsGenerator: operationsGenerator$5, operationsParser: operationsParser$5 } = createOperationsHandlers({
  keyMap: {
    width: "wid",
    height: "hei",
    quality: "qlt",
    format: "fmt"
  },
  defaults: {
    fit: "crop,0"
  }
});
const BASE = "https://s7d1.scene7.com/is/image/";
const generate$6 = (src, operations) => {
  const url = new URL(src, BASE);
  url.search = operationsGenerator$5(operations);
  return toCanonicalUrlString(url);
};
const extract$6 = (url) => {
  if (getProviderForUrl(url) !== "scene7") {
    return null;
  }
  const parsedUrl = new URL(url, BASE);
  const operations = operationsParser$5(parsedUrl);
  parsedUrl.search = "";
  return {
    src: parsedUrl.toString(),
    operations
  };
};
const transform$6 = createExtractAndGenerate(extract$6, generate$6);
const shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
const { operationsGenerator: operationsGenerator$4, operationsParser: operationsParser$4 } = createOperationsHandlers({
  keyMap: {
    format: false
  }
});
const generate$5 = (src, operations) => {
  const url = toUrl(src);
  const basePath = url.pathname.replace(shopifyRegex, "$1$6");
  url.pathname = basePath;
  url.search = operationsGenerator$4(operations);
  return toCanonicalUrlString(url);
};
const extract$5 = (url) => {
  const parsedUrl = toUrl(url);
  const match = shopifyRegex.exec(parsedUrl.pathname);
  const operations = operationsParser$4(parsedUrl);
  if (match) {
    const [, , , width, height, crop] = match;
    if (width && height && !operations.width && !operations.height) {
      operations.width = parseInt(width, 10);
      operations.height = parseInt(height, 10);
    }
    if (crop) {
      operations.crop ??= crop;
    }
  }
  const basePath = parsedUrl.pathname.replace(shopifyRegex, "$1$6");
  parsedUrl.pathname = basePath;
  for (const key of ["width", "height", "crop", "pad_color", "format"]) {
    parsedUrl.searchParams.delete(key);
  }
  return {
    src: parsedUrl.toString(),
    operations
  };
};
const transform$5 = createExtractAndGenerate(extract$5, generate$5);
const storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/;
const storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/;
const filterSplitterRegex = /:(?![^(]*\))/;
const splitFilters = (filters) => {
  if (!filters) {
    return {};
  }
  return Object.fromEntries(filters.split(filterSplitterRegex).map((filter) => {
    if (!filter)
      return [];
    const [key, value] = filter.split("(");
    return [key, value.replace(")", "")];
  }));
};
const generateFilters = (filters) => {
  if (!filters) {
    return void 0;
  }
  const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
  if (filterItems.length === 0) {
    return void 0;
  }
  return `filters:${filterItems.join(":")}`;
};
const extract$4 = (url) => {
  const parsedUrl = toUrl(url);
  const regex = parsedUrl.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets;
  const matches = regex.exec(parsedUrl.pathname);
  if (!matches || !matches.groups) {
    return null;
  }
  const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
  const { format, ...filterMap } = splitFilters(filters ?? "");
  if (parsedUrl.hostname === "img2.storyblok.com") {
    parsedUrl.hostname = "a.storyblok.com";
  }
  const operations = Object.fromEntries([
    ["width", Number(width) || void 0],
    ["height", Number(height) || void 0],
    ["format", format],
    ["crop", crop],
    ["filters", filterMap],
    ["flipx", flipx],
    ["flipy", flipy]
  ].filter(([_, value]) => value !== void 0));
  return {
    src: `${parsedUrl.origin}${id}`,
    operations
  };
};
const generate$4 = (src, operations) => {
  const url = toUrl(src);
  const { width = 0, height = 0, format, crop, filters = {}, flipx = "", flipy = "" } = operations;
  const size = `${flipx}${width}x${flipy}${height}`;
  if (format) {
    filters.format = format;
  }
  const parts = [
    url.pathname,
    "m",
    crop,
    size,
    generateFilters(filters)
  ].filter(Boolean);
  url.pathname = parts.join("/");
  return toCanonicalUrlString(url);
};
const transform$4 = createExtractAndGenerate(extract$4, generate$4);
const STORAGE_URL_PREFIX = "/storage/v1/object/public/";
const RENDER_URL_PREFIX = "/storage/v1/render/image/public/";
const isRenderUrl = (url) => url.pathname.startsWith(RENDER_URL_PREFIX);
const { operationsGenerator: operationsGenerator$3, operationsParser: operationsParser$3 } = createOperationsHandlers({});
const generate$3 = (src, operations) => {
  const url = toUrl(src);
  const basePath = url.pathname.replace(RENDER_URL_PREFIX, STORAGE_URL_PREFIX);
  url.pathname = basePath;
  if (operations.format && operations.format !== "origin") {
    delete operations.format;
  }
  url.search = operationsGenerator$3(operations);
  return toCanonicalUrlString(url).replace(STORAGE_URL_PREFIX, RENDER_URL_PREFIX);
};
const extract$3 = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$3(parsedUrl);
  const isRender = isRenderUrl(parsedUrl);
  const imagePath = parsedUrl.pathname.replace(RENDER_URL_PREFIX, "").replace(STORAGE_URL_PREFIX, "");
  if (!isRender) {
    return {
      src: toCanonicalUrlString(parsedUrl),
      operations
    };
  }
  return {
    src: `${parsedUrl.origin}${STORAGE_URL_PREFIX}${imagePath}`,
    operations
  };
};
const transform$3 = createExtractAndGenerate(extract$3, generate$3);
const uploadcareRegex = /^https?:\/\/(?<host>[^\/]+)\/(?<uuid>[^\/]+)(?:\/(?<filename>[^\/]+)?)?/;
const { operationsGenerator: operationsGenerator$2, operationsParser: operationsParser$2 } = createOperationsHandlers({
  keyMap: {
    width: false,
    height: false
  },
  defaults: {
    format: "auto"
  },
  kvSeparator: "/",
  paramSeparator: "/-/"
});
const extract$2 = (url) => {
  const parsedUrl = toUrl(url);
  const match = uploadcareRegex.exec(parsedUrl.toString());
  if (!match || !match.groups) {
    return null;
  }
  const { host, uuid } = match.groups;
  const [, ...operationsString] = parsedUrl.pathname.split("/-/");
  const operations = operationsParser$2(operationsString.join("/-/") || "");
  if (operations.resize) {
    const [width, height] = operations.resize.split("x");
    if (width)
      operations.width = parseInt(width);
    if (height)
      operations.height = parseInt(height);
    delete operations.resize;
  }
  return {
    src: `https://${host}/${uuid}/`,
    operations,
    options: { host }
  };
};
const generate$2 = (src, operations, options = {}) => {
  const url = toUrl(src);
  const host = options.host || url.hostname;
  const match = uploadcareRegex.exec(url.toString());
  if (match?.groups) {
    url.pathname = `/${match.groups.uuid}/`;
  }
  operations.resize = operations.resize || `${operations.width ?? ""}x${operations.height ?? ""}`;
  delete operations.width;
  delete operations.height;
  const modifiers = addTrailingSlash(operationsGenerator$2(operations));
  url.hostname = host;
  url.pathname = stripTrailingSlash(url.pathname) + (modifiers ? `/-/${modifiers}` : "") + (match?.groups?.filename ?? "");
  return toCanonicalUrlString(url);
};
const transform$2 = createExtractAndGenerate(extract$2, generate$2);
const { operationsGenerator: operationsGenerator$1, operationsParser: operationsParser$1 } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h"
  },
  defaults: {
    crop: "1"
  }
});
const generate$1 = (src, operations) => {
  const url = toUrl(src);
  const { crop } = operations;
  if (typeof crop !== "undefined" && crop !== "0") {
    operations.crop = crop ? "1" : "0";
  }
  url.search = operationsGenerator$1(operations);
  return toCanonicalUrlString(url);
};
const extract$1 = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$1(parsedUrl);
  if (operations.crop !== void 0) {
    operations.crop = operations.crop === "1";
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$1 = createExtractAndGenerate(extract$1, generate$1);
const { operationsGenerator, operationsParser } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "output",
    quality: "q"
  },
  defaults: {
    fit: "cover"
  }
});
const extract = (url) => {
  const urlObj = toUrl(url);
  const srcParam = urlObj.searchParams.get("url");
  if (!srcParam) {
    return null;
  }
  let src = srcParam;
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    src = "https://" + src;
  }
  urlObj.searchParams.delete("url");
  const operations = operationsParser(urlObj);
  return {
    src,
    operations
  };
};
const generate = (src, operations) => {
  const url = new URL("https://wsrv.nl/");
  const srcUrl = typeof src === "string" ? src : src.toString();
  const cleanSrc = srcUrl.replace(/^https?:\/\//, "");
  url.searchParams.set("url", cleanSrc);
  const params = operationsGenerator(operations);
  const searchParams = new URLSearchParams(params);
  for (const [key, value] of searchParams) {
    if (key !== "url") {
      url.searchParams.set(key, value);
    }
  }
  return toCanonicalUrlString(url);
};
const transform = createExtractAndGenerate(extract, generate);
const transformerMap = {
  appwrite: transform$r,
  astro: transform$q,
  "builder.io": transform$p,
  bunny: transform$o,
  cloudflare: transform$n,
  cloudflare_images: transform$m,
  cloudimage: transform$l,
  cloudinary: transform$k,
  contentful: transform$j,
  contentstack: transform$i,
  directus: transform$h,
  hygraph: transform$g,
  imageengine: transform$f,
  imagekit: transform$e,
  imgix: transform$d,
  ipx: transform$c,
  keycdn: transform$b,
  "kontent.ai": transform$a,
  netlify: transform$9,
  nextjs: transform$7,
  scene7: transform$6,
  shopify: transform$5,
  storyblok: transform$4,
  supabase: transform$3,
  uploadcare: transform$2,
  vercel: transform$8,
  wordpress: transform$1,
  wsrv: transform
};
function getTransformerForCdn(cdn) {
  if (!cdn) {
    return void 0;
  }
  return transformerMap[cdn];
}
function transformProps({
  cdn,
  fallback,
  operations = {},
  options,
  ...props
}) {
  cdn ??= getProviderForUrl(props.src) || fallback;
  if (!cdn) {
    return props;
  }
  const transformer = getTransformerForCdn(cdn);
  if (!transformer) {
    return props;
  }
  return transformBaseImageProps({
    ...props,
    operations: operations?.[cdn],
    options: options?.[cdn],
    transformer
  });
}
function transformSourceProps({
  cdn,
  fallback,
  operations,
  options,
  ...props
}) {
  cdn ??= getProviderForUrl(props.src) || fallback;
  if (!cdn) {
    return props;
  }
  const transformer = getTransformerForCdn(cdn);
  if (!transformer) {
    return props;
  }
  return transformBaseSourceProps({
    ...props,
    operations: operations?.[cdn],
    options: options?.[cdn],
    transformer
  });
}
var Image$1 = reactExports.forwardRef(
  function Image2(props, ref) {
    const camelizedProps = camelizeProps(
      transformProps(props)
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { ...camelizedProps, ref });
  }
);
reactExports.forwardRef(
  function Source2(props, ref) {
    const camelizedProps = camelizeProps(
      transformSourceProps(
        props
      )
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("source", { ...camelizedProps, ref });
  }
);
function globToRegex(pattern, separator) {
  let regexStr = "^";
  const doubleStar = separator === "." ? ".+" : ".*";
  const singleStar = separator === "." ? "[^.]+" : "[^/]+";
  const parts = pattern.split("**");
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      regexStr += doubleStar;
    }
    const subParts = parts[i].split("*");
    for (let j = 0; j < subParts.length; j++) {
      if (j > 0) {
        regexStr += singleStar;
      }
      regexStr += subParts[j].replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    }
  }
  regexStr += "$";
  return new RegExp(regexStr);
}
function matchRemotePattern(pattern, url) {
  if (pattern.protocol !== void 0) {
    if (pattern.protocol.replace(/:$/, "") !== url.protocol.replace(/:$/, "")) {
      return false;
    }
  }
  if (pattern.port !== void 0) {
    if (pattern.port !== url.port) {
      return false;
    }
  }
  if (!globToRegex(pattern.hostname, ".").test(url.hostname)) {
    return false;
  }
  if (pattern.search !== void 0) {
    if (pattern.search !== url.search) {
      return false;
    }
  }
  const pathnamePattern = pattern.pathname ?? "**";
  if (!globToRegex(pathnamePattern, "/").test(url.pathname)) {
    return false;
  }
  return true;
}
function hasRemoteMatch(domains2, remotePatterns, url) {
  return domains2.some((domain) => url.hostname === domain) || remotePatterns.some((p) => matchRemotePattern(p, url));
}
const __imageRemotePatterns = (() => {
  try {
    return JSON.parse("[]");
  } catch {
    return [];
  }
})();
const __imageDomains = (() => {
  try {
    return JSON.parse("[]");
  } catch {
    return [];
  }
})();
const __hasImageConfig = __imageRemotePatterns.length > 0 || __imageDomains.length > 0;
const __imageDeviceSizes = (() => {
  try {
    return JSON.parse("[640,750,828,1080,1200,1920,2048,3840]");
  } catch {
    return [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  }
})();
function validateRemoteUrl(src) {
  if (!__hasImageConfig) {
    return { allowed: true };
  }
  let url;
  try {
    url = new URL(src, "http://n");
  } catch {
    return { allowed: false, reason: `Invalid URL: ${src}` };
  }
  if (hasRemoteMatch(__imageDomains, __imageRemotePatterns, url)) {
    return { allowed: true };
  }
  return {
    allowed: false,
    reason: `Image URL "${src}" is not configured in images.remotePatterns or images.domains in next.config.js. See: https://nextjs.org/docs/messages/next-image-unconfigured-host`
  };
}
function sanitizeBlurDataURL(url) {
  if (!url.startsWith("data:image/"))
    return void 0;
  if (/[)(}{\\'"\n\r]/.test(url))
    return void 0;
  return url;
}
function isRemoteUrl(src) {
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//");
}
const RESPONSIVE_WIDTHS = __imageDeviceSizes;
function imageOptimizationUrl(src, width, quality = 75) {
  return `/_vinext/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
function generateSrcSet(src, originalWidth, quality = 75) {
  const widths = RESPONSIVE_WIDTHS.filter((w) => w <= originalWidth * 2);
  if (widths.length === 0)
    return `${imageOptimizationUrl(src, originalWidth, quality)} ${originalWidth}w`;
  return widths.map((w) => `${imageOptimizationUrl(src, w, quality)} ${w}w`).join(", ");
}
const Image = reactExports.forwardRef(function Image22({ src: srcProp, alt, width, height, fill, priority, quality, placeholder, blurDataURL, loader, sizes, className, style, unoptimized: _unoptimized, overrideSrc: _overrideSrc, loading, ...rest }, ref) {
  const src = typeof srcProp === "string" ? srcProp : srcProp.src;
  const imgWidth = width ?? (typeof srcProp === "object" ? srcProp.width : void 0);
  const imgHeight = height ?? (typeof srcProp === "object" ? srcProp.height : void 0);
  const imgBlurDataURL = blurDataURL ?? (typeof srcProp === "object" ? srcProp.blurDataURL : void 0);
  if (loader) {
    const resolvedSrc = loader({ src, width: imgWidth ?? 0, quality: quality ?? 75 });
    return jsxRuntimeExports.jsx("img", { ref, src: resolvedSrc, alt, width: fill ? void 0 : imgWidth, height: fill ? void 0 : imgHeight, loading: priority ? "eager" : loading ?? "lazy", decoding: "async", sizes, className, style: fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style, ...rest });
  }
  if (isRemoteUrl(src)) {
    const validation = validateRemoteUrl(src);
    if (!validation.allowed) {
      {
        console.error(`[next/image] ${validation.reason}`);
        return null;
      }
    }
    const sanitizedBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
    const bg = placeholder === "blur" && sanitizedBlur ? `url(${sanitizedBlur})` : void 0;
    if (fill) {
      return jsxRuntimeExports.jsx(Image$1, { src, alt, layout: "fullWidth", priority, sizes, className, background: bg });
    }
    if (imgWidth && imgHeight) {
      return jsxRuntimeExports.jsx(Image$1, { src, alt, width: imgWidth, height: imgHeight, layout: "constrained", priority, sizes, className, background: bg });
    }
  }
  const imgQuality = quality ?? 75;
  const skipOptimization = _unoptimized === true;
  const srcSet = imgWidth && !fill && !skipOptimization ? generateSrcSet(src, imgWidth, imgQuality) : imgWidth && !fill ? RESPONSIVE_WIDTHS.filter((w) => w <= imgWidth * 2).map((w) => `${src} ${w}w`).join(", ") || `${src} ${imgWidth}w` : void 0;
  const optimizedSrc = skipOptimization ? src : imgWidth ? imageOptimizationUrl(src, imgWidth, imgQuality) : imageOptimizationUrl(src, RESPONSIVE_WIDTHS[0], imgQuality);
  const sanitizedLocalBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
  const blurStyle = placeholder === "blur" && sanitizedLocalBlur ? {
    backgroundImage: `url(${sanitizedLocalBlur})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  } : void 0;
  return jsxRuntimeExports.jsx("img", { ref, src: optimizedSrc, alt, width: fill ? void 0 : imgWidth, height: fill ? void 0 : imgHeight, loading: priority ? "eager" : loading ?? "lazy", fetchPriority: priority ? "high" : void 0, decoding: "async", srcSet, sizes: sizes ?? (fill ? "100vw" : void 0), className, "data-nimg": fill ? "fill" : "1", style: fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...blurStyle, ...style } : { ...blurStyle, ...style }, ...rest });
});
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$r = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$r);
const __iconNode$q = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$q);
const __iconNode$p = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$p);
const __iconNode$o = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$o);
const __iconNode$n = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$n);
const __iconNode$m = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$m);
const __iconNode$l = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$l);
const __iconNode$k = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$k);
const __iconNode$j = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$j);
const __iconNode$i = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$i);
const __iconNode$h = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$h);
const __iconNode$g = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$g);
const __iconNode$f = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$f);
const __iconNode$e = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$e);
const __iconNode$d = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$d);
const __iconNode$c = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$c);
const __iconNode$b = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode$8);
const __iconNode$7 = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$5);
const __iconNode$4 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot$1 = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$1(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$1(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node2 = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) reactDomExports.flushSync(() => target.dispatchEvent(event));
}
function createContext2(rootComponentName, defaultContext) {
  const Context = reactExports.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = reactExports.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = reactExports.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
var useLayoutEffect2 = globalThis?.document ? reactExports.useLayoutEffect : () => {
};
var useInsertionEffect = React$1[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = reactExports.useRef(prop !== void 0);
    reactExports.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = reactExports.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = reactExports.useState(defaultProp);
  const prevValueRef = reactExports.useRef(value);
  const onChangeRef = reactExports.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  reactExports.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var useReactId = React$1[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
  const [id, setId] = reactExports.useState(useReactId());
  useLayoutEffect2(() => {
    setId((reactId) => reactId ?? String(count$1++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
function useCallbackRef$1(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = reactExports.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = reactExports.useContext(DismissableLayerContext);
    const [node, setNode] = reactExports.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = reactExports.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    reactExports.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    reactExports.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    reactExports.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = reactExports.forwardRef((props, forwardedRef) => {
  const context = reactExports.useContext(DismissableLayerContext);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
  const isPointerInsideReactTreeRef = reactExports.useRef(false);
  const handleClickRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef$1(onFocusOutside);
  const isFocusInsideReactTreeRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = reactExports.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = reactExports.useState(null);
  const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
  const lastFocusedElementRef = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = reactExports.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  reactExports.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  reactExports.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var PORTAL_NAME$1 = "Portal";
var Portal$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = reactExports.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal$1.displayName = PORTAL_NAME$1;
var count = 0;
function useFocusGuards() {
  reactExports.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = reactExports.useState(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return reactExports.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll = reactExports.forwardRef(function(props, parentRef) {
  var ref = reactExports.useRef(null);
  var _a = reactExports.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    enabled && reactExports.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : reactExports.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    reactExports.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles = _a.styles, dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  reactExports.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = reactExports.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return reactExports.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = reactExports.useRef([]);
  var touchStartRef = reactExports.useRef([0, 0]);
  var activeAxis = reactExports.useRef();
  var id = reactExports.useState(idCounter++)[0];
  var Style2 = reactExports.useState(styleSingleton)[0];
  var lastProps = reactExports.useRef(props);
  reactExports.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  reactExports.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var selection = window.getSelection();
    var anchorNode = selection && selection.anchorNode;
    var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
    if (isTouchingSelection) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY);
  }, []);
  var shouldPrevent = reactExports.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = reactExports.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  reactExports.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    inert ? reactExports.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? reactExports.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
  return reactExports.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Trigger = DialogTrigger$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
const concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
const createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
const createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
const CLASS_PART_SEPARATOR = "-";
const EMPTY_CONFLICTS = [];
const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
const createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
const processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
const getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const EMPTY_MODIFIERS = [];
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
const createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
const twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber$1 = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber$1(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber$1);
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelWeight = (label) => label === "number" || label === "weight";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber$1, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber$1, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber$1, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber$1, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber$1, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber$1],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber$1, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber$1, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber$1, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber$1, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber$1, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber$1, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber$1, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber$1]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber$1]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber$1, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber$1, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber$1, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot$1 : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function CheckoutButton({ className = "", text = "Checkout", onClick, href, icon }) {
  const defaultClasses = "rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 font-semibold";
  let IconComponent = Lock;
  if (icon === "bag") IconComponent = ShoppingBag;
  else if (icon === "arrow") IconComponent = ArrowRight;
  else if (!icon && text.toLowerCase().includes("order")) IconComponent = ShoppingBag;
  else if (!icon && text.toLowerCase().includes("shopping")) IconComponent = ArrowRight;
  if (href) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: `${defaultClasses} ${className}`, onClick, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-4 h-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      className: `${defaultClasses} ${className}`,
      onClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
      ]
    }
  );
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState2 = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState: getState2, getInitialState, subscribe };
  const initialState = state = createState(setState, getState2, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse2 = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse2);
      }
      return parse2(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, void 0)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;
const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const id = `${item.productId}-${item.color}-${item.size}`;
        const existingItem = state.items.find((i) => i.id === id);
        if (existingItem) {
          return {
            items: state.items.map(
              (i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return {
          items: [...state.items, { ...item, id, quantity: 1 }]
        };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((i) => {
          if (i.id === id) {
            const newQuantity = Math.max(1, i.quantity + delta);
            return { ...i, quantity: newQuantity };
          }
          return i;
        })
      })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: "shoe-shop-cart"
    }
  )
);
function CartPage() {
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  reactExports.useEffect(() => {
    setIsMounted(true);
  }, []);
  const subtotal = getCartTotal();
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl text-black mb-12 tracking-tight", children: "Shopping Bag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-16 lg:gap-24 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-[60%] flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-center", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Total" })
          ] }),
          items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center text-zinc-500 font-sans border-b border-zinc-100", children: "Your shopping bag is empty." }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row md:grid md:grid-cols-12 gap-4 md:gap-6 items-start md:items-center py-6 border-b border-zinc-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-6 flex w-full gap-4 md:gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 md:w-32 aspect-[4/5] bg-zinc-50 overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Image,
                {
                  src: item.image,
                  alt: item.name,
                  fill: true,
                  className: "object-cover object-center"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/products/${item.productId}`, className: "font-serif text-lg md:text-xl text-black leading-tight hover:opacity-70 transition-opacity pr-4", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(item.id), className: "md:hidden text-zinc-400 hover:text-red-500 transition-colors pt-1", "aria-label": "Remove item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs md:text-sm text-zinc-500", children: [
                    item.color,
                    " / ",
                    item.size
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "md:hidden font-medium text-sm text-black", children: [
                    "NPR ",
                    item.price.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden md:block font-medium text-black mb-4", children: [
                  "NPR ",
                  item.price.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:hidden items-center border border-zinc-200 w-fit mt-auto cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => updateQuantity(item.id, -1),
                      className: "w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors",
                      "aria-label": "Decrease quantity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-xs font-medium text-black", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => updateQuantity(item.id, 1),
                      className: "w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors",
                      "aria-label": "Increase quantity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 hidden md:flex w-full justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-zinc-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => updateQuantity(item.id, -1),
                  className: "w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors",
                  "aria-label": "Decrease quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-medium text-black", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => updateQuantity(item.id, 1),
                  className: "w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors",
                  "aria-label": "Increase quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 hidden md:flex w-full justify-end items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-lg text-black", children: [
                "NPR ",
                (item.price * item.quantity).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(item.id), className: "text-zinc-400 hover:text-red-500 transition-colors", "aria-label": "Remove item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5" }) })
            ] }) })
          ] }, item.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-[40%] flex flex-col pt-8 lg:pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-32 bg-zinc-50 p-8 rounded-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-8 border-b border-zinc-200 pb-4", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 font-sans text-sm text-zinc-600 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black font-medium text-base", children: [
                "NPR ",
                subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping Estimate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-500 italic", children: "Calculated at checkout" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[1px] bg-zinc-200 my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-black font-medium", children: "Estimated Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-2xl text-black font-medium tracking-tight", children: [
                "NPR ",
                subtotal.toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckoutButton,
            {
              className: "w-full py-7 text-base shadow-lg shadow-black/10",
              href: items.length > 0 ? "/checkout" : "#",
              text: "Checkout"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-left lg:text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/collections", className: "text-sm text-zinc-500 hover:text-black transition-colors underline underline-offset-4", children: "Continue Shopping" }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row justify-between items-start mb-12 gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md", children: "Customers also bought" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square overflow-hidden bg-white border border-zinc-200 mb-4 mix-blend-multiply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
              alt: "Premium Wax Polish",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg mb-1 mt-2 text-black leading-tight", children: "Premium Wax Polish" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs", children: "Neutral Color" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start sm:items-end mt-2 sm:mt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm text-black mb-1", children: "NPR 18.00" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[10px] font-semibold tracking-widest uppercase border-b border-black text-black hover:text-zinc-500 hover:border-zinc-500 transition-colors pb-0.5", children: "Add to Cart" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square overflow-hidden bg-white border border-zinc-200 mb-4 mix-blend-multiply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1563725585-61ec1f8e1fb4?q=80&w=800&auto=format&fit=crop",
              alt: "Horsehair Brush",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg mb-1 mt-2 text-black leading-tight", children: "Horsehair Brush" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs", children: "Soft Bristle" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start sm:items-end mt-2 sm:mt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm text-black mb-1", children: "NPR 24.00" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[10px] font-semibold tracking-widest uppercase border-b border-black text-black hover:text-zinc-500 hover:border-zinc-500 transition-colors pb-0.5", children: "Add to Cart" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
var module$1 = {};
(function main(global, module, isWorker, workerSize) {
  var canUseWorker = !!(global.Worker && global.Blob && global.Promise && global.OffscreenCanvas && global.OffscreenCanvasRenderingContext2D && global.HTMLCanvasElement && global.HTMLCanvasElement.prototype.transferControlToOffscreen && global.URL && global.URL.createObjectURL);
  var canUsePaths = typeof Path2D === "function" && typeof DOMMatrix === "function";
  var canDrawBitmap = (function() {
    if (!global.OffscreenCanvas) {
      return false;
    }
    try {
      var canvas = new OffscreenCanvas(1, 1);
      var ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, 1, 1);
      var bitmap = canvas.transferToImageBitmap();
      ctx.createPattern(bitmap, "no-repeat");
    } catch (e) {
      return false;
    }
    return true;
  })();
  function noop() {
  }
  function promise(func) {
    var ModulePromise = module.exports.Promise;
    var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;
    if (typeof Prom === "function") {
      return new Prom(func);
    }
    func(noop, noop);
    return null;
  }
  var bitmapMapper = /* @__PURE__ */ (function(skipTransform, map) {
    return {
      transform: function(bitmap) {
        if (skipTransform) {
          return bitmap;
        }
        if (map.has(bitmap)) {
          return map.get(bitmap);
        }
        var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(bitmap, 0, 0);
        map.set(bitmap, canvas);
        return canvas;
      },
      clear: function() {
        map.clear();
      }
    };
  })(canDrawBitmap, /* @__PURE__ */ new Map());
  var raf = (function() {
    var TIME = Math.floor(1e3 / 60);
    var frame, cancel;
    var frames = {};
    var lastFrameTime = 0;
    if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
      frame = function(cb) {
        var id = Math.random();
        frames[id] = requestAnimationFrame(function onFrame(time) {
          if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
            lastFrameTime = time;
            delete frames[id];
            cb();
          } else {
            frames[id] = requestAnimationFrame(onFrame);
          }
        });
        return id;
      };
      cancel = function(id) {
        if (frames[id]) {
          cancelAnimationFrame(frames[id]);
        }
      };
    } else {
      frame = function(cb) {
        return setTimeout(cb, TIME);
      };
      cancel = function(timer) {
        return clearTimeout(timer);
      };
    }
    return { frame, cancel };
  })();
  var getWorker = /* @__PURE__ */ (function() {
    var worker;
    var prom;
    var resolves = {};
    function decorate(worker2) {
      function execute(options, callback) {
        worker2.postMessage({ options: options || {}, callback });
      }
      worker2.init = function initWorker(canvas) {
        var offscreen = canvas.transferControlToOffscreen();
        worker2.postMessage({ canvas: offscreen }, [offscreen]);
      };
      worker2.fire = function fireWorker(options, size, done) {
        if (prom) {
          execute(options, null);
          return prom;
        }
        var id = Math.random().toString(36).slice(2);
        prom = promise(function(resolve) {
          function workerDone(msg) {
            if (msg.data.callback !== id) {
              return;
            }
            delete resolves[id];
            worker2.removeEventListener("message", workerDone);
            prom = null;
            bitmapMapper.clear();
            done();
            resolve();
          }
          worker2.addEventListener("message", workerDone);
          execute(options, id);
          resolves[id] = workerDone.bind(null, { data: { callback: id } });
        });
        return prom;
      };
      worker2.reset = function resetWorker() {
        worker2.postMessage({ reset: true });
        for (var id in resolves) {
          resolves[id]();
          delete resolves[id];
        }
      };
    }
    return function() {
      if (worker) {
        return worker;
      }
      if (!isWorker && canUseWorker) {
        var code = [
          "var CONFETTI, SIZE = {}, module = {};",
          "(" + main.toString() + ")(this, module, true, SIZE);",
          "onmessage = function(msg) {",
          "  if (msg.data.options) {",
          "    CONFETTI(msg.data.options).then(function () {",
          "      if (msg.data.callback) {",
          "        postMessage({ callback: msg.data.callback });",
          "      }",
          "    });",
          "  } else if (msg.data.reset) {",
          "    CONFETTI && CONFETTI.reset();",
          "  } else if (msg.data.resize) {",
          "    SIZE.width = msg.data.resize.width;",
          "    SIZE.height = msg.data.resize.height;",
          "  } else if (msg.data.canvas) {",
          "    SIZE.width = msg.data.canvas.width;",
          "    SIZE.height = msg.data.canvas.height;",
          "    CONFETTI = module.exports.create(msg.data.canvas);",
          "  }",
          "}"
        ].join("\n");
        try {
          worker = new Worker(URL.createObjectURL(new Blob([code])));
        } catch (e) {
          typeof console !== "undefined" && typeof console.warn === "function" ? console.warn("🎊 Could not load worker", e) : null;
          return null;
        }
        decorate(worker);
      }
      return worker;
    };
  })();
  var defaults = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    x: 0.5,
    y: 0.5,
    shapes: ["square", "circle"],
    zIndex: 100,
    colors: [
      "#26ccff",
      "#a25afd",
      "#ff5e7e",
      "#88ff5a",
      "#fcff42",
      "#ffa62d",
      "#ff36ff"
    ],
    // probably should be true, but back-compat
    disableForReducedMotion: false,
    scalar: 1
  };
  function convert(val, transform2) {
    return transform2 ? transform2(val) : val;
  }
  function isOk(val) {
    return !(val === null || val === void 0);
  }
  function prop(options, name, transform2) {
    return convert(
      options && isOk(options[name]) ? options[name] : defaults[name],
      transform2
    );
  }
  function onlyPositiveInt(number) {
    return number < 0 ? 0 : Math.floor(number);
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function toDecimal(str) {
    return parseInt(str, 16);
  }
  function colorsToRgb(colors) {
    return colors.map(hexToRgb);
  }
  function hexToRgb(str) {
    var val = String(str).replace(/[^0-9a-f]/gi, "");
    if (val.length < 6) {
      val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
    }
    return {
      r: toDecimal(val.substring(0, 2)),
      g: toDecimal(val.substring(2, 4)),
      b: toDecimal(val.substring(4, 6))
    };
  }
  function getOrigin(options) {
    var origin = prop(options, "origin", Object);
    origin.x = prop(origin, "x", Number);
    origin.y = prop(origin, "y", Number);
    return origin;
  }
  function setCanvasWindowSize(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  }
  function setCanvasRectSize(canvas) {
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  function getCanvas(zIndex) {
    var canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = zIndex;
    return canvas;
  }
  function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(radiusX, radiusY);
    context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
    context.restore();
  }
  function randomPhysics(opts) {
    var radAngle = opts.angle * (Math.PI / 180);
    var radSpread = opts.spread * (Math.PI / 180);
    return {
      x: opts.x,
      y: opts.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
      angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: opts.color,
      shape: opts.shape,
      tick: 0,
      totalTicks: opts.ticks,
      decay: opts.decay,
      drift: opts.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: opts.gravity * 3,
      ovalScalar: 0.6,
      scalar: opts.scalar,
      flat: opts.flat
    };
  }
  function updateFetti(context, fetti) {
    fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
    fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
    fetti.velocity *= fetti.decay;
    if (fetti.flat) {
      fetti.wobble = 0;
      fetti.wobbleX = fetti.x + 10 * fetti.scalar;
      fetti.wobbleY = fetti.y + 10 * fetti.scalar;
      fetti.tiltSin = 0;
      fetti.tiltCos = 0;
      fetti.random = 1;
    } else {
      fetti.wobble += fetti.wobbleSpeed;
      fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
      fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
      fetti.tiltAngle += 0.1;
      fetti.tiltSin = Math.sin(fetti.tiltAngle);
      fetti.tiltCos = Math.cos(fetti.tiltAngle);
      fetti.random = Math.random() + 2;
    }
    var progress = fetti.tick++ / fetti.totalTicks;
    var x1 = fetti.x + fetti.random * fetti.tiltCos;
    var y1 = fetti.y + fetti.random * fetti.tiltSin;
    var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
    var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
    context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
    context.beginPath();
    if (canUsePaths && fetti.shape.type === "path" && typeof fetti.shape.path === "string" && Array.isArray(fetti.shape.matrix)) {
      context.fill(transformPath2D(
        fetti.shape.path,
        fetti.shape.matrix,
        fetti.x,
        fetti.y,
        Math.abs(x2 - x1) * 0.1,
        Math.abs(y2 - y1) * 0.1,
        Math.PI / 10 * fetti.wobble
      ));
    } else if (fetti.shape.type === "bitmap") {
      var rotation = Math.PI / 10 * fetti.wobble;
      var scaleX = Math.abs(x2 - x1) * 0.1;
      var scaleY = Math.abs(y2 - y1) * 0.1;
      var width = fetti.shape.bitmap.width * fetti.scalar;
      var height = fetti.shape.bitmap.height * fetti.scalar;
      var matrix = new DOMMatrix([
        Math.cos(rotation) * scaleX,
        Math.sin(rotation) * scaleX,
        -Math.sin(rotation) * scaleY,
        Math.cos(rotation) * scaleY,
        fetti.x,
        fetti.y
      ]);
      matrix.multiplySelf(new DOMMatrix(fetti.shape.matrix));
      var pattern = context.createPattern(bitmapMapper.transform(fetti.shape.bitmap), "no-repeat");
      pattern.setTransform(matrix);
      context.globalAlpha = 1 - progress;
      context.fillStyle = pattern;
      context.fillRect(
        fetti.x - width / 2,
        fetti.y - height / 2,
        width,
        height
      );
      context.globalAlpha = 1;
    } else if (fetti.shape === "circle") {
      context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
    } else if (fetti.shape === "star") {
      var rot = Math.PI / 2 * 3;
      var innerRadius = 4 * fetti.scalar;
      var outerRadius = 8 * fetti.scalar;
      var x = fetti.x;
      var y = fetti.y;
      var spikes = 5;
      var step = Math.PI / spikes;
      while (spikes--) {
        x = fetti.x + Math.cos(rot) * outerRadius;
        y = fetti.y + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;
        x = fetti.x + Math.cos(rot) * innerRadius;
        y = fetti.y + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
    } else {
      context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
      context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
      context.lineTo(Math.floor(x2), Math.floor(y2));
      context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
    }
    context.closePath();
    context.fill();
    return fetti.tick < fetti.totalTicks;
  }
  function animate(canvas, fettis, resizer, size, done) {
    var animatingFettis = fettis.slice();
    var context = canvas.getContext("2d");
    var animationFrame;
    var destroy;
    var prom = promise(function(resolve) {
      function onDone() {
        animationFrame = destroy = null;
        context.clearRect(0, 0, size.width, size.height);
        bitmapMapper.clear();
        done();
        resolve();
      }
      function update() {
        if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
          size.width = canvas.width = workerSize.width;
          size.height = canvas.height = workerSize.height;
        }
        if (!size.width && !size.height) {
          resizer(canvas);
          size.width = canvas.width;
          size.height = canvas.height;
        }
        context.clearRect(0, 0, size.width, size.height);
        animatingFettis = animatingFettis.filter(function(fetti) {
          return updateFetti(context, fetti);
        });
        if (animatingFettis.length) {
          animationFrame = raf.frame(update);
        } else {
          onDone();
        }
      }
      animationFrame = raf.frame(update);
      destroy = onDone;
    });
    return {
      addFettis: function(fettis2) {
        animatingFettis = animatingFettis.concat(fettis2);
        return prom;
      },
      canvas,
      promise: prom,
      reset: function() {
        if (animationFrame) {
          raf.cancel(animationFrame);
        }
        if (destroy) {
          destroy();
        }
      }
    };
  }
  function confettiCannon(canvas, globalOpts) {
    var isLibCanvas = !canvas;
    var allowResize = !!prop(globalOpts || {}, "resize");
    var hasResizeEventRegistered = false;
    var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
    var shouldUseWorker = canUseWorker && !!prop(globalOpts || {}, "useWorker");
    var worker = shouldUseWorker ? getWorker() : null;
    var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
    var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
    var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
    var animationObj;
    function fireLocal(options, size, done) {
      var particleCount = prop(options, "particleCount", onlyPositiveInt);
      var angle = prop(options, "angle", Number);
      var spread = prop(options, "spread", Number);
      var startVelocity = prop(options, "startVelocity", Number);
      var decay = prop(options, "decay", Number);
      var gravity = prop(options, "gravity", Number);
      var drift = prop(options, "drift", Number);
      var colors = prop(options, "colors", colorsToRgb);
      var ticks = prop(options, "ticks", Number);
      var shapes = prop(options, "shapes");
      var scalar = prop(options, "scalar");
      var flat = !!prop(options, "flat");
      var origin = getOrigin(options);
      var temp = particleCount;
      var fettis = [];
      var startX = canvas.width * origin.x;
      var startY = canvas.height * origin.y;
      while (temp--) {
        fettis.push(
          randomPhysics({
            x: startX,
            y: startY,
            angle,
            spread,
            startVelocity,
            color: colors[temp % colors.length],
            shape: shapes[randomInt(0, shapes.length)],
            ticks,
            decay,
            gravity,
            drift,
            scalar,
            flat
          })
        );
      }
      if (animationObj) {
        return animationObj.addFettis(fettis);
      }
      animationObj = animate(canvas, fettis, resizer, size, done);
      return animationObj.promise;
    }
    function fire(options) {
      var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
      var zIndex = prop(options, "zIndex", Number);
      if (disableForReducedMotion && preferLessMotion) {
        return promise(function(resolve) {
          resolve();
        });
      }
      if (isLibCanvas && animationObj) {
        canvas = animationObj.canvas;
      } else if (isLibCanvas && !canvas) {
        canvas = getCanvas(zIndex);
        document.body.appendChild(canvas);
      }
      if (allowResize && !initialized) {
        resizer(canvas);
      }
      var size = {
        width: canvas.width,
        height: canvas.height
      };
      if (worker && !initialized) {
        worker.init(canvas);
      }
      initialized = true;
      if (worker) {
        canvas.__confetti_initialized = true;
      }
      function onResize() {
        if (worker) {
          var obj = {
            getBoundingClientRect: function() {
              if (!isLibCanvas) {
                return canvas.getBoundingClientRect();
              }
            }
          };
          resizer(obj);
          worker.postMessage({
            resize: {
              width: obj.width,
              height: obj.height
            }
          });
          return;
        }
        size.width = size.height = null;
      }
      function done() {
        animationObj = null;
        if (allowResize) {
          hasResizeEventRegistered = false;
          global.removeEventListener("resize", onResize);
        }
        if (isLibCanvas && canvas) {
          if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
          }
          canvas = null;
          initialized = false;
        }
      }
      if (allowResize && !hasResizeEventRegistered) {
        hasResizeEventRegistered = true;
        global.addEventListener("resize", onResize, false);
      }
      if (worker) {
        return worker.fire(options, size, done);
      }
      return fireLocal(options, size, done);
    }
    fire.reset = function() {
      if (worker) {
        worker.reset();
      }
      if (animationObj) {
        animationObj.reset();
      }
    };
    return fire;
  }
  var defaultFire;
  function getDefaultFire() {
    if (!defaultFire) {
      defaultFire = confettiCannon(null, { useWorker: true, resize: true });
    }
    return defaultFire;
  }
  function transformPath2D(pathString, pathMatrix, x, y, scaleX, scaleY, rotation) {
    var path2d = new Path2D(pathString);
    var t1 = new Path2D();
    t1.addPath(path2d, new DOMMatrix(pathMatrix));
    var t2 = new Path2D();
    t2.addPath(t1, new DOMMatrix([
      Math.cos(rotation) * scaleX,
      Math.sin(rotation) * scaleX,
      -Math.sin(rotation) * scaleY,
      Math.cos(rotation) * scaleY,
      x,
      y
    ]));
    return t2;
  }
  function shapeFromPath(pathData) {
    if (!canUsePaths) {
      throw new Error("path confetti are not supported in this browser");
    }
    var path, matrix;
    if (typeof pathData === "string") {
      path = pathData;
    } else {
      path = pathData.path;
      matrix = pathData.matrix;
    }
    var path2d = new Path2D(path);
    var tempCanvas = document.createElement("canvas");
    var tempCtx = tempCanvas.getContext("2d");
    if (!matrix) {
      var maxSize = 1e3;
      var minX = maxSize;
      var minY = maxSize;
      var maxX = 0;
      var maxY = 0;
      var width, height;
      for (var x = 0; x < maxSize; x += 2) {
        for (var y = 0; y < maxSize; y += 2) {
          if (tempCtx.isPointInPath(path2d, x, y, "nonzero")) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }
      width = maxX - minX;
      height = maxY - minY;
      var maxDesiredSize = 10;
      var scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);
      matrix = [
        scale,
        0,
        0,
        scale,
        -Math.round(width / 2 + minX) * scale,
        -Math.round(height / 2 + minY) * scale
      ];
    }
    return {
      type: "path",
      path,
      matrix
    };
  }
  function shapeFromText(textData) {
    var text, scalar = 1, color = "#000000", fontFamily = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    if (typeof textData === "string") {
      text = textData;
    } else {
      text = textData.text;
      scalar = "scalar" in textData ? textData.scalar : scalar;
      fontFamily = "fontFamily" in textData ? textData.fontFamily : fontFamily;
      color = "color" in textData ? textData.color : color;
    }
    var fontSize = 10 * scalar;
    var font = "" + fontSize + "px " + fontFamily;
    var canvas = new OffscreenCanvas(fontSize, fontSize);
    var ctx = canvas.getContext("2d");
    ctx.font = font;
    var size = ctx.measureText(text);
    var width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
    var height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);
    var padding = 2;
    var x = size.actualBoundingBoxLeft + padding;
    var y = size.actualBoundingBoxAscent + padding;
    width += padding + padding;
    height += padding + padding;
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext("2d");
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    var scale = 1 / scalar;
    return {
      type: "bitmap",
      // TODO these probably need to be transfered for workers
      bitmap: canvas.transferToImageBitmap(),
      matrix: [scale, 0, 0, scale, -width * scale / 2, -height * scale / 2]
    };
  }
  module.exports = function() {
    return getDefaultFire().apply(this, arguments);
  };
  module.exports.reset = function() {
    getDefaultFire().reset();
  };
  module.exports.create = confettiCannon;
  module.exports.shapeFromPath = shapeFromPath;
  module.exports.shapeFromText = shapeFromText;
})((function() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return this || {};
})(), module$1, false);
const confetti = module$1.exports;
module$1.exports.create;
function CheckoutPage() {
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const { items: cartItems, getCartTotal, clearCart } = useCartStore();
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [firstName, setFirstName] = reactExports.useState("");
  const [lastName, setLastName] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState("");
  const [submitSuccess, setSubmitSuccess] = reactExports.useState(false);
  const [isCouponExpanded, setIsCouponExpanded] = reactExports.useState(false);
  const [trackingNumber, setTrackingNumber] = reactExports.useState("");
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = reactExports.useState(false);
  const [couponError, setCouponError] = reactExports.useState("");
  const [checkoutSession, setCheckoutSession] = reactExports.useState(null);
  const [isStartingSession, setIsStartingSession] = reactExports.useState(false);
  const [sessionError, setSessionError] = reactExports.useState("");
  const [timeLeft, setTimeLeft] = reactExports.useState(0);
  const [isExpired, setIsExpired] = reactExports.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = reactExports.useState("cod");
  const [paymentMethods, setPaymentMethods] = reactExports.useState([]);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoadingPaymentMethods(true);
      try {
        const apiUrl = "http://192.168.1.78:8000/api/v1";
        const res = await fetch(`${apiUrl}/payment-methods`);
        if (!res.ok) throw new Error("Failed to fetch payment methods");
        const { data } = await res.json();
        setPaymentMethods(data);
        if (data.length > 0) {
          const cod = data.find((m) => m.code === "cod");
          setSelectedPaymentMethod(cod ? "cod" : data[0].code);
        }
      } catch (err) {
        console.error("Payment methods fetch error:", err);
      } finally {
        setIsLoadingPaymentMethods(false);
      }
    };
    fetchPaymentMethods();
  }, []);
  reactExports.useEffect(() => {
    setIsMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (!isMounted || isSubmitting) return;
    if (cartItems.length > 0 && !checkoutSession && !sessionError && !isStartingSession) {
      startCheckoutSession();
    }
  }, [isMounted, cartItems.length, checkoutSession, sessionError, isStartingSession, isSubmitting]);
  const startCheckoutSession = async () => {
    setIsStartingSession(true);
    setSessionError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const savedSessionId = localStorage.getItem("coseli_checkout_session_id");
      const response = await fetch(`${apiUrl}/orders/checkout/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkout_session_id: savedSessionId || void 0,
          items: cartItems.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reserve inventory. One or more items might be out of stock.");
      }
      const sessionId = data.data.sessionId;
      setCheckoutSession({
        id: sessionId,
        expiresAt: data.data.expiresAt
      });
      localStorage.setItem("coseli_checkout_session_id", sessionId);
      setIsExpired(false);
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setIsStartingSession(false);
    }
  };
  reactExports.useEffect(() => {
    if (!checkoutSession?.expiresAt || isExpired) return;
    const expiresAt = new Date(checkoutSession.expiresAt).getTime();
    const initialNow = (/* @__PURE__ */ new Date()).getTime();
    const initialDistance = expiresAt - initialNow;
    if (initialDistance <= 0) {
      setIsExpired(true);
      setTimeLeft(0);
    } else {
      setTimeLeft(initialDistance);
    }
    const timer = setInterval(() => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const distance = expiresAt - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        setIsExpired(true);
        localStorage.removeItem("coseli_checkout_session_id");
      } else {
        setTimeLeft(distance);
      }
    }, 1e3);
    return () => clearInterval(timer);
  }, [checkoutSession, isExpired]);
  const formatTimeLeft = (ms) => {
    const minutes = Math.floor(ms % (1e3 * 60 * 60) / (1e3 * 60));
    const seconds = Math.floor(ms % (1e3 * 60) / 1e3);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  reactExports.useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 100);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#000000", "#ffffff", "#a1a1aa", "#3f3f46", "#27272a"]
      });
    }
  }, [submitSuccess]);
  const subtotal = getCartTotal();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = 15;
  const discount = appliedCoupon ? appliedCoupon.discount_amount : 0;
  const total = subtotal + shipping - discount;
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsValidatingCoupon(true);
    setCouponError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          items: cartItems.map((item) => ({
            product_id: Number(item.productId),
            price: item.price,
            quantity: item.quantity
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid coupon code.");
      }
      setAppliedCoupon(data.data);
      setCouponError("");
    } catch (error) {
      setAppliedCoupon(null);
      setCouponError(error.message);
    } finally {
      setIsValidatingCoupon(false);
    }
  };
  if (!isMounted) {
    return null;
  }
  const handlePlaceOrder = async () => {
    if (isExpired) {
      setSubmitError("Your checkout session has expired. Please refresh the page to re-reserve inventory.");
      return;
    }
    if (!checkoutSession?.id) {
      setSubmitError("Checkout session not initialized. Please refresh the page.");
      return;
    }
    const hasStaleItems = cartItems.some((item) => !item.variantId);
    if (hasStaleItems) {
      setSubmitError("Your cart contains outdated items. Please clear your cart and add the items again.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_info: {
            contact_no: phone,
            email: email || void 0
          },
          shipping_address: {
            first_name: firstName,
            last_name: lastName,
            city,
            address
          },
          items: cartItems.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity
          })),
          coupon_code: appliedCoupon?.code || void 0,
          checkout_session_id: checkoutSession.id,
          payment_method: selectedPaymentMethod
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to place order.");
      }
      const responseData = await response.json();
      setTrackingNumber(responseData?.data?.tracking_number || "");
      setSubmitSuccess(true);
      clearCart();
      localStorage.removeItem("coseli_checkout_session_id");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl text-black mb-6", children: "Order Placed" }),
      trackingNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 border border-zinc-200 bg-zinc-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 uppercase tracking-widest block mb-1", children: "Your Tracking Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-medium tracking-wider text-black", children: trackingNumber })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 font-sans mb-12", children: "Thank you! Your order has been successfully placed. We will contact you shortly to coordinate delivery." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { href: "/collections", text: "Continue Shopping", className: "w-full py-6 text-base" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32 selection:bg-zinc-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 md:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-sm text-zinc-500 font-sans tracking-wide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/cart", className: "hover:text-black transition-colors", children: "CART" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black uppercase", children: "INFORMATION & SECURE CHECKOUT" })
    ] }),
    !isStartingSession && !sessionError && !submitSuccess && checkoutSession && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-8 p-4 border flex items-center justify-between transition-colors ${isExpired ? "bg-red-50 border-red-200" : timeLeft < 6e4 ? "bg-amber-50 border-amber-200" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${isExpired ? "bg-red-500 animate-pulse" : "bg-green-500"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium tracking-widest uppercase ${isExpired ? "text-red-600" : "text-zinc-600"}`, children: isExpired ? "Inventory Released" : "Inventory Reserved" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-400 font-sans uppercase tracking-[0.2em]", children: "Expires In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-sm font-medium ${isExpired ? "text-red-600" : timeLeft < 6e4 ? "text-amber-600" : "text-black"}`, children: formatTimeLeft(timeLeft) })
      ] })
    ] }),
    (sessionError || timeLeft === 0 && isExpired && !submitSuccess && checkoutSession) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 p-6 border border-red-200 bg-red-50/50 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl text-red-600 mb-2", children: sessionError ? "Inventory Reservation Failed" : "Checkout Session Expired" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500/80 mb-6 max-w-sm", children: sessionError || "We've released your items so others can purchase them. Please refresh to re-reserve and continue." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => window.location.reload(),
          className: "bg-black text-white hover:bg-zinc-800 rounded-none uppercase text-xs tracking-widest px-8",
          children: "Refresh Checkout"
        }
      )
    ] }),
    isStartingSession && !submitSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 py-12 flex flex-col items-center animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 uppercase tracking-widest", children: "Reserving Inventory..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 relative ${isStartingSession || sessionError || isExpired && !submitSuccess ? "opacity-30 pointer-events-none grayscale" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-[55%] flex flex-col gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl text-black mb-6", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  placeholder: "Email (Optional)",
                  className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                  value: email,
                  onChange: (e) => setEmail(e.target.value)
                }
              ),
              email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300 text-black", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "newsletter", defaultChecked: false, className: "w-4 h-4 rounded border-zinc-300 text-black focus:ring-black accent-black" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "newsletter", className: "text-sm cursor-pointer select-none", children: "Email me with news and offers" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2 block", children: [
                "Phone Number ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-4 border border-r-0 border-zinc-300 bg-zinc-50 text-sm font-medium text-zinc-600 transition-colors group-focus-within:border-black", children: "+977" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Mobile Number",
                    className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                    required: true,
                    value: phone,
                    onChange: (e) => setPhone(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 mt-2", children: "Required for delivery coordination. Currently supporting Nepal region only." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl text-black mb-6", children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "First Name *",
                className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                required: true,
                value: firstName,
                onChange: (e) => setFirstName(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Last Name *",
                className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                required: true,
                value: lastName,
                onChange: (e) => setLastName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "City *",
                className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                required: true,
                value: city,
                onChange: (e) => setCity(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Apartment, House No, Street name, etc. *",
                className: "w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400",
                required: true,
                value: address,
                onChange: (e) => setAddress(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl text-black mb-6", children: "Payment Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: isLoadingPaymentMethods ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-zinc-50 border border-zinc-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-zinc-50 border border-zinc-200" })
          ] }) : paymentMethods.length > 0 ? paymentMethods.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setSelectedPaymentMethod(method.code),
              className: `group relative border px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${selectedPaymentMethod === method.code ? "border-black bg-white ring-1 ring-black shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]" : "border-zinc-200 bg-white hover:border-zinc-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${selectedPaymentMethod === method.code ? "border-black" : "border-zinc-300 group-hover:border-zinc-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2.5 h-2.5 rounded-full bg-black transition-all duration-300 transform ${selectedPaymentMethod === method.code ? "scale-100 opacity-100" : "scale-0 opacity-0"}` }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-tight text-black", children: method.name }),
                    method.description && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 mt-0.5 font-normal leading-relaxed", children: method.description })
                  ] })
                ] }),
                method.icon_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 p-1.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: method.icon_url, alt: method.name, className: "w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" }) })
              ]
            },
            method.id
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 italic", children: "No payment methods available right now." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 mt-2 border-t border-zinc-200", children: [
          submitError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 border border-red-500 bg-red-50 text-red-500 text-sm font-medium", children: submitError }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-500 leading-relaxed mb-8", children: [
            "By clicking on continue, you agree to place your order and accept our ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline underline-offset-2 hover:text-black transition-colors", children: "Terms and Conditions" }),
            ", as well as our ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacy", className: "underline underline-offset-2 hover:text-black transition-colors", target: "_blank", rel: "noopener noreferrer", children: "Privacy Policy" }),
            ". Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckoutButton,
            {
              className: "w-full py-7 text-base shadow-lg shadow-black/10 mt-4",
              text: isSubmitting ? "Placing Order..." : "Place Order",
              onClick: handlePlaceOrder
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "block lg:hidden bg-zinc-50 border border-zinc-200 p-4 rounded-sm mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-lg text-black mb-4 border-b border-zinc-200 pb-3", children: [
            "Order Summary (",
            totalItems,
            " ",
            totalItems === 1 ? "item" : "items",
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 mb-4", children: cartItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-12 aspect-[4/5] bg-white overflow-hidden shrink-0 border border-zinc-200 mix-blend-multiply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: item.image,
                alt: item.name,
                fill: true,
                className: "object-cover object-center group-hover:scale-105 transition-transform duration-500"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-serif text-sm text-black leading-tight", children: [
                item.name,
                " (",
                item.quantity,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-zinc-500", children: [
                item.color,
                " / ",
                item.size
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-black", children: [
              "NPR ",
              item.price.toFixed(2)
            ] })
          ] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[1px] bg-zinc-200 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 font-sans text-xs text-zinc-600 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black font-medium", children: [
                "NPR ",
                subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black font-medium", children: [
                "NPR ",
                shipping.toFixed(2)
              ] })
            ] }),
            discount > 0 && appliedCoupon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-green-600 font-medium tracking-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Discount (",
                appliedCoupon.code,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "- NPR ",
                discount.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2 pt-2 border-t border-zinc-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-black font-medium", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1.5 text-black", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-zinc-500 font-medium mb-0.5", children: "NPR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-lg font-medium tracking-tight", children: [
                  "NPR ",
                  total.toFixed(2)
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex w-full lg:w-[45%] flex-col pt-8 lg:pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-32 bg-zinc-50 p-6 md:p-8 rounded-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-xl md:text-2xl text-black mb-6 border-b border-zinc-200 pb-4", children: [
          "Order Summary (",
          totalItems,
          " ",
          totalItems === 1 ? "item" : "items",
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 mb-6", children: cartItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 aspect-[4/5] bg-white overflow-hidden shrink-0 border border-zinc-200 mix-blend-multiply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: item.image,
              alt: item.name,
              fill: true,
              className: "object-cover object-center group-hover:scale-105 transition-transform duration-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-serif text-sm md:text-base text-black leading-tight mb-0.5", children: [
              item.name,
              " (",
              item.quantity,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-500", children: [
              item.color,
              " / ",
              item.size
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-black", children: [
            "NPR ",
            item.price.toFixed(2)
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[1px] bg-zinc-200 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setIsCouponExpanded(!isCouponExpanded),
              className: "text-sm text-black hover:text-zinc-600 transition-colors underline underline-offset-4 font-medium",
              children: isCouponExpanded ? "Hide coupon form" : "Add coupon"
            }
          ),
          isCouponExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Coupon code",
                  className: "flex-1 border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400 bg-white uppercase",
                  value: couponCode,
                  onChange: (e) => setCouponCode(e.target.value.toUpperCase()),
                  disabled: isValidatingCoupon || !!appliedCoupon
                }
              ),
              appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    setAppliedCoupon(null);
                    setCouponCode("");
                  },
                  className: "rounded-none border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 px-6 text-sm tracking-wide transition-colors",
                  children: "Remove"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleApplyCoupon,
                  disabled: isValidatingCoupon || !couponCode.trim(),
                  variant: "outline",
                  className: "rounded-none border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black px-6 text-sm tracking-wide transition-colors",
                  children: isValidatingCoupon ? "..." : "Apply"
                }
              )
            ] }),
            couponError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 font-medium", children: couponError }),
            appliedCoupon && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600 font-medium italic", children: [
              "Coupon applied! You saved NPR ",
              appliedCoupon.discount_amount.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[1px] bg-zinc-200 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 font-sans text-sm text-zinc-600 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black font-medium", children: [
              "NPR ",
              subtotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black font-medium", children: [
              "NPR ",
              shipping.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-zinc-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coupon Discount" }),
            discount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-medium", children: [
              "- NPR ",
              discount.toFixed(2)
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "NPR 0.00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-3 pt-3 border-t border-zinc-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-black font-medium", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 text-black", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-medium mb-1", children: "NPR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-2xl font-medium tracking-tight", children: [
                "NPR ",
                total.toFixed(2)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-zinc-100 p-2.5 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-left md:text-center text-zinc-500 font-medium uppercase tracking-widest", children: "Pricing are inclusive of Tax" }) })
      ] }) })
    ] })
  ] }) });
}
function useProducts(options) {
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [offset, setOffset] = reactExports.useState(0);
  const LIMIT = options.limit || 20;
  const totalActiveFilters = (options.category?.length || 0) + (options.material?.length || 0) + (options.color?.length || 0) + (options.min_price !== void 0 ? 1 : 0) + (options.max_price !== void 0 ? 1 : 0);
  reactExports.useEffect(() => {
    setOffset(0);
    setHasMore(true);
  }, [
    LIMIT,
    JSON.stringify(options.category),
    JSON.stringify(options.material),
    JSON.stringify(options.color),
    options.min_price,
    options.max_price,
    options.sort
  ]);
  const isFetchingRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const fetchProducts = async () => {
      if (offset === 0) setLoading(true);
      else setLoadingMore(true);
      setError(null);
      isFetchingRef.current = true;
      try {
        const params = new URLSearchParams();
        params.append("limit", LIMIT.toString());
        params.append("offset", offset.toString());
        if (options.category && options.category.length > 0) params.append("category", options.category.join(","));
        if (options.material && options.material.length > 0) params.append("material", options.material.join(","));
        if (options.color && options.color.length > 0) params.append("color", options.color.join(","));
        if (options.min_price !== void 0) params.append("min_price", options.min_price.toString());
        if (options.max_price !== void 0) params.append("max_price", options.max_price.toString());
        if (options.sort) params.append("sort", options.sort);
        const apiUrl = "http://192.168.1.78:8000/api/v1";
        const response = await fetch(`${apiUrl}/products?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const result = await response.json();
        const newProducts = result.data || [];
        if (offset === 0) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const uniqueNew = newProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...uniqueNew];
          });
        }
        if (newProducts.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    };
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    offset,
    // Depend on offset to trigger new fetches for loadMore
    LIMIT,
    JSON.stringify(options.category),
    JSON.stringify(options.material),
    JSON.stringify(options.color),
    options.min_price,
    options.max_price,
    options.sort
  ]);
  const loadMore = reactExports.useCallback(() => {
    if (!loading && !loadingMore && hasMore && !isFetchingRef.current) {
      isFetchingRef.current = true;
      setOffset((prev) => prev + LIMIT);
    }
  }, [loading, loadingMore, hasMore, LIMIT]);
  return { products, loading, loadingMore, hasMore, error, totalActiveFilters, loadMore };
}
function useCollectionCounts() {
  const [counts, setCounts] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchCounts = async () => {
      try {
        const apiUrl = "http://192.168.1.78:8000/api/v1";
        const response = await fetch(`${apiUrl}/products/collection-counts`);
        if (!response.ok) {
          throw new Error(`Failed to fetch collection counts: ${response.statusText}`);
        }
        const result = await response.json();
        setCounts(result.data || {});
      } catch (err) {
        console.error("Error fetching collection counts:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);
  return { counts, loading, error };
}
const filterCategories = [
  { id: "collection", name: "Collection", options: ["Chukka", "Shamba", "Oxford", "Sneaker", "Loafer", "Boot"] },
  { id: "price", name: "Price", options: ["Under NPR 150", "NPR 150 - NPR 250", "Over NPR 250"] },
  { id: "color", name: "Color", options: ["Black", "Brown", "Tan", "White", "Navy", "Grey", "Olive"] },
  { id: "gender", name: "Gender", options: ["Men", "Women", "Unisex"] },
  { id: "materials", name: "Materials", options: ["Leather", "Suede", "Canvas", "Vegan Leather", "Synthetic", "Mesh"] }
];
function CollectionsPage() {
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = reactExports.useState(true);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = reactExports.useState(false);
  const [mobileFiltersDirty, setMobileFiltersDirty] = reactExports.useState(false);
  const [openFilterSections, setOpenFilterSections] = reactExports.useState([]);
  const [selectedSort, setSelectedSort] = reactExports.useState("Recommended");
  reactExports.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpenFilterSections(filterCategories.map((c) => c.id));
      } else {
        setOpenFilterSections(["collection"]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [expandedCategories, setExpandedCategories] = reactExports.useState([]);
  const [selectedFilters, setSelectedFilters] = reactExports.useState({});
  const totalActiveFilters = Object.values(selectedFilters).flat().length;
  const getHookOptions = () => {
    let min_price = void 0;
    let max_price = void 0;
    if (selectedFilters.price) {
      if (selectedFilters.price.includes("Under NPR 150")) {
        max_price = 150;
      }
      if (selectedFilters.price.includes("Over NPR 250")) {
        min_price = min_price ? Math.min(min_price, 250) : 250;
      }
      if (selectedFilters.price.includes("NPR 150 - NPR 250")) {
        min_price = 150;
        max_price = 250;
      }
    }
    let sortParam = void 0;
    if (selectedSort === "Price: Low to High") sortParam = "price_asc";
    else if (selectedSort === "Price: High to Low") sortParam = "price_desc";
    else if (selectedSort === "Newest") sortParam = "newest";
    else if (selectedSort === "Recommended") sortParam = "recommended";
    else if (selectedSort === "Trending") sortParam = "trending";
    else if (selectedSort === "Popular") sortParam = "popular";
    return {
      category: selectedFilters.collection,
      material: selectedFilters.materials,
      color: selectedFilters.color,
      min_price,
      max_price,
      sort: sortParam
    };
  };
  const { products, loading, loadingMore, error, loadMore } = useProducts(getHookOptions());
  const { counts: collectionCounts } = useCollectionCounts();
  const dynamicFilterCategories = filterCategories.map((cat) => {
    if (cat.id === "collection" && Object.keys(collectionCounts).length > 0) {
      return { ...cat, options: Object.keys(collectionCounts) };
    }
    return cat;
  });
  reactExports.useEffect(() => {
    const handleScroll2 = () => {
      const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 1500) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll2, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll2);
  }, [loadMore]);
  const toggleFilterAccordion = (categoryId) => {
    setOpenFilterSections(
      (prev) => prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };
  const toggleShowMore = (categoryId) => {
    setExpandedCategories(
      (prev) => prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };
  const toggleFilterOption = (categoryId, option) => {
    setMobileFiltersDirty(true);
    setSelectedFilters((prev) => {
      const currentSelected = prev[categoryId] || [];
      const isSelected = currentSelected.includes(option);
      return {
        ...prev,
        [categoryId]: isSelected ? currentSelected.filter((item) => item !== option) : [...currentSelected, option]
      };
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-32 pb-24 px-4 md:px-12 max-w-[1800px] mx-auto min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center md:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight mb-4", children: "All Collections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 max-w-xl text-sm md:text-base leading-relaxed hidden md:block", children: "Discover our handcrafted range of luxury minimal footwear, designed for the purest comfort and timeless aesthetics." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between items-center py-6 border-b border-t border-zinc-200 mb-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsFilterSidebarVisible(!isFilterSidebarVisible),
          className: "hidden lg:flex items-center gap-2 group hover:text-black text-zinc-600 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium tracking-wide uppercase", children: isFilterSidebarVisible ? "Hide Filters" : "Show Filters" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setMobileFiltersDirty(false);
            setIsMobileFilterVisible(true);
          },
          className: "flex lg:hidden items-center gap-2 group hover:text-black text-zinc-600 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium tracking-wide uppercase", children: [
              "Filters ",
              totalActiveFilters > 0 && `(${totalActiveFilters})`
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-4 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-zinc-500 hidden sm:block", children: [
          loading ? "..." : products.length,
          " Results"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/sort", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 sm:gap-2 text-sm font-medium text-black group-hover/sort:text-zinc-600 transition-colors py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline", children: [
              "Sort By: ",
              selectedSort
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Sort" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-200 shadow-xl opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all duration-200 z-40 py-2", children: ["Recommended", "Trending", "Popular", "Newest", "Price: Low to High", "Price: High to Low"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedSort(option),
              className: `block w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors ${selectedSort === option ? "text-black font-medium" : "text-zinc-600 hover:text-black"}`,
              children: option
            },
            option
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col lg:flex-row ${isFilterSidebarVisible ? "gap-8 lg:gap-12" : "gap-0"} items-start transition-all duration-500 relative lg:pl-4`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `hidden lg:block shrink-0 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full transition-all duration-500 ease-in-out lg:sticky lg:top-32 lg:h-[calc(100vh-120px)] ${isFilterSidebarVisible ? "w-full lg:w-[15rem] opacity-100" : "w-0 opacity-0 lg:h-0"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-col gap-6 pb-8", children: dynamicFilterCategories.map((category) => {
            const isOpen = openFilterSections.includes(category.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-zinc-200 pb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => toggleFilterAccordion(category.id),
                  className: "w-full flex justify-between items-center text-left py-1 group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-black uppercase tracking-widest", children: category.name }),
                    isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] mt-4 opacity-100" : "max-h-0 opacity-0"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                    category.options.map((option, index) => {
                      const isSelected = (selectedFilters[category.id] || []).includes(option);
                      const isVisible = index < 4 || expandedCategories.includes(category.id);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: `flex items-center gap-3 cursor-pointer group transition-all duration-300 ease-in-out origin-top ${isVisible ? "max-h-12 opacity-100 mb-0 pointer-events-auto" : "max-h-0 opacity-0 mb-0 overflow-hidden pointer-events-none"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "checkbox",
                                className: "hidden",
                                checked: isSelected,
                                onChange: () => toggleFilterOption(category.id, option)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${isSelected ? "bg-black border-black" : "border-zinc-300 bg-white group-hover:border-black"}`, children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }),
                            category.id === "color" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-4 h-4 rounded-full border border-zinc-200 shrink-0 shadow-sm",
                                style: {
                                  backgroundColor: option === "Black" ? "#000000" : option === "Brown" ? "#5C4033" : option === "Tan" ? "#D2B48C" : option === "White" ? "#FFFFFF" : option === "Navy" ? "#000080" : "#E5E5E5"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm transition-colors truncate ${isSelected ? "text-black font-medium" : "text-zinc-600 group-hover:text-black"}`, children: [
                              option,
                              " ",
                              category.id === "collection" && collectionCounts[option] !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-zinc-400 font-normal text-xs ml-1", children: [
                                "(",
                                collectionCounts[option],
                                ")"
                              ] })
                            ] })
                          ]
                        },
                        option
                      );
                    }),
                    category.options.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => toggleShowMore(category.id),
                        className: "text-left text-xs font-medium text-zinc-500 hover:text-black transition-colors mt-0 sm:-mt-1 flex items-center gap-1 w-fit",
                        children: expandedCategories.includes(category.id) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Show Less ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Show More (",
                          category.options.length - 4,
                          ") ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                        ] })
                      }
                    )
                  ] })
                }
              )
            ] }, category.id);
          }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full transition-all duration-500 min-h-[50vh]", children: [
        loading && products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full w-full py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 uppercase tracking-widest text-sm animate-pulse", children: "Loading Collection..." }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full w-full py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 uppercase tracking-widest text-sm", children: "Error Loading Products" }) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full w-full py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 uppercase tracking-widest text-sm", children: "No products found for these filters." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `transition-all duration-500 ${loading ? "opacity-50 pointer-events-none" : ""}`, children: [
          selectedFilters.collection && selectedFilters.collection.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-serif mb-6 text-black border-b border-zinc-200 pb-2", children: [
            selectedFilters.collection.join(", "),
            " Collection",
            selectedFilters.collection.length > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 ${isFilterSidebarVisible ? "lg:grid-cols-3 xl:grid-cols-3" : "lg:grid-cols-4 xl:grid-cols-5"} gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8 sm:gap-y-12`, children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/${product.id}`, className: "group cursor-pointer block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Image,
                {
                  src: product.thumbnail_image_url || product.annotated_image_url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
                  alt: product.name,
                  fill: true,
                  className: `object-cover object-center transition-all duration-700 group-hover:scale-105 ${product.hover_image_url ? "group-hover:opacity-0" : ""}`
                }
              ),
              product.hover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Image,
                {
                  src: product.hover_image_url,
                  alt: `${product.name} hover`,
                  fill: true,
                  className: "object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xl:flex-row justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base sm:text-lg md:text-xl mb-1 mt-2 text-black", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs sm:text-sm hidden sm:block", children: product.short_description || "Premium Quality" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-sans text-sm mt-1 xl:mt-2 font-medium text-black", children: [
                "NPR ",
                product.base_price.toFixed(2)
              ] })
            ] })
          ] }, product.id)) })
        ] }),
        loadingMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-12 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 uppercase tracking-widest text-sm animate-pulse", children: "Loading More..." }) })
      ] }),
      isMobileFilterVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom-[100%] duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-zinc-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl text-black", children: "Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setIsMobileFilterVisible(false);
                setMobileFiltersDirty(false);
              },
              className: "p-2 -mr-2 text-zinc-500 hover:text-black transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-6", children: dynamicFilterCategories.map((category) => {
          const isOpen = openFilterSections.includes(category.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-zinc-200 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => toggleFilterAccordion(category.id),
                className: "w-full flex justify-between items-center text-left py-1 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-black uppercase tracking-widest", children: category.name }),
                  isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] mt-4 opacity-100" : "max-h-0 opacity-0"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  category.options.map((option, index) => {
                    const isSelected = (selectedFilters[category.id] || []).includes(option);
                    const isVisible = index < 4 || expandedCategories.includes(category.id);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: `flex items-center gap-3 cursor-pointer group transition-all duration-300 ease-in-out origin-top ${isVisible ? "max-h-12 opacity-100 mb-0 pointer-events-auto" : "max-h-0 opacity-0 mb-0 overflow-hidden pointer-events-none"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "checkbox",
                              className: "hidden",
                              checked: isSelected,
                              onChange: () => toggleFilterOption(category.id, option)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${isSelected ? "bg-black border-black" : "border-zinc-300 bg-white group-hover:border-black"}`, children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }),
                          category.id === "color" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-4 h-4 rounded-full border border-zinc-200 shrink-0 shadow-sm",
                              style: {
                                backgroundColor: option === "Black" ? "#000000" : option === "Brown" ? "#5C4033" : option === "Tan" ? "#D2B48C" : option === "White" ? "#FFFFFF" : option === "Navy" ? "#000080" : "#E5E5E5"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm transition-colors truncate ${isSelected ? "text-black font-medium" : "text-zinc-600 group-hover:text-black"}`, children: [
                            option,
                            " ",
                            category.id === "collection" && collectionCounts[option] !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-zinc-400 font-normal text-xs ml-1", children: [
                              "(",
                              collectionCounts[option],
                              ")"
                            ] })
                          ] })
                        ]
                      },
                      option
                    );
                  }),
                  category.options.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => toggleShowMore(category.id),
                      className: "text-left text-xs font-medium text-zinc-500 hover:text-black transition-colors mt-0 sm:-mt-1 flex items-center gap-1 w-fit",
                      children: expandedCategories.includes(category.id) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Show Less ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Show More (",
                        category.options.length - 4,
                        ") ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                      ] })
                    }
                  )
                ] })
              }
            )
          ] }, category.id);
        }) }) }),
        mobileFiltersDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 w-full p-4 border-t border-zinc-200 bg-white flex gap-4 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedFilters({}),
              className: "flex-1 py-4 text-sm font-medium border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors uppercase tracking-widest",
              children: totalActiveFilters > 0 ? `Clear (${totalActiveFilters})` : "Clear"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setIsMobileFilterVisible(false);
                setMobileFiltersDirty(false);
              },
              className: "flex-1 py-4 text-sm font-medium bg-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest",
              children: "Apply"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const faqs = [
  {
    category: "About Coseli",
    questions: [
      {
        q: "What is Coseli?",
        a: "Coseli is a premium handcrafted leather footwear brand based in Kathmandu, Nepal. We specialize in bespoke oxfords, loafers, sneakers, and shambas, using ethically sourced full-grain leather and traditional construction methods like Goodyear Welt and Blake stitch."
      },
      {
        q: "Where are your shoes made?",
        a: "Every pair of Coseli shoes is designed and handcrafted by master artisans in our Kathmandu atelier."
      },
      {
        q: "Do you only sell shoes?",
        a: "While footwear is our primary focus, we also craft a curated selection of premium leather accessories, including belts and wallets, designed to complement our shoe collections."
      }
    ]
  },
  {
    category: "Bespoke & Orders",
    questions: [
      {
        q: "How long does a bespoke order take?",
        a: "Our master artisans craft every bespoke pair by hand in our Kathmandu atelier. Please allow 6 to 8 weeks from the date of your fitting (or receipt of measurements) for the completion of your order."
      },
      {
        q: "How do I ensure the perfect custom fit?",
        a: "We highly recommend visiting our atelier for an initial sizing and mold creation. Alternatively, if you are purchasing Ready-to-Wear, refer to our comprehensive sizing guide. If you have any hesitation, our concierge team is available to assist you."
      },
      {
        q: "Can I modify my bespoke order after placing it?",
        a: "You have a 48-hour window after placing a bespoke order to make minor modifications to the leather selection or finish. After this period, the leather is cut and the process cannot be reversed."
      }
    ]
  },
  {
    category: "Shipping & Returns",
    // Skipping some for brevity, but you get the idea
    questions: [
      {
        q: "Do you ship internationally?",
        a: "Yes, we offer worldwide shipping via our logistics partners. Shipping fees and delivery times vary depending on the destination and will be calculated at checkout. Please note that international customers are responsible for any customs duties or taxes."
      },
      {
        q: "What is your return policy?",
        a: "Ready-to-Wear items may be returned within 30 days of delivery for a full refund or exchange, provided they are in pristine, unworn condition with the original packaging. Unfortunately, bespoke and personalized orders are final sale and cannot be returned."
      }
    ]
  },
  {
    category: "Materials & Care",
    questions: [
      {
        q: "What kind of leather do you use?",
        a: "We strictly source premium full-grain calfskin and suede from ethical tanneries. Full-grain leather retains the outermost layer of the hide, ensuring maximum durability, breathability, and the development of a unique, rich patina over time."
      },
      {
        q: "How should I care for my leather shoes?",
        a: "Always store your shoes with cedar shoe trees to maintain their shape and absorb moisture. We recommend regular brushing and the application of a high-quality leather conditioner and wax polish every few weeks of active wear."
      },
      {
        q: "Do you offer a resoling service?",
        a: "Yes. All Coseli shoes feature a traditional Goodyear Welt or Blake stitch construction, making them fully resolable. Send them back to our atelier, and our artisans will breathe new life into your favorite pair."
      }
    ]
  }
];
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-zinc-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full py-6 flex items-center justify-between text-left group focus:outline-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg md:text-xl text-black pr-8", children: question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 group-hover:text-black transition-colors shrink-0", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm md:text-base leading-relaxed pl-4 md:pl-8 border-l-2 border-zinc-100", children: answer }) })
      }
    )
  ] });
}
function FAQPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white pt-32 pb-24 px-4 md:px-12 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-5xl md:text-6xl text-black tracking-tight mb-6", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm md:text-base leading-relaxed", children: "Answers to common inquiries regarding our atelier, orders, and services." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-16", children: faqs.map((categoryBlock, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-black mb-6", children: categoryBlock.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-zinc-200", children: categoryBlock.questions.map((item, qIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { question: item.q, answer: item.a }, qIndex)) })
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 pt-16 border-t border-zinc-100 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-black mb-4", children: "Still have questions?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm mb-8", children: "Our concierge team is available to assist you with any bespoke requests or detailed inquiries." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/contact",
          className: "inline-block border border-black text-black px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300",
          children: "Contact the Atelier"
        }
      )
    ] })
  ] });
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-[100] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-black" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const SIZES = [
  { eu: 36, uk: 3, us: 5, cm: 22.5 },
  { eu: 37, uk: 4, us: 6, cm: 23.5 },
  { eu: 38, uk: 5, us: 7, cm: 24 },
  { eu: 39, uk: 6, us: 8, cm: 25 },
  { eu: 40, uk: 6.5, us: 9, cm: 25.5 },
  { eu: 41, uk: 7, us: 10, cm: 26.5 },
  { eu: 42, uk: 8, us: 9, cm: 27 },
  { eu: 43, uk: 9, us: 10, cm: 28 },
  { eu: 44, uk: 10, us: 11, cm: 28.5 },
  { eu: 45, uk: 11, us: 12, cm: 29.5 }
];
function SizeGuide() {
  const [activeTab, setActiveTab] = reactExports.useState("chart");
  const [cmInput, setCmInput] = reactExports.useState("");
  const [recommendedSize, setRecommendedSize] = reactExports.useState(null);
  const calculateSize = (val) => {
    setCmInput(val);
    const cm = parseFloat(val);
    if (isNaN(cm)) {
      setRecommendedSize(null);
      return;
    }
    const found = SIZES.find((s) => s.cm >= cm);
    setRecommendedSize(found || SIZES[SIZES.length - 1]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-zinc-500 hover:text-black transition-colors underline underline-offset-4", children: "Size Guide" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-white rounded-none border-none p-0 overflow-hidden sm:max-h-[90vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "p-8 pb-4 border-b border-zinc-100 flex flex-row justify-between items-center space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-serif text-3xl tracking-tight text-black mb-1", children: "Interactive Size Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm font-sans tracking-wide", children: "Standard sizing used in Nepal (EU/UK)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-zinc-100 bg-zinc-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("chart"),
            className: `flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "chart" ? "bg-white text-black border-b-2 border-black" : "text-zinc-400 hover:text-zinc-600"}`,
            children: "Size Chart"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("measure"),
            className: `flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "measure" ? "bg-white text-black border-b-2 border-black" : "text-zinc-400 hover:text-zinc-600"}`,
            children: "How to Measure"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 overflow-y-auto", children: activeTab === "chart" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-zinc-200 p-6 rounded-none space-y-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className: "w-5 h-5 text-zinc-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-widest text-black", children: "Find My Perfect Size" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-medium", children: "Foot Length (CM)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: cmInput,
                  onChange: (e) => calculateSize(e.target.value),
                  placeholder: "e.g. 25.5",
                  className: "w-full bg-zinc-50 border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none placeholder:text-zinc-400"
                }
              )
            ] }),
            recommendedSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-zinc-900 text-white px-4 py-[11px] border border-zinc-900 animate-in zoom-in-95 duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-zinc-400 mb-1", children: "Recommended Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-xl tracking-wide", children: [
                "EU ",
                recommendedSize.eu,
                " / UK ",
                recommendedSize.uk
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-zinc-50 border-b border-zinc-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold uppercase tracking-widest text-[10px]", children: "EU" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold uppercase tracking-widest text-[10px]", children: "UK" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold uppercase tracking-widest text-[10px]", children: "US (Mens)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold uppercase tracking-widest text-[10px]", children: "Foot Length (CM)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SIZES.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-zinc-50 transition-colors ${recommendedSize?.eu === s.eu ? "bg-zinc-900 text-white font-bold" : "hover:bg-zinc-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.eu }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.uk }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.us }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                  s.cm,
                  " cm"
                ] })
              ]
            },
            idx
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start text-xs text-zinc-400 bg-zinc-50 p-4 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Our shoes typically fit true to size. If you are between sizes, we recommend selecting the larger size for a more comfortable fit, especially for leather shoes that may slightly adjust to your foot shape over time." })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8 animate-in slide-in-from-bottom-2 duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg tracking-tight", children: "Trace Your Foot" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed", children: "Place a sheet of paper on the floor against a wall. Put your foot on it with your heel against the wall and trace the outline of your foot." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg tracking-tight", children: "Measure Length" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed", children: "Use a ruler to measure the distance from the heel (at the edge of the paper) to your longest toe." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg tracking-tight", children: "Compare to Chart" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed", children: 'Use your measurement in cm with our "Find My Size" tool or the chart to select your perfect Coseli fit.' })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-zinc-100 overflow-hidden flex items-center justify-center p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { className: "w-full h-full text-zinc-200", strokeWidth: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-[20px] border-white/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400", children: "Heel to Toe" }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [selectedColor, setSelectedColor] = reactExports.useState(0);
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [validationError, setValidationError] = reactExports.useState(null);
  const [isAdded, setIsAdded] = reactExports.useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const thumbnailsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const apiUrl = "http://192.168.1.78:8000/api/v1";
        const res = await fetch(`${apiUrl}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const { data } = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  const handleColorChange = (idx) => {
    setSelectedColor(idx);
    setSelectedSize(null);
    setSelectedImage(0);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-32 pb-32 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 font-sans tracking-widest uppercase text-sm animate-pulse", children: "Loading Product..." }) });
  }
  if (error || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-32 pb-32 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-sans tracking-widest uppercase text-sm", children: "Error Loading Product" }) });
  }
  const variants = product.variants || [];
  const colors = Array.from(new Set(variants.map((v) => v.color))).map((colorName) => {
    const variantWithColor = variants.find((v) => v.color === colorName);
    const image = variantWithColor?.images?.[0]?.image_url || product.thumbnail_image_url || product.annotated_image_url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";
    return { name: colorName, image };
  });
  const selectedColorName = colors.length > 0 ? colors[selectedColor]?.name : null;
  const availableSizesForColor = selectedColorName ? variants.filter((v) => v.color === selectedColorName) : variants;
  const uniqueSizesMap = /* @__PURE__ */ new Map();
  availableSizesForColor.forEach((v) => {
    if (!uniqueSizesMap.has(v.size)) {
      uniqueSizesMap.set(v.size, { size: v.size, priceOverride: v.price_override, inventory: v.inventory_count, variantId: v.id });
    }
  });
  const sizes = Array.from(uniqueSizesMap.values());
  if (sizes.length === 0) sizes.push({ size: "One Size", priceOverride: null, inventory: 10, variantId: 0 });
  const isColorOutOfStock = (colorName) => variants.filter((v) => v.color === colorName).every((v) => v.inventory_count === 0);
  const activeSizeInventory = selectedSize !== null ? sizes[selectedSize]?.inventory ?? 1 : sizes[0]?.inventory ?? 1;
  const isSizeOutOfStock = activeSizeInventory === 0;
  const activeSize = selectedSize !== null ? sizes[selectedSize] : sizes[0];
  const currentPrice = activeSize?.priceOverride !== null && activeSize?.priceOverride !== void 0 ? activeSize.priceOverride : product.base_price;
  let images = [];
  if (selectedColorName) {
    images = variants.filter((v) => v.color === selectedColorName).flatMap((v) => (v.images || []).map((img) => img.image_url));
  }
  images = Array.from(new Set(images));
  if (images.length === 0) {
    if (product.thumbnail_image_url) images.push(product.thumbnail_image_url);
    if (product.hover_image_url) images.push(product.hover_image_url);
    if (product.annotated_image_url) images.push(product.annotated_image_url);
    if (images.length === 0) {
      images = ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"];
    }
  }
  const validSelectedImage = selectedImage < images.length ? selectedImage : 0;
  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = 120;
      thumbnailsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const handlePrevImage = () => {
    setSelectedImage((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };
  const handleNextImage = () => {
    setSelectedImage((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };
  const shippingCost = product.shipping_price || 0;
  const shippingType = "Standard Delivery";
  const returns = "Free returns within 30 days of receipt.";
  const handleAddToCart = (buyNow = false) => {
    if (selectedSize === null && sizes.length > 0 && sizes[0].size !== "One Size") {
      setValidationError("Please select a size first.");
      return;
    }
    setValidationError(null);
    addItem({
      productId: product.id,
      variantId: activeSize?.variantId || 0,
      name: product.name,
      color: selectedColorName || "Default",
      size: activeSize?.size || "One Size",
      price: currentPrice,
      image: images[validSelectedImage] || product.thumbnail_image_url
    });
    if (buyNow) {
      router.push("/cart");
    } else {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32 selection:bg-zinc-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-2xl mx-auto px-4 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 mt-6 text-sm text-zinc-500 font-sans tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "hover:text-black transition-colors", children: "HOME" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/collections", className: "hover:text-black transition-colors", children: "SHOP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black uppercase", children: product.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8 lg:gap-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-3/5 flex flex-col gap-4 lg:sticky lg:top-32 lg:h-[calc(100vh-140px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[50vh] md:h-[65vh] lg:aspect-auto lg:h-full lg:flex-1 bg-zinc-50 overflow-hidden group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: images[validSelectedImage] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
                alt: product.name,
                fill: true,
                priority: true,
                className: "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              }
            ),
            images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handlePrevImage,
                  className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105",
                  "aria-label": "Previous image",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-7 h-7 stroke-[1.5]" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleNextImage,
                  className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105",
                  "aria-label": "Next image",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-7 h-7 stroke-[1.5]" })
                }
              )
            ] })
          ] }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/carousel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => scrollThumbnails("left"),
                className: "absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105",
                "aria-label": "Scroll left",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-7 h-7 stroke-[1.5]" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: thumbnailsRef,
                className: "flex gap-4 overflow-x-auto scrollbar-hide shrink-0 snap-x snap-mandatory",
                style: { scrollbarWidth: "none", msOverflowStyle: "none" },
                children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setSelectedImage(idx),
                    className: `relative w-24 aspect-[4/5] shrink-0 overflow-hidden bg-zinc-50 transition-opacity duration-300 snap-start ${validSelectedImage === idx ? "opacity-100 ring-1 ring-black" : "opacity-50 hover:opacity-100"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Image,
                      {
                        src: img,
                        alt: `Thumbnail ${idx + 1}`,
                        fill: true,
                        className: "object-cover object-center"
                      }
                    )
                  },
                  idx
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => scrollThumbnails("right"),
                className: "absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105",
                "aria-label": "Scroll right",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-7 h-7 stroke-[1.5]" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-2/5 flex flex-col pt-0 md:pt-4 lg:pt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl lg:text-5xl text-black md:leading-tight lg:leading-[1.1] mb-4 lg:mb-6", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-sans text-2xl font-light text-black mb-8", children: [
            "NPR ",
            currentPrice.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[1px] bg-zinc-200 mb-8" }),
          colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-widest uppercase text-black", children: "Color" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-zinc-500", children: colors[selectedColor]?.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 flex-wrap", children: colors.map((color, idx) => {
              const oos = isColorOutOfStock(color.name);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleColorChange(idx),
                  className: `relative w-16 h-20 bg-zinc-50 overflow-hidden transition-all duration-300 ${selectedColor === idx ? "ring-1 ring-black ring-offset-2" : "hover:opacity-80"} ${oos ? "opacity-50" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Image,
                      {
                        src: color.image,
                        alt: color.name,
                        fill: true,
                        className: "object-cover object-center"
                      }
                    ),
                    oos && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end justify-center pb-1.5 bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white bg-black/70 px-1.5 py-0.5 rounded", children: "Out" }) })
                  ]
                },
                idx
              );
            }) })
          ] }),
          sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-widest uppercase text-black", children: "Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SizeGuide, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: sizes.map((sizeObj, idx) => {
              const outOfStock = sizeObj.inventory === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => !outOfStock && setSelectedSize(idx),
                  disabled: outOfStock,
                  title: outOfStock ? "Out of stock" : void 0,
                  className: `relative py-3 text-sm transition-colors border ${outOfStock ? "border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50" : selectedSize === idx ? "border-black bg-black text-white" : "border-zinc-200 text-black hover:border-black"}`,
                  children: [
                    sizeObj.size,
                    outOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-full h-px bg-zinc-300 absolute rotate-[-18deg]" }) })
                  ]
                },
                idx
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-12", children: [
            validationError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm font-medium tracking-wide mb-2 animate-in fade-in slide-in-from-top-1", children: validationError }),
            isSizeOutOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full py-6 flex items-center justify-center border border-zinc-200 bg-zinc-50 uppercase tracking-widest text-sm text-zinc-400 font-medium select-none", children: "Out of Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 text-center -mt-1", children: "This size is currently unavailable. Please select another size." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleAddToCart(true),
                  variant: "default",
                  className: "w-full py-6 rounded-none bg-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest text-sm",
                  children: "Buy Now"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleAddToCart(false),
                  variant: "outline",
                  className: `w-full py-6 rounded-none border-zinc-200 uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${isAdded ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50" : "text-black hover:bg-zinc-50"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                    isAdded ? "Added to Cart" : "Add to Cart"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 py-8 mb-12 border-t border-b border-zinc-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 bg-zinc-50 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-zinc-900", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-sans text-sm font-semibold tracking-wide text-black mb-1", children: shippingType }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-zinc-500", children: [
                  shippingCost === 0 ? "Complimentary shipping on this item." : `NPR ${shippingCost} shipping fee.`,
                  " Arrives in 3-5 Business Days."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 bg-zinc-50 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-5 h-5 text-zinc-900", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-sans text-sm font-semibold tracking-wide text-black mb-1", children: "Returns & Exchanges" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500", children: returns })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm text-zinc-500 font-sans leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.long_description || product.short_description || "Premium Quality Shoes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-2", children: [
              product.material && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black font-medium", children: "Material:" }),
                " ",
                product.material
              ] }),
              product.lining && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black font-medium", children: "Lining:" }),
                " ",
                product.lining
              ] }),
              product.sole && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black font-medium", children: "Sole:" }),
                " ",
                product.sole
              ] }),
              product.construction_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black font-medium", children: "Construction:" }),
                " ",
                product.construction_type
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Handcrafted Excellence" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start mb-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md", children: "You May Also Love" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/collections", className: "text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors", children: "Discover More" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/3`, className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop",
              alt: "The Shamba Loafer",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-1 mt-2", children: "The Shamba Loafer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm", children: "Textured Leather" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm mt-2", children: "NPR 280" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/4`, className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
              alt: "Coseli Sneaker 01",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-1 mt-2", children: "Coseli Sneaker 01" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm", children: "Premium Canvas & Suede" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm mt-2", children: "NPR 240" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/5`, className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1620800762635-424a6435bd78?q=80&w=1974&auto=format&fit=crop",
              alt: "Chelsea Boot",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-1 mt-2", children: "The Chelsea Boot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm", children: "Full-Grain Leather" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm mt-2", children: "NPR 360" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/6`, className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
              alt: "Weekend Loafer",
              fill: true,
              className: "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-1 mt-2", children: "Weekend Loafer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm", children: "Supple Suede" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm mt-2", children: "NPR 260" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ReturnsPage() {
  const [showForm, setShowForm] = reactExports.useState(false);
  const [orderNumber, setOrderNumber] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const [orderData, setOrderData] = reactExports.useState(null);
  const [isReturning, setIsReturning] = reactExports.useState(false);
  const [returnError, setReturnError] = reactExports.useState("");
  const [returnReason, setReturnReason] = reactExports.useState("");
  const [returnOtherReason, setReturnOtherReason] = reactExports.useState("");
  const handleFindOrder = async (e) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setError("Please enter both order number and email.");
      return;
    }
    setIsLoading(true);
    setError("");
    setOrderData(null);
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderNumber.trim())}`);
      if (!response.ok) {
        const data2 = await response.json();
        throw new Error(data2.error || "Failed to find order");
      }
      const { data } = await response.json();
      if (data.status !== "delivered") {
        throw new Error(`Order is currently '${data.status}'. Only delivered orders can be returned.`);
      }
      setOrderData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReturnOrder = async () => {
    if (!orderData) return;
    const finalReason = returnReason === "Other" ? returnOtherReason : returnReason;
    if (!finalReason.trim()) {
      setReturnError("Please specify a reason for the return.");
      return;
    }
    setIsReturning(true);
    setReturnError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderData.tracking_number)}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_reason: finalReason })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to initiate return");
      }
      setIsSubmitted(true);
      setOrderData(null);
      setShowForm(false);
    } catch (err) {
      setReturnError(err.message);
    } finally {
      setIsReturning(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-32 pb-24 px-4 md:px-12 max-w-screen-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-6xl text-black tracking-tight mb-6", children: "Returns & Exchanges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm md:text-base leading-relaxed", children: "We want you to love your custom fit. If you're not entirely satisfied with your purchase, we're here to help." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12 mb-20 text-zinc-600 font-sans leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-4", children: "Our Return Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "You have 30 days from the date of delivery to return or exchange your unworn, unwashed, and unaltered items. All items must be returned in their original packaging, including the dust bag and shoe box." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please note that bespoke or fully custom-made orders are not eligible for returns or exchanges, as they are crafted specifically to your individual measurements and specifications." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-4", children: "How to Return" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal pl-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Initiate your return:" }),
            " Click the button below and enter your order number and email address to start the process."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Approval:" }),
            " Once your return is approved, we will email you detailed return instructions."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pack your items:" }),
            " Securely package the shoes in their original box."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ship it back:" }),
            " Drop off your package at the designated courier location or schedule a pickup within 7 days."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-4", children: "Refunds" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Once our atelier receives and inspects your returned item (usually within 3-5 business days of receipt), we will process your refund. The funds will be credited back to your original payment method. Please allow up to 10 business days for the refund to reflect on your statement." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-zinc-200 pt-16 text-center bg-zinc-50 p-8 md:p-12 mb-20", children: [
      !showForm && !isSubmitted && !orderData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl text-black", children: "Ready to make a return?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm mb-8", children: "Have your order number ready." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowForm(true),
            className: "inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors",
            children: [
              "Initiate Return ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      showForm && !isSubmitted && !orderData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-6 text-center", children: "Enter Order Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFindOrder, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "orderNumber", className: "block text-xs font-medium tracking-widest uppercase text-zinc-500", children: "Order/Tracking Number *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                id: "orderNumber",
                value: orderNumber,
                onChange: (e) => setOrderNumber(e.target.value.toUpperCase()),
                required: true,
                placeholder: "e.g. TRK-123456",
                className: "w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400 font-mono uppercase"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-xs font-medium tracking-widest uppercase text-zinc-500", children: "Email Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                id: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                placeholder: "Used during checkout",
                className: "w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 text-xs mt-3 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
            " ",
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowForm(false),
                className: "text-xs tracking-widest uppercase text-zinc-500 hover:text-black transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading,
                className: "bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50",
                children: isLoading ? "Searching..." : "Find Order"
              }
            )
          ] })
        ] })
      ] }),
      orderData && !isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black mb-6 text-center", children: "Select Items to Return" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-zinc-200 p-4 md:p-6 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4", children: [
            "Order ",
            orderData.tracking_number
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orderData.order_items?.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
            item.thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.thumbnail, alt: item.product_name || "Product", className: "w-16 h-16 object-cover bg-zinc-100" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-zinc-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-zinc-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-black text-sm", children: item.product_name || "Product Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-500 text-xs mt-1", children: [
                "Qty: ",
                item.quantity
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm", children: [
              "$",
              (item.price_at_purchase * item.quantity).toFixed(2)
            ] })
          ] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500", children: "Refund Amount (Est)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
              "$",
              orderData.total_amount?.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-sm mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2", children: "Reason for Return *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full border border-zinc-300 p-3 text-sm flex-1 bg-white focus:outline-none focus:border-black transition-colors",
                value: returnReason,
                onChange: (e) => setReturnReason(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a reason..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Wrong Size", children: "Wrong Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Defective", children: "Item Defective" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Not as described", children: "Not as described" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Changed mind", children: "Changed my mind" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
                ]
              }
            )
          ] }),
          returnReason === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-top-2 duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2", children: "Please specify *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors min-h-[100px] bg-white resize-none",
                placeholder: "Tell us what went wrong...",
                value: returnOtherReason,
                onChange: (e) => setReturnOtherReason(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleReturnOrder,
                disabled: isReturning,
                className: "w-full bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50",
                children: isReturning ? "Submitting..." : "Confirm Return"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setOrderData(null),
                disabled: isReturning,
                className: "w-full text-zinc-500 text-xs tracking-widest uppercase font-medium hover:text-black transition-colors py-4",
                children: "Cancel"
              }
            ),
            returnError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 text-xs mt-2 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
              " ",
              returnError
            ] })
          ] })
        ] })
      ] }),
      isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-black", children: "Return Initiated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-600 text-sm leading-relaxed", children: [
          "We've received your return request for order ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-black", children: orderNumber }),
          ". An email with return instructions and next steps has been sent to your address."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setIsSubmitted(false);
              setShowForm(false);
              setOrderNumber("");
              setEmail("");
              setReturnReason("");
              setReturnOtherReason("");
            },
            className: "mt-8 text-xs tracking-widest uppercase font-medium border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors inline-block",
            children: "Return Another Order"
          }
        )
      ] })
    ] })
  ] }) });
}
function ShoeCarePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[70vh] flex flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 mix-blend-difference text-white px-4 md:px-12 mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight", children: [
          "The Art of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-light", children: "Shoe Care" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-sm tracking-widest uppercase mt-4", children: "A Ritual of Longevity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          src: "https://images.unsplash.com/photo-1621245041045-8fbfb39414ca?q=80&w=2938&auto=format&fit=crop",
          alt: "Shoe Care Tools",
          fill: true,
          className: "object-cover object-center brightness-75 scale-105",
          priority: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-12 z-10 text-white animate-bounce-slow opacity-80 mix-blend-difference", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-6 h-6", strokeWidth: 1.5 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-3xl mx-auto text-center px-4 md:px-12 py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-600 font-serif text-lg md:text-xl leading-relaxed", children: "A well-crafted pair of full-grain leather shoes, when properly cared for, will not only last a lifetime but will grow more beautiful with age. Developing a rich patina requires honoring the leather through a deliberate ritual of cleaning, conditioning, and polishing." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-[1200px] mx-auto px-4 md:px-12 pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 md:mb-48", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2624&auto=format&fit=crop",
            alt: "Horsehair Brush on Leather",
            fill: true,
            className: "object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center space-y-6 md:pr-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4", children: "01" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-black", children: "Preparation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-3xl md:text-4xl text-black", children: "Clean & Reset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 leading-relaxed text-sm md:text-base", children: "Begin by placing cedar shoe trees inside to maintain the shoe's shape and absorb any ambient moisture. Remove the laces to prevent them from absorbing polish. Using a genuine horsehair brush, vigorously brush the entire upper to remove dust and topical dirt. Clean the welts utilizing a smaller welt brush." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 md:mb-48 md:flex-row-reverse flex-col-reverse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center space-y-6 md:pl-12 order-2 md:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4", children: "02" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-black", children: "Nourish" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-3xl md:text-4xl text-black", children: "Conditioning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 leading-relaxed text-sm md:text-base", children: "Leather is a skin that requires hydration to prevent drying and cracking. Apply a small amount of premium leather conditioner using a cotton chamois or your fingertips. Massage it gently into the leather using circular motions, paying special attention to the creases. Allow the shoe to sit for 15 minutes to absorb the nutrients." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] w-full order-1 md:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2574&auto=format&fit=crop",
            alt: "Applying Conditioner",
            fill: true,
            className: "object-cover"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            src: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop",
            alt: "Polishing Leather Shoe",
            fill: true,
            className: "object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center space-y-6 md:pr-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4", children: "03" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-black", children: "Protect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-3xl md:text-4xl text-black", children: "Polish & Shine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 leading-relaxed text-sm md:text-base", children: "Apply a colored cream polish to restore pigment, followed by a hard wax polish on the toe and heel counters for protection and shine. Apply in light, concentric circles. Finish by briskly buffing the entire shoe with your horsehair brush, resulting in a deep, lustrous finish." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-zinc-50 py-24 md:py-32 px-4 md:px-12 border-t border-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-4xl text-black mb-16", children: "Essential Toolkit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/products/cedar-shoe-trees", className: "space-y-4 group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: "https://images.unsplash.com/photo-1616428616183-5c7472dd97ac?q=80&w=2574&auto=format&fit=crop", alt: "Cedar Shoe Tree", fill: true, className: "object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300", children: "Cedar Shoe Trees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2", children: "NPR 4,500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed mt-2", children: "Essential for maintaining shape, preventing deep creases, and pulling damaging moisture away from the interior lining." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/products/horsehair-brush", className: "space-y-4 group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2757&auto=format&fit=crop", alt: "Horsehair Brush", fill: true, className: "object-cover transition-transform duration-700 group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300", children: "Horsehair Brush" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2", children: "NPR 2,800" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed mt-2", children: "Used for everyday cleaning to dust off the uppers, and for the final vigorous buffing stage after polishing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/products/conditioner-polish", className: "space-y-4 group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full bg-amber-900 relative mb-6 overflow-hidden transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300", children: "Conditioner & Polish" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2", children: "NPR 3,200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed mt-2", children: "A high-quality liquid or cream conditioner to nourish, alongside pigmented cream and wax polishes to restore color and protect." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/products/cotton-chamois", className: "space-y-4 group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: "https://images.unsplash.com/photo-1528343118917-74070a927a7c?q=80&w=2574&auto=format&fit=crop", alt: "Cotton Chamois", fill: true, className: "object-cover transition-transform duration-700 group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300", children: "Cotton Chamois" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2", children: "NPR 1,200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-sm leading-relaxed mt-2", children: "A soft, lint-free cloth used for applying conditioners and polishes in precise, controlled layers." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 md:py-32 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl text-black mb-8", children: "Ready to start your collection?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/collections",
          className: "inline-block border border-black text-black px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300",
          children: "Explore Ready to Wear"
        }
      )
    ] })
  ] });
}
function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isCancelling, setIsCancelling] = reactExports.useState(false);
  const [cancelError, setCancelError] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [orderData, setOrderData] = reactExports.useState(null);
  const [showReturnForm, setShowReturnForm] = reactExports.useState(false);
  const [isReturning, setIsReturning] = reactExports.useState(false);
  const [returnError, setReturnError] = reactExports.useState("");
  const [returnReason, setReturnReason] = reactExports.useState("");
  const [returnOtherReason, setReturnOtherReason] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const trackingNoParam = params.get("tracking_no");
      if (trackingNoParam) {
        setTrackingNumber(trackingNoParam);
      }
    }
  }, []);
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }
    setIsLoading(true);
    setError("");
    setCancelError("");
    setReturnError("");
    setShowReturnForm(false);
    setOrderData(null);
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(trackingNumber.trim())}`);
      if (!response.ok) {
        const data2 = await response.json();
        throw new Error(data2.error || "Failed to find order");
      }
      const { data } = await response.json();
      setOrderData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelOrder = async () => {
    if (!orderData) return;
    setIsCancelling(true);
    setCancelError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderData.tracking_number)}/cancel`, {
        method: "POST"
      });
      if (!response.ok) {
        const data2 = await response.json();
        throw new Error(data2.error || "Failed to cancel order");
      }
      const { data } = await response.json();
      setOrderData(data);
    } catch (err) {
      setCancelError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };
  const handleReturnOrder = async () => {
    if (!orderData) return;
    const finalReason = returnReason === "Other" ? returnOtherReason : returnReason;
    if (!finalReason.trim()) {
      setReturnError("Please specify a reason for the return.");
      return;
    }
    setIsReturning(true);
    setReturnError("");
    try {
      const apiUrl = "http://192.168.1.78:8000/api/v1";
      const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderData.tracking_number)}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_reason: finalReason })
      });
      if (!response.ok) {
        const data2 = await response.json();
        throw new Error(data2.error || "Failed to initiate return");
      }
      const { data } = await response.json();
      setOrderData(data);
      setShowReturnForm(false);
      setReturnReason("");
      setReturnOtherReason("");
    } catch (err) {
      setReturnError(err.message);
    } finally {
      setIsReturning(false);
    }
  };
  const StatusIcon = ({ status }) => {
    switch (status) {
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-amber-500" });
      case "fulfilled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-blue-500" });
      case "shipped":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8 text-indigo-500" });
      case "delivered":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-green-500" });
      case "return_pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-8 h-8 text-rose-500" });
      case "under_return_review":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-amber-500" });
      case "returned":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-green-500" });
      case "cancelled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-red-500" });
      case "return_rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-rose-600" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-zinc-400" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white pt-24 md:pt-32 pb-24 selection:bg-zinc-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl text-black mb-4", children: "Track Your Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-sans tracking-wide text-zinc-500", children: "Enter your tracking number below to see the latest status of your shipment." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleTrackOrder, className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-zinc-400 absolute left-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "e.g. TRK-170884949...",
            className: "w-full border border-zinc-300 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400 uppercase font-mono",
            value: trackingNumber,
            onChange: (e) => setTrackingNumber(e.target.value.toUpperCase())
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 text-xs mt-3 bg-red-50 p-3 flex items-center gap-2 border border-red-500 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
        " ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isLoading,
          className: "w-full mt-6 rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors py-7 font-semibold",
          children: isLoading ? "Searching..." : "Track Order"
        }
      )
    ] }),
    orderData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-zinc-200 bg-zinc-50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1", children: "Order Tracking No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-medium text-black", children: orderData.tracking_number })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left md:text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1", children: "Date Placed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-black", children: new Date(orderData.created_at).toLocaleDateString() })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-zinc-200 pt-8 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 border border-zinc-200 shrink-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { status: orderData.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1", children: "Current Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-serif text-black capitalize", children: orderData.status.replace(/_/g, " ") })
          ] })
        ] }),
        ["shipped", "delivered"].includes(orderData.status) && orderData.shipping_provider && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-zinc-50 border border-zinc-200 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-4", children: "Shipping Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-y-6 gap-x-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1", children: "Carrier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-black", children: orderData.shipping_provider })
            ] }),
            orderData.shipping_tracking_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1", children: "Carrier Tracking No." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-bold text-black", children: orderData.shipping_tracking_number })
            ] }),
            orderData.shipping_details?.contact_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1", children: "Courier Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-black", children: [
                orderData.shipping_details.contact_name,
                orderData.shipping_details.contact_number && ` (${orderData.shipping_details.contact_number})`
              ] })
            ] }),
            orderData.shipping_details?.vehicle_info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1", children: "Vehicle Info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-black", children: orderData.shipping_details.vehicle_info })
            ] })
          ] })
        ] }),
        orderData.status === "return_rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 bg-rose-50 border border-rose-200 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-rose-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-rose-900", children: "Return Request Rejected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-700 mt-1 leading-relaxed", children: "Our team has inspected the returned item and found it does not meet our return eligibility criteria. The item will be shipped back to you shortly. Please contact support if you have any questions." }),
            orderData.return_rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-rose-800 mt-2 uppercase tracking-tighter", children: [
              "Reason: ",
              orderData.return_rejection_reason
            ] })
          ] })
        ] }) }),
        orderData.status === "cancelled" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center w-full max-w-sm mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 flex-1 bg-black" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-black" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 flex-1 bg-red-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mt-3 max-w-sm mx-auto px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "Cancelled" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12 mt-12 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6 text-center", children: "Fulfillment Journey" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center w-full px-2", children: [
              { key: "pending", label: "Pending", icon: Package },
              { key: "fulfilled", label: "Processing", icon: Package },
              { key: "shipped", label: "Shipped", icon: Truck },
              { key: "delivered", label: "Delivered", icon: CircleCheck }
            ].map((step, idx, arr) => {
              const statusOrder = ["pending", "fulfilled", "shipped", "delivered", "return_pending", "under_return_review", "returned", "return_rejected", "shipping_failed"];
              const currentIndex = statusOrder.indexOf(orderData.status);
              const stepIndex = statusOrder.indexOf(step.key);
              let isCompleted = stepIndex < currentIndex && currentIndex !== -1 || orderData.status === "shipping_failed" && stepIndex < 3;
              let isActive = stepIndex === currentIndex || orderData.status === "shipping_failed" && step.key === "delivered";
              let isError = orderData.status === "shipping_failed" && step.key === "delivered";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 ${idx === 0 ? "invisible" : isCompleted || isActive ? "bg-black" : "bg-zinc-100"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: `w-4 h-4 mb-2 transition-colors duration-500 ${isActive ? isError ? "text-red-500" : "text-black" : isCompleted ? "text-zinc-800" : "text-zinc-200"}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2.5 h-2.5 rounded-full mx-auto transition-all duration-500 ${isActive ? isError ? "bg-red-500 scale-125" : "bg-black scale-125" : isCompleted ? "bg-black" : "bg-zinc-100"}` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 ${idx === arr.length - 1 ? "invisible" : isCompleted ? "bg-black" : "bg-zinc-100"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-3 text-[9px] font-bold uppercase tracking-tight transition-colors ${isActive ? isError ? "text-red-500" : "text-black" : isCompleted ? "text-zinc-900" : "text-zinc-300"}`, children: step.key === "delivered" && orderData.status === "shipping_failed" ? "Failed" : step.label })
              ] }, step.key);
            }) })
          ] }),
          ["delivered", "return_pending", "under_return_review", "returned", "return_rejected"].includes(orderData.status) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto pt-8 border-t border-zinc-100 animate-in fade-in slide-in-from-top-4 duration-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6 text-center", children: "Return Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center w-full px-2", children: [
              { key: "return_pending", label: "Requested", icon: RefreshCcw },
              { key: "under_return_review", label: "Reviewing", icon: CircleAlert },
              { key: "returned", label: "Returned", icon: CircleCheck }
            ].map((step, idx, arr) => {
              const statusOrder = ["return_pending", "under_return_review", "returned"];
              const currentIndex = statusOrder.indexOf(orderData.status);
              const stepIndex = statusOrder.indexOf(step.key);
              let isCompleted = stepIndex < currentIndex && currentIndex !== -1 || orderData.status === "return_rejected" && stepIndex < 1;
              let isActive = stepIndex === currentIndex || orderData.status === "return_rejected" && step.key === "under_return_review";
              let isError = orderData.status === "return_rejected" && step.key === "under_return_review";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 ${idx === 0 ? "invisible" : isCompleted || isActive ? "bg-rose-500" : "bg-zinc-100"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: `w-4 h-4 mb-2 transition-colors duration-500 ${isActive ? isError ? "text-red-500" : "text-rose-500" : isCompleted ? "text-rose-400" : "text-zinc-200"}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2.5 h-2.5 rounded-full mx-auto transition-all duration-500 ${isActive ? isError ? "bg-red-500 scale-125" : "bg-rose-500 scale-125" : isCompleted ? "bg-rose-500" : "bg-zinc-100"}` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 ${idx === arr.length - 1 ? "invisible" : isCompleted ? "bg-rose-500" : "bg-zinc-100"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-3 text-[9px] font-bold uppercase tracking-tight transition-colors ${isActive ? isError ? "text-red-500" : "text-rose-600" : isCompleted ? "text-rose-400" : "text-zinc-300"}`, children: step.key === "under_return_review" && orderData.status === "return_rejected" ? "Rejected" : step.label })
              ] }, step.key);
            }) })
          ] })
        ] }),
        orderData.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-8 border-t border-zinc-200 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: handleCancelOrder,
              disabled: isCancelling,
              className: "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full max-w-sm",
              children: isCancelling ? "Cancelling..." : "Cancel Order"
            }
          ),
          cancelError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 text-xs mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
            " ",
            cancelError
          ] })
        ] }),
        orderData.status === "delivered" && !showReturnForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-8 border-t border-zinc-200 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowReturnForm(true),
            className: "text-black border-black hover:bg-black hover:text-white w-full max-w-sm rounded-none uppercase tracking-widest font-semibold py-6",
            children: "Return Order"
          }
        ) }),
        showReturnForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-8 border-t border-zinc-200 animate-in fade-in slide-in-from-top-4 duration-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-black mb-6 text-center", children: "Initiate Return" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-zinc-200 p-4 md:p-6 mb-8 max-w-2xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4", children: "Items to Return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orderData.order_items?.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
              item.thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.thumbnail, alt: item.product_name || "Product", className: "w-16 h-16 object-cover bg-zinc-100" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-zinc-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-zinc-300" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-black text-sm", children: item.product_name || "Product Item" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-500 text-xs mt-1", children: [
                  "Qty: ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm", children: [
                "NPR ",
                (item.price_at_purchase * item.quantity).toFixed(2)
              ] })
            ] }, idx)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500", children: "Total Purchase Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
                "NPR ",
                orderData.total_amount?.toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2", children: "Reason for Return *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors",
                  value: returnReason,
                  onChange: (e) => setReturnReason(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a reason..." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Wrong Size", children: "Wrong Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Defective", children: "Item Defective" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Not as described", children: "Not as described" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Changed mind", children: "Changed my mind" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
                  ]
                }
              )
            ] }),
            returnReason === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-top-2 duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2", children: "Please specify *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  className: "w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors min-h-[100px]",
                  placeholder: "Tell us what went wrong...",
                  value: returnOtherReason,
                  onChange: (e) => setReturnOtherReason(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleReturnOrder,
                  disabled: isReturning,
                  className: "w-full rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors py-6 font-semibold",
                  children: isReturning ? "Submitting..." : "Confirm Return"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  onClick: () => {
                    setShowReturnForm(false);
                    setReturnError("");
                  },
                  disabled: isReturning,
                  className: "w-full uppercase tracking-widest text-zinc-500 hover:text-black hover:bg-zinc-100 py-6",
                  children: "Go Back"
                }
              ),
              returnError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 text-xs mt-2 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                " ",
                returnError
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function isObject$1(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function isRecord(subject) {
  return isObject$1(subject) || Array.isArray(subject);
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function areOptionsEqual(optionsA, optionsB) {
  const optionsAKeys = Object.keys(optionsA);
  const optionsBKeys = Object.keys(optionsB);
  if (optionsAKeys.length !== optionsBKeys.length) return false;
  const breakpointsA = JSON.stringify(Object.keys(optionsA.breakpoints || {}));
  const breakpointsB = JSON.stringify(Object.keys(optionsB.breakpoints || {}));
  if (breakpointsA !== breakpointsB) return false;
  return optionsAKeys.every((key) => {
    const valueA = optionsA[key];
    const valueB = optionsB[key];
    if (typeof valueA === "function") return `${valueA}` === `${valueB}`;
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB;
    return areOptionsEqual(valueA, valueB);
  });
}
function sortAndMapPluginToOptions(plugins) {
  return plugins.concat().sort((a, b) => a.name > b.name ? 1 : -1).map((plugin) => plugin.options);
}
function arePluginsEqual(pluginsA, pluginsB) {
  if (pluginsA.length !== pluginsB.length) return false;
  const optionsA = sortAndMapPluginToOptions(pluginsA);
  const optionsB = sortAndMapPluginToOptions(pluginsB);
  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index];
    return areOptionsEqual(optionA, optionB);
  });
}
function isNumber(subject) {
  return typeof subject === "number";
}
function isString(subject) {
  return typeof subject === "string";
}
function isBoolean(subject) {
  return typeof subject === "boolean";
}
function isObject(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function mathAbs(n) {
  return Math.abs(n);
}
function mathSign(n) {
  return Math.sign(n);
}
function deltaAbs(valueB, valueA) {
  return mathAbs(valueB - valueA);
}
function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0;
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
  return mathAbs(diff / valueB);
}
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}
function arrayKeys(array) {
  return objectKeys(array).map(Number);
}
function arrayLast(array) {
  return array[arrayLastIndex(array)];
}
function arrayLastIndex(array) {
  return Math.max(0, array.length - 1);
}
function arrayIsLastIndex(array, index) {
  return index === arrayLastIndex(array);
}
function arrayFromNumber(n, startAt = 0) {
  return Array.from(Array(n), (_, i) => startAt + i);
}
function objectKeys(object) {
  return Object.keys(object);
}
function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach((key) => {
      const valueA = mergedObjects[key];
      const valueB = currentObject[key];
      const areObjects = isObject(valueA) && isObject(valueB);
      mergedObjects[key] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
    });
    return mergedObjects;
  }, {});
}
function isMouseEvent(evt, ownerWindow) {
  return typeof ownerWindow.MouseEvent !== "undefined" && evt instanceof ownerWindow.MouseEvent;
}
function Alignment(align, viewSize) {
  const predefined = {
    start,
    center,
    end
  };
  function start() {
    return 0;
  }
  function center(n) {
    return end(n) / 2;
  }
  function end(n) {
    return viewSize - n;
  }
  function measure(n, index) {
    if (isString(align)) return predefined[align](n);
    return align(viewSize, n, index);
  }
  const self2 = {
    measure
  };
  return self2;
}
function EventStore() {
  let listeners = [];
  function add(node, type, handler, options = {
    passive: true
  }) {
    let removeListener;
    if ("addEventListener" in node) {
      node.addEventListener(type, handler, options);
      removeListener = () => node.removeEventListener(type, handler, options);
    } else {
      const legacyMediaQueryList = node;
      legacyMediaQueryList.addListener(handler);
      removeListener = () => legacyMediaQueryList.removeListener(handler);
    }
    listeners.push(removeListener);
    return self2;
  }
  function clear() {
    listeners = listeners.filter((remove) => remove());
  }
  const self2 = {
    add,
    clear
  };
  return self2;
}
function Animations(ownerDocument, ownerWindow, update, render) {
  const documentVisibleHandler = EventStore();
  const fixedTimeStep = 1e3 / 60;
  let lastTimeStamp = null;
  let accumulatedTime = 0;
  let animationId = 0;
  function init() {
    documentVisibleHandler.add(ownerDocument, "visibilitychange", () => {
      if (ownerDocument.hidden) reset();
    });
  }
  function destroy() {
    stop();
    documentVisibleHandler.clear();
  }
  function animate(timeStamp) {
    if (!animationId) return;
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp;
      update();
      update();
    }
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    accumulatedTime += timeElapsed;
    while (accumulatedTime >= fixedTimeStep) {
      update();
      accumulatedTime -= fixedTimeStep;
    }
    const alpha = accumulatedTime / fixedTimeStep;
    render(alpha);
    if (animationId) {
      animationId = ownerWindow.requestAnimationFrame(animate);
    }
  }
  function start() {
    if (animationId) return;
    animationId = ownerWindow.requestAnimationFrame(animate);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationId);
    lastTimeStamp = null;
    accumulatedTime = 0;
    animationId = 0;
  }
  function reset() {
    lastTimeStamp = null;
    accumulatedTime = 0;
  }
  const self2 = {
    init,
    destroy,
    start,
    stop,
    update,
    render
  };
  return self2;
}
function Axis(axis, contentDirection) {
  const isRightToLeft = contentDirection === "rtl";
  const isVertical = axis === "y";
  const scroll = isVertical ? "y" : "x";
  const cross = isVertical ? "x" : "y";
  const sign = !isVertical && isRightToLeft ? -1 : 1;
  const startEdge = getStartEdge();
  const endEdge = getEndEdge();
  function measureSize(nodeRect) {
    const {
      height,
      width
    } = nodeRect;
    return isVertical ? height : width;
  }
  function getStartEdge() {
    if (isVertical) return "top";
    return isRightToLeft ? "right" : "left";
  }
  function getEndEdge() {
    if (isVertical) return "bottom";
    return isRightToLeft ? "left" : "right";
  }
  function direction(n) {
    return n * sign;
  }
  const self2 = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  };
  return self2;
}
function Limit(min = 0, max = 0) {
  const length = mathAbs(min - max);
  function reachedMin(n) {
    return n < min;
  }
  function reachedMax(n) {
    return n > max;
  }
  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }
  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max;
  }
  function removeOffset(n) {
    if (!length) return n;
    return n - length * Math.ceil((n - max) / length);
  }
  const self2 = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  };
  return self2;
}
function Counter(max, start, loop) {
  const {
    constrain
  } = Limit(0, max);
  const loopEnd = max + 1;
  let counter = withinLimit(start);
  function withinLimit(n) {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
  }
  function get() {
    return counter;
  }
  function set(n) {
    counter = withinLimit(n);
    return self2;
  }
  function add(n) {
    return clone().set(get() + n);
  }
  function clone() {
    return Counter(max, get(), loop);
  }
  const self2 = {
    get,
    set,
    add,
    clone
  };
  return self2;
}
function DragHandler(axis, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
  const {
    cross: crossAxis,
    direction
  } = axis;
  const focusNodes = ["INPUT", "SELECT", "TEXTAREA"];
  const nonPassiveEvent = {
    passive: false
  };
  const initEvents = EventStore();
  const dragEvents = EventStore();
  const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
  const snapForceBoost = {
    mouse: 300,
    touch: 400
  };
  const freeForceBoost = {
    mouse: 500,
    touch: 600
  };
  const baseSpeed = dragFree ? 43 : 25;
  let isMoving = false;
  let startScroll = 0;
  let startCross = 0;
  let pointerIsDown = false;
  let preventScroll = false;
  let preventClick = false;
  let isMouse = false;
  function init(emblaApi) {
    if (!watchDrag) return;
    function downIfAllowed(evt) {
      if (isBoolean(watchDrag) || watchDrag(emblaApi, evt)) down(evt);
    }
    const node = rootNode;
    initEvents.add(node, "dragstart", (evt) => evt.preventDefault(), nonPassiveEvent).add(node, "touchmove", () => void 0, nonPassiveEvent).add(node, "touchend", () => void 0).add(node, "touchstart", downIfAllowed).add(node, "mousedown", downIfAllowed).add(node, "touchcancel", up).add(node, "contextmenu", up).add(node, "click", click, true);
  }
  function destroy() {
    initEvents.clear();
    dragEvents.clear();
  }
  function addDragEvents() {
    const node = isMouse ? ownerDocument : rootNode;
    dragEvents.add(node, "touchmove", move, nonPassiveEvent).add(node, "touchend", up).add(node, "mousemove", move, nonPassiveEvent).add(node, "mouseup", up);
  }
  function isFocusNode(node) {
    const nodeName = node.nodeName || "";
    return focusNodes.includes(nodeName);
  }
  function forceBoost() {
    const boost = dragFree ? freeForceBoost : snapForceBoost;
    const type = isMouse ? "mouse" : "touch";
    return boost[type];
  }
  function allowedForce(force, targetChanged) {
    const next = index.add(mathSign(force) * -1);
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce;
    if (skipSnaps && targetChanged) return baseForce * 0.5;
    return scrollTarget.byIndex(next.get(), 0).distance;
  }
  function down(evt) {
    const isMouseEvt = isMouseEvent(evt, ownerWindow);
    isMouse = isMouseEvt;
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
    isMoving = deltaAbs(target.get(), location.get()) >= 2;
    if (isMouseEvt && evt.button !== 0) return;
    if (isFocusNode(evt.target)) return;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    scrollBody.useFriction(0).useDuration(0);
    target.set(location);
    addDragEvents();
    startScroll = dragTracker.readPoint(evt);
    startCross = dragTracker.readPoint(evt, crossAxis);
    eventHandler.emit("pointerDown");
  }
  function move(evt) {
    const isTouchEvt = !isMouseEvent(evt, ownerWindow);
    if (isTouchEvt && evt.touches.length >= 2) return up(evt);
    const lastScroll = dragTracker.readPoint(evt);
    const lastCross = dragTracker.readPoint(evt, crossAxis);
    const diffScroll = deltaAbs(lastScroll, startScroll);
    const diffCross = deltaAbs(lastCross, startCross);
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt);
      preventScroll = diffScroll > diffCross;
      if (!preventScroll) return up(evt);
    }
    const diff = dragTracker.pointerMove(evt);
    if (diffScroll > dragThreshold) preventClick = true;
    scrollBody.useFriction(0.3).useDuration(0.75);
    animation.start();
    target.add(direction(diff));
    evt.preventDefault();
  }
  function up(evt) {
    const currentLocation = scrollTarget.byDistance(0, false);
    const targetChanged = currentLocation.index !== index.get();
    const rawForce = dragTracker.pointerUp(evt) * forceBoost();
    const force = allowedForce(direction(rawForce), targetChanged);
    const forceFactor = factorAbs(rawForce, force);
    const speed = baseSpeed - 10 * forceFactor;
    const friction = baseFriction + forceFactor / 50;
    preventScroll = false;
    pointerIsDown = false;
    dragEvents.clear();
    scrollBody.useDuration(speed).useFriction(friction);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    eventHandler.emit("pointerUp");
  }
  function click(evt) {
    if (preventClick) {
      evt.stopPropagation();
      evt.preventDefault();
      preventClick = false;
    }
  }
  function pointerDown() {
    return pointerIsDown;
  }
  const self2 = {
    init,
    destroy,
    pointerDown
  };
  return self2;
}
function DragTracker(axis, ownerWindow) {
  const logInterval = 170;
  let startEvent;
  let lastEvent;
  function readTime(evt) {
    return evt.timeStamp;
  }
  function readPoint(evt, evtAxis) {
    const property = evtAxis || axis.scroll;
    const coord = `client${property === "x" ? "X" : "Y"}`;
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
  }
  function pointerDown(evt) {
    startEvent = evt;
    lastEvent = evt;
    return readPoint(evt);
  }
  function pointerMove(evt) {
    const diff = readPoint(evt) - readPoint(lastEvent);
    const expired = readTime(evt) - readTime(startEvent) > logInterval;
    lastEvent = evt;
    if (expired) startEvent = evt;
    return diff;
  }
  function pointerUp(evt) {
    if (!startEvent || !lastEvent) return 0;
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
    const diffTime = readTime(evt) - readTime(startEvent);
    const expired = readTime(evt) - readTime(lastEvent) > logInterval;
    const force = diffDrag / diffTime;
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
    return isFlick ? force : 0;
  }
  const self2 = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  };
  return self2;
}
function NodeRects() {
  function measure(node) {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = node;
    const offset = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    };
    return offset;
  }
  const self2 = {
    measure
  };
  return self2;
}
function PercentOfView(viewSize) {
  function measure(n) {
    return viewSize * (n / 100);
  }
  const self2 = {
    measure
  };
  return self2;
}
function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects) {
  const observeNodes = [container].concat(slides);
  let resizeObserver;
  let containerSize;
  let slideSizes = [];
  let destroyed = false;
  function readSize(node) {
    return axis.measureSize(nodeRects.measure(node));
  }
  function init(emblaApi) {
    if (!watchResize) return;
    containerSize = readSize(container);
    slideSizes = slides.map(readSize);
    function defaultCallback(entries) {
      for (const entry of entries) {
        if (destroyed) return;
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          emblaApi.reInit();
          eventHandler.emit("resize");
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver((entries) => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node));
    });
  }
  function destroy() {
    destroyed = true;
    if (resizeObserver) resizeObserver.disconnect();
  }
  const self2 = {
    init,
    destroy
  };
  return self2;
}
function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let scrollVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const displacement = target.get() - location.get();
    const isInstant = !scrollDuration;
    let scrollDistance = 0;
    if (isInstant) {
      scrollVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      scrollDistance = displacement;
    } else {
      previousLocation.set(location);
      scrollVelocity += displacement / scrollDuration;
      scrollVelocity *= scrollFriction;
      rawLocation += scrollVelocity;
      location.add(scrollVelocity);
      scrollDistance = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(scrollDistance);
    rawLocationPrevious = rawLocation;
    return self2;
  }
  function settled() {
    const diff = target.get() - offsetLocation.get();
    return mathAbs(diff) < 1e-3;
  }
  function duration() {
    return scrollDuration;
  }
  function direction() {
    return scrollDirection;
  }
  function velocity() {
    return scrollVelocity;
  }
  function useBaseDuration() {
    return useDuration(baseDuration);
  }
  function useBaseFriction() {
    return useFriction(baseFriction);
  }
  function useDuration(n) {
    scrollDuration = n;
    return self2;
  }
  function useFriction(n) {
    scrollFriction = n;
    return self2;
  }
  const self2 = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  };
  return self2;
}
function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
  const pullBackThreshold = percentOfView.measure(10);
  const edgeOffsetTolerance = percentOfView.measure(50);
  const frictionLimit = Limit(0.1, 0.99);
  let disabled = false;
  function shouldConstrain() {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }
  function constrain(pointerDown) {
    if (!shouldConstrain()) return;
    const edge = limit.reachedMin(location.get()) ? "min" : "max";
    const diffToEdge = mathAbs(limit[edge] - location.get());
    const diffToTarget = target.get() - location.get();
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
    target.subtract(diffToTarget * friction);
    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useDuration(25).useBaseFriction();
    }
  }
  function toggleActive(active) {
    disabled = !active;
  }
  const self2 = {
    shouldConstrain,
    constrain,
    toggleActive
  };
  return self2;
}
function ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();
  function usePixelTolerance(bound, snap) {
    return deltaAbs(bound, snap) <= 1;
  }
  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max);
  }
  function measureBounded() {
    return snapsAligned.map((snapAligned, index) => {
      const {
        min,
        max
      } = scrollBounds;
      const snap = scrollBounds.constrain(snapAligned);
      const isFirst = !index;
      const isLast = arrayIsLastIndex(snapsAligned, index);
      if (isFirst) return max;
      if (isLast) return min;
      if (usePixelTolerance(min, snap)) return min;
      if (usePixelTolerance(max, snap)) return max;
      return snap;
    }).map((scrollBound) => parseFloat(scrollBound.toFixed(3)));
  }
  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    if (containScroll === "keepSnaps") return snapsBounded;
    const {
      min,
      max
    } = scrollContainLimit;
    return snapsBounded.slice(min, max);
  }
  const self2 = {
    snapsContained,
    scrollContainLimit
  };
  return self2;
}
function ScrollLimit(contentSize, scrollSnaps, loop) {
  const max = scrollSnaps[0];
  const min = loop ? max - contentSize : arrayLast(scrollSnaps);
  const limit = Limit(min, max);
  const self2 = {
    limit
  };
  return self2;
}
function ScrollLooper(contentSize, limit, location, vectors) {
  const jointSafety = 0.1;
  const min = limit.min + jointSafety;
  const max = limit.max + jointSafety;
  const {
    reachedMin,
    reachedMax
  } = Limit(min, max);
  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }
  function loop(direction) {
    if (!shouldLoop(direction)) return;
    const loopDistance = contentSize * (direction * -1);
    vectors.forEach((v) => v.add(loopDistance));
  }
  const self2 = {
    loop
  };
  return self2;
}
function ScrollProgress(limit) {
  const {
    max,
    length
  } = limit;
  function get(n) {
    const currentLocation = n - max;
    return length ? currentLocation / -length : 0;
  }
  const self2 = {
    get
  };
  return self2;
}
function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
  const {
    startEdge,
    endEdge
  } = axis;
  const {
    groupSlides
  } = slidesToScroll;
  const alignments = measureSizes().map(alignment.measure);
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();
  function measureSizes() {
    return groupSlides(slideRects).map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
  }
  function measureUnaligned() {
    return slideRects.map((rect) => containerRect[startEdge] - rect[startEdge]).map((snap) => -mathAbs(snap));
  }
  function measureAligned() {
    return groupSlides(snaps).map((g) => g[0]).map((snap, index) => snap + alignments[index]);
  }
  const self2 = {
    snaps,
    snapsAligned
  };
  return self2;
}
function SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
  const {
    groupSlides
  } = slidesToScroll;
  const {
    min,
    max
  } = scrollContainLimit;
  const slideRegistry = createSlideRegistry();
  function createSlideRegistry() {
    const groupedSlideIndexes = groupSlides(slideIndexes);
    const doNotContain = !containSnaps || containScroll === "keepSnaps";
    if (scrollSnaps.length === 1) return [slideIndexes];
    if (doNotContain) return groupedSlideIndexes;
    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(groups, index);
      if (isFirst) {
        const range = arrayLast(groups[0]) + 1;
        return arrayFromNumber(range);
      }
      if (isLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
        return arrayFromNumber(range, arrayLast(groups)[0]);
      }
      return group;
    });
  }
  const self2 = {
    slideRegistry
  };
  return self2;
}
function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
  const {
    reachedAny,
    removeOffset,
    constrain
  } = limit;
  function minDistance(distances) {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0];
  }
  function findTargetSnap(target) {
    const distance = loop ? removeOffset(target) : constrain(target);
    const ascDiffsToSnaps = scrollSnaps.map((snap, index2) => ({
      diff: shortcut(snap - distance, 0),
      index: index2
    })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
    const {
      index
    } = ascDiffsToSnaps[0];
    return {
      index,
      distance
    };
  }
  function shortcut(target, direction) {
    const targets = [target, target + contentSize, target - contentSize];
    if (!loop) return target;
    if (!direction) return minDistance(targets);
    const matchingTargets = targets.filter((t) => mathSign(t) === direction);
    if (matchingTargets.length) return minDistance(matchingTargets);
    return arrayLast(targets) - contentSize;
  }
  function byIndex(index, direction) {
    const diffToSnap = scrollSnaps[index] - targetVector.get();
    const distance = shortcut(diffToSnap, direction);
    return {
      index,
      distance
    };
  }
  function byDistance(distance, snap) {
    const target = targetVector.get() + distance;
    const {
      index,
      distance: targetSnapDistance
    } = findTargetSnap(target);
    const reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index,
      distance
    };
    const diffToSnap = scrollSnaps[index] - targetSnapDistance;
    const snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index,
      distance: snapDistance
    };
  }
  const self2 = {
    byDistance,
    byIndex,
    shortcut
  };
  return self2;
}
function ScrollTo(animation, indexCurrent, indexPrevious, scrollBody, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start();
      } else {
        animation.update();
        animation.render(1);
        animation.update();
      }
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      eventHandler.emit("select");
    }
  }
  function distance(n, snap) {
    const target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }
  function index(n, direction) {
    const targetIndex = indexCurrent.clone().set(n);
    const target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }
  const self2 = {
    distance,
    index
  };
  return self2;
}
function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus) {
  const focusListenerOptions = {
    passive: true,
    capture: true
  };
  let lastTabPressTime = 0;
  function init(emblaApi) {
    if (!watchFocus) return;
    function defaultCallback(index) {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      eventHandler.emit("slideFocusStart");
      root.scrollLeft = 0;
      const group = slideRegistry.findIndex((group2) => group2.includes(index));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit("slideFocus");
    }
    eventStore.add(document, "keydown", registerTabPress, false);
    slides.forEach((slide, slideIndex) => {
      eventStore.add(slide, "focus", (evt) => {
        if (isBoolean(watchFocus) || watchFocus(emblaApi, evt)) {
          defaultCallback(slideIndex);
        }
      }, focusListenerOptions);
    });
  }
  function registerTabPress(event) {
    if (event.code === "Tab") lastTabPressTime = (/* @__PURE__ */ new Date()).getTime();
  }
  const self2 = {
    init
  };
  return self2;
}
function Vector1D(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(n) {
    value = normalizeInput(n);
  }
  function add(n) {
    value += normalizeInput(n);
  }
  function subtract(n) {
    value -= normalizeInput(n);
  }
  function normalizeInput(n) {
    return isNumber(n) ? n : n.get();
  }
  const self2 = {
    get,
    set,
    add,
    subtract
  };
  return self2;
}
function Translate(axis, container) {
  const translate = axis.scroll === "x" ? x : y;
  const containerStyle = container.style;
  let previousTarget = null;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    const newTarget = roundToTwoDecimals(axis.direction(target));
    if (newTarget === previousTarget) return;
    containerStyle.transform = translate(newTarget);
    previousTarget = newTarget;
  }
  function toggleActive(active) {
    disabled = !active;
  }
  function clear() {
    if (disabled) return;
    containerStyle.transform = "";
    if (!container.getAttribute("style")) container.removeAttribute("style");
  }
  const self2 = {
    clear,
    to,
    toggleActive
  };
  return self2;
}
function SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides) {
  const roundingSafety = 0.5;
  const ascItems = arrayKeys(slideSizesWithGaps);
  const descItems = arrayKeys(slideSizesWithGaps).reverse();
  const loopPoints = startPoints().concat(endPoints());
  function removeSlideSizes(indexes, from) {
    return indexes.reduce((a, i) => {
      return a - slideSizesWithGaps[i];
    }, from);
  }
  function slidesInGap(indexes, gap) {
    return indexes.reduce((a, i) => {
      const remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }
  function findSlideBounds(offset) {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }));
  }
  function findLoopPoints(indexes, offset, isEndEdge) {
    const slideBounds = findSlideBounds(offset);
    return indexes.map((index) => {
      const initial = isEndEdge ? 0 : -contentSize;
      const altered = isEndEdge ? contentSize : 0;
      const boundEdge = isEndEdge ? "end" : "start";
      const loopPoint = slideBounds[index][boundEdge];
      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index]),
        target: () => location.get() > loopPoint ? initial : altered
      };
    });
  }
  function startPoints() {
    const gap = scrollSnaps[0];
    const indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, contentSize, false);
  }
  function endPoints() {
    const gap = viewSize - scrollSnaps[0] - 1;
    const indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, -contentSize, true);
  }
  function canLoop() {
    return loopPoints.every(({
      index
    }) => {
      const otherIndexes = ascItems.filter((i) => i !== index);
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
    });
  }
  function loop() {
    loopPoints.forEach((loopPoint) => {
      const {
        target,
        translate,
        slideLocation
      } = loopPoint;
      const shiftLocation = target();
      if (shiftLocation === slideLocation.get()) return;
      translate.to(shiftLocation);
      slideLocation.set(shiftLocation);
    });
  }
  function clear() {
    loopPoints.forEach((loopPoint) => loopPoint.translate.clear());
  }
  const self2 = {
    canLoop,
    clear,
    loop,
    loopPoints
  };
  return self2;
}
function SlidesHandler(container, eventHandler, watchSlides) {
  let mutationObserver;
  let destroyed = false;
  function init(emblaApi) {
    if (!watchSlides) return;
    function defaultCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          emblaApi.reInit();
          eventHandler.emit("slidesChanged");
          break;
        }
      }
    }
    mutationObserver = new MutationObserver((mutations) => {
      if (destroyed) return;
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations);
      }
    });
    mutationObserver.observe(container, {
      childList: true
    });
  }
  function destroy() {
    if (mutationObserver) mutationObserver.disconnect();
    destroyed = true;
  }
  const self2 = {
    init,
    destroy
  };
  return self2;
}
function SlidesInView(container, slides, eventHandler, threshold) {
  const intersectionEntryMap = {};
  let inViewCache = null;
  let notInViewCache = null;
  let intersectionObserver;
  let destroyed = false;
  function init() {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (destroyed) return;
      entries.forEach((entry) => {
        const index = slides.indexOf(entry.target);
        intersectionEntryMap[index] = entry;
      });
      inViewCache = null;
      notInViewCache = null;
      eventHandler.emit("slidesInView");
    }, {
      root: container.parentElement,
      threshold
    });
    slides.forEach((slide) => intersectionObserver.observe(slide));
  }
  function destroy() {
    if (intersectionObserver) intersectionObserver.disconnect();
    destroyed = true;
  }
  function createInViewList(inView) {
    return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index = parseInt(slideIndex);
      const {
        isIntersecting
      } = intersectionEntryMap[index];
      const inViewMatch = inView && isIntersecting;
      const notInViewMatch = !inView && !isIntersecting;
      if (inViewMatch || notInViewMatch) list.push(index);
      return list;
    }, []);
  }
  function get(inView = true) {
    if (inView && inViewCache) return inViewCache;
    if (!inView && notInViewCache) return notInViewCache;
    const slideIndexes = createInViewList(inView);
    if (inView) inViewCache = slideIndexes;
    if (!inView) notInViewCache = slideIndexes;
    return slideIndexes;
  }
  const self2 = {
    init,
    destroy,
    get
  };
  return self2;
}
function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
  const {
    measureSize,
    startEdge,
    endEdge
  } = axis;
  const withEdgeGap = slideRects[0] && readEdgeGap;
  const startGap = measureStartGap();
  const endGap = measureEndGap();
  const slideSizes = slideRects.map(measureSize);
  const slideSizesWithGaps = measureWithGaps();
  function measureStartGap() {
    if (!withEdgeGap) return 0;
    const slideRect = slideRects[0];
    return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
  }
  function measureEndGap() {
    if (!withEdgeGap) return 0;
    const style = ownerWindow.getComputedStyle(arrayLast(slides));
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`));
  }
  function measureWithGaps() {
    return slideRects.map((rect, index, rects) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(rects, index);
      if (isFirst) return slideSizes[index] + startGap;
      if (isLast) return slideSizes[index] + endGap;
      return rects[index + 1][startEdge] - rect[startEdge];
    }).map(mathAbs);
  }
  const self2 = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  };
  return self2;
}
function SlidesToScroll(axis, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap, pixelTolerance) {
  const {
    startEdge,
    endEdge,
    direction
  } = axis;
  const groupByNumber = isNumber(slidesToScroll);
  function byNumber(array, groupSize) {
    return arrayKeys(array).filter((i) => i % groupSize === 0).map((i) => array.slice(i, i + groupSize));
  }
  function bySize(array) {
    if (!array.length) return [];
    return arrayKeys(array).reduce((groups, rectB, index) => {
      const rectA = arrayLast(groups) || 0;
      const isFirst = rectA === 0;
      const isLast = rectB === arrayLastIndex(array);
      const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
      const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
      const gapA = !loop && isFirst ? direction(startGap) : 0;
      const gapB = !loop && isLast ? direction(endGap) : 0;
      const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
      if (index && chunkSize > viewSize + pixelTolerance) groups.push(rectB);
      if (isLast) groups.push(array.length);
      return groups;
    }, []).map((currentSize, index, groups) => {
      const previousSize = Math.max(groups[index - 1] || 0);
      return array.slice(previousSize, currentSize);
    });
  }
  function groupSlides(array) {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
  }
  const self2 = {
    groupSlides
  };
  return self2;
}
function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler) {
  const {
    align,
    axis: scrollAxis,
    direction,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag,
    watchFocus
  } = options;
  const pixelTolerance = 2;
  const nodeRects = NodeRects();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);
  const axis = Axis(scrollAxis, direction);
  const viewSize = axis.measureSize(containerRect);
  const percentOfView = PercentOfView(viewSize);
  const alignment = Alignment(align, viewSize);
  const containSnaps = !loop && !!containScroll;
  const readEdgeGap = loop || !!containScroll;
  const {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
  const slidesToScroll = SlidesToScroll(axis, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap, pixelTolerance);
  const {
    snaps,
    snapsAligned
  } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
  const {
    snapsContained,
    scrollContainLimit
  } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance);
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
  const {
    limit
  } = ScrollLimit(contentSize, scrollSnaps, loop);
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
  const indexPrevious = index.clone();
  const slideIndexes = arrayKeys(slides);
  const update = ({
    dragHandler,
    scrollBody: scrollBody2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }) => {
    if (!loop2) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody2.seek();
  };
  const render = ({
    scrollBody: scrollBody2,
    translate,
    location: location2,
    offsetLocation: offsetLocation2,
    previousLocation: previousLocation2,
    scrollLooper,
    slideLooper,
    dragHandler,
    animation: animation2,
    eventHandler: eventHandler2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }, alpha) => {
    const shouldSettle = scrollBody2.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop2 ? shouldSettle : shouldSettle && withinBounds;
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown();
    if (hasSettledAndIdle) animation2.stop();
    const interpolatedLocation = location2.get() * alpha + previousLocation2.get() * (1 - alpha);
    offsetLocation2.set(interpolatedLocation);
    if (loop2) {
      scrollLooper.loop(scrollBody2.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation2.get());
    if (hasSettledAndIdle) eventHandler2.emit("settle");
    if (!hasSettled) eventHandler2.emit("scroll");
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine), (alpha) => render(engine, alpha));
  const friction = 0.68;
  const startLocation = scrollSnaps[index.get()];
  const location = Vector1D(startLocation);
  const previousLocation = Vector1D(startLocation);
  const offsetLocation = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, offsetLocation, previousLocation, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index, indexPrevious, scrollBody, scrollTarget, target, eventHandler);
  const scrollProgress = ScrollProgress(limit);
  const eventStore = EventStore();
  const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
  const {
    slideRegistry
  } = SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus);
  const engine = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    dragHandler: DragHandler(axis, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, offsetLocation, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, previousLocation, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, container)
  };
  return engine;
}
function EventHandler() {
  let listeners = {};
  let api;
  function init(emblaApi) {
    api = emblaApi;
  }
  function getListeners(evt) {
    return listeners[evt] || [];
  }
  function emit(evt) {
    getListeners(evt).forEach((e) => e(api, evt));
    return self2;
  }
  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self2;
  }
  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb);
    return self2;
  }
  function clear() {
    listeners = {};
  }
  const self2 = {
    init,
    emit,
    off,
    on,
    clear
  };
  return self2;
}
const defaultOptions$1 = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true
};
function OptionsHandler(ownerWindow) {
  function mergeOptions(optionsA, optionsB) {
    return objectsMergeDeep(optionsA, optionsB || {});
  }
  function optionsAtMedia(options) {
    const optionsAtMedia2 = options.breakpoints || {};
    const matchedMediaOptions = objectKeys(optionsAtMedia2).filter((media) => ownerWindow.matchMedia(media).matches).map((media) => optionsAtMedia2[media]).reduce((a, mediaOption) => mergeOptions(a, mediaOption), {});
    return mergeOptions(options, matchedMediaOptions);
  }
  function optionsMediaQueries(optionsList) {
    return optionsList.map((options) => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
  }
  const self2 = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  };
  return self2;
}
function PluginsHandler(optionsHandler) {
  let activePlugins = [];
  function init(emblaApi, plugins) {
    activePlugins = plugins.filter(({
      options
    }) => optionsHandler.optionsAtMedia(options).active !== false);
    activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler));
    return plugins.reduce((map, plugin) => Object.assign(map, {
      [plugin.name]: plugin
    }), {});
  }
  function destroy() {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy());
  }
  const self2 = {
    init,
    destroy
  };
  return self2;
}
function EmblaCarousel(root, userOptions, userPlugins) {
  const ownerDocument = root.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const optionsHandler = OptionsHandler(ownerWindow);
  const pluginsHandler = PluginsHandler(optionsHandler);
  const mediaHandlers = EventStore();
  const eventHandler = EventHandler();
  const {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  } = optionsHandler;
  const {
    on,
    off,
    emit
  } = eventHandler;
  const reInit = reActivate;
  let destroyed = false;
  let engine;
  let optionsBase = mergeOptions(defaultOptions$1, EmblaCarousel.globalOptions);
  let options = mergeOptions(optionsBase);
  let pluginList = [];
  let pluginApis;
  let container;
  let slides;
  function storeElements() {
    const {
      container: userContainer,
      slides: userSlides
    } = options;
    const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
    container = customContainer || root.children[0];
    const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
    slides = [].slice.call(customSlides || container.children);
  }
  function createEngine(options2) {
    const engine2 = Engine(root, container, slides, ownerDocument, ownerWindow, options2, eventHandler);
    if (options2.loop && !engine2.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options2, {
        loop: false
      });
      return createEngine(optionsWithoutLoop);
    }
    return engine2;
  }
  function activate(withOptions, withPlugins) {
    if (destroyed) return;
    optionsBase = mergeOptions(optionsBase, withOptions);
    options = optionsAtMedia(optionsBase);
    pluginList = withPlugins || pluginList;
    storeElements();
    engine = createEngine(options);
    optionsMediaQueries([optionsBase, ...pluginList.map(({
      options: options2
    }) => options2)]).forEach((query) => mediaHandlers.add(query, "change", reActivate));
    if (!options.active) return;
    engine.translate.to(engine.location.get());
    engine.animation.init();
    engine.slidesInView.init();
    engine.slideFocus.init(self2);
    engine.eventHandler.init(self2);
    engine.resizeHandler.init(self2);
    engine.slidesHandler.init(self2);
    if (engine.options.loop) engine.slideLooper.loop();
    if (container.offsetParent && slides.length) engine.dragHandler.init(self2);
    pluginApis = pluginsHandler.init(self2, pluginList);
  }
  function reActivate(withOptions, withPlugins) {
    const startIndex = selectedScrollSnap();
    deActivate();
    activate(mergeOptions({
      startIndex
    }, withOptions), withPlugins);
    eventHandler.emit("reInit");
  }
  function deActivate() {
    engine.dragHandler.destroy();
    engine.eventStore.clear();
    engine.translate.clear();
    engine.slideLooper.clear();
    engine.resizeHandler.destroy();
    engine.slidesHandler.destroy();
    engine.slidesInView.destroy();
    engine.animation.destroy();
    pluginsHandler.destroy();
    mediaHandlers.clear();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    mediaHandlers.clear();
    deActivate();
    eventHandler.emit("destroy");
    eventHandler.clear();
  }
  function scrollTo(index, jump, direction) {
    if (!options.active || destroyed) return;
    engine.scrollBody.useBaseFriction().useDuration(jump === true ? 0 : options.duration);
    engine.scrollTo.index(index, direction || 0);
  }
  function scrollNext(jump) {
    const next = engine.index.add(1).get();
    scrollTo(next, jump, -1);
  }
  function scrollPrev(jump) {
    const prev = engine.index.add(-1).get();
    scrollTo(prev, jump, 1);
  }
  function canScrollNext() {
    const next = engine.index.add(1).get();
    return next !== selectedScrollSnap();
  }
  function canScrollPrev() {
    const prev = engine.index.add(-1).get();
    return prev !== selectedScrollSnap();
  }
  function scrollSnapList() {
    return engine.scrollSnapList;
  }
  function scrollProgress() {
    return engine.scrollProgress.get(engine.offsetLocation.get());
  }
  function selectedScrollSnap() {
    return engine.index.get();
  }
  function previousScrollSnap() {
    return engine.indexPrevious.get();
  }
  function slidesInView() {
    return engine.slidesInView.get();
  }
  function slidesNotInView() {
    return engine.slidesInView.get(false);
  }
  function plugins() {
    return pluginApis;
  }
  function internalEngine() {
    return engine;
  }
  function rootNode() {
    return root;
  }
  function containerNode() {
    return container;
  }
  function slideNodes() {
    return slides;
  }
  const self2 = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  };
  activate(userOptions, userPlugins);
  setTimeout(() => eventHandler.emit("init"), 0);
  return self2;
}
EmblaCarousel.globalOptions = void 0;
function useEmblaCarousel(options = {}, plugins = []) {
  const storedOptions = reactExports.useRef(options);
  const storedPlugins = reactExports.useRef(plugins);
  const [emblaApi, setEmblaApi] = reactExports.useState();
  const [viewport, setViewport] = reactExports.useState();
  const reInit = reactExports.useCallback(() => {
    if (emblaApi) emblaApi.reInit(storedOptions.current, storedPlugins.current);
  }, [emblaApi]);
  reactExports.useEffect(() => {
    if (areOptionsEqual(storedOptions.current, options)) return;
    storedOptions.current = options;
    reInit();
  }, [options, reInit]);
  reactExports.useEffect(() => {
    if (arePluginsEqual(storedPlugins.current, plugins)) return;
    storedPlugins.current = plugins;
    reInit();
  }, [plugins, reInit]);
  reactExports.useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions;
      const newEmblaApi = EmblaCarousel(viewport, storedOptions.current, storedPlugins.current);
      setEmblaApi(newEmblaApi);
      return () => newEmblaApi.destroy();
    } else {
      setEmblaApi(void 0);
    }
  }, [viewport, setEmblaApi]);
  return [setViewport, emblaApi];
}
useEmblaCarousel.globalOptions = void 0;
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      "data-slot": "carousel-previous",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      "data-slot": "carousel-next",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}
function CuratedCarousel({ products, title = "Curated Essentials" }) {
  if (!products || products.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-24 text-center text-zinc-500", children: "No curated essentials found. Add some in the admin panel!" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Carousel,
    {
      opts: {
        align: "start",
        loop: true
      },
      className: "w-full relative",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-6xl tracking-tight text-black max-w-md", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-4 w-full md:w-auto mt-4 md:mt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/collections", className: "text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors", children: "View All Pieces" }),
            products.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "static translate-y-0 text-black border-zinc-200 h-8 w-8 md:h-10 md:w-10 hover:bg-zinc-100" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "static translate-y-0 text-black border-zinc-200 h-8 w-8 md:h-10 md:w-10 hover:bg-zinc-100" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { className: "-ml-4 sm:-ml-8", children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "pl-4 sm:pl-8 sm:basis-1/2 md:basis-1/3 lg:basis-1/4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/${product.id}`, className: "group cursor-pointer block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: product.thumbnail_image_url || product.annotated_image_url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
                alt: product.name,
                fill: true,
                className: `object-cover object-center transition-all duration-700 group-hover:scale-105 ${product.hover_image_url ? "group-hover:opacity-0" : ""}`
              }
            ),
            product.hover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: product.hover_image_url,
                alt: `${product.name} hover`,
                fill: true,
                className: "object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xl:flex-row justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base sm:text-lg md:text-xl mb-1 mt-2 text-black", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs sm:text-sm", children: product.short_description || "Premium Quality" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-sans text-sm mt-1 xl:mt-2 text-black", children: [
              "NPR ",
              product.base_price.toFixed(2)
            ] })
          ] })
        ] }) }, product.id)) })
      ]
    }
  );
}
const API = "http://192.168.1.78:8000/api/v1";
const POPULAR_TERMS = ["Oxfords", "Loafers", "Boots", "Sneakers", "Leather", "Suede"];
function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [popular, setPopular] = reactExports.useState([]);
  const [searching, setSearching] = reactExports.useState(false);
  const [loadingPopular, setLoadingPopular] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (popular.length === 0) {
        setLoadingPopular(true);
        fetch(`${API}/products?limit=6&sort=recommended`).then((r2) => r2.json()).then((d) => setPopular(d.data || [])).catch(() => {
        }).finally(() => setLoadingPopular(false));
      }
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);
  const doSearch = reactExports.useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`${API}/products?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      setResults(data.data || []);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length === 0) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(() => doSearch(query), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const isTyping = query.length > 0;
  const productImage = (p) => p.thumbnail_image_url || p.hover_image_url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop";
  const filteredSuggestions = isTyping ? POPULAR_TERMS.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : POPULAR_TERMS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[80] flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative w-full bg-white transition-all duration-500 overflow-y-auto shadow-2xl origin-top animate-in slide-in-from-top-4 ${isTyping ? "h-screen" : "h-[70vh] md:h-[55vh]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white z-10 border-b border-zinc-100 flex items-center px-6 md:px-12 py-4 md:py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center bg-zinc-100/80 hover:bg-zinc-100 transition-colors rounded-full px-5 py-3", children: [
          searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-zinc-400 mr-3 shrink-0 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-zinc-500 mr-3 shrink-0", strokeWidth: 1.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "text",
              placeholder: "Search for products, materials…",
              className: "flex-1 text-base md:text-lg font-serif text-black placeholder:text-zinc-400 outline-none bg-transparent",
              value: query,
              onChange: (e) => setQuery(e.target.value)
            }
          ),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuery(""), className: "p-1 -mr-1 text-zinc-400 hover:text-black transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "ml-4 md:ml-8 px-4 py-2 border border-zinc-200 rounded-full font-sans text-xs tracking-widest uppercase text-zinc-600 hover:text-black hover:border-black transition-colors",
            children: "Close"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-12 py-8 md:py-12 max-w-[1400px] mx-auto animate-in fade-in duration-500 delay-150 fill-mode-both", children: !isTyping ? (
        /* ── Empty state: popular products ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4 md:mb-6", children: "Popular Right Now" }),
          loadingPopular ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-zinc-300" }) }) : popular.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6", children: popular.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/products/${item.id}`, className: "group block cursor-pointer", onClick: onClose, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] bg-zinc-100 mb-2 overflow-hidden", children: productImage(item) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: productImage(item),
                alt: item.name,
                fill: true,
                className: "object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply",
                sizes: "(max-width: 768px) 33vw, 15vw"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-zinc-200" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-sm text-black group-hover:underline underline-offset-4 decoration-zinc-300 leading-tight line-clamp-2", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-400 mt-0.5 font-sans", children: [
              "NPR ",
              item.base_price.toLocaleString()
            ] })
          ] }, item.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-300 font-serif italic text-lg", children: "No products found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mr-2 self-center", children: "Try:" }),
            POPULAR_TERMS.map((term) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setQuery(term),
                className: "px-3 py-1 border border-zinc-200 rounded-full text-xs text-zinc-600 hover:border-black hover:text-black transition-colors",
                children: term
              },
              term
            ))
          ] })
        ] })
      ) : (
        /* ── Active search state ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4", children: "Suggestions" }),
            filteredSuggestions.length > 0 ? filteredSuggestions.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setQuery(s),
                className: "text-left font-serif text-2xl md:text-3xl text-zinc-400 hover:text-black hover:italic transition-all py-2",
                children: s
              },
              idx
            )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 font-serif italic text-lg", children: "No suggestions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-8", children: searching ? "Searching…" : `Products ${results.length > 0 ? `(${results.length})` : ""}` }),
            searching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-zinc-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif italic text-lg", children: "Looking for results…" })
            ] }) : results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-6", children: results.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `/products/${product.id}`,
                className: "flex items-center gap-6 group cursor-pointer",
                onClick: onClose,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 aspect-[4/5] bg-zinc-100 shrink-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Image,
                    {
                      src: productImage(product),
                      alt: product.name,
                      fill: true,
                      className: "object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply",
                      sizes: "96px"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 border-b border-zinc-100 pb-2 group-hover:border-black transition-colors self-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-xl text-black", children: product.name }),
                    product.short_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 mt-0.5 line-clamp-1", children: product.short_description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-sans text-xs tracking-widest uppercase text-zinc-500 mt-2", children: [
                      "NPR ",
                      product.base_price.toLocaleString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-4 self-end pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-zinc-300 group-hover:text-black transition-all -ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 duration-300" }) })
                ]
              },
              product.id
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-400 font-serif italic text-lg", children: [
                "No products found for “",
                query,
                "”"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-400", children: "Try a different keyword or browse our collections." })
            ] })
          ] })
        ] })
      ) })
    ] })
  ] });
}
function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const [isSearchOpen, setIsSearchOpen] = reactExports.useState(false);
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const isPrivacyPage = pathname === "/privacy";
  const { items, getCartTotal } = useCartStore();
  reactExports.useEffect(() => {
    setIsMounted(true);
  }, []);
  const totalItems = isMounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const cartTotal = isMounted ? getCartTotal() : 0;
  reactExports.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  reactExports.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  if (isPrivacyPage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed w-full top-0 z-50 flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md border-b border-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-2xl tracking-tight text-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "COSELI" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium tracking-wide text-zinc-600 hover:text-black transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "BACK TO HOME" }) })
    ] });
  }
  const navLinks = [
    { name: "SHOP", href: "/" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "ATELIER", href: "/atelier" },
    { name: "CONTACT", href: "/contact" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed w-full top-0 z-[70] flex items-center justify-between px-6 md:px-8 py-4 md:py-6 bg-white/50 backdrop-blur-md border-b border-zinc-100 transition-all duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-2xl tracking-tight text-black z-[60]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "COSELI" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex gap-8 text-sm font-medium tracking-wide text-zinc-600", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link.href, className: "hover:text-black transition-colors", children: link.name }, link.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 md:gap-6 text-sm font-medium z-[60]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsSearchOpen(true),
            className: "hover:opacity-60 transition-opacity p-2 -mr-2 cursor-pointer",
            "aria-label": "Open search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-black", strokeWidth: 1.5 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/cart", className: "relative flex items-center hover:opacity-70 transition-opacity py-4 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "svg-icon icon-bag w-[22px] h-[22px] text-black", viewBox: "0 0 21 20", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("desc", { children: "Bag Icon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M1.09053 5.00869H17.9096L18.9818 15.445C19.1672 17.0769 17.9119 18.51 16.2913 18.51L2.7087 18.51C1.08808 18.51 -0.167246 17.0769 0.0181994 15.445L1.09053 5.00869ZM2.40808 6.50869L1.48668 15.6168C1.40224 16.3599 1.97334 17.01 2.7087 17.01L16.2913 17.01C17.0267 17.01 17.5977 16.3599 17.5133 15.6168L16.592 6.50869H2.40808Z", transform: "translate(1)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M7.3466 0.622759C7.90387 0.233871 8.61575 0 9.49996 0C10.3842 0 11.0961 0.233871 11.6533 0.622759C12.2048 1.00762 12.5612 1.51352 12.7903 1.99321C13.0183 2.47048 13.1286 2.93833 13.183 3.2803C13.2105 3.45311 13.2246 3.59868 13.2317 3.70389C13.2353 3.75662 13.2372 3.79958 13.2382 3.83116C13.2387 3.84696 13.239 3.85994 13.2392 3.86992L13.2393 3.8826L13.2394 3.88722L13.2394 3.88908C13.2394 3.88908 13.2394 3.89065 12.5002 3.89065C11.7612 3.90271 11.7611 3.89133 11.7611 3.89133L11.7611 3.89294L11.7608 3.8796C11.7603 3.86517 11.7593 3.84065 11.757 3.80751C11.7525 3.74096 11.7431 3.64118 11.7237 3.51955C11.6844 3.27264 11.6072 2.95533 11.4601 2.64744C11.3142 2.34196 11.108 2.06271 10.8157 1.85869C10.5291 1.65871 10.1159 1.5 9.49996 1.5C8.88403 1.5 8.47081 1.65871 8.18424 1.85869C7.8919 2.06271 7.68573 2.34196 7.53981 2.64744C7.39275 2.95533 7.31551 3.27264 7.2762 3.51955C7.25684 3.64118 7.24742 3.74096 7.24288 3.80751C7.24062 3.84065 7.23959 3.86517 7.23913 3.8796L7.23879 3.89337L7.23878 3.89193C7.23878 3.89193 7.23878 3.89065 6.49968 3.89065C5.76057 3.89065 5.76057 3.8899 5.76057 3.8899L5.76058 3.88722L5.7606 3.8826L5.76075 3.86992C5.7609 3.85994 5.76118 3.84696 5.76169 3.83116C5.76269 3.79958 5.7646 3.75662 5.76819 3.70389C5.77537 3.59868 5.7894 3.45311 5.81691 3.2803C5.87136 2.93833 5.98164 2.47048 6.20961 1.99321C6.43873 1.51352 6.79512 1.00762 7.3466 0.622759Z", transform: "translate(1)" })
            ] }),
            isMounted && totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-[12px] -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full", children: totalItems })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 top-[64px] md:top-[80px] bg-black/40 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 md:hidden z-40 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-[64px] md:top-[80px] left-0 w-full md:absolute md:top-[calc(100%+1px)] md:left-auto md:right-0 md:w-80 bg-white md:border border-zinc-200 border-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 md:translate-y-2 group-hover:translate-y-0 z-50 flex flex-col cursor-default", children: isMounted && items.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-zinc-100 flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 aspect-[4/5] bg-zinc-50 shrink-0 border border-zinc-100 mix-blend-multiply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Image,
                {
                  src: item.image,
                  alt: item.name,
                  fill: true,
                  className: "object-cover object-center"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/products/${item.productId}`, className: "font-serif text-base text-black leading-tight mb-1 hover:opacity-70 transition-opacity", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-zinc-500 mb-2", children: [
                  item.color,
                  " / ",
                  item.size,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 mx-1", children: "|" }),
                  " Qty: ",
                  item.quantity
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-black text-sm", children: [
                  "NPR ",
                  item.price.toFixed(2)
                ] })
              ] })
            ] }, item.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-zinc-50 border-t border-zinc-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-600", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-black", children: [
                  "NPR ",
                  cartTotal.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CheckoutButton,
                {
                  href: "/checkout",
                  text: "Checkout",
                  className: "w-full py-6 text-xs"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/cart", className: "text-xs text-zinc-500 hover:text-black underline underline-offset-4 transition-colors", children: "View Cart" }) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center bg-white flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 mb-4 font-sans", children: "Your shopping bag is empty." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/collections", className: "text-xs text-black border-b border-black font-medium pb-0.5 tracking-widest uppercase hover:text-zinc-500 hover:border-zinc-500 transition-colors", children: "Start Shopping" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            className: "md:hidden p-2 -mr-2 text-zinc-600 hover:text-black transition-colors",
            "aria-label": "Toggle menu",
            children: isMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `fixed inset-0 bg-white z-[55] md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-8", children: [
          navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: link.href,
              className: "font-serif text-xl tracking-[0.2em] uppercase text-black hover:italic transition-all duration-300",
              children: link.name
            },
            link.name
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center gap-4 text-xs font-sans tracking-[0.2em] text-zinc-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "KATHMANDU, NEPAL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2024 COSELI ATELIER" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchModal, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) })
  ] });
}
const defaultOptions = {
  active: true,
  breakpoints: {},
  delay: 4e3,
  jump: false,
  playOnInit: true,
  stopOnFocusIn: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  stopOnLastSnap: false,
  rootNode: null
};
function normalizeDelay(emblaApi, delay) {
  const scrollSnaps = emblaApi.scrollSnapList();
  if (typeof delay === "number") {
    return scrollSnaps.map(() => delay);
  }
  return delay(scrollSnaps, emblaApi);
}
function getAutoplayRootNode(emblaApi, rootNode) {
  const emblaRootNode = emblaApi.rootNode();
  return rootNode && rootNode(emblaRootNode) || emblaRootNode;
}
function Autoplay(userOptions = {}) {
  let options;
  let emblaApi;
  let destroyed;
  let delay;
  let timerStartTime = null;
  let timerId = 0;
  let autoplayActive = false;
  let mouseIsOver = false;
  let playOnDocumentVisible = false;
  let jump = false;
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance;
    const {
      mergeOptions,
      optionsAtMedia
    } = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    if (emblaApi.scrollSnapList().length <= 1) return;
    jump = options.jump;
    destroyed = false;
    delay = normalizeDelay(emblaApi, options.delay);
    const {
      eventStore,
      ownerDocument
    } = emblaApi.internalEngine();
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag;
    const root = getAutoplayRootNode(emblaApi, options.rootNode);
    eventStore.add(ownerDocument, "visibilitychange", visibilityChange);
    if (isDraggable) {
      emblaApi.on("pointerDown", pointerDown);
    }
    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on("pointerUp", pointerUp);
    }
    if (options.stopOnMouseEnter) {
      eventStore.add(root, "mouseenter", mouseEnter);
    }
    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, "mouseleave", mouseLeave);
    }
    if (options.stopOnFocusIn) {
      emblaApi.on("slideFocusStart", stopAutoplay);
    }
    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), "focusout", startAutoplay);
    }
    if (options.playOnInit) startAutoplay();
  }
  function destroy() {
    emblaApi.off("pointerDown", pointerDown).off("pointerUp", pointerUp).off("slideFocusStart", stopAutoplay);
    stopAutoplay();
    destroyed = true;
    autoplayActive = false;
  }
  function setTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId);
    timerId = ownerWindow.setTimeout(next, delay[emblaApi.selectedScrollSnap()]);
    timerStartTime = (/* @__PURE__ */ new Date()).getTime();
    emblaApi.emit("autoplay:timerset");
  }
  function clearTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId);
    timerId = 0;
    timerStartTime = null;
    emblaApi.emit("autoplay:timerstopped");
  }
  function startAutoplay() {
    if (destroyed) return;
    if (documentIsHidden()) {
      playOnDocumentVisible = true;
      return;
    }
    if (!autoplayActive) emblaApi.emit("autoplay:play");
    setTimer();
    autoplayActive = true;
  }
  function stopAutoplay() {
    if (destroyed) return;
    if (autoplayActive) emblaApi.emit("autoplay:stop");
    clearTimer();
    autoplayActive = false;
  }
  function visibilityChange() {
    if (documentIsHidden()) {
      playOnDocumentVisible = autoplayActive;
      return stopAutoplay();
    }
    if (playOnDocumentVisible) startAutoplay();
  }
  function documentIsHidden() {
    const {
      ownerDocument
    } = emblaApi.internalEngine();
    return ownerDocument.visibilityState === "hidden";
  }
  function pointerDown() {
    if (!mouseIsOver) stopAutoplay();
  }
  function pointerUp() {
    if (!mouseIsOver) startAutoplay();
  }
  function mouseEnter() {
    mouseIsOver = true;
    stopAutoplay();
  }
  function mouseLeave() {
    mouseIsOver = false;
    startAutoplay();
  }
  function play(jumpOverride) {
    if (typeof jumpOverride !== "undefined") jump = jumpOverride;
    startAutoplay();
  }
  function stop() {
    if (autoplayActive) stopAutoplay();
  }
  function reset() {
    if (autoplayActive) startAutoplay();
  }
  function isPlaying() {
    return autoplayActive;
  }
  function next() {
    const {
      index
    } = emblaApi.internalEngine();
    const nextIndex = index.clone().add(1).get();
    const lastIndex = emblaApi.scrollSnapList().length - 1;
    const kill = options.stopOnLastSnap && nextIndex === lastIndex;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump);
    } else {
      emblaApi.scrollTo(0, jump);
    }
    emblaApi.emit("autoplay:select");
    if (kill) return stopAutoplay();
    startAutoplay();
  }
  function timeUntilNext() {
    if (!timerStartTime) return null;
    const currentDelay = delay[emblaApi.selectedScrollSnap()];
    const timePastSinceStart = (/* @__PURE__ */ new Date()).getTime() - timerStartTime;
    return currentDelay - timePastSinceStart;
  }
  const self2 = {
    name: "autoplay",
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying,
    timeUntilNext
  };
  return self2;
}
Autoplay.globalOptions = void 0;
const testimonials = [
  {
    quote: "The exquisite craftsmanship and attention to detail are immediately apparent. Best fitting shoes I've ever worn, bar none.",
    name: "James R.",
    title: "Bespoke Client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    quote: "A transformative experience from fitting to delivery. These are not just shoes, they are an investment in everyday elegance.",
    name: "Michael T.",
    title: "Loyal Patron",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    quote: "I've tried many luxury brands, but the personal touch and unmatched quality here keep me coming back.",
    name: "David S.",
    title: "Collector",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  }
];
function TestimonialCarousel() {
  const [api, setApi] = reactExports.useState();
  const [current, setCurrent] = reactExports.useState(0);
  const plugin = reactExports.useRef(Autoplay({ delay: 5e3, stopOnInteraction: true }));
  reactExports.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Carousel,
      {
        setApi,
        plugins: [plugin.current],
        className: "w-full w-[100vw] relative left-1/2 right-1/2 -mx-[50vw]",
        opts: { loop: true },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: testimonials.map((t, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center animate-in fade-in duration-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-black", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, star)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-2xl md:text-4xl leading-snug text-black italic max-w-4xl mx-auto px-4 md:px-12", children: [
            '"',
            t.quote,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden bg-zinc-200 aspect-square mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                src: t.avatar,
                alt: t.name,
                width: 48,
                height: 48,
                className: "object-cover w-full h-full"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left mt-4 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-black", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500 uppercase tracking-widest mt-1", children: t.title })
            ] })
          ] })
        ] }) }, index)) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-12", children: testimonials.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          current === index ? "bg-black w-6" : "bg-zinc-300 hover:bg-zinc-400"
        ),
        onClick: () => api?.scrollTo(index),
        "aria-label": `Go to slide ${index + 1}`
      },
      index
    )) })
  ] });
}
const export_f29e6e234fea = {
  ErrorBoundary,
  NotFoundBoundary
};
const export_0deffcb8ffd7 = {
  LayoutSegmentProvider
};
const export_c884ffe9eb8b = {
  default: CartPage
};
const export_6ac0719a3036 = {
  default: CheckoutPage
};
const export_e608dc81d478 = {
  default: CollectionsPage
};
const export_0b0be7c62d89 = {
  default: FAQPage
};
const export_b7157a6fdb20 = {
  default: ProductDetailPage
};
const export_71ea814ecaab = {
  default: ReturnsPage
};
const export_48a26e9690a5 = {
  default: ShoeCarePage
};
const export_9be9de5e7cd5 = {
  default: TrackOrderPage
};
const export_f5d39a27cd1e = {
  CuratedCarousel
};
const export_0a53ec42b8db = {
  Navigation
};
const export_abcc3a0aedaf = {
  TestimonialCarousel
};
export {
  export_0a53ec42b8db,
  export_0b0be7c62d89,
  export_0deffcb8ffd7,
  export_48a26e9690a5,
  export_6ac0719a3036,
  export_71ea814ecaab,
  export_9be9de5e7cd5,
  export_abcc3a0aedaf,
  export_b7157a6fdb20,
  export_c884ffe9eb8b,
  export_e608dc81d478,
  export_f29e6e234fea,
  export_f5d39a27cd1e
};
