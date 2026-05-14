## 3. Ideas and Core Design

OceanNode integrates three ideas into one coherent Maritime Resilience Policy rather than treating them as separate insurance products. Idea 1 protects SMEs against post-departure port congestion delays. Idea 5 protects them against pre-departure container roll-overs. Idea 2 provides the decentralized underwriting liquidity pool that funds the payouts for both risk events. Together, these modules create a full-stack blockchain-enabled insurance model: SMEs buy coverage, external oracles verify real shipping events, smart contracts execute payouts, and liquidity providers supply underwriting capital.

### 3.1 Idea 1: Port Delays

The first risk module in OceanNode addresses post-departure port congestion delays. This problem is especially important for SME importers in Singapore that handle time-sensitive cargo such as pharmaceuticals, fresh produce, and premium food products. When a vessel is forced to wait at anchorage near the destination port for several days, the importer may suffer cargo spoilage, missed delivery commitments, penalty costs, and a serious working-capital gap. Traditional marine insurance is not well suited to this type of loss because the claim process usually requires manual documentation, surveyor reports, proof of financial loss, and insurer assessment. For small importers, the payout may arrive weeks or months after the liquidity shock has already occurred.

OceanNode turns this delay risk into a parametric insurance trigger. Under the unified Maritime Resilience Policy, the SME submits shipment details such as the vessel IMO number, destination port, cargo category, coverage amount, and wallet address when purchasing coverage. After the vessel departs, the Policy Manager Smart Contract monitors the shipment through AIS maritime oracle data. If the AIS oracle verifies that the vessel remains within the defined anchorage zone of the destination port for more than 72 consecutive hours, the port-delay condition is treated as objectively satisfied. The contract does not need to investigate the exact commercial loss of each shipment; instead, it pays a predefined amount according to the agreed policy terms.

This module creates a clear financial improvement over traditional insurance. For the SME, the benefit is immediate liquidity: the stablecoin payout can be used to reorder replacement goods, arrange emergency logistics, or cover penalties owed to downstream buyers. For liquidity providers, the same trigger defines when their underwriting capital is at risk. If no port-delay event occurs before the policy expires, the premium remains in the risk pool as yield. If the trigger is confirmed, the Risk Pool Smart Contract releases the claim payment automatically. This makes the underwriting economics transparent and rule-based.

### 3.2 Idea 2: DeFi Pools

[[HUANG ZITENG to insert DeFi liquidity pool section.]]

### 3.3 Idea 5: Roll-overs

[[LI JIAWEI to insert container roll-over section.]]

### 3.4 Smart Contract / dApp Design

The policy is executed through smart contracts. Instead of relying on manual claims assessment, the payout is triggered automatically when trusted external data confirms that a predefined condition has been met. The underwriting capital is provided by a decentralized liquidity pool, where liquidity providers deposit stablecoins and earn premiums as yield. In this model, SMEs buy protection, liquidity providers supply underwriting capital, oracle networks verify real-world shipping events, and smart contracts execute payouts.

Key roles include the SME importer, liquidity providers, the Risk Pool Smart Contract, the Policy Manager Smart Contract, oracle networks, and the governance layer. The SME purchases coverage and receives payout if a trigger event occurs. Liquidity providers supply stablecoin capital to the risk pool. The Risk Pool Smart Contract holds underwriting capital and releases payouts, while the Policy Manager Smart Contract issues policies and manages policy status. Oracle networks provide verified carrier, port, and AIS vessel data. Governance adjusts parameters such as risk pool scope, premium rates, and trigger thresholds.

For the port-delay module, the key smart contract condition is objective and time-based. The policy stores the vessel IMO number, destination port, anchorage radius, payout amount, delay threshold, and expiry time. Once the vessel approaches the destination port, the AIS oracle network monitors whether it remains inside the defined anchorage zone. If the vessel berths before the threshold is reached, the policy expires without payout. If the vessel remains in the anchorage zone for more than 72 consecutive hours, the Policy Manager marks the policy as triggered and requests payout from the Risk Pool Smart Contract.

The simplified state transition for Idea 1 is:

Quoted -> Active -> MonitoringAtDestination -> Triggered -> Paid

If no valid delay occurs, the alternative path is:

Quoted -> Active -> MonitoringAtDestination -> Expired

[[LI JIAWEI to insert Trigger A roll-over flow.]]

[[HUANG ZITENG to insert risk pool state transitions.]]

### 3.5 Digital Asset Comparison

OceanNode uses stablecoins, especially USDC, as the operational settlement asset for premiums and payouts. This is appropriate because the insured SMEs need a predictable claim value, not exposure to cryptocurrency price volatility. USDC also allows premiums, reserves, and claim payouts to be handled directly by smart contracts.

Compared with volatile crypto assets such as ETH, stablecoins are more suitable because the payout amount remains close to a fiat-denominated business loss. Compared with CBDCs or deposit tokens, stablecoins are more practical for a prototype because they are already widely used in DeFi applications and can be integrated with liquidity pools. However, CBDCs or tokenized bank deposits may become stronger options for a regulated institutional version of OceanNode in the future.

There are still important risks. Stablecoins depend on issuer reserves, redemption confidence, and regulatory treatment. A depeg event could reduce the real value of a payout, while issuer controls may affect transferability. For this reason, OceanNode should use reputable fully backed stablecoins, disclose issuer and depeg risks, and avoid using the optional governance token $NODE as the payout asset. $NODE, if used, should remain only an incentive or governance layer for LP participation.

[[HUANG ZITENG / LI JIAWEI to add asset comments for LP capital and roll-over micro-payouts.]]

## 4. Evaluation & Valuation

### 4.1 Benefits

OceanNode offers three major benefits. First, it reduces claim-processing delays by replacing manual assessment with objective oracle-based triggers. This is especially valuable for SMEs because the main financial problem is often liquidity timing rather than only final loss compensation. Second, it lowers administrative cost for small and frequent insurance events, such as container roll-overs, because the payout process is standardized and automated. Third, the DeFi liquidity pool creates an alternative source of underwriting capital, allowing maritime risk to be funded by investors who are willing to earn risk-adjusted premium yield.

### 4.2 Limitations and Risks

The main limitation is oracle dependency. OceanNode can only be as reliable as the off-chain data it receives from AIS feeds, carrier APIs, and port systems. If the data is delayed, incomplete, or manipulated, the contract may trigger incorrectly or fail to trigger when SMEs expect a payout. Smart contract risk is another concern because bugs in policy or pool contracts could affect customer payouts or LP funds. Stablecoin risk also remains relevant: if the settlement asset depegs or faces issuer problems, the economic value of the payout may be weakened.

[[ZHANG HE / team to add DeFi liquidity, LP loss, adverse selection, and pricing risks.]]

### 4.3 Adoption, Regulation, and Scalability

Adoption depends on whether SMEs, logistics platforms, insurers, and data providers are willing to connect to the same system. SMEs may value faster payouts, but they may also need simple onboarding, fiat conversion, and assurance that the product is legally enforceable. From a regulatory perspective, OceanNode must consider insurance distribution rules, KYC/AML requirements, treatment of stablecoins or digital payment tokens, and the governance of pooled underwriting capital.

The model is scalable if it starts with narrow, clearly defined risk pools such as Singapore-bound perishable imports, then expands to other ports, routes, cargo types, and delay thresholds. The same architecture can support multiple maritime risk modules as long as the trigger conditions are objective and supported by reliable data. However, scaling should be gradual because inaccurate pricing or excessive correlated claims could drain the liquidity pool during major port disruptions.

[[ZHANG HE to add final business viability / valuation paragraph.]]

