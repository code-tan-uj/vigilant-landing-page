# Terms of Service

**Last Updated:** July 2026  
**Effective Date:** July 2026  
**Governing Law:** India (Maharashtra) | Applicable Internationally

---

## 1. Acceptance & Binding Agreement

By accessing, visiting, or using the CrowdSense™ platform, website, API, documentation, or any related services (collectively, "Service"), you agree to be legally bound by these Terms of Service ("Terms"). If you do not agree with any provision, **do not use the Service.**

**Service Operator:** Vigilant Labs ("Company", "we", "us", "our")

**Effective For:**
- Website visitors (vigilantlabs.in)
- Registered account holders (customers)
- API users and integrators
- Partners and resellers

**Authority:** By clicking "I Agree" or using the Service, you represent that you have the authority to bind your organization to these Terms.

---

## 2. Service Description

### 2.1 What CrowdSense™ Does

CrowdSense™ is a **video analytics platform** that:
- Connects to customer-provided CCTV cameras (IP, RTSP, or NVR/DVR systems)
- Processes video in real-time via AI models deployed at the edge (on-premise) or in the cloud
- Detects operational events: PPE compliance violations, fire/smoke, SOP deviations, restricted zone intrusions, operator efficiency metrics
- Generates alerts (WhatsApp, SMS, dashboard, email)
- Produces compliance reports (PDF, CSV) for audits (FSSAI, Factories Act, OSHWC, ISO 22000)

### 2.2 Deployment Models

| Model | Processing Location | Data Flow | Best For |
|-------|-------------------|-----------|----------|
| **Edge Gateway** (Recommended) | On customer premises | Video → local processing → encrypted tunnel to cloud for backup | Large factories, high-security requirements |
| **Cloud Direct** | Vigilant Labs cloud (India) | Video → cloud processing | POCs, smaller sites, low-latency tolerance |

### 2.3 What CrowdSense™ Does NOT Do

- **Not a security system:** Does not identify persons by name or face (unless explicitly enabled by customer with added consent)
- **Not a punishment system:** Detections are for safety/compliance, not worker discipline
- **Not a data storage service:** We do not retain raw video unless customer explicitly requests archival
- **Not real-time surveillance:** Alert latency is ~40 seconds; not suitable for active threat response
- **Not a complete solution:** Requires customer's existing CCTV infrastructure; we don't supply cameras

---

## 3. Eligibility & Account Requirements

### 3.1 Who Can Use

- Business entities, manufacturers, food producers, logistics companies, government bodies
- Minimum 18 years old (or legal entity)
- Authorized representatives with decision-making authority
- No use by competitors or for reverse engineering

### 3.2 Account Setup

- Customer provides: Company name, authorized contact person, email, phone, facility location, camera count
- We create: Secure tenant (isolated, encrypted database per customer)
- Customer owns: Login credentials, API keys, encryption keys (if edge deployment)
- Customer responsibility: Keep credentials confidential; notify us of unauthorized access within 24 hours

### 3.3 Prohibited Users

We reserve the right to refuse service to:
- Entities on government sanction lists (UNSC, MHA, OFAC)
- Organizations planning covert/unauthorized surveillance
- Persons with prior terms violations
- Entities operating under fraudulent credentials

---

## 4. Subscription, Pricing & Payment

### 4.1 Pricing Model

| Tier | Camera Count | Cost | Renewal |
|-----|--------------|------|---------|
| Starter | 1–10 | ₹4,999/month per camera (billed at ₹49,990/month min.) | Auto-renew; 30-day cancel window |
| Growth | 11–50 | ₹3,999/month per camera (bulk discount) | Auto-renew; 30-day cancel window |
| Enterprise | 50+ | Custom (contact sales) | Annual; quarterly reviews |

**Deployment Setup Fee:**
- Edge Gateway: ₹49,990 (one-time, non-refundable)
- Cloud Direct: ₹0 (no setup fee)

### 4.2 Billing & Payment Terms

