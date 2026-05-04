# SC6125 Lecture 2 Review（第 2 讲复习）：Tokenization（代币化） and Stablecoin Design（稳定币设计）

> 复习目标：第 2 讲是 token（代币）和 stablecoin（稳定币）机制课。考试很可能考 token types（代币类型）、RWA tokenization（真实世界资产代币化）、fractionalized securities（碎片化证券）、stablecoin taxonomy（稳定币分类）、MakerDAO/DAI（加密资产抵押稳定币）和 Terra/UST death spiral（死亡螺旋）。  
> 阅读方式：每个英文术语后面都有中文对照，避免只看英文不理解。

## 0. Core Vocabulary（核心术语中英对照）

| English term（英文术语） | 中文对照 |
|---|---|
| Tokenization / Tokenisation | 代币化，把资产、权利或价值映射成链上 token |
| Token | 代币，链上表示资产、权利、凭证或价值单位 |
| Issuance authority | 发行主体 |
| Backing / basis | 价值支持或基础 |
| Native Protocol Token | 原生协议代币，例如 BTC、ETH |
| Entity-issued Unbacked Token | 实体发行的无支持代币，例如治理代币 |
| Asset-backed RWA Token | 真实世界资产支持代币 |
| Balance-sheet Token | 资产负债表代币，通常代表受监管金融机构负债 |
| Reserve-backed Stablecoin | 储备支持稳定币，例如 USDC、USDT |
| Wrapped Token | 包装代币，由托管人或桥锁定底层资产支持 |
| Algorithmic Token | 算法代币，依靠协议逻辑和激励机制 |
| Synthetic Token | 合成代币，提供某资产价格或收益的经济敞口 |
| Credential / Non-transferable Token | 凭证/不可转让代币，例如 KYC 或合格投资者证明 |
| Real-World Asset / RWA | 真实世界资产，例如黄金、债券、房地产、基金 |
| Legal claim | 法律索取权/法律权利 |
| Special Purpose Vehicle / SPV | 特殊目的载体 |
| Offering documentation | 募集/发行文件 |
| Lifecycle management | 生命周期管理，例如付息、赎回、审计、披露 |
| Mint / Burn | 铸造 / 销毁 |
| Redemption | 赎回 |
| Oracle | 预言机，把链下数据传到链上 |
| Collateral | 抵押品 |
| Over-collateralization | 超额抵押 |
| Liquidation | 清算 |
| Reflexivity | 反身性，价格下跌和信心下跌互相强化 |
| Death spiral | 死亡螺旋，赎回、增发、价格崩溃和信心崩溃互相推动 |
| Stablecoin trilemma | 稳定币三难困境：稳定性、独立性、成本 |

## 1. Lecture Map（本讲结构）

第 2 讲主线：

1. Token Types（代币类型）：按 issuance authority（发行主体）和 backing（价值支持）分类。
2. RWA Tokenization（真实世界资产代币化）：从法律、监管、结构、技术、运营五个层次理解。
3. Gold-backed Token（黄金支持代币）：用黄金案例理解链上/链下架构。
4. Fractionalized Securities（碎片化证券）：降低投资门槛，但不消除风险。
5. Stablecoin Taxonomy（稳定币分类）：法币抵押、加密资产抵押、算法、混合等。
6. Crypto-collateralized Stablecoin（加密资产抵押稳定币）：以 DAI / MakerDAO 为核心。
7. Algorithmic Stablecoin（算法稳定币）：以 Terra / UST / LUNA 失败为核心。
8. Stablecoin Trilemma（稳定币三难）：stability（稳定性）、independence（独立性）、costs（成本）。

## 2. Token Types by Issuance Method（按发行方式划分的代币类型）

