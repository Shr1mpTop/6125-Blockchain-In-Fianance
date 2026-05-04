# SC6125 Lecture 3 Review（第 3 讲复习）：DeFi Use Cases（去中心化金融用例）

> 复习目标：第 3 讲讲 DeFi building blocks（DeFi 基础模块），包括 DEX（去中心化交易所）、AMM/CFMM（自动做市商/常数函数做市商）、lending（借贷）、derivatives（衍生品）、asset management（资产管理）和 yield farming（收益耕作）。  
> 阅读方式：所有英文术语都附中文对照；考试需要认英文，理解时看中文。

## 0. Core Vocabulary（核心术语中英对照）

| English term（英文术语） | 中文对照 |
|---|---|
| DeFi compositions | DeFi 可组合性，不同协议像金融乐高一样组合 |
| Financial lego | 金融乐高 |
| Externally Owned Account / EOA | 外部账户，通常是用户钱包账户 |
| Settlement layer | 结算层，区块链和原生资产所在层 |
| Asset layer | 资产层，链上发行的资产和 token |
| Protocol layer | 协议层，DEX、借贷、衍生品等智能合约标准 |
| Application layer | 应用层，面向用户的前端和应用 |
| Aggregation layer | 聚合层，连接多个协议或应用的平台 |
| Decentralized Exchange / DEX | 去中心化交易所 |
| Centralized Exchange / CEX | 中心化交易所 |
| Order book | 订单簿 |
| Relayer | 中继者，链下托管订单信息但不托管资金 |
| Automated Market Maker / AMM | 自动做市商 |
| Constant Function Market Maker / CFMM | 常数函数做市商 |
| Liquidity pool | 流动性池 |
| Liquidity Provider / LP | 流动性提供者 |
| LP token | LP 代币，代表对池子的按比例索取权 |
| Slippage | 滑点，预期价格与实际成交价格之间的差异 |
| Arbitrage | 套利 |
| Reserve aggregation | 储备聚合，聚合多个流动性提供者报价 |
| Peer-to-peer / P2P | 点对点 |
| Over-the-counter / OTC | 场外交易 |
| Collateralized Debt Position / CDP | 抵押债务头寸 |
| Collateralized Debt Market / CDM | 抵押债务市场 |
| Utilization rate | 资金利用率 |
| cTokens | Compound 中代表存款份额和利息权利的代币 |
| Derivatives | 衍生品 |
| Synthetic assets | 合成资产 |
| Prediction market | 预测市场 |
| On-chain asset management | 链上资产管理 |
| Yield farming | 收益耕作，供应、借贷、质押或提供流动性以赚收益 |
| Flash loan attack | 闪电贷攻击 |
| Rug pull | 项目方卷款跑路 |
| Reentrancy attack | 重入攻击 |
| Key exploit | 密钥漏洞或密钥被利用 |

## 1. Lecture Map（本讲结构）

本讲主要 DeFi categories（DeFi 类别）：

- Stablecoins（稳定币）。
- CBDCs（央行数字货币）。
- Decentralized Exchanges / DEXs（去中心化交易所）。
- Staking（质押）。
- Lending（借贷）。
- Derivatives（衍生品）。
- Asset Management（资产管理）。
- Fixed interest and savings（固定利息和储蓄）。
- Mutual Insurance（互助保险）。

核心逻辑：DeFi protocols（DeFi 协议）不是孤立产品，而是 composable building blocks（可组合基础模块）。

## 2. DeFi Compositions（DeFi 可组合性）

DeFi 被称为 financial lego（金融乐高），因为 smart contracts（智能合约）可以互相调用，组合成新产品。

关键技术点：

- Smart contract（智能合约）不会自己主动开始执行。
- Initial call（初始调用）必须来自 externally owned account / EOA（外部账户，例如用户钱包）。
- 一个智能合约可以再调用其他智能合约，形成 sequence of internal transactions（内部交易序列）。

例子：

- 1inch（1inch 聚合器）可以在一笔交易中把 USDT（泰达币）换成 KYL（KYL 代币）。
- 路由可能经过 SushiSwap（SushiSwap 交易所）和 Uniswap（Uniswap 交易所）。
- WETH（包装 ETH）可作为 intermediary token（中间代币）。

