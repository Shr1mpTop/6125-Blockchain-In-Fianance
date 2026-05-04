# SC6125 Lecture 1 Review（第 1 讲复习）：FinTech 4.0（金融科技 4.0）、Web3（去中心化互联网）与 Blockchain in Finance（区块链金融）

> 复习目标：第 1 讲是整门课的地图。考试很可能考 definition（定义）、comparison（比较）、project matching（项目匹配）和 MAS view（新加坡金管局观点）。  
> 阅读方式：所有英文术语都带中文对照；考试时记英文关键词，理解时看中文解释。

## 0. Quiz Scope（测验范围）和复习优先级

- Quiz（测验）覆盖 Weeks 1 to 3（第 1 到第 3 讲）。
- Duration（时长）：90 minutes（90 分钟）。
- Format（形式）：20 Multiple Choice Questions（20 道选择题）+ 2 Essay / Short Answer Questions（2 道论述/短答题）。
- Lecture 1（第 1 讲）高频题型：
  - Which is false?（哪项是错误的？）
  - Which is the most accurate definition?（哪项定义最准确？）
  - Which project corresponds to this use case?（哪个项目对应这个用例？）
  - Compare DeFi and Traditional Finance（比较去中心化金融和传统金融）。
  - Explain Singapore's CBDC position（解释新加坡对央行数字货币的立场）。

## 1. Core Vocabulary（核心术语中英对照）

| English term（英文术语） | 中文对照 |
|---|---|
| FinTech（Financial Technology） | 金融科技 |
| FinTech 4.0 | 金融科技 4.0，核心是去中心化、用户赋权、Web3 和 AI |
| Blockchain in Finance | 区块链在金融中的应用 |
| Web3 | 基于区块链、强调用户控制数据和身份的新互联网范式 |
| Web 3.0 | 语义网/数据互联，强调跨网站数据复用和智能化 |
| Decentralized Finance / DeFi | 去中心化金融 |
| Traditional Finance / TradFi | 传统金融 |
| Smart contracts | 智能合约 |
| Intermediaries | 中介机构，例如银行、券商、交易所 |
| Stablecoins | 稳定币 |
| Central Bank Digital Currency / CBDC | 央行数字货币 |
| Wholesale CBDC | 批发型央行数字货币，主要给银行/金融机构使用 |
| Retail CBDC | 零售型央行数字货币，面向公众使用 |
| Bank Deposit Tokens | 银行存款代币，通常代表受监管银行的负债 |
| Digital Payment Token / DPT | 数字支付代币 |
| Purpose Bound Money / PBM | 目的绑定货币，通过外层 wrapper（包装层）限制资金用途 |
| Settlement | 结算，最终完成资金或资产转移 |
| Programmability | 可编程性，用规则或智能合约自动触发条件 |
| Interoperability | 互操作性，不同系统之间可以连接和协作 |
| Tokenisation / Tokenization | 代币化，把资产或权利表示为链上 token（代币） |
| Asset servicing | 资产服务，例如付息、赎回、登记、生命周期管理 |

## 2. Course Big Picture（课程整体目标）

这门课关注 applications of blockchain in finance（区块链在金融中的应用），不是单纯讲区块链底层技术。你需要能做到：

1. Describe applications of blockchain for finance（描述区块链在金融中的应用）。
2. Compare decentralized and centralized finance applications（比较去中心化和中心化金融应用）。
3. Explain underlying technologies（解释底层技术如何支持金融用例）。
4. Design DeFi and enterprise applications（设计 DeFi 应用和企业级金融应用）。

考试答题主线：**finance problem first, blockchain second（先讲金融问题，再讲区块链方案）**。不要一上来就说“用区块链”，要先说为什么传统金融流程慢、贵、不透明或难协调。

## 3. FinTech 1.0 to 4.0（金融科技 1.0 到 4.0）

### 3.1 FinTech（金融科技）的课程理解

字典定义：FinTech（金融科技）是 computer programs and other technology（计算机程序和其他技术）支持 banking and financial services（银行和金融服务）。

