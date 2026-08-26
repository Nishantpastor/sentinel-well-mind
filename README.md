---
title: Sentinel Well Mind
emoji: 🛡️
colorFrom: blue
colorTo: indigo
sdk: static
app_build_command: npm run build
app_file: dist/index.html
pinned: false
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# SentinelWell AI


SentinelWell is an intelligent personnel stress, fatigue, and welfare monitoring platform designed for CAPFs, Armed Forces, police organizations, disaster-response teams, and other high-stress workforces.

It provides early warning indicators of stress, fatigue, and burnout risk while maintaining personnel privacy, operational confidentiality, and explainable decision-support recommendations.


1. CORE PRODUCT IDEA

SentinelWell identifies early indicators of:

Stress

Fatigue

Burnout risk

Excessive workload

Poor sleep

Prolonged deployment

Operational fatigue

Welfare concerns

using:

Duty/workload information

Deployment history

Leave patterns

Night-shift frequency

Training load

Voluntary wellness assessments

Sleep and energy scores

Self-reported stress

The system produces a Welfare Risk Score and gives explainable welfare recommendations.

IMPORTANT:

The application must NEVER present the AI as diagnosing a mental-health condition.

Use language such as:

"Elevated Welfare Risk"

"Stress Indicators"

"Fatigue Risk"

"Wellness Concern"

"Support Recommended"

"Confidential Welfare Follow-up"

Never use:

"Mentally unstable"

"Psychologically unfit"

"Employee problem"

"Punishment"

"Disciplinary action"

The product should feel like a trusted welfare-support platform, not a surveillance system.

2. TECHNOLOGY

Use:

React

TypeScript

Tailwind CSS

shadcn/ui

Recharts

Lucide React icons

Use reusable components.

Keep mock data separated from UI components.

Suggested structure:

src/
├── components/
├── pages/
├── layouts/
├── data/
├── types/
├── services/
├── hooks/
└── utils/

Create a clean service layer so APIs can be connected later.

3. VISUAL DESIGN

Create a premium enterprise/government/defence technology aesthetic.

The interface should communicate:

Trust

Security

Professionalism

Privacy

Calmness

Reliability

Modern AI analytics

Do NOT make it look like a generic startup dashboard.

Use:

White/light backgrounds

Navy/dark blue accents

Neutral gray surfaces

Subtle borders

Soft shadows

Rounded cards

Excellent spacing

Strong typography

Clean charts

Minimal animations

Risk colors:

🟢 Low
🟡 Moderate
🟠 High
🔴 Critical

Do not overuse red.

Use Lucide icons rather than random emojis.

Make the UI responsive.

4. APPLICATION ROLES

Create four demo roles:

Personnel

Welfare Officer

Commander

Administrator

Because there is no backend, create a simple Demo Role Selector on the login screen.

The user can select:

Personnel Demo
Welfare Officer Demo
Commander Demo
Admin Demo


Then clicking "Sign In" opens the corresponding dashboard.

This is only frontend simulation.

5. ROUTING

Create these routes:

Public

/login

Personnel

/personnel/dashboard
/personnel/assessment
/personnel/trends
/personnel/support
/personnel/privacy

Welfare Officer

/welfare/dashboard
/welfare/personnel
/welfare/personnel/:id
/welfare/alerts
/welfare/interventions

Commander

/commander/dashboard
/commander/analytics

Admin

/admin/dashboard
/admin/audit-logs

6. GLOBAL LAYOUT

Create a reusable application layout.

Desktop:

┌─────────────────────────────────────────────┐
│ Top Navigation / Notifications / Profile   │
├────────────┬────────────────────────────────┤
│            │                                │
│ Sidebar    │       Main Content             │
│            │                                │
│ Navigation │                                │
│            │                                │
└────────────┴────────────────────────────────┘


Sidebar should show the correct navigation depending on the selected role.

Include:

Logo

SentinelWell

Role indicator

Navigation

Privacy indicator

Logout

7. LOGIN PAGE

Create a polished login page.

Left side:

SentinelWell branding and short explanation.

Text:

"AI-powered welfare intelligence for resilient personnel."

Show three trust indicators:

Secure

Confidential

Welfare-focused

Right side:

Login card.

Fields:

Service ID / Email

Password

Then:

"Demo Role"

Buttons:

Personnel

Welfare Officer

Commander

Administrator

Main button:

"Sign In"

Below:

"Prototype environment — synthetic data only"

8. PERSONNEL DASHBOARD

Create a beautiful personnel wellness dashboard.

Header:

"Good morning"

Subtitle:

"Your wellness matters. Take a moment to check in."

Top cards:

Wellness Score

78 / 100

Good

Stress

4 / 10

Moderate

Sleep

4 / 5

Good

Energy

4 / 5

Good

Today's Check-In

Create a prominent card:

"How are you feeling today?"

Inputs:

Stress:
1–10

Sleep:
1–5

Energy:
1–5

Workload:
1–5

Mood:

Very Low / Low / Okay / Good / Excellent

Button:

"Complete Check-In"

After submission show a toast:

"Wellness check-in recorded securely."

9. PERSONNEL ASSESSMENT PAGE

Create a clean step-by-step wellness assessment.

Questions:

How would you rate your current stress level?

How well have you been sleeping?

How would you rate your energy?

How manageable is your workload?

How often have you felt mentally exhausted after duty?

How satisfied are you with your current work-life balance?

Would you like to speak with a welfare professional?

Use:

Sliders

Radio buttons

Selectable cards

At the end:

"Submit Assessment"

After submission:

Show:

"Thank you for completing your wellness check-in."

If support is requested:

"Your confidential support request has been sent to the authorized welfare team."

10. PERSONNEL TRENDS PAGE

Create meaningful charts.

Stress Trend

Line chart:

Jan → Feb → Mar → Apr → May → Jun


Example:

4 → 4 → 5 → 6 → 7 → 8

Sleep Trend

4 → 4 → 3 → 3 → 2 → 2

Workload Trend

3 → 3 → 4 → 4 → 5 → 5

Wellness Risk

35 → 38 → 44 → 56 → 68 → 78

Add insight card:

"Your stress indicators have increased over the last 3 weeks."

"Consider completing a wellness check-in or requesting support."

11. PERSONNEL SUPPORT PAGE

Create a confidential support interface.

Card 1:

Request Welfare Support

"Connect with an authorized welfare professional."

Button:

"Request Support"

Card 2:

Wellness Resources

"Access available wellness and counseling resources."

Button:

"View Resources"

Card 3:

Confidentiality

"Your wellness information is protected through role-based access."

12. WELFARE OFFICER DASHBOARD

THIS IS THE MOST IMPORTANT SCREEN.

Create a premium analytics dashboard.

Title:

"Personnel Wellness Command Center"

Subtitle:

"Confidential welfare intelligence for authorized personnel."

Top KPI cards:

Total Personnel
1,250

Low Risk
820

Moderate Risk
310

High Risk
95

Critical
25


13. RISK DISTRIBUTION

Create a large donut chart.

Title:

"Current Welfare Risk Distribution"

Segments:

Low

Moderate

High

Critical

Add legend and percentages.

14. RISK TREND

Create a large line chart.

Title:

"Personnel Welfare Risk Trend"

Show:

Low

Moderate

High

Critical

Across:

January → February → March → April → May → June

15. UNIT WELLNESS OVERVIEW

Create four unit cards:

Unit A
Risk: Low
Trend: Stable

Unit B
Risk: Moderate
Trend: Increasing

Unit C
Risk: High
Trend: Increasing

Unit D
Risk: Low
Trend: Stable


Add:

"View Unit Analytics"

16. HIGH-RISK PERSONNEL

Create a professional data table.

Columns:

Personnel ID

Unit

Risk

Score

Trend

Main Indicators

Last Assessment

Action

Example:

P-1024
Unit A
HIGH
82
↑ Increasing
Poor sleep, high workload
2 days ago
View


Use Personnel IDs instead of names.

Filters:

Risk

Unit

Trend

Date

Search:

"Search personnel ID..."

17. PERSONNEL RISK DETAIL

When clicking "View", open:

/welfare/personnel/:id

Header:

Personnel P-1024

Welfare Risk
HIGH

82 / 100

↑ 18 points from previous assessment


Create a large risk gauge.

Risk Factors

Use horizontal bars:

Duty Hours          ██████████
Night Shifts        ████████
Poor Sleep          ███████
Deployment          ██████
Low Leave           █████
Workload            █████████