考点：Composability（可组合性）提高 efficiency and innovation（效率和创新），但也增加 dependency and contagion risk（依赖和传染风险）。

## 3. DeFi Stack（DeFi 五层架构）

| Layer（层级） | English name（英文名称） | 中文解释 |
|---:|---|---|
| 1 | Settlement layer（结算层） | 区块链和原生资产，例如 Ethereum and ETH（以太坊和 ETH） |
| 2 | Asset layer（资产层） | 区块链上发行的各种 token（代币） |
| 3 | Protocol layer（协议层） | DEX、lending、derivatives 等智能合约标准 |
| 4 | Application layer（应用层） | 用户前端、钱包、网页应用 |
| 5 | Aggregation layer（聚合层） | 连接多个应用和协议的平台，例如交易聚合器 |

易错点：

- Settlement layer（结算层）不是前端应用，而是区块链基础。
- Protocol layer（协议层）是智能合约；Application layer（应用层）是用户界面。
- Aggregation layer（聚合层）连接多个协议，帮助用户完成复杂操作。

## 4. Decentralized Exchanges / DEXs（去中心化交易所）

### 4.1 Why DEX?（为什么需要 DEX？）

Centralized exchanges / CEXs（中心化交易所）的问题：

- Users deposit assets with exchange（用户把资产存入交易所）。
- Users lose direct control（用户失去直接控制权）。
- Users must trust exchange operator（用户必须信任交易所运营者）。

DEX（去中心化交易所）的目标：

- Users keep control until trade execution（交易执行前用户保持资产控制）。
- Trade executes atomically（交易原子执行）。
- Counterparty credit risk is reduced（降低交易对手信用风险）。

### 4.2 DEX Types（DEX 类型）

1. Decentralized order book exchanges（去中心化订单簿交易所）。
2. AMM / CFMM（自动做市商 / 常数函数做市商）。
3. Smart contract-based reserve aggregation（基于智能合约的储备聚合）。
4. Peer-to-peer / OTC protocols（点对点 / 场外协议）。

## 5. Order Book DEX（订单簿型 DEX）

### 5.1 On-chain order book（链上订单簿）

特点：

- Every order is stored in smart contract（每个订单存在智能合约中）。
- More decentralized（更去中心化）。

缺点：

- Costly and slow（成本高、速度慢）。
- Even placing order costs gas（连挂单也要支付 gas 费用）。

### 5.2 Off-chain order book（链下订单簿）

特点：

- Relayers（中继者）在链下托管和更新订单。
- Relayers do not control funds（中继者不控制资金）。
- Relayers do not execute settlement（中继者不执行结算）。
- Settlement occurs on-chain（结算在链上发生）。

例子：

- 0x（0x 协议）。

易错点：off-chain order book（链下订单簿）不等于 centralized custody（中心化托管）。

## 6. AMM / CFMM（自动做市商 / 常数函数做市商）

### 6.1 Definition（定义）

AMM / CFMM（自动做市商 / 常数函数做市商）是 smart contract liquidity pool（智能合约流动性池），让用户直接和池子交易，而不是通过 order book（订单簿）找对手方。

Constant product AMM（常数乘积 AMM）不变量：`x * y = k`（x 乘以 y 等于常数 k）。

中文解释：

- `x` = reserve of token A（代币 A 的储备）。
- `y` = reserve of token B（代币 B 的储备）。
- `k` = constant invariant（常数不变量）。

### 6.2 What problem AMM solves（AMM 解决什么问题）

AMM 提供：

- Continuous liquidity（连续流动性）。
- Deterministic pricing（确定性定价）。
- Permissionless trading（无需许可交易）。
- Atomic settlement（原子结算）。
- Self-custodial execution（自托管执行）。

它的重点不是撮合速度，而是 credibly neutral execution without intermediary trust（无需信任中介的可信中立执行）。

### 6.3 AMM Components（AMM 组件）

On-chain components（链上组件）：

- Liquidity Pool Contract（流动性池合约）：持有储备、执行交换、收取费用。
- Router Contract（路由合约）：处理多跳交易、报价、授权等。
- LP Token Contract（LP 代币合约）：代表对池子储备的按比例索取权。
- Governance Contracts（治理合约）：设置费用、协议费开关、紧急暂停等。

Off-chain components（链下组件）：