| Token type（代币类型） | Issuance authority（发行主体） | Backing / basis（支持或基础） | Examples（例子） |
|---|---|---|---|
| Native Protocol Tokens（原生协议代币） | Blockchain protocol（区块链协议） | None（无外部支持） | Bitcoin / BTC（比特币）、Ether / ETH（以太币） |
| Entity-issued Unbacked Tokens（实体发行无支持代币） | Company or DAO（公司或去中心化自治组织） | None（无支持） | UNI（Uniswap 治理代币）、governance tokens（治理代币） |
| Asset-backed RWA Tokens（资产支持 RWA 代币） | SPV, fund or issuer（SPV、基金或发行方） | Legal claim on off-chain assets（对链下资产的法律权利） | tokenised bonds（代币化债券）、Project Guardian（Guardian 项目） |
| Balance-sheet Tokens（资产负债表代币） | Regulated financial institution（受监管金融机构） | Issuer liability（发行人负债） | tokenised bank deposits（代币化银行存款） |
| Reserve-backed Stablecoins（储备支持稳定币） | Stablecoin issuer（稳定币发行人） | Segregated reserves（隔离储备） | USDC、USDT、PAXG |
| Wrapped Tokens（包装代币） | Custodian or bridge（托管人或跨链桥） | Locked underlying token（锁定的底层代币） | WBTC、wETH |
| Crypto-collateralized Algorithmic Tokens（加密资产抵押算法代币） | Protocol logic（协议逻辑） | Over-collateralized crypto assets（超额抵押加密资产） | DAI |
| Non-collateralized Algorithmic Tokens（无抵押算法代币） | Protocol logic（协议逻辑） | Incentives and reflexivity（激励和反身性） | UST-like designs（类似 UST 的设计） |
| Synthetic Tokens（合成代币） | Protocol, collateral and oracles（协议、抵押品和预言机） | Collateralized economic exposure（有抵押的经济敞口） | synthetic USD（合成美元）、synthetic equities（合成股票） |
| Credential / Non-transferable Tokens（凭证/不可转让代币） | Trusted institution（可信机构） | Attestation（证明/认证） | on-chain KYC（链上 KYC）、accreditation tokens（资质认证代币） |

高频辨析：

- Native token（原生代币）不是公司发行，也不代表链下资产索取权。
- RWA token（真实世界资产代币）关键是 legal claim（法律权利），不是只把资产名字写上链。
- Balance-sheet token（资产负债表代币）通常是 regulated financial institution liability（受监管金融机构负债）。
- Wrapped token（包装代币）依赖 custodian / bridge trust（托管人或跨链桥信任）。
- Synthetic token（合成代币）给 economic exposure（经济敞口），不等于直接拥有底层资产。

## 3. RWA Tokenization（真实世界资产代币化）

Lecture 2 强调：RWA tokenization（真实世界资产代币化）还没有完全标准化流程，但常见有 8 步。核心顺序是：

**Legal -> Regulatory -> Structural -> Technical -> Operational（法律 -> 监管 -> 结构 -> 技术 -> 运营）**

### 3.1 Eight Steps（八步流程）

1. Asset & Rights Structuring（资产与权利结构设计）  
   目标：定义到底 tokenized（被代币化）的是什么，例如 ownership（所有权）、income right（收益权）、redemption right（赎回权）。

2. Regulatory Classification & Jurisdictional Analysis（监管分类与司法辖区分析）  
   目标：判断适用哪些 laws and licensing（法律和牌照要求），例如是否是 security（证券）。

3. Legal Vehicle Formation（法律载体设立）  
   目标：建立 legally enforceable wrapper（法律可执行的包装结构），例如 SPV（特殊目的载体）、fund（基金）、trust（信托）。

4. Offering Documentation & Disclosure（发行文件与信息披露）  
   目标：让资产 investable and compliant（可投资且合规），披露风险、费用、权利、赎回机制等。

5. Token Design & Smart Contract Architecture（代币设计与智能合约架构）  
   目标：把 legal rights（法律权利）转化为 programmable logic（可编程逻辑），例如 mint/burn（铸造/销毁）、whitelist（白名单）、transfer restrictions（转让限制）。

6. Issuance, Distribution & Onboarding（发行、分发和用户准入）  
   目标：把 token（代币）发行给 compliant investors（合规投资者），完成 KYC/AML（客户尽调/反洗钱）。

7. Post-issuance Lifecycle Management（发行后生命周期管理）  
   目标：处理 audit（审计）、income distribution（收益分配）、disclosures（披露）、corporate actions（公司行动）。

8. Secondary Trading, Settlement & Redemption（二级交易、结算和赎回）  
   目标：在保持 compliance（合规）的同时提供 liquidity（流动性）、settlement（结算）和 redemption（赎回）。

