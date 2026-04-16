---
date: 2026-04-13
created: 2026-04-13
status: processed
domain: work
origin: manual
type: incident
ticket: INC-2026-04-10
severity: high
description: "Public charging API outage during Toyota stakeholder demo: 25min interruption, fallback demo completed, offline cache added post-incident."
tags:
  - incident
  - demo-impact
distributed_to: "work/03_INCIDENTS/public-charging-api-outage.md"
distributed_at: 2026-04-13
last_updated: 2026-04-13
---

# Incident: Public Charging API Outage During Demo

**Date:** 2026-04-10
**Impact:** High — live demo to Toyota stakeholders interrupted for 25 minutes
**Role:** Incident lead

## What Happened

During a live demo of the public charging map feature, the charging network provider API went down. The map showed no chargers for 25 minutes. Demo continued with a pre-recorded walkthrough as fallback.

## Root Cause

Network provider had an unannounced maintenance window. No prior communication was sent to integrators.

## Resolution

Demo recovered. Post-incident: added a static charger cache as fallback layer. [[work/06_ORG/PEOPLE#Babis Pagonis|Babis Pagonis]] led the cache implementation in the following sprint.

## Actions Taken

- Added offline fallback cache to public charging map
- Opened SLA discussion with the charging network provider
- Incident retrospective held with the squad