- User interface（用户界面）。
- Wallet（钱包）。
- Arbitrage bots（套利机器人）。
- MEV searchers（最大可提取价值搜索者）。

### 6.4 AMM Pricing（AMM 定价）

AMM 价格来自 reserve ratio（储备比例），不需要 external price oracle（外部价格预言机）来决定池内价格。

当 pool price（池子价格）和 market price（市场价格）不一致：

1. Arbitrageurs（套利者）与池子交易。
2. Pool reserves（池子储备）变化。
3. Pool price（池子价格）接近 market price（市场价格）。
4. LPs（流动性提供者）赚取 trading fees（交易费）。

### 6.5 Slippage（滑点）

Slippage（滑点）= expected execution price（预期成交价）和 actual execution price（实际成交价）的差异。

在 constant product AMM（常数乘积 AMM）中：

- Larger trade（更大交易）会更强烈改变储备比例。
- Slippage increases with trade size relative to pool depth（滑点随着交易规模相对池子深度变大而上升）。
- Slippage is structural（滑点是结构性现象），不是偶然错误。

### 6.6 Numerical Example（数字例题）

初始 ETH/USDC 池：

- ETH reserve（ETH 储备）= 100。
- USDC reserve（USDC 储备）= 200,000。
- Spot price（现货价格）= 2,000 USDC per ETH（每 ETH 2000 USDC）。
- `k = 100 * 200,000 = 20,000,000`。

Swap 1 ETH to USDC（用 1 ETH 换 USDC）：

- 新 ETH 储备 = 101。
- 新 USDC 储备 = 20,000,000 / 101 = 198,019.80。
- USDC out（输出 USDC）= 1,980.20。
- Effective price（有效价格）约 1,980.20 USDC/ETH。

Swap 30 ETH to USDC（用 30 ETH 换 USDC）：

- Naive expectation（天真预期）= 30 * 2,000 = 60,000 USDC。
- 新 ETH 储备 = 130。
- 新 USDC 储备 = 20,000,000 / 130 = 153,846.15。
- USDC out（输出 USDC）= 46,153.85。
- Effective price（有效价格）约 1,538.46 USDC/ETH。

考点：大额交易相对池子越大，slippage（滑点）越严重。

### 6.7 StableSwap and Uniswap v3（StableSwap 和 Uniswap v3）

StableSwap（稳定币兑换曲线）：

- Designed for correlated assets（为相关资产设计），例如 stablecoins（稳定币）。
- Near the peg（接近锚定价格时）滑点很低。
- Far from the peg（偏离锚定较远时）更像 constant product（常数乘积）以保护池子。

Uniswap v3（Uniswap 第三版）：

- Uses concentrated liquidity（集中流动性）。
- LPs choose price ranges（LP 选择价格区间）。
- In active range（有效价格区间内）提高 virtual liquidity（虚拟流动性），降低 slippage（滑点）。
- Trade-off（取舍）：价格离开区间后，LP liquidity becomes inactive（LP 流动性失效）。

## 7. Reserve Aggregation and P2P DEX（储备聚合和点对点 DEX）

### 7.1 Reserve Aggregation（储备聚合）

机制：

- Liquidity providers（流动性提供者）向智能合约 advertise prices（报价）。
- User sends trade request（用户发送交易请求）。
- Smart contract compares prices（智能合约比较价格）。
- Best offer is executed atomically（最佳报价被原子执行）。

例子：

- Kyber Network（Kyber 网络）。

风险：

- Limited provider competition（流动性提供者竞争不足）可能造成 collusion（合谋）或 monopolistic pricing（垄断定价）。

### 7.2 P2P / OTC Protocols（点对点/场外协议）

机制：

- Offers accepted only by negotiated parties（报价只由协商方接受）。
- More suitable for negotiated trades（更适合协商交易）。

例子：

- AirSwap（AirSwap 协议）。

## 8. Decentralized Lending（去中心化借贷）

### 8.1 Why DeFi lending?（为什么需要 DeFi 借贷？）

DeFi lending（去中心化借贷）特点：

- Permissionless（无需许可）。
- No need for borrower/lender identity in the traditional sense（不依赖传统身份识别）。
- Collateral protects lenders（抵押品保护贷款人）。

两个大类：

1. Collateralized Debt Positions / CDPs（抵押债务头寸）。
2. Collateralized Debt Markets / CDMs（抵押债务市场）。