课程重点：FinTech 不只是 disruptive（颠覆式），还应该通过 technology and user experience（技术和用户体验）创新地提供金融服务。

### 3.2 四代 FinTech（金融科技）

| Version（版本） | Period（时期） | Core idea（核心含义） | Examples（例子） |
|---|---:|---|---|
| FinTech 1.0 | before 1960s（1960 年代以前） | Fundamental infrastructure（基础金融基础设施） | electronic fund transfer systems（电子资金转账系统）、early credit cards（早期信用卡） |
| FinTech 2.0 | 1960s to 2000s（1960 年代到 2000 年代） | Analog to digital（从模拟到数字） | ATMs（自动柜员机）、digital stock exchanges（数字证券交易所）、SWIFT（银行间报文网络） |
| FinTech 3.0 | post 2000s（2000 年后） | Disruptive innovation（颠覆式金融创新） | QR codes（二维码）、NFC（近场支付）、BNPL（先买后付）、robo-advisors（智能投顾） |
| FinTech 4.0 | post 2010s（2010 年后） | Decentralization and empowerment（去中心化与用户赋权） | cryptocurrencies（加密货币）、stablecoins（稳定币）、CBDCs（央行数字货币）、DeFi（去中心化金融）、DID（去中心化身份） |

### 3.3 Across Finance（跨金融领域变化）

| Area（领域） | FinTech 1.0-2.0（早期数字化） | FinTech 3.0（互联网金融） | FinTech 4.0（Web3 金融） |
|---|---|---|---|
| Payments（支付） | credit/debit cards（信用卡/借记卡） | QR / NFC / online processors（二维码、NFC、线上支付处理器） | cryptocurrencies, stablecoins, CBDCs（加密货币、稳定币、CBDC） |
| Remittance（汇款） | centralized messaging networks（中心化报文网络） | P2P FX networks（点对点外汇网络） | crypto transfers（加密转账） |
| Financing（融资） | bank financing（银行融资） | P2P borrowing, crowdfunding, BNPL（P2P 借贷、众筹、先买后付） | crypto borrowing（加密借贷） |
| Savings and Investments（储蓄与投资） | bank deposits, securities, commodities（银行存款、证券、大宗商品） | micro-investments, robo-advisors（小额投资、智能投顾） | staking, digital assets, DEX（质押、数字资产、去中心化交易所） |
| Insurance（保险） | manual underwriting（人工承保） | parametric insurance（参数型保险） | smart-contract claims, P2P mutual insurance（智能合约理赔、P2P 互助保险） |
| Compliance（合规） | manual KYC/AML（人工 KYC/反洗钱） | AI-driven KYC/AML（AI 驱动 KYC/反洗钱） | DID, account abstraction, blockchain evidence（去中心化身份、账户抽象、区块链证据） |

高频易错点：

- SWIFT（银行间报文网络）是 messaging system（报文系统），不是 settlement layer（结算层）。
- QR code（二维码）和 NFC（近场支付）更像 FinTech 3.0，不是 Web3。
- Stablecoins（稳定币）、CBDCs（央行数字货币）和 DeFi（去中心化金融）是 FinTech 4.0 关键词。

## 4. Web3（去中心化互联网） and DeFi（去中心化金融）

Lecture 1（第 1 讲）中的 Web3 / DeFi 工具地图：

- Tools and platforms（工具和平台）：Ethereum（以太坊）、Metamask（加密钱包）等。
- Tokenization（代币化）：cryptocurrencies（加密货币）、ICOs（首次代币发行）、security tokens（证券型代币）、NFTs（非同质化代币）、RWAs（真实世界资产）。
- Stable value tokens（稳定价值代币）：CBDCs（央行数字货币）、stablecoins（稳定币）、bank deposit tokens（银行存款代币）。
- Decentralized exchanges / DEXs（去中心化交易所）。
- Lending and borrowing（借贷）。
- Yield farming（收益耕作/流动性挖矿式收益策略）。
- Derivatives and synthetic assets（衍生品和合成资产）。