Recent Trends

Show charts:

Stress

Sleep

Workload

Duty Hours

Risk Score

18. AI EXPLANATION

Create a visually strong card:

Why is this risk elevated?

Example:

"AI analysis indicates elevated welfare risk primarily associated with increased duty hours, frequent night shifts, prolonged deployment, declining sleep quality, and increasing self-reported stress."

Then show:

Important

"This is an AI-generated welfare risk indicator and is NOT a medical diagnosis."

Use an information icon.

19. WELFARE RECOMMENDATIONS

Create:

Recommended Welfare Actions

Recommendation 1:

"Confidential welfare follow-up"

Priority: High

Recommendation 2:

"Review recent duty workload"

Priority: High

Recommendation 3:

"Consider rest/rotation where operationally feasible"

Priority: Medium

Recommendation 4:

"Offer available counseling and wellness resources"

Priority: Medium

Recommendation 5:

"Schedule follow-up assessment"

Priority: Medium

Buttons:

Accept

Schedule Follow-Up

Dismiss

20. ALERT CENTER

Create:

/welfare/alerts

Show alert cards.

Example:

HIGH RISK ALERT

Personnel:

P-1024

Risk:

82 / 100

Change:

54 → 82

Detected changes:

Duty hours increased

Sleep quality decreased

Night shifts increased

Recommendation:

"Confidential welfare follow-up."

Buttons:

"Review"

"Acknowledge"

Create additional alerts:

Increasing fatigue trend

Excessive workload

Prolonged deployment

Repeated wellness concerns

21. INTERVENTIONS

Create:

/welfare/interventions

Table:

Personnel
Risk
Intervention
Assigned Officer
Date
Status
Follow-Up


Statuses:

Pending

In Progress

Completed

Follow-up Required

Add modal:

"Record Welfare Intervention"

Fields:

Intervention type

Priority

Notes

Follow-up date

Status

Remember:

Sensitive intervention notes should visually appear restricted.

22. COMMANDER DASHBOARD

Create a separate dashboard focused on aggregated operational welfare information.

IMPORTANT:

Do NOT expose sensitive individual wellness details here.

Title:

"Unit Wellness Overview"

Cards:

Personnel
350

Low Risk
250

Moderate
72

High
22

Critical
6


Charts:

Unit wellness trend

Workload trend

Deployment distribution

Leave utilization

Fatigue indicators

Create:

Operational Welfare Insights

Example:

"Average workload increased 18% this month."

"Unit B shows increasing fatigue indicators."

"Unit A wellness indicators remain stable."

Recommendation:

"Review duty distribution for Unit B."

23. ADMIN DASHBOARD

Keep this simple.

Create:

/admin/dashboard

Cards:

Total Users

Active Users

Welfare Officers

System Alerts

Create navigation to:

Users

Roles

Audit Logs

24. AUDIT LOG PAGE

Create:

/admin/audit-logs

Table:

User
Action
Resource
Timestamp
Result


Example:

Welfare Officer
Viewed Risk Profile
P-1024
10:42 AM
Authorized


25. PRIVACY CENTER

Create a dedicated privacy page.

Header:

"Privacy & Data Protection"

Show cards:

Role-Based Access

"Users can only access information appropriate to their role."

Data Protection

"Sensitive information is protected using secure storage and controlled access."

Data Minimization

"Only necessary information should be collected."

Anonymized Analytics

"Aggregated analytics can be displayed without exposing individual identities."

Consent Settings

Show:

Wellness Self-Assessment
[ON]

Optional Wellness Data
[ON]

Biometric Data
[OFF]

Analytics Participation
[ON]

For biometric data:

"Optional and only applicable where legally permitted and explicitly authorized."

26. DEMO AI SIMULATION

THIS IS VERY IMPORTANT FOR THE HACKATHON.

Add a button to the Welfare Dashboard:

"Simulate Increasing Stress"

When clicked, demonstrate the complete AI workflow.

Initial:

Risk = 42
MODERATE


Then animate/update:

Workload increases
       ↓
Sleep decreases
       ↓
Night shifts increase
       ↓
Stress increases
       ↓
AI detects trend
       ↓
Risk = 82
HIGH
       ↓
New Alert
       ↓