- **Billing Cycle:** Monthly or annual (12-month prepayment eligible for 10% discount)
- **Payment Methods:** Bank transfer (NEFT, RTGS), Razorpay (cards, UPI, net banking)
- **Invoice:** Issued within 5 business days of payment; includes GST (18% applicable in India)
- **Late Payment:** 2% interest per month on overdue amounts after 30-day grace period
- **Taxes:** Customer responsible for all applicable taxes (GST, VAT, withholding, etc.)

### 4.3 Refund Policy

- **Non-refundable:** Setup fees, edge device costs
- **Refundable (30-day window):** Subscription fees if canceled before first month ends
- **Refund Process:** Credit memo or bank transfer within 30 days of cancellation
- **Partial Refund:** Prorated for mid-month cancellations

### 4.4 Suspension for Non-Payment

- **7 days overdue:** First reminder, platform access continues
- **30 days overdue:** Service suspended (alerts stop, dashboard inaccessible)
- **60 days overdue:** Account terminated; data deleted after 90-day hold period
- **Reactivation:** Full payment + ₹5,000 reactivation fee required

---

## 5. Customer Obligations & Acceptable Use

### 5.1 Customer Responsibilities

**Data Provision:**
- Ensure CCTV cameras are functioning and connected to the internet (for cloud deployment)
- Provide valid camera feeds (IP address, RTSP URL, or NVR/DVR credentials)
- Maintain camera quality (minimum 720p; 1080p recommended)
- Handle all camera maintenance, firmware updates, and network management

**Legal Compliance:**
- Obtain all necessary consent from workers/public before deployment (display CCTV notices at entry/exit)
- Comply with local privacy laws, labor laws, and industry regulations (Factories Act 1948, OSHWC, FSSAI, ISO 22000, DPDP Act 2023)
- Ensure facility meets safety standards before activating fire/smoke detection
- Provide CrowdSense™ findings to workers in compliance audits (transparency requirement)

**Account Security:**
- Keep login credentials and API keys confidential
- Use strong passwords (min. 16 characters; mix of upper, lower, numbers, symbols)
- Enable multi-factor authentication (MFA)
- Notify us immediately of unauthorized access (within 24 hours)

### 5.2 Prohibited Uses

Customers must NOT:
- Use data for covert surveillance, discrimination, or punishment (violates right to privacy)
- Share footage with unrelated third parties without worker consent
- Reverse-engineer AI models or attempt to extract training data
- Use CrowdSense™ to build competing products
- Deploy CrowdSense™ for facial recognition or behavioral profiling (unless explicitly enabled + consented)
- Process data of children or minors (except incidental detection in production areas)
- Circumvent rate limits, API quotas, or security controls
- Interfere with platform infrastructure (DDoS, SQL injection, etc.)

**Violation Consequences:**
- First offense: 30-day warning + account audit
- Repeat offense: Immediate account termination + legal action

---

## 6. Intellectual Property & Trademarks

### 6.1 Our IP

**CrowdSense™ Platform:**
- Trademark owned by Vigilant Labs (registered in India)
- All software, AI models, algorithms, documentation are proprietary
- Licensed to customer for internal use only (non-exclusive, non-transferable)
- No right to sublicense, modify, or distribute

**AI Models & Data:**
- Models trained on anonymized, aggregated customer data (with explicit consent)
- Customer grants us a license to use insights for model improvement (anonymized only)
- Models not disclosed; customer cannot access training data or model weights

### 6.2 Customer IP

- Video footage, reports, and data remain customer's property
- We have no ownership claim on customer's content
- Customer retains right to export data anytime (via dashboard or API)

### 6.3 Licenses Granted

- **To Customer:** Limited, revocable license to use CrowdSense™ for the stated operational purpose
- **To Vigilant Labs:** License to store, process, and analyze data for service delivery + model improvement (anonymized)
- **Attribution:** Customer agrees not to remove "Powered by CrowdSense™" attribution in compliance reports

---

## 7. Warranties & Disclaimers