### 8.2 CDP（抵押债务头寸）

机制：

- User locks crypto collateral（用户锁定加密资产抵押品）。
- User mints new debt tokens（用户铸造新的债务代币）。
- No direct lender needed（不需要直接贷款人）。

例子：

- MakerDAO（MakerDAO 协议）。

用途：

- Get liquid asset without selling collateral（不卖抵押品也能获得流动资产）。
- Maintain market exposure（保留市场敞口）。

### 8.3 CDM（抵押债务市场）

机制：

- Borrow existing cryptoassets from lenders（从贷款人借已有加密资产）。
- Collateral locked in smart contract（抵押品锁在智能合约中）。

两种 matching（匹配）：

- P2P matching（点对点匹配）：贷款人借给特定借款人，通常可固定期限和固定利率。
- Pooled matching（池化匹配）：贷款人存入资金池，借款人从池中借，利率随 utilization rate（资金利用率）变化。

例子：

- Compound（Compound 协议）。
- Aave（Aave 协议）。

### 8.4 Utilization Rate（资金利用率）

Pooled lending（池化借贷）中：

- High liquidity availability（流动性充足）-> loans cheaper（借款便宜）。
- High demand / high utilization（需求高/利用率高）-> loans more expensive（借款更贵）。

## 9. Compound and cTokens（Compound 与 cToken）

### 9.1 What are cTokens?（什么是 cToken？）

cTokens（Compound 凭证代币）是用户向 Compound（Compound 协议）供应资产后收到的 ERC-20 tokens（ERC-20 代币）。

它代表：

- Proportional claim on underlying pool（对底层资金池的按比例索取权）。
- Right to redeem principal plus interest（赎回本金加利息的权利）。

### 9.2 Interest accrual（利息累积）

关键机制：

- Number of cTokens stays constant（cToken 数量保持不变）。
- Exchange rate increases over time（cToken 与底层资产兑换率随时间上升）。
- Interest realized at redemption（利息在赎回时实现）。

例子：

- Deposit 1,000 USDC（存入 1,000 USDC）。
- Receive 50,000 cUSDC（得到 50,000 cUSDC）。
- Initial exchange rate（初始兑换率）：1 cUSDC = 0.02 USDC。
- Later exchange rate（之后兑换率）：1 cUSDC = 0.021 USDC。
- Redeem 50,000 cUSDC（赎回 50,000 cUSDC）-> 1,050 USDC。

考点：cToken 不是数量自动增加，而是 exchange rate（兑换率）增加。

## 10. Decentralized Derivatives（去中心化衍生品）

### 10.1 Definition（定义）

Decentralized derivatives（去中心化衍生品）是价值取决于：

- Underlying asset performance（底层资产表现）。
- Event outcome（事件结果）。
- Observable variable（可观察变量）。

它们通常需要 oracles（预言机）来追踪链下变量，因此引入 dependency（依赖）和 centralization risk（中心化风险）。

### 10.2 Synthetix（Synthetix 合成资产协议）

Synthetix（Synthetix 协议）：

- Creates synthetic assets（创建合成资产）。
- Total debt pool（总债务池）随所有合成资产价格变化。
- Synth minters（合成资产铸造者）承担整个系统 debt exposure（债务敞口）。

风险：

- User's debt position affected by everyone else's asset allocation（用户债务头寸受其他人的资产配置影响）。
- Needs price oracles（需要价格预言机）。

### 10.3 Event-based derivatives / Prediction markets（事件型衍生品/预测市场）

机制：

- Event has defined outcomes（事件有明确结果）。
- Users buy outcome tokens（用户购买结果代币）。
- Winning outcome tokens receive payout（胜出结果代币获得赔付）。
- Token price may reflect probability（代币价格可能反映概率）。

例子：

- Augur（Augur 预测市场）。

风险：

- Misleading question specification（题目描述误导）。
- Incomplete outcome set（结果集合不完整）。
- Unreliable resolution source（结果裁定来源不可靠）。

## 11. On-chain Asset Management（链上资产管理）

### 11.1 Purpose（目的）

On-chain funds（链上基金）帮助用户：

