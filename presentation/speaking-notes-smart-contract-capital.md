# OceanNode Presentation Speaking Notes

Scope: Section 3, Ideas and Core Design  
Presenter focus: B. Smart Contract / dApp Design and Underwriting Capital Logic  
PPT mapping: current `presentation/index.html` slide order marks these as Slide 7/12 and Slide 8/12.

---

## Slide 7/12 - 3.4 Smart Contract / dApp Design

### 中文讲稿

这一页我主要讲 OceanNode 的智能合约和 dApp 设计。这里的核心不是简单把保险搬到网页上，而是把一份海运保险的完整生命周期变成可以自动执行的链上流程。

整个系统里有六个关键角色：第一是 SME importer，也就是购买保障的中小进口商；第二是 liquidity provider，也就是提供承保资金的 LP；第三是 Risk Pool Contract，负责管理资金池和赔付资金；第四是 Policy Manager，负责创建保单、记录状态和判断是否触发；第五是 Oracle Network，把 AIS、carrier API 和 port data 这些现实世界数据带到链上；最后还有外部数据源，比如船舶 AIS、承运人系统和港口系统。

流程可以分成三步。第一步是 liquidity：LP 把 USDC 存入 Risk Pool，资金池给 LP 发行 pool shares，代表他们在资金池里的份额。第二步是 policy issue：SME 在 dApp 上提交 shipment details，比如 vessel IMO、container number、destination port、coverage amount 和 wallet address。Policy Manager 会检查 Risk Pool 是否有足够 capacity，如果有，就收取 premium，发行 Maritime Resilience Policy。第三步是 oracle verification：现实中的 shipping event 会通过 oracle 变成 signed data，再提交给 Policy Manager。

之后系统有三种结果。第一种是 container roll-over，也就是货柜没有上原定船期，系统会触发一个较小的 micro-payout。第二种是 port congestion delay，也就是 AIS 证明船在目的港 anchorage 区域停留超过 72 小时，这时 Policy Manager 会请求 Risk Pool 支付预先约定的 USDC 赔付。第三种是没有触发事件，保单到期，reserved capital 会释放回资金池，premium 留在池子里成为 LP yield。

所以这页最重要的一句话是：OceanNode 用智能合约把「买保单、监控物流事件、触发赔付、释放资金」串成一个自动化状态机。保单状态从 Quoted 到 Active，再到 Monitoring、Triggered 和 Paid，每一步都有清晰的链上记录。这样可以减少传统保险里的人工 claim filing、主观 loss assessment 和长时间 settlement delay。

### English Script

On this slide, I will explain the smart contract and dApp design of OceanNode. The key idea is that OceanNode is not just putting an insurance form on a website. It turns the full lifecycle of a maritime insurance policy into an automated on-chain process.

There are six key roles in the system. First, the SME importer buys coverage. Second, liquidity providers supply underwriting capital. Third, the Risk Pool Contract manages the pool and releases payout funds. Fourth, the Policy Manager issues policies, records policy status, and decides whether a trigger condition has been met. Fifth, the Oracle Network brings real-world shipping data on-chain, including AIS data, carrier API data, and port data. Finally, the external data sources are the original systems, such as vessel AIS, carrier systems, and port systems.

The lifecycle has three main steps. Step one is liquidity: LPs deposit USDC into the Risk Pool, and the pool issues pool shares back to them. Step two is policy issuance: the SME submits shipment details through the dApp, such as vessel IMO, container number, destination port, coverage amount, and wallet address. The Policy Manager checks whether the Risk Pool has enough capacity. If capacity is available, it collects the premium and issues the Maritime Resilience Policy. Step three is oracle verification: real-world shipping events are converted into signed data by the oracle network and submitted to the Policy Manager.

After that, there are three possible outcomes. The first outcome is a container roll-over, where the container misses the scheduled vessel and the system triggers a smaller micro-payout. The second outcome is a port congestion delay, where AIS data confirms that the vessel has stayed inside the destination anchorage zone for more than 72 hours. In that case, the Policy Manager requests the Risk Pool to pay the predefined USDC payout. The third outcome is that no trigger occurs before expiry. The policy expires, the reserved capital is released back to the pool, and the premium remains as yield for LPs.

The main message of this slide is that OceanNode uses smart contracts to connect policy purchase, event monitoring, trigger confirmation, payout execution, and capital release into one automated state machine. The policy moves from Quoted to Active, then Monitoring, Triggered, and Paid, with each step recorded on-chain. This reduces manual claim filing, subjective loss assessment, and long settlement delays in traditional insurance.

### Key Point To Emphasize

中文: 这里的创新不是「线上买保险」，而是「用 oracle 和 smart contract 把 proof of event 直接变成 payout」。  
English: The innovation is not simply buying insurance online; it is converting proof of event into payout through oracles and smart contracts.

---

## Slide 8/12 - 3.4.1 Underwriting Capital Logic

### 中文讲稿

这一页接着讲 underwriting capital logic，也就是 LP 的资金在系统里到底怎样支持保险赔付。这里有一个非常重要的概念：LP capital is programmable insurance capacity。也就是说，LP 存进来的 USDC 不是普通的闲置存款，而是会根据保单状态变成可用资金、承保资金、赔付资金或者可提现资金。

第一步是 Deposited / Available。LP 把 USDC 存进 Risk Pool，拿到 pool shares。这时资金是 available 的，可以用来支持新保单。