### 4.1 DeFi vs Traditional Finance（去中心化金融 vs 传统金融）

| DeFi（去中心化金融） | Traditional Finance（传统金融） |
|---|---|
| Smart contracts and decentralized networks（智能合约和去中心化网络） | Intermediaries such as banks and brokers（银行、券商等中介） |
| Bring your own wallet and identity（用户自带钱包和身份） | Centralized permissions and sign-ups（中心化许可和开户） |
| Transparent, verifiable and immutable（透明、可验证、不可篡改） | Less transparent and less publicly verifiable（透明度和可验证性较低） |
| Globally available（全球可访问） | Access limited by intermediaries/regulations（受中介和监管限制） |
| Faster transactions and lower fees（交易更快、费用可能更低） | Slower and more costly settlement（结算较慢、成本较高） |
| Rapid innovation and competition（快速创新和竞争） | Competition more limited（竞争较有限） |

短答模板：

English answer（英文答案）：  
DeFi replaces some financial intermediaries with smart contracts and decentralized networks. Users bring their own wallets and identities, and transactions are transparent, verifiable and globally accessible. This can reduce fees, speed up settlement and increase competition. However, DeFi also creates risks in governance, security, consumer protection and regulatory accountability.

中文翻译：  
DeFi 用智能合约和去中心化网络替代部分金融中介。用户自带钱包和身份，交易透明、可验证，并且可以全球访问。这可以降低费用、加快结算、增加竞争。但 DeFi 也带来治理、安全、消费者保护和监管责任方面的风险。

## 5. MAS 2021 Speech（MAS 2021 年演讲）：Juno（货币）、Plutus（金融）、Mercury（商业与通信）

Ravi Menon（Ravi Menon，时任 MAS 董事总经理）在 Singapore FinTech Festival 2021（2021 新加坡金融科技节）演讲题目是 The Future of Money, Finance and the Internet（货币、金融与互联网的未来）。

三个主题：

- Juno: Money（Juno：货币）。
- Plutus: Finance（Plutus：金融）。
- Mercury: Commerce and Communications（Mercury：商业与通信）。

## 6. Juno: Money（货币）

### 6.1 Money system（货币体系）

- Commercial banks create money（商业银行创造货币）。
- Central banks preserve its value（央行维护货币价值）。
- 课程提到：Singapore money supply（新加坡货币供应）中大部分是 bank deposits（银行存款）形式。
- Confidence in money is anchored by the central bank（货币信心由央行锚定）。

### 6.2 Three developments（挑战现状的三种货币发展）

1. Cryptocurrencies / crypto tokens（加密货币/加密代币）。
2. Stablecoins（稳定币）。
3. Central Bank Digital Currencies / CBDCs（央行数字货币）。

### 6.3 Crypto tokens（加密代币）

MAS（新加坡金管局）观点：

- MAS prefers the term crypto tokens（MAS 更偏好“加密代币”这个说法）。
- Payment tokens are subject to licensing and supervision（用于支付的代币受许可和监管）。
- Crypto tokens for investment are risky（作为投资工具的加密代币风险高）。
- Crypto tokens may help cross-border payments and trade finance（加密代币可能有助于跨境支付和贸易融资）。
- To be money, crypto tokens need more stable value（要成为货币，加密代币需要价值更稳定）。

易错点：MAS 不是完全否定 crypto tokens（加密代币），而是反对公众投机，同时承认其潜在金融用途。

### 6.4 Stablecoins（稳定币）

Stablecoins（稳定币）的定位：

- Combine credibility of fiat money and advantages of blockchain（结合法币可信度和区块链优势）。
- May be used outside crypto ecosystem（可能被加密生态之外采用）。
- Risk: run on issuer（风险：对发行人发生挤兑）。
- MAS needs appropriate regulation（MAS 需要适当监管）。

### 6.5 CBDC（央行数字货币）

