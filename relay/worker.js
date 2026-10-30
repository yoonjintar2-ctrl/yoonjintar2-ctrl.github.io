// src/symbols.js
var SEARCH_NAMES = { SOXL: "Direxion semiconductor bull \uBC18\uB3C4\uCCB4 \uB808\uBC84\uB9AC\uC9C0", SOXS: "Direxion semiconductor bear \uC778\uBC84\uC2A4", NVDA: "Nvidia", AMD: "Advanced Micro Devices", AVGO: "Broadcom", TSM: "Taiwan Semiconductor TSMC", MU: "Micron", ARM: "Arm Holdings", ASML: "ASML", MSFT: "Microsoft", GOOGL: "Google Alphabet \uAD6C\uAE00", AMZN: "Amazon", META: "Meta Facebook \uD398\uC774\uC2A4\uBD81", PLTR: "Palantir", AAPL: "Apple", TSLA: "Tesla", SPY: "SPDR S&P500 \uC5D0\uC2A4\uC564\uD53C", QQQ: "Invesco Nasdaq \uB098\uC2A4\uB2E5", IWM: "Russell \uB7EC\uC140", JPM: "JPMorgan Chase \uC81C\uC774\uD53C\uBAA8\uAC74", KO: "Coca Cola", XOM: "Exxon Mobil", GLD: "Gold \uAE08" };
var US_STOCKS = [
  ["SOXL", "\uBC18\uB3C4\uCCB4 3\xD7", true],
  ["SOXS", "\uBC18\uB3C4\uCCB4 \uC778\uBC84\uC2A4 3\xD7", true],
  ["NVDA", "\uC5D4\uBE44\uB514\uC544", true],
  ["AMD", "AMD", true],
  ["AVGO", "\uBE0C\uB85C\uB4DC\uCEF4", true],
  ["TSM", "TSMC", true],
  ["MU", "\uB9C8\uC774\uD06C\uB860", true],
  ["ARM", "Arm", true],
  ["ASML", "ASML", true],
  ["MSFT", "\uB9C8\uC774\uD06C\uB85C\uC18C\uD504\uD2B8", true],
  ["GOOGL", "\uC54C\uD30C\uBCB3", true],
  ["AMZN", "\uC544\uB9C8\uC874", true],
  ["META", "\uBA54\uD0C0", true],
  ["PLTR", "\uD314\uB780\uD2F0\uC5B4", true],
  ["AAPL", "\uC560\uD50C", true],
  ["TSLA", "\uD14C\uC2AC\uB77C", true],
  ["SPY", "S&P 500", false],
  ["QQQ", "\uB098\uC2A4\uB2E5 100", false],
  ["IWM", "\uB7EC\uC140 2000", false],
  ["JPM", "JP\uBAA8\uAC74", false],
  ["KO", "\uCF54\uCE74\uCF5C\uB77C", false],
  ["XOM", "\uC5D1\uC2A8\uBAA8\uBE4C", false],
  ["GLD", "\uAE08 ETF", false]
].map(([symbol, name, ai]) => Object.freeze({ symbol, name, ai, market: "US", searchTerms: SEARCH_NAMES[symbol] || "" }));
var KR_STOCKS = [
  ["005930", "\uC0BC\uC131\uC804\uC790", true, "Samsung Electronics \uC0BC\uC131"],
  ["000660", "SK\uD558\uC774\uB2C9\uC2A4", true, "SK Hynix \uD558\uC774\uB2C9\uC2A4"],
  ["005380", "\uD604\uB300\uCC28", false, "Hyundai Motor \uD604\uB300\uC790\uB3D9\uCC28"],
  ["000270", "\uAE30\uC544", false, "Kia"],
  ["035420", "NAVER", true, "\uB124\uC774\uBC84 Naver"],
  ["035720", "\uCE74\uCE74\uC624", false, "Kakao"],
  ["373220", "LG\uC5D0\uB108\uC9C0\uC194\uB8E8\uC158", false, "LG Energy Solution \uC5D8\uC9C0 \uBC30\uD130\uB9AC"],
  ["207940", "\uC0BC\uC131\uBC14\uC774\uC624\uB85C\uC9C1\uC2A4", false, "Samsung Biologics \uC0BC\uBC14"],
  ["068270", "\uC140\uD2B8\uB9AC\uC628", false, "Celltrion"],
  ["105560", "KB\uAE08\uC735", false, "KB Financial \uAD6D\uBBFC\uC740\uD589"]
].map(([symbol, name, ai, searchTerms]) => Object.freeze({ symbol, name, ai, market: "KR", searchTerms }));
var STOCKS = [...US_STOCKS, ...KR_STOCKS];
var stockFor = (symbol) => STOCKS.find((s) => s.symbol === symbol);
var validSymbol = (symbol) => !!stockFor(symbol);

// src/config.js
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var WALL = Object.freeze({ north: -10, back: -28, south: 18, deck: -19, elevation: 34, hitHeight: 31, mountDepth: 20, mountOffset: 8, mountShoulder: 10, mountRadius: 30, cannonScale: 0.62 });
var ACTOR_STYLE = Object.freeze({ unitScale: 0.46, footprintScale: 0.5, droneScale: 0.72 });
var SETTINGS = Object.freeze({ maxHP: 1200, initialGold: 1600, maxLevel: 40, minSpacing: 49, wallMoveSeconds: 0.65, enemyCap: 900, supplyCap: 900, swarmMinuteCap: 2400, effectCap: 300, maxBuff: 0.65, stageDelay: 1.1, saveKey: "stock-siege-soxl-v1" });
var DRONE = Object.freeze({ altitude: 24, marginX: 29, marginTop: 62, marginBottom: 25 });