- Invest in a basket of cryptoassets（投资一篮子加密资产）。
- Avoid manually managing each token（避免手动管理每个代币）。
- Observe holdings on-chain（链上观察持仓）。
- Redeem or liquidate fund tokens（赎回或清算基金代币）。

### 11.2 Mechanics（机制）

Smart contracts（智能合约）可执行：

- Rebalancing（再平衡）。
- Trend trading（趋势交易）。
- Strategy constraints（策略约束）。
- Fund token issuance（基金代币发行）。

例子：

- Set Protocol（Set 协议）。
- Enzyme Finance（Enzyme 金融）。
- Yearn Vaults（Yearn 金库）。
- Betoken（Betoken 协议）。

限制：

- Often limited to ERC-20 tokens and ETH（常限于 ERC-20 代币和 ETH）。
- Depend on price oracles（依赖价格预言机）。
- Depend on third-party protocols（依赖第三方协议）。

## 12. Yield Farming（收益耕作）

### 12.1 Definition（定义）

Yield farming（收益耕作）指用户通过：

- Supplying（供应资产）。
- Borrowing（借款）。
- Staking（质押）。
- Providing liquidity（提供流动性）。

来赚取：

- Interest（利息）。
- Trading fees（交易费）。
- Participation rewards（参与奖励）。
- Governance tokens（治理代币）。

### 12.2 Types（类型）

1. Yield aggregators（收益聚合器）  
   例子：Yearn, Beefy, Badger（Yearn、Beefy、Badger）。用户存入资金，协议自动寻找收益策略。

2. Yield-bearing stablecoins（收益型稳定币）  
   类似 savings account（储蓄账户），收益体现为持有数量增加或权益增加，但代币价格维持 peg（锚定）。

3. Lottery protocols（彩票协议）  
   例子：PoolTogether（PoolTogether 协议）。所有人存款，收益随机给获胜者。

4. NFT farming（NFT 收益耕作）  
   让 NFTs（非同质化代币）在游戏或生态中产生 liquidity and utility（流动性和效用）。

### 12.3 Sources of Yield（收益来源）

1. Supply interest（供应利息）  
   来自 lending protocols（借贷协议），例如 Compound（Compound 协议）和 Aave（Aave 协议）。

2. Swap fee income（交换手续费收入）  
   来自 AMM pools（AMM 池）。LPs（流动性提供者）赚取交易费，例如 Uniswap 0.3% fee（Uniswap 0.3% 费用）。

3. Participation rewards（参与奖励）  
   来自 liquidity mining（流动性挖矿）或 governance token incentives（治理代币激励）。

## 13. Yield Farming Security Risks（收益耕作安全风险）

### 13.1 Flash loan attack（闪电贷攻击）

定义：攻击者用 flash loan（闪电贷）临时借大量资金，在同一交易中 manipulate price（操纵价格）或 exploit protocol logic（利用协议逻辑漏洞）。

例子：Pancake Bunny Finance（Pancake Bunny 金融）因 flash loan attack（闪电贷攻击）遭受损失。

### 13.2 Rug pull（卷款跑路）

定义：project administrator（项目管理员）吸引用户资金后 abandon project or drain funds（放弃项目或抽走资金）。

例子：Arbix Finance（Arbix 金融）被作为 rug pull（卷款跑路）例子。

### 13.3 Reentrancy attack（重入攻击）

定义：合约 external call（外部调用）后，在 state update（状态更新）前被递归回调，攻击者重复提款。

核心防御思想：checks-effects-interactions pattern（检查-更新状态-外部交互模式），先更新状态再转账/外部调用。

### 13.4 Key exploit（密钥漏洞）

定义：private key（私钥）、admin key（管理员密钥）或 API key（接口密钥）被攻击者利用，用来修改合约或抽走资金。

例子：Bent Finance（Bent 金融）因 key management（密钥管理）问题遭受攻击。

## 14. Mutual Insurance（互助保险）

Lecture 3（第 3 讲）把 mutual insurance（互助保险）列为 DeFi category（DeFi 类别）。

核心思想：

- Participants pool funds（参与者汇集资金）。
- Smart contracts or governance decide claims（智能合约或治理决定赔付）。
- Faster and more transparent payouts（更快、更透明的赔付）。

风险：

- Oracle risk（预言机风险）。
- Governance failure（治理失败）。
- Insufficient pool capital（资金池不足）。
- Adverse selection（逆向选择）。