CBDC（央行数字货币）定义：direct liability and payment instrument issued by central bank（由央行发行的直接负债和支付工具）。

| Type（类型） | Users（用户） | Use case（用途） |
|---|---|---|
| Wholesale CBDC（批发型 CBDC） | Banks and financial institutions（银行和金融机构） | Interbank and cross-border settlement（银行间和跨境结算） |
| Retail CBDC（零售型 CBDC） | General public（公众） | Digital equivalent of cash（现金的数字等价物） |

Retail CBDC benefits（零售型 CBDC 好处）：

- Widely accepted（广泛接受）。
- Bears authority of state（带有国家权威）。
- Ultimate risk-free asset（最终无风险资产）。
- Means of final settlement（最终结算手段）。
- May support financial inclusion（可能支持金融普惠）。

Retail CBDC risks（零售型 CBDC 风险）：

- People may quickly switch bank deposits to central bank money（公众可能快速把银行存款转为央行货币）。
- Banks' lending capacity may fall（银行贷款能力可能下降）。
- Safeguards such as stock and flow caps may be needed（可能需要余额上限和流量上限等保护措施）。

Singapore position（新加坡立场）：

- Retail CBDC issuance is not urgent（零售型 CBDC 发行并不紧急）。
- Digital cash need is moot（数字现金需求不迫切）。
- Financial inclusion benefits are not compelling（金融普惠收益不明显）。
- Foreign currency substitution risk is low（外币替代风险低）。
- Project Orchid（数字新元能力建设项目）用于建设未来能力。

## 7. Plutus: Finance（金融）

两个重点：

1. Real-time cross-border payments（实时跨境支付）。
2. Collaborative data platforms（协作式数据平台）。

### 7.1 Project Ubin（Ubin 项目） and Partior（Partior 银行间结算网络）

Project Ubin（Ubin 项目）目标：

- Make cross-border payments cheaper, faster and more efficient（让跨境支付更便宜、更快、更高效）。
- Inspired Partior（启发了 Partior）。

Partior（Partior 网络）：

- Blockchain-based interbank clearing and settlement network（基于区块链的银行间清算和结算网络）。
- Established by DBS Bank, J.P. Morgan and Temasek（由星展银行、摩根大通、淡马锡建立）。
- Enables real-time cross-border settlement（实现实时跨境结算）。
- Uses commercial bank digital money or wholesale CBDCs（使用商业银行数字货币或批发型 CBDC）。

易错点：Partior 不是 retail payment app（零售支付 App），而是 interbank settlement network（银行间结算网络）。

### 7.2 Project Dunbar（Dunbar 项目）

Project Dunbar（Dunbar 项目）：

- Blueprint for multi-currency international settlement（多币种国际结算蓝图）。
- Uses wholesale CBDCs / m-CBDCs（使用批发型 CBDC / 多央行数字货币）。
- Partners include BIS and MAS（参与方包括国际清算银行和新加坡金管局）。

易错点：Project Dunbar 不是 retail CBDC（零售型 CBDC），而是 wholesale/m-CBDC（批发型/多央行数字货币）。

### 7.3 PayNow（新加坡实时支付系统） and Project Nexus（Nexus 项目）

PayNow（PayNow 实时支付系统）：

- Singapore's real-time retail payment system（新加坡实时零售支付系统）。
- Links with PromptPay, DuitNow and UPI（与泰国 PromptPay、马来西亚 DuitNow、印度 UPI 等连接）。

Problem（问题）：

- Bilateral links one by one are time-consuming（一条条建立双边连接很耗时）。

Project Nexus（Nexus 项目）：

- Common blueprint for multilateral real-time payment network（多边实时支付网络的统一蓝图）。

### 7.4 Project Greenprint（绿色金融数据平台）

Project Greenprint（绿色金融数据平台）包括：

