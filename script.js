const STORAGE_KEY = "liuyaowen-fan-spending";

const luxuryBags = [
  // —— Luv15_y 最爱的包 · 前排高亮 ——
  {
    brand: "LV",
    name: "WALLET ON CHAIN IVY 手袋 M82211",
    price: 16600,
    friendPick: true,
    note: "Luv15_y 超喜欢这款链条包，小巧又能装，日常出门超方便。",
    url: "https://www.louisvuitton.cn/zhs-cn/products/wallet-on-chain-ivy-bicolor-monogram-empreinte-leather-nvprod4350091v/M82211",
    source: "截至 2026-05-09，LV 中国官网参考价 ¥16,600"
  },
  {
    brand: "LV",
    name: "ONTHEGO EAST WEST 手袋",
    price: 29400,
    friendPick: true,
    note: "Luv15_y 点名要的横版托特，颜值和实用都在线。",
    url: "https://www.louisvuitton.cn/zhs-cn/products/onthego-east-west-monogram-empreinte-nvprod7570050v/M29487",
    source: "截至 2026-05-09，LV 中国官网参考价 ¥29,400"
  },
  {
    brand: "CHANEL",
    name: "CHANEL 25 Small 油蜡皮",
    price: 45600,
    friendPick: true,
    note: "Luv15_y 最想要的 Chanel 25 油蜡皮小号，经典中的经典。",
    url: "https://www.chanel.com/us/fashion/p/AS5293B2030494305/chanel-25-small-handbag-grained-calfskin-gold-tone-metal/",
    source: "截至 2026-05-09，Chanel 美国官网价 $6,700，约 ¥45,600"
  },
  // —— 其他参考包款 ——
  {
    brand: "LV",
    name: "NEVERFULL 中号手袋",
    price: 16500,
    note: "很适合拿来做第一只大牌通勤托特。",
    url: "https://www.louisvuitton.cn/zhs-cn/products/neverfull-mm-d15-nvprod5190117v/N40668",
    source: "截至 2026-05-09，LV 中国官网参考价 ¥16,500"
  },
  {
    brand: "LV",
    name: "ALMA BB 手袋",
    price: 18000,
    note: "如果追星花费累积到这里，一只经典 LV 小包基本就稳了。",
    url: "https://www.louisvuitton.cn/zhs-cn/products/alma-bb-damier-azur-canvas-nvprod7540223v/N40902",
    source: "截至 2026-05-09，LV 中国官网参考价 ¥18,000"
  },
  {
    brand: "LV",
    name: "SPEEDY 25 BANDOULIÈRE 手袋",
    price: 24300,
    note: "这个档位会很直观地提醒她，有些追星开支其实已经能换一只很热门的 LV。",
    url: "https://www.louisvuitton.cn/zhs-cn/products/speedy-25-bandouliere-damier-other-nvprod5340019v/N40700",
    source: "截至 2026-05-09，LV 中国官网参考价 ¥24,300"
  },
  {
    brand: "CHANEL",
    name: "CHANEL 25 Mini Handbag",
    price: 42900,
    note: "如果一路追到这个数，已经进入 Chanel 小包的预算带了。",
    url: "https://www.chanel.com/us/fashion/p/AS5631B20304U8392/chanel-25-mini-handbag-grained-calfskin-gold-tone-metal/",
    source: "截至 2026-05-09，Chanel 美国官网价 $6,300，约 ¥42,900"
  }
];

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const categoryBreakdown = document.getElementById("categoryBreakdown");
const monthlyBreakdown = document.getElementById("monthlyBreakdown");
const bagComparison = document.getElementById("bagComparison");
const wishlistRanking = document.getElementById("wishlistRanking");
const clearAllBtn = document.getElementById("clearAllBtn");

const totalSpendHero = document.getElementById("totalSpendHero");
const totalSpend = document.getElementById("totalSpend");
const expenseCount = document.getElementById("expenseCount");
const averageSpend = document.getElementById("averageSpend");
const monthSpend = document.getElementById("monthSpend");
const heroHint = document.getElementById("heroHint");

const expenseItemTemplate = document.getElementById("expenseItemTemplate");

let expenses = loadExpenses();

document.getElementById("expenseDate").value = new Date().toISOString().split("T")[0];

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(expenseForm);
  const amount = Number(formData.get("amount"));

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const expense = {
    id: crypto.randomUUID(),
    title: String(formData.get("title")).trim(),
    amount,
    date: String(formData.get("date")),
    category: String(formData.get("category")),
    note: String(formData.get("note")).trim()
  };

  expenses.unshift(expense);
  saveExpenses();
  expenseForm.reset();
  document.getElementById("expenseDate").value = new Date().toISOString().split("T")[0];
  render();
});