## 15. Comparison Tables（比较表）

### 15.1 DEX Types（DEX 类型）

| DEX type（DEX 类型） | How exchange happens（交换方式） | Example（例子） | Main risk（主要风险） |
|---|---|---|---|
| On-chain order book（链上订单簿） | Orders stored on-chain（订单存在链上） | general model（通用模型） | costly and slow（贵且慢） |
| Off-chain order book（链下订单簿） | Relayers host orders, settlement on-chain（中继者托管订单，链上结算） | 0x | relayer dependency（中继者依赖） |
| AMM / CFMM（自动做市商/常数函数做市商） | Trade against liquidity pool（与流动性池交易） | Uniswap, Curve, Balancer | slippage and LP risk（滑点和 LP 风险） |
| Reserve aggregation（储备聚合） | Smart contract picks best quote（智能合约选最佳报价） | Kyber | collusion risk（合谋风险） |
| P2P / OTC（点对点/场外） | Negotiated trade（协商交易） | AirSwap | less continuous liquidity（连续流动性较弱） |

### 15.2 Lending Types（借贷类型）

| Type（类型） | Mechanism（机制） | Example（例子） |
|---|---|---|
| CDP（抵押债务头寸） | Lock collateral and mint new debt token（锁定抵押品并铸造新债务代币） | MakerDAO |
| P2P CDM（点对点抵押债务市场） | Lender lends to specific borrower（贷款人借给特定借款人） | P2P model（点对点模型） |
| Pooled CDM（池化抵押债务市场） | Borrow existing assets from pool（从资金池借已有资产） | Compound, Aave |

## 16. Common MCQ Traps（选择题易错点）

- Smart contract（智能合约）不能自发执行；initial call（初始调用）来自 EOA（外部账户）。
- AMM / CFMM（自动做市商/常数函数做市商）不需要 external oracle（外部预言机）来决定池内价格。
- Arbitrage（套利）让 AMM 池子价格接近市场价格。
- Larger trade relative to liquidity（交易相对流动性越大）-> higher slippage（滑点越高）。
- LP token（LP 代币）代表对池子的按比例索取权，不是固定收益承诺。
- cToken（Compound 凭证代币）通过 exchange rate（兑换率）上升计息，不是数量自动增加。
- CDP（抵押债务头寸）铸造新代币；pooled lending（池化借贷）借已有资产。
- Derivatives（衍生品）通常有 oracle dependency（预言机依赖）。
- Yield farming（收益耕作）的高 APY（高年化收益）不一定可持续。
- Flash loan（闪电贷）本身不是攻击，攻击在于操纵价格或利用协议漏洞。

## 17. Short Answer Templates（短答模板：英文答案 + 中文翻译）

### Q1. Explain why DeFi is composable.（解释为什么 DeFi 可组合）

English answer（英文答案）：  
DeFi is composable because protocols are implemented as smart contracts on a shared settlement layer. A transaction from an externally owned account can call one contract, which can then call other contracts in sequence. This allows DEXs, lending markets and aggregators to be combined into new products. Composability improves innovation but increases dependency and contagion risk.

中文翻译：  
DeFi 可组合，是因为协议以智能合约形式部署在共享结算层上。来自外部账户的交易可以调用一个合约，而该合约又能按顺序调用其他合约。这使 DEX、借贷市场和聚合器可以组合成新产品。可组合性提高创新，但也增加依赖和传染风险。

### Q2. Compare AMM and order book DEX.（比较 AMM 和订单簿型 DEX）

English answer（英文答案）：  
An order book DEX matches buyers and sellers through orders. On-chain order books are decentralized but costly and slow; off-chain order books use relayers but settle on-chain. An AMM lets users trade against liquidity pools using invariants such as `x*y=k`. AMMs provide continuous liquidity and atomic settlement but suffer from slippage, capital inefficiency and LP exposure to price movements.

中文翻译：  
订单簿型 DEX 通过订单匹合买卖双方。链上订单簿更去中心化但成本高、速度慢；链下订单簿使用中继者但在链上结算。AMM 让用户使用 `x*y=k` 等不变量与流动性池交易。AMM 提供连续流动性和原子结算，但面临滑点、资本效率低和 LP 承受价格波动敞口的问题。