### 3.2 RWA 易错点

- RWA tokenization（RWA 代币化）首先是 legal and regulatory design（法律和监管设计），不是先写 smart contract（智能合约）。
- Tokenization（代币化）不能自动解决 custody（托管）、valuation（估值）、legal enforcement（法律执行）和 liquidity（流动性）。
- Tokenized asset（代币化资产）不等于 automatically liquid（自动有流动性）。

## 4. Gold-backed Tokens（黄金支持代币）

### 4.1 Financial problem（金融问题）

Gold markets（黄金市场）的痛点是 operational trust fragmentation（运营信任碎片化）：

- Vault operators（金库运营方）。
- Custodians（托管人）。
- Brokers（经纪商）。
- Clearing agents（清算代理）。
- Registrars（登记机构）。
- Separate ledgers（各自维护账本）。

Gold-backed RWA tokens（黄金支持 RWA 代币）可以实现：

- Verifiable backing（可验证支持）：vault gold（金库黄金）和 token supply（代币供应）一致。
- Atomic issuance and redemption（原子化发行和赎回）。
- Programmable transfer constraints（可编程转让限制）。
- Near-real-time settlement（接近实时结算）。

### 4.2 Why blockchain is appropriate（为什么适合区块链）

区块链解决的是 ledger integrity and coordination（账本完整性和协调），不是 physical gold storage（实物黄金存储）。

它可以提供：

- Single source of truth for token supply（代币供应的单一事实来源）。
- Immutable issuance/redemption records（不可篡改的发行/赎回记录）。
- Atomic settlement / DvP-like behavior（原子结算 / 类似货银对付）。
- No mint without backing（没有支持就不能铸造）。

### 4.3 On-chain Components（链上组件）

1. Token Contract / GoldToken（代币合约/黄金代币）
   - Tracks balances（追踪余额）。
   - Enforces transfer restrictions（执行转让限制）。
   - Supports mint and burn（支持铸造和销毁）。

2. Issuance & Redemption Controller（发行与赎回控制器）
   - Validates mint requests（验证铸造请求）。
   - Enforces 1:1 backing invariant（执行 1:1 支持不变量）。
   - Emits audit-relevant events（发出审计相关事件）。

3. Governance / Emergency Control Contract（治理/紧急控制合约）
   - Pause transfers（暂停转让）。
   - Pause mint/burn（暂停铸造/销毁）。
   - Upgrade contracts（升级合约）。

### 4.4 Off-chain Components（链下组件）

- Gold vault management system（黄金金库管理系统）：追踪 bar serials and weight（金条编号和重量）。
- Auditor（审计员）：确认 vault totals（金库总量）。
- Reserve oracle（储备预言机）：证明 gold balances（黄金余额）。
- Issuer operations（发行方运营）：协调法律和运营步骤。
- User wallet（用户钱包）：用户与 token 交互。

### 4.5 Benefits and Trade-offs（好处和取舍）

Benefits（好处）：

- Continuous verifiable supply integrity（持续可验证的供应完整性）。
- Atomic issuance and redemption（原子化发行和赎回）。
- Programmable restrictions（可编程限制），例如 jurisdiction（司法辖区）和 sanctions（制裁）。
- Reduced reconciliation risk（降低对账风险）。
- Faster settlement（更快结算）。

Trade-offs（取舍）：

- Higher operational complexity（更高运营复杂度）。
- Audit and oracle cost（审计和预言机成本）。
- Governance risk（治理风险）。
- Wallet management complexity（钱包管理复杂）。

## 5. Fractionalized Securities（碎片化证券）

### 5.1 Traditional fractional securities（传统碎片化证券）

一些 FinTech firms and brokerages（金融科技公司和券商）已经提供 fractionalized securities（碎片化证券），例如 Robinhood、SoFi、Fidelity、Charles Schwab。

问题：

- Companies buy whole securities（公司购买完整证券）。
- They record customer fractional interests internally（内部记录客户碎片化权益）。
- There may be no exchange for trading these interests（这些碎片化权益可能没有交易所交易）。
- Not necessarily using blockchain（不一定使用区块链）。

### 5.2 Tokenized fractional securities（代币化碎片证券）

Tokenized securities（代币化证券）可以：