clearAllBtn.addEventListener("click", () => {
  if (!expenses.length) {
    return;
  }

  const shouldClear = window.confirm("确定要清空全部追星花费记录吗？");

  if (!shouldClear) {
    return;
  }

  expenses = [];
  saveExpenses();
  render();
});

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getSeedData();
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : getSeedData();
  } catch (error) {
    return getSeedData();
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function getSeedData() {
  return [
    {
      id: crypto.randomUUID(),
      title: "演唱会门票",
      amount: 1280,
      date: "2026-04-18",
      category: "门票",
      note: "抢票成功的那一刻很快乐，付款的时候也是真的心痛。"
    },
    {
      id: crypto.randomUUID(),
      title: "去线下看活动的高铁",
      amount: 642,
      date: "2026-04-24",
      category: "交通",
      note: "来回高铁和打车钱，追现场的时候这部分特别容易被忽略。"
    },
    {
      id: crypto.randomUUID(),
      title: "活动附近酒店一晚",
      amount: 458,
      date: "2026-05-02",
      category: "酒店",
      note: "为了第二天方便排队，直接住在场馆附近。"
    },
    {
      id: crypto.randomUUID(),
      title: "手幅透扇和应援贴纸",
      amount: 189,
      date: "2026-05-03",
      category: "应援物",
      note: "手幅、透扇、小卡保护套这些零零碎碎加起来也不少。"
    },
    {
      id: crypto.randomUUID(),
      title: "线下见面会当天吃饭",
      amount: 136,
      date: "2026-05-03",
      category: "吃饭",
      note: "和朋友碰面吃饭、咖啡、夜宵，都是追星成本的一部分。"
    },
    {
      id: crypto.randomUUID(),
      title: "联名代言饮品囤货",
      amount: 368,
      date: "2026-05-05",
      category: "代言",
      note: "为了支持刘耀文代言顺手买了一波。"
    },
    {
      id: crypto.randomUUID(),
      title: "生日应援拼单",
      amount: 520,
      date: "2026-05-06",
      category: "应援物",
      note: "和朋友一起拼了线下大屏和物料应援。"
    },
    {
      id: crypto.randomUUID(),
      title: "专辑补邮和拼邮",
      amount: 88,
      date: "2026-05-07",
      category: "专辑",
      note: "单看不多，但经常会一笔一笔累上来。"
    }
  ];
}

function render() {
  renderStats();
  renderCategories();
  renderMonthly();
  renderBags();
  renderWishlist();
  renderExpenses();
}

function renderStats() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const avg = expenses.length ? total / expenses.length : 0;
  const currentMonthKey = getMonthKey(new Date());
  const monthlyTotal = expenses
    .filter((item) => getMonthKey(item.date) === currentMonthKey)
    .reduce((sum, item) => sum + item.amount, 0);

  totalSpendHero.textContent = formatCurrency(total);
  totalSpend.textContent = formatCurrency(total);
  expenseCount.textContent = String(expenses.length);
  averageSpend.textContent = formatCurrency(avg);
  monthSpend.textContent = formatCurrency(monthlyTotal);

  if (!expenses.length) {
    heroHint.textContent = "还没有记账，第一笔开始就能看到离包包还有多远。";
    return;
  }

  const closestBag = [...luxuryBags]
    .sort((a, b) => Math.abs(a.price - total) - Math.abs(b.price - total))[0];
  const ratio = total / closestBag.price;

  if (ratio >= 1) {
    heroHint.textContent = `这份给刘耀文的热爱，已经够拿下 ${closestBag.brand} ${closestBag.name} 了。`;
  } else {
    heroHint.textContent = `现在已经花到 ${closestBag.brand} ${closestBag.name} 的 ${Math.round(
      ratio * 100
    )}% 了，真的快具象成包了。`;
  }
}

function renderCategories() {
  categoryBreakdown.innerHTML = "";

  if (!expenses.length) {
    categoryBreakdown.innerHTML = '<div class="empty-state">还没有分类数据，先记下一笔追星花费吧。</div>';
    return;
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const buckets = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  Object.entries(buckets)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, amount]) => {
      const percent = total ? (amount / total) * 100 : 0;
      const item = document.createElement("article");
      item.className = "category-item";
      item.innerHTML = `
        <div class="category-row">
          <strong>${category}</strong>
          <span>${formatCurrency(amount)} · ${percent.toFixed(1)}%</span>
        </div>
        <div class="category-bar">
          <span style="width: ${Math.min(percent, 100)}%"></span>
        </div>
      `;
      categoryBreakdown.appendChild(item);
    });
}

function renderBags() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  bagComparison.innerHTML = "";

  luxuryBags.forEach((bag) => {
    const ratio = bag.price ? total / bag.price : 0;
    const percent = Math.min(ratio * 100, 100);
    const remaining = Math.max(bag.price - total, 0);
    const card = document.createElement("article");
    card.className = "bag-card";
    card.innerHTML = `
      ${bag.friendPick ? '<span class="friend-badge">Luv15_y 最爱</span>' : ''}
      <span class="bag-brand">${bag.brand}</span>
      <h3>${bag.name}</h3>
      <div class="bag-price-line">
        <span>参考价格</span>
        <strong class="bag-price">${formatCurrency(bag.price)}</strong>
      </div>
      <div class="bag-progress">
        <span style="width: ${percent}%"></span>
      </div>
      <p class="bag-status">${buildBagMessage(total, bag, remaining, ratio)}</p>
      <p class="expense-note">${bag.note}</p>
      <p class="expense-note">${bag.source}</p>
      <a class="bag-link" href="${bag.url}" target="_blank" rel="noreferrer">查看包款参考</a>
    `;
    bagComparison.appendChild(card);
  });
}