第二步是 Reserved。当 SME 购买保单时，Risk Pool 不能只收 premium，它还必须锁定足够的 payout capacity。比如保单最高赔付是 2,000 USDC，系统就需要从 available capital 里预留相应的资金。这样可以防止 protocol 卖出没有资金支持的 coverage。

第三步是 Premium-Earning。SME 支付的 premium 会进入资金池，成为 LP 的收益来源。如果保单到期前没有发生 claim，这部分 premium 就是 LP 的 underwriting yield。

第四步是 Claimed。如果 oracle 证明发生了有效 trigger，比如 roll-over 或者超过 72 小时的 port delay，Risk Pool 会从 reserved capital 中支付 SME。这里 LP 承担的就是现实世界海运风险，而不是普通 DeFi 里的交易手续费风险。

第五步是 Released。如果保单在有效期内没有触发，reserved capital 会释放回 available pool。这样同一笔资金之后可以继续支持新的保单。

第六步是 Withdrawable。LP 想退出时，只能提取 available capital 和已经赚到的 yield，减去已经发生的 claims。也就是说，正在支持 active policies 的 reserved capital 不能被随意提走。

所以这一页的重点是 solvency，也就是偿付能力。OceanNode 必须先 reserve payout capacity，再发行 policy。这个设计让 SME 更相信有效 claim 能被支付，也让 LP 清楚知道自己的资金什么时候在承担风险、什么时候可以退出。

### English Script

This slide explains the underwriting capital logic, meaning how LP capital actually supports insurance payouts inside the protocol. The most important concept here is that LP capital is programmable insurance capacity. The USDC deposited by LPs is not just idle money. Depending on the policy status, it becomes available capital, reserved underwriting capital, claimed payout capital, released capital, or withdrawable capital.

The first state is Deposited / Available. LPs stake USDC into the Risk Pool and receive pool shares. At this point, the capital is available and can support new policies.

The second state is Reserved. When an SME buys a policy, the Risk Pool cannot only collect the premium. It must also lock enough payout capacity. For example, if the maximum payout of a policy is 2,000 USDC, the protocol needs to reserve the corresponding capital from the available pool. This prevents the protocol from selling coverage that is not backed by funds.

The third state is Premium-Earning. The SME premium is routed into the pool and becomes a source of yield for LPs. If the policy expires without a claim, the premium becomes underwriting income for LPs.

The fourth state is Claimed. If the oracle verifies a valid trigger, such as a container roll-over or a port delay of more than 72 hours, the Risk Pool pays the SME from reserved capital. In this sense, LPs are taking real-world maritime risk, not only normal DeFi transaction-fee risk.

The fifth state is Released. If the policy expires without a trigger, the reserved capital is released back into the available pool. The same capital can then support new policies.

The sixth state is Withdrawable. When LPs want to exit, they can only withdraw available capital and earned yield, minus claims. Reserved capital that is backing active policies cannot be freely withdrawn.

The key point of this slide is solvency. OceanNode must reserve payout capacity before issuing a policy. This makes SMEs more confident that valid claims can be paid, and it also gives LPs a transparent view of when their capital is at risk and when it can be withdrawn.

### Key Point To Emphasize

中文: 资金池的作用不是「有钱就放着」，而是保证每一张 active policy 背后都有 reserved payout capacity。  
English: The pool is not just holding deposits; it ensures every active policy is backed by reserved payout capacity.

---

## 20-Second Transition Between The Two Slides

### 中文

上一页讲的是保单怎么自动执行，这一页讲的是资金为什么足够支付。换句话说，Smart Contract / dApp Design 解决的是 execution 问题，而 Underwriting Capital Logic 解决的是 solvency 问题。两个部分加起来，OceanNode 才不只是一个自动赔付工具，而是一个完整的去中心化海运保险协议。

### English

The previous slide explains how the policy is executed automatically. This slide explains why the system has enough capital to pay. In other words, the Smart Contract / dApp Design solves the execution problem, while the Underwriting Capital Logic solves the solvency problem. Together, they make OceanNode not only an automated payout tool, but a complete decentralized maritime insurance protocol.

---

## Ultra-Short Version For Time Pressure

### Slide 7/12

中文: OceanNode 的 dApp 让 SME 提交 shipment details 并购买保单，Policy Manager 负责发行和状态管理，Oracle 把 AIS、carrier 和 port data 带到链上，Risk Pool 负责 USDC 赔付。如果发生 roll-over 或 72 小时以上 port delay，系统自动赔付；如果没有触发，保单到期，资金释放。  
English: OceanNode lets SMEs submit shipment details and buy coverage through the dApp. The Policy Manager issues and tracks the policy, the Oracle brings AIS, carrier, and port data on-chain, and the Risk Pool pays USDC. If a roll-over or a port delay of more than 72 hours occurs, payout is automatic. If no trigger occurs, the policy expires and capital is released.

### Slide 8/12

中文: LP 的 USDC 会经过 available、reserved、premium-earning、claimed、released 和 withdrawable 这些状态。关键是系统必须先锁定 payout capacity，才能卖出 coverage，所以 OceanNode 不会发行没有资金支持的保单。  
English: LP capital moves through available, reserved, premium-earning, claimed, released, and withdrawable states. The key rule is that the protocol must reserve payout capacity before selling coverage, so OceanNode does not issue policies without capital backing.