// src/candle-flow.js
function estimateCandleFlow(c, previous = null) {
  if (!c || ![c.open, c.high, c.low, c.close, c.volume].every(Number.isFinite) || c.volume < 0 || !Number.isSafeInteger(c.volume) || c.low <= 0 || c.high < Math.max(c.open, c.close) || c.low > Math.min(c.open, c.close)) return null;
  const range = c.high - c.low, previousClose = previous?.close ?? c.open, scale = Math.max(range, previous ? previous.high - previous.low : 0, c.close * 1e-5), body = range ? (c.close - c.open) / range : 0, location = range ? (2 * c.close - c.high - c.low) / range : 0, movement = clamp((c.close - previousClose) / scale, -1, 1), buyShare = clamp(0.5 + 0.5 * (0.45 * location + 0.35 * body + 0.2 * movement), 0.05, 0.95), buyVolume = Math.round(c.volume * buyShare);
  return { volume: c.volume, buyVolume, sellVolume: c.volume - buyVolume, buyShare, range, body, movement, method: "OHLC_PRICE_PRESSURE_V1", estimated: true };
}

// server/yahoo-market.js
var snapshots = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var cooldowns = /* @__PURE__ */ new Map();
var ChartError = class extends Error {
  constructor(code, status = 502) {
    super(code);
    this.code = code;
    this.status = status;
  }
};
function normalizeYahooChart(payload, { symbol = "SOXL", now = Date.now() } = {}) {
  const data = payload?.chart?.result?.[0], meta = data?.meta, q = data?.indicators?.quote?.[0];
  if (payload?.chart?.error || !meta || meta.symbol !== symbol || meta.currency !== "USD" || !Array.isArray(data.timestamp) || !q) throw new ChartError("invalid_data");
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < data.timestamp.length; i++) {
    const rawTime = data.timestamp[i] * 1e3, open = q.open?.[i], high = q.high?.[i], low = q.low?.[i], close = q.close?.[i], volume = q.volume?.[i];
    if (!Number.isFinite(rawTime) || rawTime > now + 5e3) throw new ChartError("invalid_data");
    if (![open, high, low, close].every(Number.isFinite)) continue;
    if (low <= 0 || high < Math.max(open, close) || low > Math.min(open, close) || low > high) throw new ChartError("invalid_data");
    if (volume != null && (!Number.isSafeInteger(volume) || volume < 0)) throw new ChartError("invalid_data");
    const time = Math.floor(rawTime / 6e4) * 6e4;
    map.set(time, { time, open, high, low, close, volume: volume ?? null, rawTime });
  }
  const candles = [...map.values()].sort((a, b) => a.time - b.time);
  if (!candles.length) throw new ChartError("no_market_data", 503);
  const latest = candles.at(-1), completed = candles.filter((c) => c.time + 63e3 <= now), candle = completed.at(-1) || null, previous = candle ? completed.at(-2) : null, regular = meta.currentTradingPeriod?.regular, pre = meta.currentTradingPeriod?.pre, post = meta.currentTradingPeriod?.post, inPeriod = (p) => p && Number.isFinite(p.start) && Number.isFinite(p.end) && now >= p.start * 1e3 && now < p.end * 1e3, marketState = inPeriod(regular) ? "regular" : inPeriod(pre) ? "pre" : inPeriod(post) ? "post" : "closed";
  let price = latest.close, priceTime = latest.rawTime;
  if (Number.isFinite(meta.regularMarketTime) && Number.isFinite(meta.regularMarketPrice) && meta.regularMarketPrice > 0 && meta.regularMarketTime * 1e3 >= priceTime && meta.regularMarketTime * 1e3 <= now + 5e3) {
    price = meta.regularMarketPrice;
    priceTime = meta.regularMarketTime * 1e3;
  }
  const previousClose = meta.previousClose ?? meta.chartPreviousClose;
  if (!Number.isFinite(previousClose) || previousClose <= 0) throw new ChartError("previous_close_unavailable", 503);
  const flow = estimateCandleFlow(candle, previous), playbackStart = candle ? candle.time + 6e4 : null, playbackEnd = candle ? candle.time + 12e4 : null, fresh = !!candle && now >= playbackStart && now < playbackEnd, volumeStatus = !fresh ? "no_recent_trades" : candle.volume == null ? "no_volume" : candle.volume === 0 ? "zero_volume" : "minute", priceStatus = now - priceTime > 12e4 ? "last_bar" : "minute", prior = candle ? completed.filter((c) => c.time < candle.time && c.volume > 0).slice(-59) : [], baselineVolume = prior.length ? prior.reduce((n, c) => n + c.volume, 0) / prior.length : candle?.volume || null;
  return { source: "YAHOO_CHART", symbol, market: "US", status: fresh ? "ready" : "no_recent_trades", price, previousClose, changePct: (price / previousClose - 1) * 100, time: priceTime, priceTime, volumeTime: candle?.time ?? null, receivedAt: now, priceStatus, volumeStatus, priceSource: "YAHOO_CHART", volumeSource: "YAHOO_1MIN", marketState, pricePollSeconds: 5, delayMinutes: null, interval: "1m", candle, candles, baselineVolume, buyVolume: flow?.buyVolume ?? null, sellVolume: flow?.sellVolume ?? null, estimate: flow, tradeClassification: "estimated-candle-flow", playbackStart, playbackEnd, volumeNote: volumeStatus === "zero_volume" && marketState !== "regular" ? "\uC2DC\uAC04\uC678 \uAC70\uB798\uB7C9\uC774 0\uC73C\uB85C \uC81C\uACF5\uB428" : volumeStatus === "zero_volume" ? "\uD574\uB2F9 \uBD84\uBD09 \uAC70\uB798\uB7C9 0" : volumeStatus === "no_volume" ? "\uD574\uB2F9 \uBD84\uBD09 \uAC70\uB798\uB7C9 \uBBF8\uC81C\uACF5" : !fresh ? "\uC0C8 \uC644\uB8CC \uBD84\uBD09 \uB300\uAE30" : "\uC9C1\uC804 \uC644\uB8CC \uBD84\uBD09", attribution: "Yahoo Finance public chart \xB7 provider timing/availability applies", referenceUrl: "https://finance.yahoo.com/quote/" + symbol + "/" };
}
async function fetchYahooSnapshot({ symbol = "SOXL", fetcher = fetch, now } = {}) {
  if (!validSymbol(symbol)) throw new ChartError("invalid_symbol", 400);
  const url = new URL("/v8/finance/chart/" + symbol, "https://query1.finance.yahoo.com");
  url.search = new URLSearchParams({ interval: "1m", range: "1d", includePrePost: "true" });
  let r;
  try {
    r = await fetcher(url.href, { headers: { accept: "application/json", "user-agent": "StockSiege/1.0" }, redirect: "manual", signal: AbortSignal.timeout(12e3) });
  } catch {
    throw new ChartError("network_unavailable");
  }
  if (r.status === 429) throw new ChartError("provider_rate_limited", 429);
  if (!r.ok || r.status >= 300 && r.status < 400) throw new ChartError("provider_unavailable");
  let payload;
  try {
    payload = await r.json();
  } catch {
    throw new ChartError("invalid_data");
  }
  return normalizeYahooChart(payload, { symbol, now: now ?? Date.now() });
}
async function cachedYahooSnapshot(options = {}) {
  const key = options.symbol || "SOXL", now = options.now ?? Date.now();
  if ((cooldowns.get(key) || 0) > now) throw new ChartError("provider_rate_limited", 429);
  const old = snapshots.get(key);
  if (old && now >= old.at && now - old.at < 4e3 && Math.floor(now / 6e4) === Math.floor(old.at / 6e4)) return { ...old.data, receivedAt: now };
  if (inflight.has(key)) return inflight.get(key);
  const p = fetchYahooSnapshot({ ...options, now: options.now }).then((data) => {
    if (snapshots.size >= 40) snapshots.delete(snapshots.keys().next().value);
    snapshots.set(key, { at: now, data });
    return data;
  }).catch((e) => {
    if (e.code === "provider_rate_limited") cooldowns.set(key, now + 6e4);
    throw e;
  }).finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}