function renderMonthly() {
  monthlyBreakdown.innerHTML = "";

  if (!expenses.length) {
    monthlyBreakdown.innerHTML = '<div class="empty-state">还没有月度数据，先记下一笔花费吧。</div>';
    return;
  }

  const buckets = expenses.reduce((acc, item) => {
    const key = getMonthKey(item.date);
    if (!acc[key]) {
      acc[key] = { total: 0, count: 0 };
    }
    acc[key].total += item.amount;
    acc[key].count += 1;
    return acc;
  }, {});

  Object.entries(buckets)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .forEach(([month, data]) => {
      const item = document.createElement("article");
      item.className = "monthly-item";
      item.innerHTML = `
        <div class="monthly-topline">
          <strong>${formatMonthLabel(month)}</strong>
          <strong>${formatCurrency(data.total)}</strong>
        </div>
        <p class="monthly-meta">本月共记了 ${data.count} 笔，平均每笔 ${formatCurrency(
          data.total / data.count
        )}。</p>
      `;
      monthlyBreakdown.appendChild(item);
    });
}

function renderWishlist() {
  wishlistRanking.innerHTML = "";

  if (!luxuryBags.length) {
    wishlistRanking.innerHTML = '<div class="empty-state">还没有愿望包数据。</div>';
    return;
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  luxuryBags
    .slice()
    .sort((a, b) => {
      // friendPick 排前面
      if (a.friendPick && !b.friendPick) return -1;
      if (!a.friendPick && b.friendPick) return 1;
      // 然后再按离目标还差多少钱排序
      return Math.max(a.price - total, 0) - Math.max(b.price - total, 0);
    })
    .forEach((bag, index) => {
      const gap = Math.max(bag.price - total, 0);
      const item = document.createElement("article");
      item.className = "wishlist-item";
      item.innerHTML = `
        <div class="wishlist-topline">
          <div>
            <span class="wishlist-rank">${index + 1}</span>
            <strong style="margin-left: 10px;">${bag.brand} ${bag.name}</strong>
            ${bag.friendPick ? '<span class="friend-badge" style="margin-left: 8px;">Luv15_y 最爱</span>' : ''}
          </div>
          <span class="wishlist-gap">${gap ? `还差 ${formatCurrency(gap)}` : "已经够买了"}</span>
        </div>
        <p class="wishlist-meta">参考价 ${formatCurrency(bag.price)}，${buildWishlistText(total, bag, gap)}</p>
      `;
      wishlistRanking.appendChild(item);
    });
}

function buildBagMessage(total, bag, remaining, ratio) {
  if (!total) {
    return `现在还是 0 元，距离 ${bag.name} 还差 ${formatCurrency(bag.price)}。`;
  }

  if (ratio >= 1) {
    const multiple = (total / bag.price).toFixed(2);
    return `这笔追星花费已经达到这只包的 ${multiple} 倍。`;
  }

  return `已经花到这只包的 ${Math.round(ratio * 100)}%，还差 ${formatCurrency(remaining)}。`;
}

function buildWishlistText(total, bag, gap) {
  if (!total) {
    return `现在还没开始记账，离这只包还有 ${formatCurrency(bag.price)}。`;
  }

  if (!gap) {
    return `以当前累计花费来看，Luv15_y 这部分追星预算已经超过这只包了。`;
  }

  return `以当前累计花费来看，Luv15_y 离这只包还差 ${formatCurrency(gap)}。`;
}

function renderExpenses() {
  expenseList.innerHTML = "";

  if (!expenses.length) {
    expenseList.innerHTML = '<div class="empty-state">目前没有记录，等她下一次为了刘耀文下单时就可以记进来。</div>';
    return;
  }

  expenses
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((expense) => {
      const fragment = expenseItemTemplate.content.cloneNode(true);
      const root = fragment.querySelector(".expense-item");

      fragment.querySelector(".expense-title").textContent = expense.title;
      fragment.querySelector(".expense-amount").textContent = formatCurrency(expense.amount);
      fragment.querySelector(".expense-category").textContent = expense.category;
      fragment.querySelector(".expense-date").textContent = formatDate(expense.date);
      fragment.querySelector(".expense-note").textContent = expense.note || "没有备注";

      root.querySelector(".delete-btn").addEventListener("click", () => {
        expenses = expenses.filter((item) => item.id !== expense.id);
        saveExpenses();
        render();
      });

      expenseList.appendChild(fragment);
    });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function getMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(value) {
  const [year, month] = value.split("-");
  if (!year || !month) {
    return value;
  }

  return `${year}年${Number(month)}月`;
}

render();