- Encode ownership rights（编码所有权利）。
- Allow fractional ownership（允许碎片化所有权）。
- Support low-cost and efficient trading（支持低成本高效交易）。
- Improve transparency（提高透明度）。

例子：

- BondbloX（债券碎片化平台）把 corporate bonds（公司债）转化为 blockchain-recorded tokens（区块链记录代币）。
- DBS Digital Bond（星展数字债券）：发行金额 $11.3 million（1130 万美元），6-month expiry（6 个月期限），0.6% annual interest（年利率 0.6%）。
- Societe Generale SFH（法国兴业银行相关机构）：发行 tokenized covered bond（代币化担保债券），评级机构给出 AAA rating（AAA 评级）。

### 5.3 Benefits and Risks（好处和风险）

Benefits（好处）：

- Lower minimum investment（降低最低投资额）。
- Better diversification（更好分散投资）。
- Potentially lower cost（可能降低成本）。
- Better transparency（更高透明度）。

Risks（风险）：

- Liquidity risk（流动性风险）。
- Credit risk（信用风险）。
- Intermediary risk（中介风险）。
- Principal-agent risk（委托代理风险）。
- Fraud and disclosure risk（欺诈和披露风险）。
- Smart contract risk（智能合约风险）。
- Oracle risk（预言机风险）。

一句话考点：Tokenization improves access but does not eliminate risk（代币化改善准入，但不消除风险）。

## 6. Stablecoin Design Taxonomy（稳定币设计分类）

| Category（类别） | Peg mechanism（锚定机制） | Examples（例子） |
|---|---|---|
| Fiat-collateralized stablecoin（法币抵押稳定币） | Off-chain reserves and issuer redemption（链下储备和发行人赎回） | USDC、USDT |
| Crypto-collateralized stablecoin（加密资产抵押稳定币） | Over-collateralized crypto assets and on-chain rules（超额抵押加密资产和链上规则） | DAI |
| Pure algorithmic stablecoin（纯算法稳定币） | Supply reflexivity and incentives（供应反身性和激励） | UST、Basis |
| Elastic supply / rebase token（弹性供应/重定基代币） | Balance adjustment rather than true price stability（调整余额而非真正价格稳定） | AMPL |
| Hybrid stablecoin（混合稳定币） | Collateral plus algorithmic operations（抵押品加算法操作） | FRAX |

分类时问三个问题：

1. Collateral source（抵押品来源）是 exogenous（外生）还是 endogenous（内生）？
2. Collateral management（抵押品管理）是 centralized（中心化）还是 decentralized（去中心化）？
3. Stability（稳定性）靠 hard collateral（硬抵押）还是 incentives/confidence（激励和信心）？

## 7. Crypto-collateralized Stablecoin（加密资产抵押稳定币）

### 7.1 Problem（要解决的问题）

用户想要：

- Price-stable digital currency（价格稳定的数字货币）。
- On-chain composability（链上可组合性）。
- Self-custody（自托管）。
- No trusted central issuer（不依赖可信中心发行人）。
- No bank/off-chain reserve reliance（不依赖银行或链下储备）。

### 7.2 Architecture（架构）

On-chain components（链上组件）：

- Vault Manager / Collateral Vault（抵押品金库管理器）：锁定 ETH、stETH 等抵押品。
- Stablecoin Contract（稳定币合约）：mint/burn stablecoins（铸造/销毁稳定币）。
- Oracle Adapter（预言机适配器）：读取 collateral price（抵押品价格）。
- Governance Contracts（治理合约）：设置 fees（费用）、collateral ratios（抵押率）、liquidation parameters（清算参数）。

Off-chain components（链下组件）：

- Price oracles（价格预言机），例如 Chainlink。
- User interfaces（用户界面）和 wallets（钱包）。
- Governance forums（治理论坛）。
- Liquidator bots（清算机器人）。

### 7.3 Flow（流程）

1. User deposits collateral（用户存入抵押品）。
2. Oracle provides price（预言机提供价格）。
3. Vault calculates borrowing capacity（金库计算可借额度）。
4. User mints stablecoins（用户铸造稳定币）。
5. If collateral value falls（如果抵押品价格下跌），collateral ratio（抵押率）下降。
6. If below threshold（低于阈值），liquidation（清算）发生。