### 7.1 What We Warrant

✓ **Service Availability:** 99.5% uptime SLA (excludes scheduled maintenance, force majeure)

✓ **Encryption:** Data in transit encrypted (TLS 1.3); at rest encrypted (AES-256)

✓ **Compliance:** CrowdSense™ meets DPDP Act 2023, Factories Act 1948, FSSAI standards

✓ **Support:** 24/5 support (email within 4 hours; critical issues within 1 hour)

### 7.2 What We Do NOT Warrant

✗ **Accuracy:** AI detections are typically 95–98% accurate; not 100%. False positives/negatives can occur.

✗ **Real-time:** Alert latency ~40 seconds; not suitable for active threat response (e.g., armed intrusion).

✗ **Completeness:** Fire detection may fail if cameras are obscured, lighting is poor, or fire is out-of-frame.

✗ **Alternative Infrastructure:** If customer's internet goes down, Service cannot operate (customer's responsibility to maintain network).

✗ **Applicability to All Jurisdictions:** Compliance depends on local regulations; we recommend legal review before deployment.

---

## 8. Limitations of Liability

### 8.1 Our Liability Limits

**Capped at:** 12 months of subscription fees paid by customer (or ₹5,00,000, whichever is greater)

**We are NOT liable for:**
- Missed detections (false negatives) — e.g., PPE not detected, fire not alarmed
- False alerts (false positives) — e.g., shadow mistaken for fire
- Data breaches caused by customer's negligence (weak passwords, phishing, unpatched cameras)
- Third-party systems (customer's network, cameras, NVR/DVR malfunctions)
- Service interruptions due to force majeure (power outage, natural disaster, war, terrorism, pandemic)

### 8.2 Exclusions (Even if We're Otherwise Liable)

We are NOT liable for:
- **Indirect damages:** Lost profits, lost business, reputational damage
- **Consequential damages:** Injury to workers, regulatory fines, audit failures (caused by our AI errors)
- **Punitive damages:** Legal fees or penalties

**Exception:** If our gross negligence (e.g., deliberate data theft) directly causes personal injury or death, we may be liable under Indian law notwithstanding this clause.

### 8.3 Insurance

We maintain:
- Cyber liability insurance: ₹2 crore
- Professional indemnity insurance: ₹1 crore
- Claims above these amounts are customer's responsibility

---

## 9. Indemnification

**Customer agrees to indemnify and defend Vigilant Labs against:**
- Third-party claims that customer's video footage violates privacy/IP rights of others
- Worker complaints that CrowdSense™ was used to unjustly discipline them
- Regulatory fines due to customer's misuse (e.g., covert surveillance without consent)
- Data breaches caused by customer's weak security (compromised API key, phishing)

**Exclusion:** Indemnity does NOT apply if Vigilant Labs' negligence contributed to the claim.

---

## 10. Data Responsibility & Ownership

### 10.1 Data Ownership

| Data Type | Owner | Responsibility |
|-----------|-------|-----------------|
| Raw video footage | Customer | Customer owns; we merely process per contract |
| AI detections (PPE, fire, SOP) | Customer | Customer owns output; we provide processing service |
| Compliance reports (PDF, CSV) | Customer | Customer owns; can export anytime |
| Customer metadata (name, email) | Customer | Customer owns; can request deletion |
| AI model improvements (anonymized insights) | Vigilant Labs | We own improvements; customer grants license |

### 10.2 Customer's Data Rights

- **Export:** Download reports, detection logs, raw video (if stored) anytime via dashboard
- **Deletion:** Request erasure of all data (with caveats per privacy policy)
- **Portability:** Receive data in machine-readable format (JSON, CSV)
- **Audit:** Inspect how we've processed your data (subject to confidentiality agreements with our processors)

### 10.3 Data Breach Notification

**If a breach occurs:**
- We notify customer within **24 hours** of discovery
- Notification includes: nature of breach, data affected, remediation steps
- Customers must notify affected workers/regulatory bodies per DPDP Act within 72 hours
- We assist with regulatory filings (at no extra cost if breach is our fault)

---

## 11. Termination & Offboarding

### 11.1 Termination by Customer

**At-Will Termination:**
- Any time, with written notice (email to support@vigilantlabs.in)
- 30-day notice required; subscription remains active for remainder of term
- No early termination penalty if annual plan (unused portion refunded prorated)

**Immediate Termination:**
- If we breach terms and fail to cure within 30 days of notice
- If we go bankrupt or cease operations

### 11.2 Termination by Vigilant Labs

**With Cause (Immediate):**
- Prohibited use discovered (reverse engineering, covert surveillance)
- Non-payment for 60 days
- Breach of acceptable use policy
- Regulatory action against customer (sanctions, criminal investigation)

**Without Cause (90-day Notice):**
- Discontinuing the Service globally
- Consolidating services (merger, acquisition)
- Legal requirement to stop

### 11.3 Data After Termination

**Transition Period (30 days after termination):**
- Customer can export all data (reports, detections, raw video if stored)
- Video retention policy continues (7–30-day auto-deletion per customer's prior setting)

**Final Deletion (After 30-day transition):**
- All customer data permanently deleted (cryptographic erasure)
- Deleted data irretrievable (no recovery possible)
- Certificate of deletion issued upon request

---

## 12. Modifications to Service & Terms

### 12.1 Changes to Service

- We may add features, retire features, or modify the platform
- **Non-material changes** (UI improvements, new reports): Effective immediately
- **Material changes** (pricing increase, data retention policy change): 30-day notice via email + website banner
- **Emergency changes** (security patch, critical bug fix): Effective immediately; notification follows

### 12.2 Changes to These Terms

- Updates posted to vigilantlabs.in/terms with updated "Last Updated" date
- **Material changes:** 30-day notice; continued use implies acceptance
- **Material changes that reduce your rights:** Require explicit re-consent
- **Archived versions:** Previous terms available upon request

### 12.3 Customer's Recourse

If you disagree with a material change:
- Notify us in writing within 30 days
- If unresolved, terminate within 30 days (with prorated refund for unused portion)

---

## 13. Governing Law & Dispute Resolution

### 13.1 Governing Law

These Terms are governed by the laws of **India**, specifically the state of **Maharashtra**, without regard to its conflict-of-law provisions.

**Applicable Laws:**
- Indian Contract Act, 1872
- Factories Act, 1948
- Digital Personal Data Protection Act, 2023
- Food Safety and Standards Act, 2006
- Arbitration and Conciliation Act, 1996

### 13.2 Dispute Resolution Process

**Step 1: Informal Resolution (15 days)**
- Customer contacts support@vigilantlabs.in with dispute details
- We respond within 5 business days
- Good-faith discussion; try to resolve

**Step 2: Escalation (30 days)**
- If unresolved, escalate to legal@vigilantlabs.in
- Meeting or call with Chief Legal Officer
- Written settlement attempt

**Step 3: Arbitration (Binding)**
- Venue: **Pune, Maharashtra**
- Arbitrator: Single arbitrator (mutually selected from Indian Institute of Arbitration)
- Rules: Arbitration and Conciliation Act, 1996 (Indian Arbitration Act)
- Language: English
- Costs: Each party bears own legal fees; arbitrator fees split equally
- Appeal: Limited (only on procedural grounds per Indian law)
- Deadline: Arbitrator issues award within 6 months

**Step 4: Injunctive Relief (Urgent)**
- Either party can seek interim relief (injunction, restraint) from courts in Pune
- Does not waive arbitration clause

### 13.3 Exceptions to Arbitration

Not subject to arbitration (can go to court):
- IP infringement claims (we can sue for trademark/copyright theft)
- Non-payment disputes (we can sue for recovery)
- Injunctive relief (urgent court orders)

---

## 14. Insurance & Liability Protection

### 14.1 Our Insurance Coverage

- **Cyber Liability:** ₹2 crore (data breach, ransomware, system failure)
- **Professional Indemnity:** ₹1 crore (negligent advice, service failures)
- **Directors & Officers Liability:** ₹50 lakh

**Insurance does NOT cover:**
- Gross negligence, willful misconduct, fraud by our team
- Contractual indemnity obligations (beyond normal negligence)
- Excluded liabilities per policy (e.g., war, terrorism, pandemic)

### 14.2 Customer's Insurance

We recommend customers maintain:
- General commercial liability (covers third-party injury claims related to CrowdSense™ deployment)
- Professional indemnity (if reselling CrowdSense™ to others)

---

## 15. Compliance with Laws

### 15.1 Data Protection Compliance

**India (DPDP Act 2023):**
- Customer is data controller; we are data processor
- Data Processing Agreement (DPA) is automatically incorporated into these Terms
- Data localization: Personal data primarily stored in India

**International (if applicable):**
- GDPR (EU customers): We execute Standard Contractual Clauses (SCCs); data may be transferred to India with safeguards
- CCPA (California, USA): We disclose data practices; you have rights to access/delete per CCPA

### 15.2 Sector-Specific Compliance

**For Factories Using CrowdSense™:**
- Compliant with Factories Act, 1948 (Section 7A — worker safety)
- Compliant with OSHWC Code, 2020 (occupational health & safety)
- ISO 45001 (occupational health & safety management) alignment

**For Food Manufacturing Using CrowdSense™:**
- Compliant with FSSAI (Food Safety and Standards Authority of India) requirements
- Compliant with ISO 22000:2018 (food safety management)
- Compliant with HACCP (Hazard Analysis and Critical Control Points)
- NOTE: CrowdSense™ is supplementary; not a substitute for active HACCP monitoring

**For Smart City / Government Deployments:**
- Compliant with Ministry of Home Affairs surveillance guidelines
- Compliant with Bureau of Police Research and Development (BPR&D) recommendations

---

## 16. Limitation on User Conduct

### 16.1 Prohibited Activities

Do NOT:
- Upload malware, ransomware, or malicious code
- Attempt to hack, reverse-engineer, or decompile the platform
- Scrape, bot, or automate access (except via official API with quota limits)
- Harass, threaten, or abuse our staff
- Violate anyone's privacy (use CrowdSense™ only for authorized operational purposes)
- Engage in illegal activity (fraud, money laundering, terrorist financing)

### 16.2 Violations

First offense: Warning + account audit.  
Repeat offense: Immediate termination + legal action (we may sue for damages, report to police).

---

## 17. Survival of Terms

Even if your account terminates, the following survive:
- Sections 6 (IP), 7 (Warranties & Disclaimers), 8 (Limitations of Liability), 9 (Indemnification), 13 (Disputes), 14 (Insurance)
- Payment obligations
- Confidentiality obligations

---

## 18. Entire Agreement

These Terms, together with our **Privacy Policy** (vigilantlabs.in/privacy) and any **Data Processing Agreement**, constitute the entire agreement between you and Vigilant Labs. Any prior discussions, emails, or verbal promises are superseded.

**Exception:** If you have a signed written contract with Vigilant Labs (e.g., Enterprise agreement), that contract takes precedence over these Terms in case of conflict.

---

## 19. Severability

If any provision is found illegal or unenforceable, that provision is severed, and the remainder of these Terms remains in force.

---

## 20. Contact & Support

**General Support:**  
- Email: support@vigilantlabs.in  
- Phone: +91 95743 32221  
- Hours: 24/5 (Monday 8 AM to Saturday 8 PM IST)

**Legal Matters:**  
- Email: legal@vigilantlabs.in  
- Mail: Legal Department, Vigilant Labs, Pune, Maharashtra, India

**Complaints & Escalations:**  
- Email: grievance@vigilantlabs.in  
- Response: Within 7 days

---

**Version:** 1.0  
**Effective:** July 2026  
**Last Updated:** July 2026

---