// server/korea-market.js
var cache = /* @__PURE__ */ new Map();
var pending = /* @__PURE__ */ new Map();
var koreaDay = (time) => new Date(time + 9 * 36e5).toISOString().slice(0, 10).replaceAll("-", "");
function koreaTime(value) {
  if (typeof value !== "string" || !/^\d{14}$/.test(value)) return NaN;
  const t = Date.parse(`${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(8, 10)}:${value.slice(10, 12)}:${value.slice(12, 14)}+09:00`);
  return Number.isFinite(t) && koreaDay(t) === value.slice(0, 8) ? t : NaN;
}
function koreaSession(now = Date.now()) {
  const d = new Date(now + 9 * 36e5), minutes = d.getUTCHours() * 60 + d.getUTCMinutes(), day = d.getUTCDay(), date = koreaDay(now), base = Date.parse(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T00:00:00+09:00`);
  let phase = "closed", venue = null, start = null, end = null;
  if (day !== 0 && day !== 6) {
    if (minutes >= 480 && minutes < 530) {
      phase = "pre";
      venue = "NXT";
      start = 480;
      end = 530;
    } else if (minutes >= 540 && minutes < 930) {
      phase = "regular";
      venue = "KRX";
      start = 540;
      end = 930;
    } else if (minutes >= 940 && minutes < 1200) {
      phase = "post";
      venue = minutes < 960 ? "NXT" : "KRX";
      start = minutes < 960 ? 940 : 960;
      end = minutes < 960 ? 960 : 1200;
    }
  }
  const isOpen = phase !== "closed";
  return { market: "KR", phase, venue, date, isOpen, confirmed: true, start: start == null ? null : base + start * 6e4, end: end == null ? null : base + end * 6e4, nextChangeAt: end == null ? base + 864e5 : base + end * 6e4, label: isOpen ? `${venue} ${phase === "pre" ? "\uD504\uB9AC\uC7A5" : phase === "post" ? "\uC560\uD504\uD130\uC7A5" : "\uC815\uADDC\uC7A5"}` : "\uD55C\uAD6D\uC7A5 \uB9C8\uAC10" };
}
var number = (value) => typeof value === "number" ? value : typeof value === "string" && /^-?[\d,]+(?:\.\d+)?$/.test(value) ? Number(value.replaceAll(",", "")) : NaN;
function normalizeKoreaChart(chart, poll, { symbol, now = Date.now(), venue = koreaSession(now).venue || "KRX" } = {}) {
  const stock = stockFor(symbol), quote = poll?.datas?.[0];
  if (stock?.market !== "KR" || chart?.code !== symbol || quote?.itemCode !== symbol || chart.stockExchangeType !== venue || !Array.isArray(chart.priceInfos) || quote.currencyType?.code !== "KRW" || quote.stockExchangeType?.delayTime !== 0) throw new ChartError("invalid_data");
  const session = koreaSession(now), price = number(quote.closePriceRaw ?? quote.closePrice), priceTime = Date.parse(quote.localTradedAt), previousClose = number(chart.lastClosePrice);
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(priceTime) || priceTime > now + 5e3 || !Number.isFinite(previousClose) || previousClose <= 0) throw new ChartError("invalid_data");
  const map = /* @__PURE__ */ new Map();
  let priorTotal = 0, priorTime = null;
  for (const row of chart.priceInfos) {
    const time = koreaTime(row.localDateTime), open = row.openPrice, high = row.highPrice, low = row.lowPrice, close = row.currentPrice, total = row.accumulatedTradingVolume;
    if (!Number.isFinite(time) || time > now + 5e3 || koreaDay(time) !== chart.tradeBaseAt || ![open, high, low, close].every(Number.isFinite) || low <= 0 || high < Math.max(open, close) || low > Math.min(open, close) || !Number.isSafeInteger(total) || total < priorTotal || priorTime !== null && time <= priorTime) throw new ChartError("invalid_data");
    map.set(time, { time, open, high, low, close, volume: total - priorTotal });
    priorTotal = total;
    priorTime = time;
  }
  const candles = [...map.values()], completed = candles.slice(0, -1).filter((c) => c.time + 12e4 <= now), candle = completed.at(-1) || null, flow = estimateCandleFlow(candle, completed.at(-2)), playbackStart = candle ? candle.time + 12e4 : null, playbackEnd = candle ? playbackStart + 6e4 : null, fresh = !!candle && now >= playbackStart && now < playbackEnd;
  const available = session.isOpen && venue === session.venue && chart.marketStatus === "OPEN" && quote.marketStatus === "OPEN" && !chart.tradeStop && quote.tradeStopType?.name === "TRADING" && chart.tradableStatus === "tradable" && quote.tradableStatus === "tradable" && chart.tradeBaseAt === session.date && koreaDay(priceTime) === session.date && now - priceTime <= 18e4;
  const volumeStatus = !fresh ? "no_recent_trades" : candle.volume === 0 ? "zero_volume" : "minute", prior = completed.filter((c) => c.time < candle?.time && c.volume > 0).slice(-59), baselineVolume = prior.length ? prior.reduce((n, c) => n + c.volume, 0) / prior.length : candle?.volume || null;
  return { source: "NAVER_KR", market: "KR", symbol, status: available ? "ready" : "no_recent_trades", price, priceTime, time: priceTime, previousClose, changePct: (price / previousClose - 1) * 100, receivedAt: now, marketState: available ? session.phase : "closed", venue, session, priceStatus: available ? "live" : "last_trade", priceSource: `NAVER_${venue}`, volumeSource: `NAVER_${venue}_1MIN`, pricePollSeconds: 7, delayMinutes: candle ? (playbackStart - candle.time - 6e4) / 6e4 : null, volumeStatus, volumeTime: candle?.time ?? null, candle, candles, baselineVolume, buyVolume: flow?.buyVolume ?? null, sellVolume: flow?.sellVolume ?? null, estimate: flow, tradeClassification: "estimated-candle-flow", playbackStart, playbackEnd, volumeNote: volumeStatus === "zero_volume" ? "\uD574\uB2F9 \uBD84\uBD09 \uAC70\uB798\uB7C9 0" : !fresh ? "\uC0C8 \uC644\uB8CC \uBD84\uBD09 \uB300\uAE30" : `${venue} \uD655\uC815 \uBD84\uBD09 \xB7 \uB9C8\uC9C0\uB9C9 \uC784\uC2DC \uD589 \uC81C\uC678`, attribution: `NAVER \uC99D\uAD8C \xB7 ${venue} \uAC00\uACA9 / \uAC70\uB798\uB7C9 (\uD1B5\uD569 \uAC70\uB798\uB7C9 \uC544\uB2D8)`, referenceUrl: `https://m.stock.naver.com/domestic/stock/${symbol}` };
}
async function read(url, fetcher) {
  let r;
  try {
    r = await fetcher(url, { headers: { accept: "application/json", "user-agent": "StockSiege/1.0", referer: "https://m.stock.naver.com/" }, redirect: "manual", signal: AbortSignal.timeout(1e4) });
  } catch {
    throw new ChartError("network_unavailable");
  }
  if (r.status === 429) throw new ChartError("provider_rate_limited", 429);
  if (!r.ok) throw new ChartError("provider_unavailable");
  try {
    return await r.json();
  } catch {
    throw new ChartError("invalid_data");
  }
}
async function cachedKoreaSnapshot({ symbol, now, fetcher = fetch } = {}) {
  if (stockFor(symbol)?.market !== "KR") throw new ChartError("invalid_symbol", 400);
  const at = now ?? Date.now(), session = koreaSession(at), venue = session.venue || "KRX", key = symbol + venue, old = cache.get(key);
  if (old && at >= old.at && at - old.at < 7e3 && Math.floor(at / 6e4) === Math.floor(old.at / 6e4)) return { ...old.data, receivedAt: at };
  if (pending.has(key)) return pending.get(key);
  const path = venue === "NXT" ? "NXT/" : "", task = Promise.all([read(`https://api.stock.naver.com/chart/domestic/${path}item/${symbol}?periodType=day`, fetcher), read(`https://polling.finance.naver.com/api/realtime/domestic/${path}stock/${symbol}`, fetcher)]).then(([chart, poll]) => {
    const data = normalizeKoreaChart(chart, poll, { symbol, now: now ?? Date.now(), venue });
    cache.set(key, { at, data });
    return data;
  }).finally(() => pending.delete(key));
  pending.set(key, task);
  return task;
}

// server/market-snapshot.js
function marketSnapshot(options) {
  return stockFor(options.symbol)?.market === "KR" ? cachedKoreaSnapshot(options) : cachedYahooSnapshot(options);
}

// server/us-session.js
var CLOSED = { 2026: ["01-01", "01-19", "02-16", "04-03", "05-25", "06-19", "07-03", "09-07", "11-26", "12-25"], 2027: ["01-01", "01-18", "02-15", "03-26", "05-31", "06-18", "07-05", "09-06", "11-25", "12-24"] };
var EARLY = /* @__PURE__ */ new Set(["2026-11-27", "2026-12-24", "2027-11-26"]);
var ny = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
function nyParts(epoch) {
  const p = Object.fromEntries(ny.formatToParts(new Date(epoch)).filter((p2) => p2.type !== "literal").map((p2) => [p2.type, p2.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, year: +p.year, hour: +p.hour, minute: +p.minute, second: +p.second };
}
function epochAt(date, hour, minute = 0) {
  const [y, m, d] = date.split("-").map(Number), guess = Date.UTC(y, m - 1, d, hour + 5, minute), p = nyParts(guess), [py, pm, pd] = p.date.split("-").map(Number);
  return guess + Date.UTC(y, m - 1, d, hour, minute) - Date.UTC(py, pm - 1, pd, p.hour, p.minute);
}
function tradingDate(date) {
  const year = +date.slice(0, 4), day = (/* @__PURE__ */ new Date(date + "T12:00:00Z")).getUTCDay();
  return !!CLOSED[year] && day !== 0 && day !== 6 && !CLOSED[year].includes(date.slice(5));
}
function usSession(now = Date.now()) {
  const p = nyParts(now), known = !!CLOSED[p.year], trading = tradingDate(p.date), early = EARLY.has(p.date), regularClose = early ? 13 : 16, postClose = early ? 17 : 20, minute = p.hour * 60 + p.minute;
  let phase = "closed", start = null, end = null;
  if (trading) {
    if (minute >= 240 && minute < 570) {
      phase = "pre";
      start = epochAt(p.date, 4);
      end = epochAt(p.date, 9, 30);
    } else if (minute >= 570 && minute < regularClose * 60) {
      phase = "regular";
      start = epochAt(p.date, 9, 30);
      end = epochAt(p.date, regularClose);
    } else if (minute >= regularClose * 60 && minute < postClose * 60) {
      phase = "post";
      start = epochAt(p.date, regularClose);
      end = epochAt(p.date, postClose);
    }
  }
  let nextOpenAt = null;
  for (let i = 0; i < 15; i++) {
    const date = new Date(Date.parse(p.date + "T12:00:00Z") + i * 864e5).toISOString().slice(0, 10);
    if (!tradingDate(date)) continue;
    const open = epochAt(date, 4);
    if (open > now) {
      nextOpenAt = open;
      break;
    }
  }
  return { phase, isOpen: phase !== "closed", label: { pre: "\uD504\uB9AC\uC7A5", regular: "\uC815\uADDC\uC7A5", post: "\uC560\uD504\uD130\uC7A5", closed: "\uD734\uC7A5" }[phase], date: p.date, confirmed: known, earlyClose: early, start, end, nextOpenAt, nextChangeAt: end ?? nextOpenAt, checkedAt: now };
}

// server/stock-catalog.js
var saved = null;
var pending2 = null;
function selectableSnapshot(snapshot, session, now) {
  const date = snapshot?.market === "KR" ? koreaDay(snapshot.priceTime) : nyParts(snapshot?.priceTime || 0).date;
  return session.isOpen && session.confirmed && now >= session.start && now < session.end && ["pre", "regular", "post"].includes(snapshot?.marketState) && snapshot.marketState === session.phase && Number.isFinite(snapshot.price) && snapshot.price > 0 && Number.isFinite(snapshot.priceTime) && now - snapshot.priceTime <= 18e4 && snapshot.priceTime <= now + 5e3 && date === session.date;
}
function stockActivity(snapshot, now) {
  const minute = Math.floor(now / 6e4) * 6e4, bars = (snapshot.candles || []).filter((c) => c.time < minute && c.time >= minute - 5 * 6e4 && Number.isSafeInteger(c.volume) && c.volume >= 0), recentVolume = bars.reduce((n, c) => n + c.volume, 0), prior = (snapshot.candles || []).filter((c) => c.time < minute - 5 * 6e4 && c.time >= minute - 65 * 6e4 && c.volume > 0), baseline = prior.length ? prior.reduce((n, c) => n + c.volume, 0) / prior.length : snapshot.baselineVolume;
  const relativeVolume = baseline > 0 && bars.length ? recentVolume / bars.length / baseline : null, active = recentVolume > 0 && bars.some((c) => c.time >= minute - 2 * 6e4 && c.volume > 0);
  return { recentVolume, minutes: bars.length, relativeVolume, score: active ? (relativeVolume ?? 1) * Math.log10(10 + recentVolume) : 0, active };
}
async function mapLimited(items, fn) {
  let cursor = 0;
  const results = [];
  await Promise.all(Array.from({ length: Math.min(5, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  }));
  return results;
}
async function stockCatalog(options = {}) {
  let now = options.now ?? Date.now(), sessions = { US: usSession(now), KR: koreaSession(now) }, stamp = Object.values(sessions).map((s) => s.date + s.phase + s.venue).join("/");
  if (saved && saved.fetcher === options.fetcher && now >= saved.data.checkedAt && now < saved.until && saved.stamp === stamp) return { ...saved.data, checkedAt: now };
  if (pending2 && pending2.fetcher === options.fetcher) return pending2.promise;
  const request = (async () => {
    let attempted = 0, failed = 0;
    const candidates = (await mapLimited(STOCKS.filter((stock) => sessions[stock.market].isOpen), async (stock) => {
      attempted++;
      try {
        const snapshot = await marketSnapshot({ ...options, symbol: stock.symbol }), at = options.now ?? Date.now(), session2 = stock.market === "KR" ? koreaSession(at) : usSession(at);
        if (!selectableSnapshot(snapshot, session2, at)) return null;
        return { ...stock, eligible: true, session: session2.phase, sessionLabel: session2.label, venue: snapshot.venue || "US", price: snapshot.price, changePct: snapshot.changePct, priceTime: snapshot.priceTime, activity: stockActivity(snapshot, at) };
      } catch {
        failed++;
        return null;
      }
    })).filter(Boolean);
    now = options.now ?? Date.now();
    sessions = { US: usSession(now), KR: koreaSession(now) };
    const items = candidates.filter((s) => selectableSnapshot({ ...s, marketState: s.session }, sessions[s.market], now) && (!sessions[s.market].venue || sessions[s.market].venue === s.venue));
    const state = items.length ? "open" : !Object.values(sessions).some((s) => s.isOpen) ? "closed" : attempted && failed === attempted ? "unavailable" : "awaiting_quotes", recommendations = items.filter((s) => s.activity.active).sort((a, b) => b.activity.score - a.activity.score || b.activity.recentVolume - a.activity.recentVolume).slice(0, 4).map((s) => s.symbol), session = sessions.US;
    const data = { state, session, sessions, checkedAt: now, supportedCount: STOCKS.length, items, recommendations, recommendationBasis: "\uCD5C\uADFC 5\uBD84 \uC2E4\uC81C \uAC70\uB798\uB7C9 / \uC9C1\uC804 60\uBD84 \uD3C9\uADE0 \uB300\uBE44 \uD65C\uBC1C\uB3C4", error: failed === attempted && attempted ? "provider_unavailable" : null };
    saved = { fetcher: options.fetcher, stamp, until: Math.min(now + 3e4, ...Object.values(sessions).map((s) => s.nextChangeAt ?? Infinity), ...items.map((s) => s.priceTime + 18e4)), data };
    return data;
  })();
  pending2 = { promise: request, fetcher: options.fetcher };
  try {
    return await request;
  } finally {
    pending2 = null;
  }
}
async function checkStockSelection(symbol, options = {}) {
  if (!validSymbol(symbol)) throw new ChartError("invalid_symbol", 400);
  const stock = stockFor(symbol), now = options.now ?? Date.now(), session = stock.market === "KR" ? koreaSession(now) : usSession(now);
  if (!session.isOpen || !session.confirmed) return { eligible: false, reason: session.confirmed ? "market_closed" : "calendar_unavailable", session };
  const snapshot = await marketSnapshot({ ...options, symbol }), verifiedNow = options.now ?? Date.now(), verifiedSession = stock.market === "KR" ? koreaSession(verifiedNow) : usSession(verifiedNow), eligible = selectableSnapshot(snapshot, verifiedSession, verifiedNow);
  return { eligible, reason: eligible ? null : verifiedSession.isOpen ? "quote_unavailable" : "market_closed", session: verifiedSession, stock, ...eligible ? { price: snapshot.price, priceTime: snapshot.priceTime, volumeStatus: snapshot.volumeStatus } : {} };
}

// server/market-api.js
var ORIGIN = "https://data.alpaca.markets";
var COOKIE = "stock_siege_market";
var DELAY = 16 * 60 * 1e3;
var nyDay = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" });
var cache2 = /* @__PURE__ */ new Map();
var inflight2 = /* @__PURE__ */ new Map();
var connectionAttempts = /* @__PURE__ */ new Map();
var priceCache = /* @__PURE__ */ new Map();
var priceInflight = /* @__PURE__ */ new Map();
var dailyCache = /* @__PURE__ */ new Map();
var json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff", ...extra } });
var DataError = class extends Error {
  constructor(code, status = 502) {
    super(code);
    this.code = code;
    this.status = status;
  }
};
function base64(bytes) {
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
function unbase64(value) {
  const s = value.replaceAll("-", "+").replaceAll("_", "/");
  return Uint8Array.from(atob(s + "=".repeat((4 - s.length % 4) % 4)), (x) => x.charCodeAt(0));
}
async function sessionKey(secret) {
  if (typeof secret !== "string" || secret.length < 32) throw new DataError("session_unavailable", 503);
  return crypto.subtle.importKey("raw", await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret)), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
async function sealCredentials(credentials, secret, now = Date.now()) {
  const key = await sessionKey(secret), iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify({ ...credentials, exp: now + 30 * 864e5 }));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: new TextEncoder().encode(COOKIE) }, key, plaintext));
  return `${base64(iv)}.${base64(ciphertext)}`;
}
async function openCredentials(value, secret, now = Date.now()) {
  try {
    const [a, b, ...extra] = value.split(".");
    if (!a || !b || extra.length) return null;
    const bytes = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unbase64(a), additionalData: new TextEncoder().encode(COOKIE) }, await sessionKey(secret), unbase64(b));
    const data = JSON.parse(new TextDecoder().decode(bytes));
    return data.exp > now && validCredentials(data) ? { keyId: data.keyId, secret: data.secret } : null;
  } catch {
    return null;
  }
}
function validCredentials(c) {
  return c && typeof c.keyId === "string" && typeof c.secret === "string" && /^[A-Za-z0-9_-]{8,200}$/.test(c.keyId) && /^[A-Za-z0-9_-]{8,200}$/.test(c.secret);
}
async function credentialsFor(request, env) {
  const configured = { keyId: env.ALPACA_API_KEY_ID, secret: env.ALPACA_API_SECRET_KEY };
  if (validCredentials(configured)) return configured;
  const value = request.headers.get("cookie")?.split(";").map((s) => s.trim()).find((s) => s.startsWith(COOKIE + "="))?.slice(COOKIE.length + 1);
  return value ? openCredentials(value, env.MARKET_SESSION_SECRET) : null;
}
function cookie(value, request, age = 2592e3) {
  return `${COOKIE}=${value}; Path=/api/market; HttpOnly; SameSite=Strict; Max-Age=${age}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
async function cacheKey(auth) {
  return base64(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(auth.keyId + ":" + auth.secret))));
}
function normalizeBar(bar) {
  if (!bar || !Number.isFinite(Date.parse(bar.t))) throw new DataError("invalid_data");
  const values = [bar.o, bar.h, bar.l, bar.c, bar.v];
  if (!values.every(Number.isFinite) || values.slice(0, 4).some((v) => v <= 0) || bar.v < 0 || !Number.isSafeInteger(bar.v) || bar.h < Math.max(bar.o, bar.c) || bar.l > Math.min(bar.o, bar.c) || bar.l > bar.h) throw new DataError("invalid_data");
  return { time: Date.parse(bar.t), open: bar.o, high: bar.h, low: bar.l, close: bar.c, volume: bar.v };
}
async function alpaca(path, parameters, auth, fetcher) {
  const url = new URL(path, ORIGIN);
  for (const [key, value] of Object.entries(parameters)) url.searchParams.set(key, String(value));
  let response;
  try {
    response = await fetcher(url.href, { headers: { "APCA-API-KEY-ID": auth.keyId, "APCA-API-SECRET-KEY": auth.secret, accept: "application/json" }, signal: AbortSignal.timeout(1e4), redirect: "manual" });
  } catch {
    throw new DataError("network_unavailable");
  }
  if (response.status >= 300 && response.status < 400) throw new DataError("provider_unavailable");
  if (!response.ok) throw new DataError(response.status === 401 ? "invalid_credentials" : response.status === 403 ? "feed_access_denied" : response.status === 429 ? "provider_rate_limited" : "provider_unavailable", response.status === 401 ? 401 : response.status === 429 ? 429 : 502);
  try {
    return await response.json();
  } catch {
    throw new DataError("invalid_data");
  }
}
async function fetchAlpacaMarket(auth, { fetcher = fetch, now = Date.now(), symbol = "SOXL" } = {}) {
  if (!validSymbol(symbol)) throw new DataError("invalid_symbol", 400);
  const end = new Date(Math.floor((now - DELAY) / 6e4) * 6e4).toISOString();
  const shared = { end, feed: "sip", adjustment: "split", sort: "desc" };
  const [minute, daily] = await Promise.all([
    alpaca(`/v2/stocks/${symbol}/bars`, { ...shared, timeframe: "1Min", start: new Date(now - 8 * 864e5).toISOString(), limit: 1e3 }, auth, fetcher),
    alpaca(`/v2/stocks/${symbol}/bars`, { ...shared, timeframe: "1Day", start: new Date(now - 35 * 864e5).toISOString(), limit: 20 }, auth, fetcher)
  ]);
  if (!Array.isArray(minute.bars) || !minute.bars.length || !Array.isArray(daily.bars)) throw new DataError("no_market_data", 503);
  const candles = minute.bars.map(normalizeBar).sort((a, b) => a.time - b.time), candle = candles.at(-1), day = nyDay.format(new Date(candle.time));
  const previous = daily.bars.map(normalizeBar).filter((b) => nyDay.format(new Date(b.time)) < day).sort((a, b) => b.time - a.time)[0];
  if (!previous) throw new DataError("previous_close_unavailable", 503);
  if (candle.time > Date.parse(end)) throw new DataError("invalid_data");
  const prior = candles.slice(0, -1).slice(-59), baselineVolume = prior.length ? prior.reduce((sum, b) => sum + b.volume, 0) / prior.length : null;
  return { source: "ALPACA_SIP", status: now - candle.time > 25 * 6e4 ? "no_recent_trades" : "delayed", symbol, market: "US", price: candle.close, previousClose: previous.close, changePct: (candle.close / previous.close - 1) * 100, time: candle.time, receivedAt: now, delayMinutes: 16, coverage: "US consolidated SIP", candle, candles, buyVolume: null, sellVolume: null, tradeClassification: "minute-candle-direction", baselineVolume, attribution: "Alpaca Market Data / CTA & UTP", volumeBasis: "\uBD84\uBD09 \uC0C1\uC2B9\xB7\uD558\uB77D \uAE30\uC900 \xB7 \uB9E4\uC218/\uB9E4\uB3C4 \uC8FC\uB3C4 \uCCB4\uACB0\uB7C9 \uC544\uB2D8" };
}
async function fetchAlpacaPrice(auth, { fetcher = fetch, now = Date.now(), symbol = "SOXL" } = {}) {
  if (!validSymbol(symbol)) throw new DataError("invalid_symbol", 400);
  const data = await alpaca(`/v2/stocks/${symbol}/trades/latest`, { feed: "iex" }, auth, fetcher), trade = data.trade, time = Date.parse(trade?.t);
  if (!trade || !Number.isFinite(trade.p) || trade.p <= 0 || !Number.isFinite(time) || time > now + 5e3 || ["canceled", "incorrect"].includes(trade.u)) throw new DataError("invalid_data");
  let previousClose = null, referenceError = null;
  try {
    const key = await cacheKey(auth) + ":" + symbol;
    let history = dailyCache.get(key);
    if (!history || now - history.at >= 6e4) {
      const raw = await alpaca(`/v2/stocks/${symbol}/bars`, { timeframe: "1Day", start: new Date(now - 35 * 864e5).toISOString(), end: new Date(now - DELAY).toISOString(), feed: "sip", adjustment: "split", sort: "desc", limit: 20 }, auth, fetcher);
      if (!Array.isArray(raw.bars)) throw new DataError("invalid_data");
      history = { at: now, bars: raw.bars.map(normalizeBar) };
      if (dailyCache.size >= 50) dailyCache.delete(dailyCache.keys().next().value);
      dailyCache.set(key, history);
    }
    const day = nyDay.format(new Date(time)), previous = history.bars.filter((b) => nyDay.format(new Date(b.time)) < day).sort((a, b) => b.time - a.time)[0];
    previousClose = previous?.close ?? null;
    if (!previousClose) referenceError = "previous_close_unavailable";
  } catch {
    referenceError = "previous_close_unavailable";
  }
  return { source: "ALPACA_IEX", status: now - time > 12e4 ? "last_trade" : "live", symbol, market: "US", price: trade.p, previousClose, changePct: previousClose ? (trade.p / previousClose - 1) * 100 : null, time, receivedAt: now, feed: "iex", coverage: "IEX exchange only", pollSeconds: 2, delaySeconds: 0, referenceError };
}
async function cachedPrice(auth, options) {
  const key = await cacheKey(auth) + ":" + (options.symbol || "SOXL"), now = options.now ?? Date.now(), old = priceCache.get(key);
  if (old && now - old.at < 1500) return old.data;
  if (priceInflight.has(key)) return priceInflight.get(key);
  const pending3 = fetchAlpacaPrice(auth, options).then((data) => {
    if (priceCache.size >= 50) priceCache.delete(priceCache.keys().next().value);
    priceCache.set(key, { at: now, data });
    return data;
  }).finally(() => priceInflight.delete(key));
  priceInflight.set(key, pending3);
  return pending3;
}
async function cachedMarket(auth, options) {
  const key = await cacheKey(auth) + ":" + (options.symbol || "SOXL"), now = options.now ?? Date.now(), old = cache2.get(key);
  if (old && now - old.at < 2e4) return old.data;
  if (inflight2.has(key)) return inflight2.get(key);
  const pending3 = fetchAlpacaMarket(auth, options).then((data) => {
    if (cache2.size >= 50) cache2.delete(cache2.keys().next().value);
    cache2.set(key, { at: now, data });
    return data;
  }).finally(() => inflight2.delete(key));
  inflight2.set(key, pending3);
  return pending3;
}
async function handleAlpacaRequest(request, env = {}, options = {}) {
  const url = new URL(request.url), path = url.pathname, symbol = url.searchParams.get("symbol") || "SOXL";
  try {
    if (!validSymbol(symbol)) return json({ error: "invalid_symbol" }, 400);
    options = { ...options, symbol };
    if (path === "/api/market/connect") {
      if (!["POST", "DELETE"].includes(request.method)) return json({ error: "method_not_allowed" }, 405);
      const origin = request.headers.get("origin");
      if (!origin || origin !== new URL(request.url).origin) return json({ error: "invalid_origin" }, 403);
      if (request.method === "DELETE") return json({ status: "disconnected" }, 200, { "set-cookie": cookie("", request, 0) });
      if (!env.MARKET_SESSION_SECRET) return json({ error: "session_unavailable" }, 503);
      if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "invalid_request" }, 400);
      if (Number(request.headers.get("content-length")) > 2048) return json({ error: "invalid_request" }, 413);
      const user = request.headers.get("oai-authenticated-user-id") || request.headers.get("cf-connecting-ip") || "local";
      const now = options.now ?? Date.now(), attempts = connectionAttempts.get(user);
      if (attempts && now - attempts < 3e3) return json({ error: "try_again_shortly" }, 429);
      connectionAttempts.set(user, now);
      if (connectionAttempts.size > 500) connectionAttempts.delete(connectionAttempts.keys().next().value);
      const text = await request.text();
      if (text.length > 2048) return json({ error: "invalid_request" }, 413);
      let auth2;
      try {
        auth2 = JSON.parse(text);
      } catch {
        return json({ error: "invalid_request" }, 400);
      }
      if (!validCredentials(auth2)) return json({ error: "invalid_credentials" }, 400);
      const checks = await Promise.allSettled([cachedMarket(auth2, options), cachedPrice(auth2, options)]);
      if (checks.every((c) => c.status === "rejected")) throw checks[0].reason;
      const sealed = await sealCredentials({ keyId: auth2.keyId, secret: auth2.secret }, env.MARKET_SESSION_SECRET, now);
      return json({ status: "connected", priceSource: "ALPACA_IEX", priceAvailable: checks[1].status === "fulfilled", volumeSource: "ALPACA_SIP", volumeAvailable: checks[0].status === "fulfilled", delayMinutes: 16 }, 200, { "set-cookie": cookie(sealed, request) });
    }
    if (!["/api/market", "/api/market/price"].includes(path)) return json({ error: "not_found" }, 404);
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);
    const auth = await credentialsFor(request, env);
    if (!auth) return json({ status: "connection_required", source: path.endsWith("/price") ? "ALPACA_IEX" : "ALPACA_SIP", error: "connection_required" }, 503);
    return json(await (path.endsWith("/price") ? cachedPrice(auth, options) : cachedMarket(auth, options)));
  } catch (error) {
    return json({ status: "unavailable", error: error instanceof DataError ? error.code : "provider_unavailable" }, error instanceof DataError ? error.status : 502);
  }
}
async function handleMarketRequest(request, env = {}, options = {}) {
  const url = new URL(request.url), path = url.pathname, provider = url.searchParams.get("provider") || "yahoo", symbol = url.searchParams.get("symbol") || "SOXL";
  if (["/api/market/stocks", "/api/market/selection"].includes(path)) {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);
    try {
      return json(await (path.endsWith("/stocks") ? stockCatalog(options) : checkStockSelection(symbol, options)));
    } catch (e) {
      return json({ error: e instanceof ChartError ? e.code : "provider_unavailable" }, e instanceof ChartError ? e.status : 502);
    }
  }
  if (path === "/api/market/connect") return handleAlpacaRequest(request, env, options);
  if (provider === "alpaca") {
    if (stockFor(symbol)?.market !== "US") return json({ error: "invalid_symbol" }, 400);
    return handleAlpacaRequest(request, env, options);
  }
  if (provider !== "yahoo" || !validSymbol(symbol)) return json({ error: "invalid_symbol" }, 400);
  if (!["/api/market", "/api/market/price"].includes(path)) return json({ error: "not_found" }, 404);
  if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);
  try {
    return json(await marketSnapshot({ ...options, symbol }));
  } catch (e) {
    return json({ status: "unavailable", source: stockFor(symbol)?.market === "KR" ? "NAVER_KR" : "YAHOO_CHART", error: e instanceof ChartError ? e.code : "provider_unavailable" }, e instanceof ChartError ? e.status : 502);
  }
}

// worker/public-api.js
var ALLOWED = ["https://yoonjintar2-ctrl.github.io", "http://localhost:8090", "http://localhost:8081"];
var ROUTES = ["/api/market", "/api/market/stocks", "/api/market/selection"];
function cors(origin) {
  return { "access-control-allow-origin": ALLOWED.includes(origin) ? origin : ALLOWED[0], "access-control-allow-methods": "GET, OPTIONS", "access-control-allow-headers": "content-type", "access-control-max-age": "86400", "vary": "Origin" };
}
var public_api_default = { async fetch(request, env) {
  const url = new URL(request.url), origin = request.headers.get("origin") || "", h = cors(origin);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
  if (url.pathname === "/") return new Response("STOCK SIEGE market relay", { headers: { ...h, "content-type": "text/plain; charset=utf-8" } });
  if (request.method !== "GET" || !ROUTES.includes(url.pathname)) return new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers: { ...h, "content-type": "application/json" } });
  if (url.pathname === "/api/market" && (url.searchParams.get("provider") || "yahoo") !== "yahoo") return new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers: { ...h, "content-type": "application/json" } });
  const res = await handleMarketRequest(request, env || {});
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(h)) out.headers.set(k, v);
  out.headers.delete("set-cookie");
  return out;
} };
export {
  public_api_default as default
};