### 7.4 MakerDAO / DAI（MakerDAO 与 DAI）

MakerDAO（MakerDAO 协议）是复杂版 crypto-collateralized stablecoin system（加密资产抵押稳定币系统）。

关键机制：

- Multiple collateral types（多种抵押品）。
- Collateral-specific ratios（不同抵押品有不同抵押率）。
- Oracle system（预言机系统）。
- Auction-based liquidation（拍卖式清算）。
- Stability fees（稳定费/借款成本）。
- DAI Savings Rate（DAI 储蓄利率）。
- Emergency Shutdown（紧急关闭）。

Benefits（好处）：

- Transparent collateral（抵押品透明）。
- Non-custodial（非托管）。
- DeFi composability（DeFi 可组合）。

Trade-offs（取舍）：

- Capital inefficiency（资本效率低）。
- Oracle dependency（预言机依赖）。
- Liquidation risk（清算风险）。
- Governance capture risk（治理被控制风险）。

## 8. Algorithmic Stablecoins（算法稳定币）：Terra / UST / LUNA

### 8.1 Goal（目标）

Terra 的目标是创造 decentralized dollar without dollars（没有美元储备的去中心化美元）：

- No fiat reserves（无链下法币储备）。
- No banks or custodians（不依赖银行或托管人）。
- Capital efficient（资本效率高）。
- Fully on-chain mint/burn（链上铸造/销毁）。

### 8.2 Terra dual-token system（Terra 双代币系统）

- UST（Terra 稳定币）：stable unit（稳定单位）。
- LUNA（Terra 原生代币）：volatile absorber（波动吸收器）和 staking token（质押代币）。
- No collateral pool guaranteeing redemption（没有抵押池保证赎回）。

### 8.3 Mint / Burn mechanism（铸造/销毁机制）

If UST > $1（如果 UST 高于 1 美元）：

1. Arbitrageur burns $1 worth of LUNA（套利者销毁价值 1 美元的 LUNA）。
2. Mints 1 UST（铸造 1 个 UST）。
3. Sells UST above $1（以高于 1 美元卖出 UST）。
4. UST supply increases（UST 供应增加），price moves toward $1（价格回到 1 美元附近）。

If UST < $1（如果 UST 低于 1 美元）：

1. Arbitrageur buys cheap UST（套利者买入便宜 UST）。
2. Burns 1 UST（销毁 1 个 UST）。
3. Mints $1 worth of LUNA（铸造价值 1 美元的 LUNA）。
4. UST supply decreases（UST 供应减少），price should recover（理论上价格恢复）。

关键前提：market believes LUNA has value（市场相信 LUNA 有价值）。

### 8.4 Anchor Protocol（Anchor 协议）

Anchor Protocol（Anchor 协议）：

- Lending and borrowing application on Terra（Terra 上的借贷应用）。
- Offered around 19-20% APY（提供约 19-20% 年化收益）。
- Created major demand sink for UST（为 UST 创造主要需求池）。
- Became center of gravity of Terra ecosystem（成为 Terra 生态重心）。

问题：UST demand（UST 需求）过度依赖 unsustainable yield（不可持续收益）。

### 8.5 Luna Foundation Guard / LFG（Luna 基金会守卫）

LFG / Luna Foundation Guard（Luna 基金会守卫）：

- Accumulated BTC reserves（积累 BTC 储备）。
- Intended to defend UST peg（意图维护 UST 锚定）。
- Could sell BTC to buy UST（可卖 BTC 买 UST）。

关键弱点：

- Support was discretionary（支持是自由裁量的）。
- Not protocol-enforced hard collateral（不是协议强制硬抵押）。

### 8.6 Death Spiral（死亡螺旋）

Sequence（顺序）：

1. Large UST exits（大量 UST 退出）。
2. UST is burned for LUNA（UST 被销毁并换成 LUNA）。
3. LUNA supply expands quickly（LUNA 供应快速扩张）。
4. LUNA price collapses（LUNA 价格崩溃）。
5. More LUNA must be minted per UST redemption（每赎回一个 UST 需要铸造更多 LUNA）。
6. Confidence collapses（信心崩溃）。
7. Peg becomes unenforceable（锚定无法维持）。

数字直觉：

