# ACF Field Groups Setup for Homepage Sections

This guide walks you through creating all the ACF Field Groups needed for the homepage sections to be fully managed via GraphQL.

## Prerequisites

Ensure you have installed and activated:
1. **ACF Pro** (Advanced Custom Fields Pro)
2. **WPGraphQL**
3. **WPGraphQL for ACF**
4. **WFI Headless CMS Plugin** (the plugin from `docs/wfi-headless-plugin.php`)

---

## Navigation in WordPress Admin

Go to: **ACF → Field Groups → Add New**

For each section below, create a new Field Group.

---

## 1. Hero Section Fields

### Field Group Settings
- **Title:** `Hero Section`
- **Location:** Options Page → is equal to → Hero Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `heroSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title Line 1 | `hero_title_line_1` | Text | e.g., "WHERE" |
| Title Line 2 | `hero_title_line_2` | Text | e.g., "INNOVATION" |
| Title Line 3 | `hero_title_line_3` | Text | e.g., "MEETS" |
| Description | `hero_description` | Textarea | Main hero description |
| Button Text | `hero_button_text` | Text | e.g., "Register Now" |
| Accent Text | `hero_accent_text` | Text | e.g., "Tomorrow's Workforce." |
| Background Text | `hero_background_text` | Text | Large background text |
| Hero Image | `hero_image` | Image (Return: Image Array) | Main hero image |

---

## 2. Partners Section Fields

### Field Group Settings
- **Title:** `Partners Section`
- **Location:** Options Page → is equal to → Partners Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `partnersSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title | `partners_title` | Text | e.g., "Top university partners" |
| Description | `partners_description` | Textarea | Main description |
| Feature 1 | `partners_feature_1` | Text | First checkbox feature |
| Feature 2 | `partners_feature_2` | Text | Second checkbox feature |

---

## 3. Training Solutions Section Fields

### Field Group Settings
- **Title:** `Training Section`
- **Location:** Options Page → is equal to → Training Solutions Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `trainingSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title Highlight | `training_title_highlight` | Text | e.g., "Training Solutions" |
| Title Rest | `training_title_rest` | Text | e.g., "For Every Team" |
| Description | `training_description` | Textarea | Main description |
| Subtext | `training_subtext` | Textarea | Right side text |
| Button Text | `training_button_text` | Text | e.g., "Explore More Here" |

---

## 4. Programs Section Fields

### Field Group Settings
- **Title:** `Programs Section`
- **Location:** Options Page → is equal to → Programs Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `programsSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title | `programs_title` | Text | e.g., "Our Programs" |

> Note: The actual programs come from the **Programs CPT** (Custom Post Type)

---

## 5. Testimonials Section Fields

### Field Group Settings
- **Title:** `Testimonials Section`
- **Location:** Options Page → is equal to → Testimonials Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `testimonialsSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title | `testimonials_title` | Text | e.g., "What Our Graduates Are Saying" |
| Description | `testimonials_description` | Textarea | Main description |
| Bottom Line 1 | `testimonials_bottom_line_1` | Text | e.g., "How marketing leaders..." |
| Bottom Line 2 | `testimonials_bottom_line_2` | Text | e.g., "Jasper to generate..." |
| Button Text | `testimonials_button_text` | Text | e.g., "Explore More Stories" |

> Note: The actual testimonials come from the **Testimonials CPT**

---

## 6. Integrations Section Fields

### Field Group Settings
- **Title:** `Integrations Section`
- **Location:** Options Page → is equal to → Integrations Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `integrationsSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Card Title | `integrations_card_title` | Text | e.g., "Meet Jasper right in your tech stack" |
| Card Description | `integrations_card_description` | Textarea | Card description |
| Card Button Text | `integrations_card_button_text` | Text | e.g., "Explore Integrations" |
| Main Title | `integrations_main_title` | Text | e.g., "The all-in-one career companion" |
| Main Description | `integrations_main_description` | Textarea | Main description |
| Main Button Text | `integrations_main_button_text` | Text | e.g., "Explore Customer Stories" |

---

## 7. AI Platform Section Fields

