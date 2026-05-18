# OceanNode Speaking Notes

负责部分: 3. Ideas and Core Design  
讲解范围: B. Smart Contract / dApp Design + Underwriting Capital Logic  
PPT 页码: Slide 7/12 和 Slide 8/12

---

## Slide 7/12 - 3.4 Smart Contract / dApp Design

**1. Opening**

中文：  
这一页讲 OceanNode 的智能合约和 dApp 设计。重点不是把保险表格搬到网上，而是把保单购买、事件验证和自动赔付变成一个链上流程。

English:  
This slide explains the smart contract and dApp design of OceanNode. The key point is not just putting insurance forms online, but turning policy purchase, event verification, and payout into an on-chain process.

**2. Key Participants**

中文：  
系统里有几个核心角色：SME importer 买保险，LP 提供承保资金，Policy Manager 管理保单状态，Risk Pool 负责资金和赔付，Oracle 把 AIS、carrier 和 port data 带到链上。

English:  
There are several core participants: the SME importer buys coverage, LPs provide underwriting capital, the Policy Manager tracks policy status, the Risk Pool manages funds and payouts, and the Oracle brings AIS, carrier, and port data on-chain.

**3. Policy Flow**

中文：  
流程可以简单理解成三步。第一，LP 存入 USDC。第二，SME 在 dApp 上提交 shipment details 并购买保单。第三，Oracle 持续监控真实物流事件，并把验证结果传给 Policy Manager。

English:  
The flow has three simple steps. First, LPs deposit USDC. Second, the SME submits shipment details through the dApp and buys a policy. Third, the Oracle monitors real shipping events and sends verified results to the Policy Manager.

**4. Trigger Outcomes**

中文：  
如果发生 container roll-over，系统触发一个较小的 micro-payout。如果 AIS 证明船在目的港 anchorage 超过 72 小时，就触发 port-delay payout。如果没有触发事件，保单到期，资金释放回池子。

English:  
If a container roll-over happens, the system triggers a smaller micro-payout. If AIS confirms that the vessel stays in destination anchorage for more than 72 hours, it triggers a port-delay payout. If no trigger happens, the policy expires and capital is released back to the pool.

**5. Closing Point**

中文：  
所以这一页的核心是：OceanNode 用 smart contract 把 proof of event 直接转化成 payout，减少人工理赔和长时间等待。

English:  
So the key message is: OceanNode uses smart contracts to convert proof of event directly into payout, reducing manual claims and long settlement delays.

---

## Slide 8/12 - 3.4.1 Underwriting Capital Logic

**1. Opening**

中文：  
这一页讲 underwriting capital logic，也就是 LP 的钱怎样支持赔付。核心概念是：LP capital is programmable insurance capacity。

English:  
This slide explains underwriting capital logic, meaning how LP capital supports payouts. The core idea is: LP capital is programmable insurance capacity.

**2. Available Capital**

中文：  
第一步是 Deposited / Available。LP 把 USDC 存进 Risk Pool，拿到 pool shares。此时资金可以支持新的保单。

English:  
The first state is Deposited / Available. LPs deposit USDC into the Risk Pool and receive pool shares. At this point, the capital can support new policies.

**3. Reserved Capital**

中文：  
第二步是 Reserved。SME 买保单时，系统必须先锁定足够的 payout capacity。比如最高赔付是 2,000 USDC，池子就要预留对应资金。

English:  
The second state is Reserved. When an SME buys a policy, the system must lock enough payout capacity first. For example, if the maximum payout is 2,000 USDC, the pool needs to reserve that amount.

**4. Premium And Claims**

中文：  
第三，SME 支付的 premium 会进入资金池，成为 LP 的收益。如果 Oracle 验证触发事件，Risk Pool 就从 reserved capital 中向 SME 支付赔款。

English:  
Third, the premium paid by the SME goes into the pool and becomes yield for LPs. If the Oracle verifies a trigger event, the Risk Pool pays the SME from reserved capital.

**5. Release And Withdrawal**

中文：  
如果保单到期但没有 claim，reserved capital 会释放回 available pool。LP 退出时，只能提取 available capital 和收益，正在支持 active policy 的资金不能随意提走。

English:  
If the policy expires without a claim, the reserved capital is released back to the available pool. When LPs exit, they can only withdraw available capital and yield. Capital backing active policies cannot be withdrawn freely.

**6. Closing Point**

中文：  
所以这一页的重点是 solvency。OceanNode 必须先 reserve payout capacity，再发行 policy，这样才能避免卖出没有资金支持的保险。

English:  
So the key point is solvency. OceanNode must reserve payout capacity before issuing a policy, so it avoids selling coverage without capital backing.

---

## Transition Between Slide 7 And Slide 8

中文：  
上一页讲的是 execution，也就是保单如何自动执行。这一页讲的是 solvency，也就是为什么系统有资金支付赔款。

English:  
The previous slide is about execution: how the policy is automated. This slide is about solvency: why the system has enough capital to pay claims.

---

## If Time Is Very Limited

**Slide 7/12 Short Version**

中文：  
OceanNode 让 SME 通过 dApp 买保单，Oracle 验证 AIS、carrier 和 port data，Policy Manager 判断是否触发，Risk Pool 自动用 USDC 赔付。

English:  
OceanNode lets SMEs buy policies through the dApp. The Oracle verifies AIS, carrier, and port data. The Policy Manager checks the trigger, and the Risk Pool automatically pays in USDC.

**Slide 8/12 Short Version**

中文：  
LP 的资金不是普通存款，而是承保能力。系统必须先锁定 payout capacity，才能发行保单；如果没有 claim，资金释放；如果有 claim，就从 reserved capital 赔付。

English:  
LP capital is not just a deposit; it is underwriting capacity. The system must reserve payout capacity before issuing a policy. If there is no claim, capital is released. If there is a claim, payout comes from reserved capital.
