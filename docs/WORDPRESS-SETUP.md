# WordPress Headless CMS Setup Guide

This guide walks you through setting up WordPress as a headless CMS for the WFI Next.js frontend.

---

## Table of Contents

1. [Required Plugins](#1-required-plugins)
2. [Plugin Installation](#2-plugin-installation)
3. [WPGraphQL Configuration](#3-wpgraphql-configuration)
4. [Menu Setup](#4-menu-setup)
5. [Custom Post Types Setup](#5-custom-post-types-setup)
6. [ACF Fields Configuration](#6-acf-fields-configuration)
7. [Global Settings (Options Page)](#7-global-settings-options-page)
8. [Webhook for ISR](#8-webhook-for-isr-on-demand-revalidation)
9. [CORS Configuration](#9-cors-configuration)
10. [Testing Your Setup](#10-testing-your-setup)

---

## 1. Required Plugins

### Core Plugins (Required)

| Plugin | Purpose | Download |
|--------|---------|----------|
| **WPGraphQL** | Exposes GraphQL API | [wordpress.org/plugins/wp-graphql](https://wordpress.org/plugins/wp-graphql/) |
| **WPGraphQL for ACF** | Exposes ACF fields in GraphQL | [github.com/wp-graphql/wpgraphql-acf](https://github.com/wp-graphql/wpgraphql-acf) |
| **Advanced Custom Fields PRO** | Create custom fields | [advancedcustomfields.com](https://www.advancedcustomfields.com/pro/) |
| **Divi Builder** | Page design | Already installed |

### Recommended Plugins

| Plugin | Purpose | Download |
|--------|---------|----------|
| **Yoast SEO** | SEO metadata | [wordpress.org/plugins/wordpress-seo](https://wordpress.org/plugins/wordpress-seo/) |
| **WPGraphQL for Yoast SEO** | Exposes Yoast in GraphQL | [github.com/developer/wp-graphql-yoast-seo](https://github.com/developer/wp-graphql-yoast-seo) |
| **WP Webhooks** | Trigger ISR on content update | [wordpress.org/plugins/wp-webhooks](https://wordpress.org/plugins/wp-webhooks/) |

---

## 2. Plugin Installation

### Step 1: Install WPGraphQL

1. Go to **Plugins → Add New**
2. Search for "WPGraphQL"
3. Click **Install Now** → **Activate**

### Step 2: Install ACF Pro

1. Download ACF Pro from your account at advancedcustomfields.com
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload the zip file → **Install Now** → **Activate**

### Step 3: Install WPGraphQL for ACF

1. Download from [GitHub releases](https://github.com/wp-graphql/wpgraphql-acf/releases)
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload the zip file → **Install Now** → **Activate**

### Step 4: Verify Installation

1. Go to **GraphQL → Settings** in admin menu
2. You should see the GraphQL endpoint: `https://backend.workforceinstitute.io/graphql`
3. Click on **GraphQL IDE** to test queries

---

## 3. WPGraphQL Configuration

### Enable Public Introspection (for development)

1. Go to **GraphQL → Settings**
2. Check **Enable Public Introspection**
3. Save changes

### Register Menu Locations

Add this to your theme's `functions.php` or a custom plugin:

```php
<?php
/**
 * Register navigation menus for GraphQL
 */
function wfi_register_menus() {
    register_nav_menus(array(
        'main-menu'   => __('Main Menu', 'wfi'),
        'footer-menu' => __('Footer Menu', 'wfi'),
    ));
}
add_action('after_setup_theme', 'wfi_register_menus');

/**
 * Expose menu locations to WPGraphQL
 */
function wfi_register_menu_locations_graphql() {
    register_graphql_enum_type('MenuLocationEnum', [
        'description' => __('Registered menu locations', 'wfi'),
        'values' => [
            'MAIN_MENU' => [
                'value' => 'main-menu',
            ],
            'FOOTER_MENU' => [
                'value' => 'footer-menu',
            ],
        ],
    ]);
}
add_action('graphql_register_types', 'wfi_register_menu_locations_graphql');
```

---

## 4. Menu Setup

### Create Main Menu

1. Go to **Appearance → Menus**
2. Click **Create a new menu**
3. Name it "Main Menu"
4. Add your menu items:
   - Programs
   - About Us
   - Integrations
   - Webinar/Events
   - Blogs
5. Under **Menu Settings**, check **Main Menu** location
6. Click **Save Menu**

### Create Footer Menu

1. Create another menu named "Footer Menu"
2. Add footer links
3. Assign to **Footer Menu** location
4. Save

---

## 5. Custom Post Types Setup

Add this code to your theme's `functions.php` or create a custom plugin:

```php
<?php
/**
 * =============================================================================
 * CUSTOM POST TYPES FOR WFI HEADLESS
 * =============================================================================
 */

/**
 * Register Programs CPT
 */
function wfi_register_programs_cpt() {
    $labels = array(
        'name'               => 'Programs',
        'singular_name'      => 'Program',
        'menu_name'          => 'Programs',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Program',
        'edit_item'          => 'Edit Program',
        'new_item'           => 'New Program',
        'view_item'          => 'View Program',
        'search_items'       => 'Search Programs',
        'not_found'          => 'No programs found',
        'not_found_in_trash' => 'No programs found in trash',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'programs'),
        'capability_type'     => 'post',
        'has_archive'         => true,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
        'show_in_graphql'     => true,  // Important for WPGraphQL
        'graphql_single_name' => 'program',
        'graphql_plural_name' => 'programs',
    );

    register_post_type('program', $args);
}
add_action('init', 'wfi_register_programs_cpt');

/**
 * Register Testimonials CPT
 */
function wfi_register_testimonials_cpt() {
    $labels = array(
        'name'               => 'Testimonials',
        'singular_name'      => 'Testimonial',
        'menu_name'          => 'Testimonials',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Testimonial',
        'edit_item'          => 'Edit Testimonial',
        'new_item'           => 'New Testimonial',
        'view_item'          => 'View Testimonial',
        'search_items'       => 'Search Testimonials',
        'not_found'          => 'No testimonials found',
        'not_found_in_trash' => 'No testimonials found in trash',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'testimonials'),
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 6,
        'menu_icon'           => 'dashicons-format-quote',
        'supports'            => array('title', 'thumbnail'),
        'show_in_graphql'     => true,
        'graphql_single_name' => 'testimonial',
        'graphql_plural_name' => 'testimonials',
    );

    register_post_type('testimonial', $args);
}
add_action('init', 'wfi_register_testimonials_cpt');

/**
 * Register Partners CPT
 */
function wfi_register_partners_cpt() {
    $labels = array(
        'name'               => 'Partners',
        'singular_name'      => 'Partner',
        'menu_name'          => 'Partners',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Partner',
        'edit_item'          => 'Edit Partner',
        'new_item'           => 'New Partner',
        'view_item'          => 'View Partner',
        'search_items'       => 'Search Partners',
        'not_found'          => 'No partners found',
        'not_found_in_trash' => 'No partners found in trash',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'partners'),
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 7,
        'menu_icon'           => 'dashicons-groups',
        'supports'            => array('title', 'thumbnail', 'page-attributes'),
        'show_in_graphql'     => true,
        'graphql_single_name' => 'partner',
        'graphql_plural_name' => 'partners',
    );

    register_post_type('partner', $args);
}
add_action('init', 'wfi_register_partners_cpt');

/**
 * Register Events/Webinars CPT
 */
function wfi_register_events_cpt() {
    $labels = array(
        'name'               => 'Events',
        'singular_name'      => 'Event',
        'menu_name'          => 'Events/Webinars',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Event',
        'edit_item'          => 'Edit Event',
        'new_item'           => 'New Event',
        'view_item'          => 'View Event',
        'search_items'       => 'Search Events',
        'not_found'          => 'No events found',
        'not_found_in_trash' => 'No events found in trash',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'events'),
        'capability_type'     => 'post',
        'has_archive'         => true,
        'hierarchical'        => false,
        'menu_position'       => 8,
        'menu_icon'           => 'dashicons-calendar-alt',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_graphql'     => true,
        'graphql_single_name' => 'event',
        'graphql_plural_name' => 'events',
    );

    register_post_type('event', $args);
}
add_action('init', 'wfi_register_events_cpt');
```

---

## 6. ACF Fields Configuration

### Create Field Groups in ACF

Go to **Custom Fields → Add New** and create these field groups:

---

### Field Group 1: Program Fields

**Location:** Post Type is equal to Program

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Short Description | `short_description` | Text Area | Brief description for cards |
| Description | `description` | WYSIWYG | Full program description |
| Category | `category` | Text | e.g., "AI", "Design", "Marketing" |
| Duration | `duration` | Text | e.g., "12 weeks" |
| Price | `price` | Text | e.g., "$2,999" |
| Link | `link` | URL | Link to program page or registration |
| Button Text | `button_text` | Text | Default: "Learn More" |
| Featured | `featured` | True/False | Show in featured section |

**GraphQL Field Group Settings:**
- Show in GraphQL: ✅ Yes
- GraphQL Field Name: `programFields`

---

### Field Group 2: Testimonial Fields

**Location:** Post Type is equal to Testimonial

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Person Name | `name` | Text | Full name of the person |
| Program Name | `program_name` | Text | e.g., "UI/UX Design" |
| Quote | `quote` | Text Area | The testimonial text |
| Rating | `rating` | Number | 1-5 rating (decimals allowed) |
| Company | `company` | Text | Optional: Company name |
| Position | `position` | Text | Optional: Job title |

**GraphQL Settings:**
- Show in GraphQL: ✅ Yes
- GraphQL Field Name: `testimonialFields`

---

### Field Group 3: Partner Fields

**Location:** Post Type is equal to Partner

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Website URL | `website_url` | URL | Partner's website |
| Display Order | `order` | Number | Order in the list (lower = first) |

**GraphQL Settings:**
- Show in GraphQL: ✅ Yes
- GraphQL Field Name: `partnerFields`

---

### Field Group 4: Event Fields

**Location:** Post Type is equal to Event

| Field Label | Field Name | Field Type | Instructions |
|-------------|------------|------------|--------------|
| Event Date | `event_date` | Date Picker | Date of the event |
| Event Time | `event_time` | Text | e.g., "2:00 PM EST" |
| Location | `location` | Text | Venue or "Online" |
| Registration Link | `registration_link` | URL | Sign up link |
| Is Online | `is_online` | True/False | Virtual event? |

**GraphQL Settings:**
- Show in GraphQL: ✅ Yes
- GraphQL Field Name: `eventFields`

---

## 7. Global Settings (Options Page)

### Create ACF Options Page

Add this to your `functions.php`:

```php
<?php
/**
 * Register ACF Options Page for Global Settings
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title'    => 'Global Settings',
        'menu_title'    => 'Global Settings',
        'menu_slug'     => 'global-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false,
        'icon_url'      => 'dashicons-admin-site',
        'position'      => 2,
        'show_in_graphql' => true,
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Hero Section',
        'menu_title'    => 'Hero Section',
        'parent_slug'   => 'global-settings',
        'show_in_graphql' => true,
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Stats Section',
        'menu_title'    => 'Stats Section',
        'parent_slug'   => 'global-settings',
        'show_in_graphql' => true,
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'CTA Section',
        'menu_title'    => 'CTA Section',
        'parent_slug'   => 'global-settings',
        'show_in_graphql' => true,
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'global-settings',
        'show_in_graphql' => true,
    ));
}
```

### Create Field Group: Global Settings

**Location:** Options Page is equal to Global Settings

| Field Label | Field Name | Field Type |
|-------------|------------|------------|
| **Stats Group** | `stats` | Group |
| ↳ Resumes Created | `resumes_created` | Text |
| ↳ Resumes Reviewed | `resumes_reviewed` | Text |
| ↳ Total Jobs | `total_jobs` | Text |
| ↳ Users Worldwide | `users_worldwide` | Text |
| **CTA Group** | `cta` | Group |
| ↳ Title | `title` | Text |
| ↳ Subtitle | `subtitle` | Text |
| ↳ Description | `description` | Text Area |
| ↳ Primary Button Text | `primary_button_text` | Text |
| ↳ Primary Button Link | `primary_button_link` | URL |
| ↳ Secondary Button Text | `secondary_button_text` | Text |
| ↳ Secondary Button Link | `secondary_button_link` | URL |
| **Social Links Group** | `social_links` | Group |
| ↳ Facebook | `facebook` | URL |
| ↳ Twitter | `twitter` | URL |
| ↳ LinkedIn | `linkedin` | URL |
| ↳ Instagram | `instagram` | URL |
| ↳ YouTube | `youtube` | URL |
| **Footer Group** | `footer` | Group |
| ↳ Copyright Text | `copyright_text` | Text |
| ↳ Address | `address` | Text Area |
| ↳ Phone | `phone` | Text |
| ↳ Email | `email` | Email |

**GraphQL Settings:**
- Show in GraphQL: ✅ Yes
- GraphQL Field Name: `globalSettings`

---

## 8. Webhook for ISR (On-Demand Revalidation)

### Option A: Using WP Webhooks Plugin

1. Install and activate **WP Webhooks** plugin
2. Go to **Settings → WP Webhooks**
3. Create a new webhook:
   - **Name:** Revalidate Frontend
   - **Webhook URL:** `https://workforceinstitute.io/api/revalidate`
   - **Trigger:** Post Updated, Post Created, Post Deleted
   - **Headers:** 
     ```
     Authorization: Bearer YOUR_REVALIDATION_SECRET
     Content-Type: application/json
     ```
   - **Body (JSON):**
     ```json
     {
       "path": "/",
       "type": "path"
     }
     ```

### Option B: Custom PHP Code

Add to `functions.php`:

```php
<?php
/**
 * Trigger ISR revalidation when content is updated
 */
function wfi_trigger_revalidation($post_id, $post) {
    // Only for published posts
    if ($post->post_status !== 'publish') {
        return;
    }

    // Skip autosaves and revisions
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
        return;
    }

    // Your frontend revalidation URL
    $revalidate_url = 'https://workforceinstitute.io/api/revalidate';
    $secret = 'YOUR_REVALIDATION_SECRET'; // Keep this secret!

    // Determine the path to revalidate based on post type
    $paths = array('/'); // Always revalidate home

    switch ($post->post_type) {
        case 'post':
            $paths[] = '/blog';
            $paths[] = '/blog/' . $post->post_name;
            break;
        case 'program':
            $paths[] = '/programs';
            $paths[] = '/programs/' . $post->post_name;
            break;
        case 'event':
            $paths[] = '/events';
            $paths[] = '/events/' . $post->post_name;
            break;
        case 'page':
            $paths[] = '/' . $post->post_name;
            break;
    }

    // Send revalidation request
    wp_remote_post($revalidate_url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $secret,
            'Content-Type'  => 'application/json',
        ),
        'body' => json_encode(array(
            'paths' => $paths,
            'type'  => 'path',
        )),
        'timeout' => 10,
        'blocking' => false, // Don't wait for response
    ));
}
add_action('save_post', 'wfi_trigger_revalidation', 10, 2);
```

---

## 9. CORS Configuration

Add to `functions.php`:

```php
<?php
/**
 * Configure CORS for headless frontend
 */
function wfi_cors_headers() {
    // Allow your frontend domain
    $allowed_origins = array(
        'https://workforceinstitute.io',
        'https://www.workforceinstitute.io',
        'http://localhost:3000', // For development
    );

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type");
        header("Access-Control-Allow-Credentials: true");
    }

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('init', 'wfi_cors_headers');

/**
 * Add CORS to REST API responses
 */
function wfi_rest_cors() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = array(
            'https://workforceinstitute.io',
            'https://www.workforceinstitute.io',
            'http://localhost:3000',
        );

        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Authorization, Content-Type');
            header('Access-Control-Allow-Credentials: true');
        }

        return $value;
    });
}
add_action('rest_api_init', 'wfi_rest_cors', 15);
```

---

## 10. Testing Your Setup

### Test GraphQL in Browser

1. Go to **GraphQL → GraphQL IDE** in wp-admin
2. Run this query:

```graphql
{
  # Test menu
  menuItems(where: { location: MAIN_MENU }) {
    nodes {
      id
      label
      url
    }
  }
  
  # Test programs
  programs {
    nodes {
      title
      programFields {
        description
        category
      }
    }
  }
  
  # Test global settings
  acfOptionsGlobalSettings {
    globalSettings {
      stats {
        resumesCreated
      }
    }
  }
}
```

### Test from Frontend

1. Create a `.env.local` file in your Next.js project:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://backend.workforceinstitute.io/graphql
REVALIDATION_SECRET=your-secret-here
```

2. Run the dev server:

```bash
npm run dev
```

3. Visit http://localhost:3000/api/test-graphql

---

## Quick Checklist

- [ ] WPGraphQL installed and activated
- [ ] ACF Pro installed and activated
- [ ] WPGraphQL for ACF installed and activated
- [ ] Menu locations registered
- [ ] Main Menu created and assigned
- [ ] Programs CPT registered
- [ ] Testimonials CPT registered
- [ ] Partners CPT registered
- [ ] Events CPT registered
- [ ] ACF field groups created for each CPT
- [ ] Global Settings options page created
- [ ] CORS headers configured
- [ ] ISR webhook configured
- [ ] GraphQL queries tested

---

## Troubleshooting

### "Cannot query field X on type Y"

- Make sure "Show in GraphQL" is checked in ACF field group settings
- Ensure the GraphQL Field Name matches what's in your queries

### Menu items not showing

- Verify menu is assigned to the correct location
- Check that menu location is registered in functions.php

### CORS errors

- Add your frontend domain to the allowed origins list
- Clear any caching plugins

### ISR not working

- Verify the REVALIDATION_SECRET matches in both WordPress and Next.js
- Check that the webhook URL is correct
- Look at WordPress debug.log for errors

---

## Next Steps

Once you've completed this setup:

1. Add some test content (programs, testimonials, partners)
2. Test the GraphQL queries in the IDE
3. Let me know and we'll proceed to **Phase 2**: Migrating the frontend components to use WordPress data!