- Common disclosure portal（共同披露门户）：用于 ESG disclosures（ESG 信息披露）。
- Data orchestrator（数据编排器）：汇总 ESG 数据。
- ESG registry（ESG 登记系统）：在 distributed ledger（分布式账本）上记录 ESG certifications（ESG 认证）。
- Greenprint marketplace（Greenprint 市场）：连接 green technology providers, investors and corporates（绿色科技供应商、投资者和企业）。

### 7.5 COSMIC（反洗钱数据协作平台）

COSMIC（反洗钱数据协作平台）：

- Lets financial institutions collaborate using data analytics（让金融机构通过数据分析协作）。
- Purpose: combat money laundering risk（目的：打击洗钱风险）。
- Helps identify criminal networks across institutions（识别跨机构犯罪网络）。

## 8. Mercury: Web3（Web3 商业与通信）

| Version（版本） | 中文解释 |
|---|---|
| Web 1.0 / readable Internet（可读互联网） | 用户主要获取信息和内容 |
| Web 2.0 / interactive Internet（互动互联网） | 用户生成内容、社交媒体、协作 |
| Web3 / personal Internet（用户赋权互联网） | 通过智能合约和代币化资产，让用户控制数据和身份 |
| Web 3.0 / semantic web（语义网） | 重点是跨网站复用和连接数据 |

最重要考点：Web3（去中心化互联网）= user control of data and identity（用户控制数据和身份）+ blockchain technology（区块链技术）。

## 9. Singapore Regulation and Projects（新加坡监管与项目）

### 9.1 Payment Services Act / PS Act（支付服务法） and DPT（数字支付代币）

Under PS Act（根据支付服务法），DPT service providers（数字支付代币服务商）需要：

- Not promote services to the public in Singapore（不得向新加坡公众推广服务）。
- Conduct customer due diligence / CDD（进行客户尽调）。
- Conduct transaction monitoring（进行交易监控）。
- Implement safeguards for customer assets（实施客户资产保护措施）。
- Disclose fees and risks（披露费用和风险）。

### 9.2 Stablecoin Issuance Service（稳定币发行服务） and SCS（单一货币稳定币）

- Stablecoin Issuance Service（稳定币发行服务）被纳入 PS Act（支付服务法）监管。
- Single Currency Stablecoins / SCS（单一货币稳定币）在框架下可标记为 MAS-regulated stablecoins（MAS 监管稳定币）。
- StraitsX and Paxos（StraitsX 和 Paxos）获得 in-principle approvals（原则性批准）。

### 9.3 Project Guardian（资产代币化和 DeFi 试验项目）

Project Guardian（Guardian 项目）：

- Tests asset tokenisation and DeFi applications（测试资产代币化和 DeFi 应用）。
- Started in June 2022（2022 年 6 月启动）。
- Involves DBS, Standard Chartered, UOB, SGX and crypto industry players（涉及星展、渣打、大华、新交所和加密行业参与者）。

### 9.4 Project Orchid（数字新元和 PBM 能力建设项目）

Project Orchid（Orchid 项目）：

- Launched in November 2021（2021 年 11 月启动）。
- Explores purpose-bound digital Singapore dollar（探索目的绑定数字新元）。
- Builds technology, infrastructure and competencies for digital SGD（建设数字新元所需技术、基础设施和能力）。

## 10. MAS 2024 Tokenisation Commercialisation Plans（MAS 2024 资产代币化商业化计划）

四个方向：

1. Commercial networks（商业网络）：深化 tokenised assets liquidity（代币化资产流动性）。
2. Market infrastructures（市场基础设施）：促进 seamless cross-border transactions（无缝跨境交易）。
3. Industry frameworks（行业框架）：推动 tokenisation implementation（代币化实施）。
4. Common settlement facility（共同结算设施）：提供 settlement assets（结算资产），包括 S$ wholesale CBDC（新元批发型 CBDC）。

### 10.1 Guardian Wholesale Network（Guardian 批发网络）

- Members include Citi, HSBC, Schroders, Standard Chartered and UOB（成员包括花旗、汇丰、施罗德、渣打和大华银行）。
- Goal: commercialise tokenisation trials（目标：把代币化试验商业化）。