### Field Group Settings
- **Title:** `AI Platform Section`
- **Location:** Options Page → is equal to → AI Platform Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `aiPlatformSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title Line 1 | `ai_platform_title_line_1` | Text | e.g., "Seamlessly bring AI into" |
| Title Line 2 | `ai_platform_title_line_2` | Text | e.g., "your platform or product" |
| Description | `ai_platform_description` | Textarea | Main description |
| Button Text | `ai_platform_button_text` | Text | e.g., "Explore Topics" |

---

## 8. Stats Section Fields

### Field Group Settings
- **Title:** `Stats Section`
- **Location:** Options Page → is equal to → Stats Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `statsSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Stat 1 Value | `stat_1_value` | Text | e.g., "12M" |
| Stat 1 Label | `stat_1_label` | Text | e.g., "Resumes created" |
| Stat 2 Value | `stat_2_value` | Text | e.g., "65M+" |
| Stat 2 Label | `stat_2_label` | Text | e.g., "Resumes reviewed" |
| Stat 3 Value | `stat_3_value` | Text | e.g., "10M" |
| Stat 3 Label | `stat_3_label` | Text | e.g., "Jobs" |
| Stat 4 Value | `stat_4_value` | Text | e.g., "11.2M" |
| Stat 4 Label | `stat_4_label` | Text | e.g., "Users worldwide" |

---

## 9. CTA Section Fields

### Field Group Settings
- **Title:** `CTA Section`
- **Location:** Options Page → is equal to → CTA Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `ctaSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Title Line 1 | `cta_title_line_1` | Text | e.g., "Faster outputs." |
| Title Line 2 | `cta_title_line_2` | Text | e.g., "Better outcomes." |
| Description | `cta_description` | Textarea | Main description |
| Button 1 Text | `cta_button_1_text` | Text | e.g., "Start Free Trial" |
| Button 2 Text | `cta_button_2_text` | Text | e.g., "Get A Demo" |

---

## 10. Blog Section Fields

### Field Group Settings
- **Title:** `Blog Section`
- **Location:** Options Page → is equal to → Blog Section
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `blogSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Featured Description | `blog_featured_description` | Textarea | Description shown with featured post |

> Note: The actual blog posts come from **WordPress Posts**

---

## 11. Footer Section Fields

### Field Group Settings
- **Title:** `Footer Section`
- **Location:** Options Page → is equal to → Footer Settings
- **Show in GraphQL:** ✅ Yes
- **GraphQL Field Name:** `footerSection`

### Fields to Create

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Description | `footer_description` | Textarea | Footer tagline/description |
| Copyright | `footer_copyright` | Text | e.g., "© 2024 Jasper AI, Inc" |

---

## Testing Your Setup

### Step 1: Verify Options Pages Exist

After activating the WFI Headless plugin, go to:
- **WordPress Admin → Homepage Sections**

You should see sub-pages for each section (1. Hero, 2. Partners, etc.)

### Step 2: Add Content to Each Section

Click on each sub-page and fill in the ACF fields you created.

### Step 3: Test GraphQL Query

Go to: **GraphQL → GraphiQL IDE**

Run this test query:

```graphql
query TestHomepageSettings {
  acfOptionsHomepageSections {
    heroSection {
      heroTitleLine1
      heroTitleLine2
      heroTitleLine3
      heroDescription
    }
    statsSection {
      stat1Value
      stat1Label
    }
  }
}
```

If you see your content returned, the setup is complete!

---

## Quick Reference: Content Already from WordPress

These sections already get their content from Custom Post Types:

| Section | Data Source | Admin Location |
|---------|-------------|----------------|
| Programs Carousel | Programs CPT | Programs → Add New |
| Partner Logos | Partners CPT | Partners → Add New |
| Testimonials | Testimonials CPT | Testimonials → Add New |
| Blog Posts | WordPress Posts | Posts → Add New |
| Navigation | WordPress Menus | Appearance → Menus |

---

## Troubleshooting

### "No ACF fields found for this page"
- This appears on WordPress archive pages, not in ACF
- Create the Field Groups as described above
- Make sure "Show in GraphQL" is enabled

### Fields not showing in GraphQL
1. Check ACF field group has "Show in GraphQL" = Yes
2. Check WPGraphQL for ACF is activated
3. Check field group Location rule matches the Options Page
4. Try deactivating/reactivating WPGraphQL for ACF

### Options Pages not appearing
1. Make sure the WFI Headless plugin is activated
2. Check if ACF Pro is activated (not free version)
3. Go to Settings → Permalinks and click Save (flush rewrite rules)