- LUNA = $80 时，1 UST 赎回需要 0.0125 LUNA。
- LUNA = $20 时，1 UST 赎回需要 0.05 LUNA。
- LUNA = $5 时，1 UST 赎回需要 0.20 LUNA。
- LUNA 价格越低，铸造越多，供应越爆炸，价格越低。

### 8.7 Failure of incentives（激励失败）

正常时期：

- Arbitrageurs（套利者）通过偏离锚定获利。
- LUNA holders（LUNA 持有人）受益于 UST 增长。
- Validators（验证者）赚取费用并维护网络。

压力时期：

- Arbitrage creates sell pressure on LUNA（套利给 LUNA 带来卖压）。
- LUNA holders become dilution victims（LUNA 持有人被稀释）。
- Rational actors exit（理性参与者选择退出）。
- Governance is too slow（治理反应太慢）。

### 8.8 Redesign ideas（重设计思路）

不直接复制 DAI 或 USDT 的情况下，可以：

- Circuit breakers（熔断机制）：压力时期暂停或放慢赎回。
- Capped LUNA issuance（LUNA 发行上限）：限制供应爆炸。
- Dynamic redemption haircuts（动态赎回折扣）：压力时赎回打折。
- Redemption queue（赎回队列）：避免瞬时挤兑。
- Rule-based exogenous reserve（规则化外生储备）：用硬规则支持锚定。
- Sustainable yield（可持续收益）：降低对 Anchor 高 APY 的依赖。

Trade-off（取舍）：这些机制提高稳定性，但牺牲 capital efficiency（资本效率）、instant redemption（即时赎回）和 pure decentralization（纯去中心化）。

## 9. Stablecoin Comparative Analysis（稳定币比较分析）

Lecture 引用 Hafner et al.（Hafner 等人的研究）观点：

- Endogenous collateral（内生抵押品）+ centralized management（中心化管理）更容易在 demand shock（需求冲击）后崩盘。
- Exogenous collateral（外生抵押品）+ decentralized management（去中心化管理）通常更安全，例如 DAI-like systems（类似 DAI 的系统）。
- 但是更安全通常意味着 higher costs（更高成本）和 capital inefficiency（资本效率低）。

Stablecoin trilemma（稳定币三难）：

1. Stability（稳定性）。
2. Independence（独立性）。
3. Costs（成本）。

记忆：稳定币不可能轻松同时做到最稳定、最独立、最低成本。

## 10. Common MCQ Traps（选择题易错点）

- DAI（DAI 稳定币）= crypto-collateralized and over-collateralized（加密资产抵押且超额抵押）。
- UST（Terra 稳定币）= pure algorithmic / reflexive design（纯算法/反身性设计）。
- Stablecoin on blockchain（链上稳定币）不一定 decentralized（去中心化）。
- RWA tokenization（RWA 代币化）先法律监管，后技术。
- Gold token（黄金代币）解决账本和协调，不解决实物黄金保管本身。
- Tokenized securities（代币化证券）降低门槛，但不消除信用、流动性、法律风险。
- LFG reserves（LFG 储备）是自由裁量支持，不是协议硬抵押。
- Anchor（Anchor 协议）创造 UST 需求，也集中系统性风险。

## 11. Short Answer Templates（短答模板：英文答案 + 中文翻译）

### Q1. Explain the 8-step process for tokenizing a real-world asset.（解释 RWA 代币化 8 步流程）

English answer（英文答案）：  
RWA tokenization should begin with legal and regulatory design rather than technology. The issuer defines the asset and rights, determines regulatory classification, forms a legal vehicle, prepares offering documents, designs token and smart contract architecture, onboards compliant investors, manages post-issuance lifecycle events, and finally enables secondary trading, settlement and redemption while preserving compliance.

中文翻译：  
RWA 代币化应从法律和监管设计开始，而不是从技术开始。发行方定义资产和权利，确定监管分类，建立法律载体，准备发行文件，设计代币和智能合约架构，接入合规投资者，管理发行后生命周期事件，最后在保持合规的前提下实现二级交易、结算和赎回。

### Q2. Why is blockchain appropriate for gold-backed tokenization?（为什么区块链适合黄金支持代币化？）