### 10.2 Global Layer One / GL1（全球第一层基础设施）

GL1（全球第一层）重点：

- Control Principles（控制原则）：治理、风险管理、结算安排。
- Specifications（规范）：市场基础设施和资产生命周期标准。
- Compliance by Design（内置合规）：用可编程合规检查加快参与者接入。

### 10.3 GFIF and GFF（Guardian 框架）

- Guardian Fixed Income Framework / GFIF（Guardian 固定收益框架）：指导 Debt Capital Markets（债务资本市场）代币化。
- Guardian Funds Framework / GFF（Guardian 基金框架）：指导 tokenised funds（代币化基金）。

### 10.4 SGD Testnet（新元测试网络）

SGD Testnet（三个功能）：

1. Settlement facility（结算设施）：发行、转移、赎回 S$ wholesale CBDC（新元批发型 CBDC）。
2. Programmability（可编程性）：自动和条件触发，包括 PBM（目的绑定货币）。
3. Interoperability（互操作性）：连接现有金融市场基础设施。

参与银行：DBS, OCBC, Standard Chartered, UOB（星展、华侨、渣打、大华）。  
用例：payments and securities settlement（支付和证券结算）。

## 11. OCBC-LTA Conditional Payments（OCBC-LTA 条件付款案例）

Use case（用例）：mobilisation advance payment（动员预付款），帮助 construction contractors（建筑承包商）承担项目前期资本支出。

Blockchain role（区块链作用）：

- Smart contracts verify conditions（智能合约验证条件）。
- Payments are automatically disbursed（付款自动发放）。
- LTA gets transparency（陆交局获得资金使用透明度）。
- OCBC banking platform gives real-time overview（OCBC 银行平台提供实时交易和余额视图）。

关键事实：

- Pilot involves three main contractors（三个主要承包商参与试点）。
- More than S$22 million disbursed（已发放超过 2200 万新元）。
- 这是 enterprise blockchain（企业区块链）案例，不是 pure DeFi（纯 DeFi）。

## 12. Changes in DeFi（DeFi 行业变化）

- Technologists（技术人员）：提升 security, privacy, scalability（安全、隐私、可扩展性）。
- Regulators（监管者）：从 observing to acting（从观察转向行动）。
- Startups（创业公司）：继续创新，也开始 licensed and regulated（获得许可并受监管）。
- Traditional enterprises（传统企业）：寻找合适的区块链使用场景。

结论：Blockchain has become part of finance（区块链已成为金融的一部分）。DeFi（去中心化金融）和 CeFi / centralized finance（中心化金融）之间的界线正在变模糊。

## 13. Project Cheat Sheet（项目速查表）

| Project / term（项目/术语） | 中文记忆 |
|---|---|
| Project Ubin | 跨境支付更便宜、更快、更高效；启发 Partior |
| Partior | DBS + J.P. Morgan + Temasek 的区块链银行间清算结算网络 |
| Project Dunbar | 使用 wholesale/m-CBDCs 的多币种国际结算平台蓝图 |
| PayNow | 新加坡实时零售支付系统 |
| Project Nexus | 多国实时支付系统互联的统一蓝图 |
| Project Greenprint | 绿色金融数据平台：披露门户、数据编排、ESG 登记、市场 |
| COSMIC | 金融机构反洗钱数据协作平台 |
| Project Guardian | 资产代币化和 DeFi 试验项目 |
| Project Orchid | 数字新元、PBM 和未来零售 CBDC 能力建设项目 |
| GL1 | 代币化市场基础设施，强调控制原则、规范、内置合规 |
| SGD Testnet | 新元批发型 CBDC 测试网络，支持结算、可编程和互操作 |
| OCBC-LTA | 企业级区块链条件付款案例 |

## 14. Short Answer Templates（短答模板：英文答案 + 中文翻译）

### Q1. Explain why blockchain can be useful in finance but cannot replace everything.（解释为什么区块链对金融有用，但不能替代一切）