### Q3. Explain slippage in a constant product AMM.（解释常数乘积 AMM 中的滑点）

English answer（英文答案）：  
In a constant product AMM, reserves satisfy `x*y=k`. When a trader adds one asset to the pool, the other reserve must decrease to maintain the invariant. The trade moves the pool price, so the average execution price differs from the initial spot price. Larger trades relative to pool depth create larger non-linear price movement. This difference is slippage.

中文翻译：  
在常数乘积 AMM 中，储备满足 `x*y=k`。当交易者向池子加入一种资产，另一种储备必须减少，以保持不变量不变。交易会移动池子价格，所以平均成交价不同于初始现货价。交易规模相对池子深度越大，非线性价格移动越大，这个差异就是滑点。

### Q4. Compare CDP and pooled lending.（比较 CDP 和池化借贷）

English answer（英文答案）：  
A collateralized debt position lets a user lock collateral and mint new debt tokens without a direct lender, as in MakerDAO. In pooled lending, lenders deposit existing assets into a pool and borrowers borrow from that pool, as in Compound or Aave. CDPs create new tokens, while pooled lending reallocates existing assets. Pooled lending rates usually depend on utilization.

中文翻译：  
抵押债务头寸让用户锁定抵押品并铸造新的债务代币，不需要直接贷款人，MakerDAO 就是例子。在池化借贷中，贷款人把已有资产存入池子，借款人从池子借款，如 Compound 或 Aave。CDP 创造新代币，而池化借贷重新分配已有资产。池化借贷利率通常取决于资金利用率。

### Q5. Explain how cTokens accrue interest.（解释 cToken 如何累积利息）

English answer（英文答案）：  
When a user supplies assets to Compound, the protocol mints cTokens that represent a proportional claim on the underlying pool. The number of cTokens stays constant, but the exchange rate between cTokens and the underlying asset increases over time. Interest is realized when the user redeems cTokens.

中文翻译：  
当用户向 Compound 提供资产时，协议铸造 cToken，代表对底层资金池的按比例索取权。cToken 数量保持不变，但 cToken 与底层资产之间的兑换率随时间上升。用户赎回 cToken 时实现利息。

### Q6. Name three yield farming risks.（说出三个收益耕作风险）

English answer（英文答案）：  
First, flash loan attacks can use temporary uncollateralized borrowing to manipulate prices or exploit protocol logic. Second, rug pulls occur when project administrators abandon a project or drain funds after attracting deposits. Third, reentrancy attacks exploit contracts that make external calls before updating internal state. Other risks include key exploits, oracle manipulation and unsustainable token rewards.

中文翻译：  
第一，闪电贷攻击可以利用临时无抵押借款操纵价格或利用协议逻辑漏洞。第二，卷款跑路指项目方吸引存款后放弃项目或抽走资金。第三，重入攻击利用合约在更新内部状态前进行外部调用的漏洞。其他风险包括密钥漏洞、预言机操纵和不可持续的代币奖励。

## 18. Final Cram Sheet（最后 5 分钟背诵）

- DeFi compositions（DeFi 可组合性）= financial lego（金融乐高）。
- EOA（外部账户）发起交易，smart contracts（智能合约）再互相调用。
- DeFi stack（DeFi 五层）= settlement（结算）/ asset（资产）/ protocol（协议）/ application（应用）/ aggregation（聚合）。
- DEX（去中心化交易所）核心价值 = self-custody（自托管）+ atomic settlement（原子结算）。
- AMM / CFMM（自动做市商/常数函数做市商）= liquidity pool（流动性池）+ `x*y=k` + arbitrage（套利）。
- Slippage（滑点）随 trade size relative to liquidity（交易规模相对流动性）上升。
- Reserve aggregation（储备聚合）例子 Kyber；P2P / OTC（点对点/场外）例子 AirSwap。
- CDP（抵押债务头寸）铸造新债务代币；pooled lending（池化借贷）借已有资产。
- cTokens（Compound 凭证代币）通过 exchange rate increases（兑换率上升）计息。
- Yield sources（收益来源）= supply interest（供应利息）+ swap fees（交易费）+ participation rewards（参与奖励）。
- Security risks（安全风险）= flash loan attack（闪电贷攻击）+ rug pull（卷款跑路）+ reentrancy attack（重入攻击）+ key exploit（密钥漏洞）。