Welfare Recommendation


Update the dashboard charts and alert count.

Show a toast:

"AI detected a significant increase in welfare risk indicators."

This is a DEMO simulation using mock data.

27. MOCK DATA

Create at least:

20 personnel

4 units

6 months of wellness data

Multiple risk scores

Multiple alerts

Multiple interventions

Use realistic correlated data.

Do NOT generate completely random numbers.

Example personnel:

P-1024:

Stress:
4 → 5 → 5 → 6 → 7 → 8

Sleep:
4 → 4 → 3 → 3 → 2 → 2

Workload:
3 → 4 → 4 → 5 → 5 → 5

Risk:
38 → 44 → 51 → 63 → 72 → 82


This should make the AI trend visually convincing.

28. RISK SCORE

Create reusable RiskScore component.

Display:

Welfare Risk

82 / 100

HIGH

↑ 18 points


Prototype risk bands:

0–30    LOW
31–60   MODERATE
61–80   HIGH
81–100  CRITICAL


Label:

"Prototype welfare risk bands"

Do not imply clinical validation.

29. NOTIFICATIONS

Create a notification dropdown.

Examples:

"New high-risk welfare alert"

"Intervention recorded"

"Increasing fatigue trend detected"

"Weekly wellness report available"

30. RESPONSIVENESS

Desktop:

Prioritize dashboards and analytics.

Mobile:

Prioritize:

Personnel wellness

Assessment

Support

Alerts

Tables should become horizontally scrollable or responsive cards.

31. IMPORTANT COMPONENTS

Create reusable:

AppSidebar
TopNavbar
RiskCard
RiskGauge
RiskBadge
StatCard
TrendChart
RiskDistributionChart
PersonnelTable
AlertCard
RecommendationCard
WellnessCheckIn
AssessmentForm
PrivacyCard
InterventionModal
NotificationDropdown
RoleSelector


32. UX QUALITY

Implement:

Toast notifications

Form validation

Loading states

Empty states

Error states

Skeleton loaders

Confirmation dialogs

Responsive navigation

Consistent spacing

Accessible buttons

Tooltips where useful

Do not over-animate the interface.

33. DATA ARCHITECTURE

Keep mock data in:

src/data/mockData.ts

Keep types in:

src/types/

Keep API placeholders in:

src/services/

Example:

authService.ts
personnelService.ts
wellnessService.ts
riskService.ts
alertService.ts
interventionService.ts


For now these services can return mock data.

DO NOT build the actual backend.

34. FINAL PRIORITY ORDER

If there is any conflict, prioritize in this exact order:

PRIORITY 1

Welfare Officer Dashboard

PRIORITY 2

Personnel Wellness Dashboard

PRIORITY 3

Risk Detail + AI Explanation

PRIORITY 4

Self Assessment

PRIORITY 5

Alerts + Recommendations

PRIORITY 6

Commander Dashboard

PRIORITY 7

Privacy Center

PRIORITY 8

Admin/Audit

Do not spend excessive effort on low-priority features.

35. FINAL PRODUCT FLOW

The final demo should clearly communicate:

Personnel
    ↓
Wellness Check-In
    ↓
Organizational + Wellness Data
    ↓
AI Risk Analysis
    ↓
Risk Score
    ↓
Explainable Risk Factors
    ↓
Trend Detection
    ↓
Welfare Alert
    ↓
Human Welfare Officer
    ↓
Recommended Intervention
    ↓
Follow-Up


The frontend should make this workflow immediately understandable to a hackathon judge.

36. FINAL REQUIREMENT

Make this feel like a real enterprise-grade product, not a student CRUD project.

The most visually impressive pages should be:

Welfare Officer Dashboard

Personnel Risk Detail

AI Risk Explanation

Personnel Wellness Dashboard

Demo AI Simulation

Use synthetic data only.

At the bottom of relevant pages include a subtle label:

"Prototype • Synthetic Data • AI risk indicators are not medical diagnoses"

Do not build backend functionality yet.

DO NOT add unnecessary features.

Focus on a polished, coherent, functional frontend that can later connect to:

React Frontend
      ↓
Node.js + Express API
      ↓
PostgreSQL
      ↓
Python ML Service


## Development

Prefer working locally? You need Node.js and npm:


```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