English answer（英文答案）：  
Blockchain is useful where finance suffers from fragmented ledgers, slow settlement, reconciliation risk and lack of transparency. It can provide a shared source of truth, programmable rules, atomic settlement and verifiable records. However, blockchain does not replace legal rights, KYC/AML, off-chain data verification, custody of real-world assets or regulatory responsibility.

中文翻译：  
当金融系统存在账本碎片化、结算缓慢、对账风险和透明度不足时，区块链很有用。它可以提供共享事实来源、可编程规则、原子结算和可验证记录。但是，区块链不能替代法律权利、KYC/AML、链下数据验证、真实世界资产托管或监管责任。

### Q2. Why is retail CBDC not urgent for Singapore?（为什么零售型 CBDC 对新加坡不紧急？）

English answer（英文答案）：  
Singapore already has a highly digital and efficient payment system, so the need for digital cash is less compelling. Financial inclusion benefits are limited, and foreign currency substitution risk is low. Retail CBDC may also create financial stability risks because users can quickly switch bank deposits into risk-free central bank money.

中文翻译：  
新加坡已经有高度数字化且高效的支付系统，因此对数字现金的需求不强。金融普惠收益有限，外币替代风险较低。零售型 CBDC 还可能带来金融稳定风险，因为用户可以快速把银行存款转为无风险央行货币。

### Q3. Explain MAS's balanced view of DeFi.（解释 MAS 对 DeFi 的平衡看法）

English answer（英文答案）：  
MAS recognises that DeFi can reduce cost, increase competition and improve inclusion by replacing intermediaries with smart contracts and decentralized networks. At the same time, DeFi creates governance, security, resilience and accountability problems. MAS therefore supports experimentation while tightening regulation for DPT services and stablecoins.

中文翻译：  
MAS 承认 DeFi 可以通过智能合约和去中心化网络替代部分中介，从而降低成本、增加竞争并提升普惠性。同时，DeFi 也带来治理、安全、韧性和责任归属问题。因此，MAS 支持试验，同时加强对 DPT 服务和稳定币的监管。

### Q4. Compare stablecoins, CBDCs and bank deposits.（比较稳定币、CBDC 和银行存款）

English answer（英文答案）：  
Bank deposits are liabilities of commercial banks. CBDCs are direct liabilities of the central bank and can serve as ultimate risk-free settlement assets. Stablecoins are privately issued digital tokens designed to maintain stable value through reserves or collateral. The key differences are issuer, liability structure, risk, regulation and settlement finality.

中文翻译：  
银行存款是商业银行负债。CBDC 是央行直接负债，可以作为最终无风险结算资产。稳定币是私人发行的数字代币，通常通过储备或抵押品维持稳定价值。关键差异在于发行方、负债结构、风险、监管和结算最终性。

## 15. Final Cram Sheet（最后 5 分钟背诵）

- FinTech 4.0（金融科技 4.0）= decentralization（去中心化）+ user empowerment（用户赋权）+ Web3 + AI。
- DeFi（去中心化金融）= smart contracts（智能合约）+ decentralized networks（去中心化网络）+ self-custody（自托管）+ transparency（透明）。
- Web3（去中心化互联网）= user control of data and identity（用户控制数据和身份）。
- CBDC（央行数字货币）= direct central bank liability（央行直接负债）。
- Wholesale CBDC（批发型 CBDC）给银行；Retail CBDC（零售型 CBDC）给公众。
- Singapore retail CBDC not urgent（新加坡不急于发行零售型 CBDC），但 Project Orchid（Orchid 项目）建设能力。
- Project Dunbar（Dunbar 项目）= wholesale/m-CBDC cross-border settlement（批发型/多 CBDC 跨境结算）。
- Project Guardian（Guardian 项目）= asset tokenisation and DeFi trials（资产代币化和 DeFi 试验）。
- SGD Testnet（新元测试网）= settlement（结算）+ programmability（可编程）+ interoperability（互操作）。
