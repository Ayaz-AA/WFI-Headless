# Homepage Content Setup Guide (FREE ACF)

This guide shows how to make **ALL static homepage text** editable from WordPress using the FREE version of ACF.

## 🎯 Overview

Since you don't have ACF Pro (no Options Pages), we use a clever workaround:
- Use the existing **"Home"** page in WordPress
- Attach ACF fields to that page
- The frontend fetches that page's custom fields via GraphQL

---

## Step 1: Create the ACF Field Group

### Go to: ACF → Field Groups → Add New

| Setting | Value |
|---------|-------|
| **Title** | Homepage Content |
| **Show in GraphQL** | ✅ Yes |
| **GraphQL Field Name** | `homepageContent` |

---

## Step 2: Add All Fields

Add the following fields to the field group:

### Hero Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Hero Title Line 1 | `hero_title_line_1` | Text | WHERE |
| Hero Title Line 2 | `hero_title_line_2` | Text | INNOVATION |
| Hero Title Line 3 | `hero_title_line_3` | Text | MEETS |
| Hero Description | `hero_description` | Textarea | Empowers professionals through expert-led training and career support. |
| Hero Button Text | `hero_button_text` | Text | Register Now |
| Hero Accent Text | `hero_accent_text` | Text | Tomorrow's Workforce. |

### Partners Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Partners Title | `partners_tile` | Text | Top university partners |
| Partners Description | `partners_description` | Textarea | It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have. |
| Partners Feature 1 | `partners_feature_1` | Text | Get unlimited design inspirations. Level up your design. |
| Partners Feature 2 | `partners_feature_2` | Text | 14+ Premium tailwind UI kits. Start with unlimited product downloads. |

### Training Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Training Title Highlight | `training_title_highlight` | Text | Training Solutions |
| Training Title Rest | `training_title_rest` | Text | For Every Team |
| Training Description | `training_description` | Textarea | At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing: |
| Training Subtext | `training_subtext` | Textarea | All the features you need to take a secure, controlled & impactful approach to AI. |
| Training Button Text | `training_button_text` | Text | Explore More Here |

### Stats Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Stat 1 Value | `stat_1_value` | Text | 12M |
| Stat 1 Label | `stat_1_label` | Text | Resumes created |
| Stat 2 Value | `stat_2_value` | Text | 65M+ |
| Stat 2 Label | `stat_2_label` | Text | Resumes reviewed |
| Stat 3 Value | `stat_3_value` | Text | 10M |
| Stat 3 Label | `stat_3_label` | Text | Jobs |
| Stat 4 Value | `stat_4_value` | Text | 11.2M |
| Stat 4 Label | `stat_4_label` | Text | Users worldwide |

### Testimonials Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Testimonials Title | `testimonials_title` | Text | What Our Graduates Are Saying |
| Testimonials Description | `testimonials_description` | Textarea | Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals |
| Testimonials Bottom Line 1 | `testimonials_bottom_line_1` | Text | How marketing leaders and their teams use |
| Testimonials Bottom Line 2 | `testimonials_bottom_line_2` | Text | Jasper to generate incredible value. |
| Testimonials Button Text | `testimonials_button_text` | Text | Explore More Stories |

### CTA Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| CTA Title Line 1 | `cta_title_line_1` | Text | Faster outputs. |
| CTA Title Line 2 | `cta_title_line_2` | Text | Better outcomes. |
| CTA Description | `cta_description` | Textarea | Come see why leading businesses chose Jasper for better results using artificial intelligence. |
| CTA Button 1 Text | `cta_button_1_text` | Text | Start Free Trial |
| CTA Button 2 Text | `cta_button_2_text` | Text | Get A Demo |