English answer（英文答案）：  
Blockchain is appropriate because the main problem is fragmented ledgers and trust coordination, not physical gold storage. A token contract can provide a single source of truth for supply, immutable issuance and redemption records, and programmable transfer restrictions. However, the system still depends on vaults, auditors, reserve oracles and legal enforceability.

中文翻译：  
区块链适合黄金代币化，是因为主要问题是账本碎片化和信任协调，而不是实物黄金存储。代币合约可以提供供应量的单一事实来源、不可篡改的发行和赎回记录，以及可编程转让限制。但系统仍依赖金库、审计员、储备预言机和法律可执行性。

### Q3. Compare crypto-collateralized and algorithmic stablecoins.（比较加密资产抵押稳定币和算法稳定币）

English answer（英文答案）：  
Crypto-collateralized stablecoins such as DAI use over-collateralized crypto assets locked in smart contracts. They are transparent and composable but capital inefficient and dependent on oracles and liquidation. Pure algorithmic stablecoins such as UST rely mainly on mint/burn incentives and confidence. They are capital efficient but fragile under negative demand shocks because redemptions can create reflexive sell pressure and death spirals.

中文翻译：  
DAI 等加密资产抵押稳定币使用锁定在智能合约中的超额抵押加密资产。它们透明且可组合，但资本效率低，并依赖预言机和清算。UST 等纯算法稳定币主要依靠铸造/销毁激励和信心。它们资本效率高，但在负面需求冲击下脆弱，因为赎回会产生反身性卖压和死亡螺旋。

### Q4. Explain Terra's death spiral.（解释 Terra 死亡螺旋）

English answer（英文答案）：  
Terra used UST as a stablecoin and LUNA as a volatile absorber. When UST traded below one dollar, users could burn UST to mint one dollar worth of LUNA. During a large demand shock, many users exited UST, rapidly expanding LUNA supply. As LUNA price fell, more LUNA had to be minted for each redemption, worsening dilution and destroying confidence. Without a hard redemption floor, the peg became unenforceable.

中文翻译：  
Terra 使用 UST 作为稳定币，LUNA 作为波动吸收器。当 UST 低于 1 美元时，用户可以销毁 UST 并铸造价值 1 美元的 LUNA。在巨大需求冲击下，大量用户退出 UST，迅速扩大 LUNA 供应。随着 LUNA 价格下跌，每次赎回都需要铸造更多 LUNA，进一步稀释并摧毁信心。没有硬性赎回底价时，锚定无法维持。

### Q5. What is the stablecoin trilemma?（什么是稳定币三难困境？）

English answer（英文答案）：  
The stablecoin trilemma is the trade-off between stability, independence and costs. Strong exogenous collateral can improve stability but increases cost and reduces independence. More independent designs avoid fiat or banks but often need over-collateralization or face higher peg volatility. Low-cost designs may become reflexive and unstable under stress.

中文翻译：  
稳定币三难是稳定性、独立性和成本之间的取舍。强外生抵押品可以提升稳定性，但增加成本并降低独立性。更独立的设计避免依赖法币或银行，但通常需要超额抵押，或面临更高锚定波动。低成本设计可能在压力下变得反身性和不稳定。

## 12. Final Cram Sheet（最后 5 分钟背诵）

- Token type（代币类型）= issuer（发行方）+ backing（价值支持）+ rights（权利）。
- RWA tokenization（RWA 代币化）= Legal（法律）-> Regulatory（监管）-> Structural（结构）-> Technical（技术）-> Operational（运营）。
- Gold token（黄金代币）解决 ledger integrity（账本完整性）和 backing verification（支持验证），不解决实物金库信任本身。
- Fractionalized securities（碎片化证券）降低投资门槛，但不消除 liquidity risk（流动性风险）和 credit risk（信用风险）。
- DAI（DAI）= over-collateralized crypto stablecoin（超额加密资产抵押稳定币）。
- UST（UST）= pure algorithmic stablecoin（纯算法稳定币）。
- Death spiral（死亡螺旋）= UST exits（UST 退出）-> LUNA minting（铸造 LUNA）-> LUNA price collapse（LUNA 价格崩溃）-> confidence collapse（信心崩溃）。
- Stablecoin trilemma（稳定币三难）= stability（稳定性）+ independence（独立性）+ costs（成本）。