### Integrations Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| Integrations Card Title | `integrations_card_title` | Text | Meet Jasper right in your tech stack |
| Integrations Card Description | `integrations_card_description` | Textarea | Interface with Jasper from within your tech stack using one of our many integrations. |
| Integrations Card Button Text | `integrations_card_button_text` | Text | Explore Integrations |
| Integrations Main Title | `integrations_main_title` | Text | The all-in-one career companion |
| Integrations Main Description | `integrations_main_description` | Textarea | It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have. |
| Integrations Main Button Text | `integrations_main_button_text` | Text | Explore Customer Stories |

### AI Platform Section Fields

| Field Label | Field Name | Type | Default Value |
|-------------|------------|------|---------------|
| AI Platform Title Line 1 | `ai_platform_title_line_1` | Text | Seamlessly bring AI into |
| AI Platform Title Line 2 | `ai_platform_title_line_2` | Text | your platform or product |
| AI Platform Description | `ai_platform_description` | Textarea | Call the Jasper API to create custom content or manipulate images – the only limit is your imagination. |
| AI Platform Button Text | `ai_platform_button_text` | Text | Explore Topics |

---

## Step 3: Set Location Rules

Under **Location** section:
- **Show this field group if:**
  - Page → is equal to → Home

Click **Publish** to save the field group.

---

## Step 4: Use the Existing "Home" Page

1. Go to **Pages → All Pages**
2. Find and **Edit** the existing "Home" page
3. Scroll down to see the ACF fields
4. Fill in all the ACF fields with your content
5. Click **Update**

---

## Step 5: Test in GraphQL

Go to: **GraphQL → GraphiQL IDE**

Run this query:

```graphql
{
  page(id: "home", idType: URI) {
    homepageContent {
      heroTitleLine1
      heroTitleLine2
      heroTitleLine3
      heroDescription
      partnersTitle
      partnersDescription
      stat1Value
      stat1Label
      ctaTitleLine1
      ctaTitleLine2
    }
  }
}
```

You should see your content returned!

---

## 🔄 How Content Updates Work

1. **Edit in WordPress:** Go to Pages → Home → Edit
2. **Change any field value**
3. **Click Update**
4. **Frontend updates automatically** within 60 seconds (ISR revalidation)

---

## 📋 Field Reference Table

| Section | Fields Count | Editable Elements |
|---------|-------------|-------------------|
| Hero | 6 | Title (3 lines), description, button text, accent |
| Partners | 4 | Title, description, 2 feature texts |
| Training | 5 | Title highlight, title rest, description, subtext, button |
| Stats | 8 | 4 stat values + 4 stat labels |
| Testimonials | 5 | Title, description, 2 bottom lines, button |
| CTA | 5 | Title (2 lines), description, 2 button texts |
| Integrations | 6 | Card title/desc/button, main title/desc/button |
| AI Platform | 4 | Title (2 lines), description, button |
| **TOTAL** | **43** | All homepage static text is editable! |

---

## ⚠️ Important Notes

1. **Page slug must be `home`** - The GraphQL query looks for this exact slug
2. **ACF field names matter** - Use the exact field names shown above (with underscores)
3. **Enable "Show in GraphQL"** for the field group
4. **GraphQL Field Name: `homepageContent`** - Must match exactly

---

## 🚀 What's Already Connected

The frontend automatically uses WordPress content when available:

```typescript
// Example from HomeSections.tsx
const titleLine1 = content?.heroTitleLine1 || 'WHERE';
const titleLine2 = content?.heroTitleLine2 || 'INNOVATION';
```

If WordPress data is unavailable, **fallback values are used** (the current hardcoded text).

---

## ✅ Checklist

- [ ] Create ACF Field Group "Homepage Content"
- [ ] Enable "Show in GraphQL" 
- [ ] Set GraphQL Field Name to `homepageContent`
- [ ] Add all 43 fields (Hero, Partners, Training, Stats, Testimonials, CTA, Integrations, AI Platform)
- [ ] Set location rule: Page → is equal to → Home
- [ ] Edit existing "Home" page (verify slug is `home`)
- [ ] Fill in all field values
- [ ] Test GraphQL query
- [ ] Verify frontend displays content



