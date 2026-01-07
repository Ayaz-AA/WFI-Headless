<?php
/**
 * Plugin Name: WFI Headless CMS
 * Plugin URI: https://workforceinstitute.io
 * Description: Custom Post Types, ACF configurations, and headless CMS functionality for WFI
 * Version: 1.0.0
 * Author: WFI Development Team
 * Text Domain: wfi-headless
 * 
 * =============================================================================
 * INSTALLATION INSTRUCTIONS:
 * =============================================================================
 * 1. Create a folder called 'wfi-headless' in /wp-content/plugins/
 * 2. Save this file as 'wfi-headless.php' inside that folder
 * 3. Activate the plugin from WordPress admin
 * =============================================================================
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

// Your frontend domain(s) - UPDATE THESE!
define('WFI_FRONTEND_DOMAINS', array(
    'https://workforceinstitute.io',
    'https://www.workforceinstitute.io',
    'http://localhost:3000', // Development
));

// Revalidation secret - UPDATE THIS!
// Generate a new one: openssl rand -base64 32
define('WFI_REVALIDATION_SECRET', 'CHANGE_THIS_TO_YOUR_SECRET');

// Frontend revalidation URL
define('WFI_REVALIDATION_URL', 'https://workforceinstitute.io/api/revalidate');

// =============================================================================
// REGISTER MENU LOCATIONS
// =============================================================================

function wfi_register_menus() {
    register_nav_menus(array(
        'main-menu'   => __('Main Menu', 'wfi-headless'),
        'footer-menu' => __('Footer Menu', 'wfi-headless'),
    ));
}
add_action('after_setup_theme', 'wfi_register_menus');

/**
 * Expose menu locations to WPGraphQL
 */
function wfi_register_menu_locations_graphql() {
    if (!function_exists('register_graphql_enum_type')) {
        return;
    }
    
    register_graphql_enum_type('MenuLocationEnum', [
        'description' => __('Registered menu locations', 'wfi-headless'),
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

// =============================================================================
// CUSTOM POST TYPES
// =============================================================================

/**
 * Register Programs CPT
 */
function wfi_register_programs_cpt() {
    $labels = array(
        'name'               => __('Programs', 'wfi-headless'),
        'singular_name'      => __('Program', 'wfi-headless'),
        'menu_name'          => __('Programs', 'wfi-headless'),
        'add_new'            => __('Add New', 'wfi-headless'),
        'add_new_item'       => __('Add New Program', 'wfi-headless'),
        'edit_item'          => __('Edit Program', 'wfi-headless'),
        'new_item'           => __('New Program', 'wfi-headless'),
        'view_item'          => __('View Program', 'wfi-headless'),
        'search_items'       => __('Search Programs', 'wfi-headless'),
        'not_found'          => __('No programs found', 'wfi-headless'),
        'not_found_in_trash' => __('No programs found in trash', 'wfi-headless'),
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
        'show_in_rest'        => true, // For Gutenberg
        'show_in_graphql'     => true,
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
        'name'               => __('Testimonials', 'wfi-headless'),
        'singular_name'      => __('Testimonial', 'wfi-headless'),
        'menu_name'          => __('Testimonials', 'wfi-headless'),
        'add_new'            => __('Add New', 'wfi-headless'),
        'add_new_item'       => __('Add New Testimonial', 'wfi-headless'),
        'edit_item'          => __('Edit Testimonial', 'wfi-headless'),
        'new_item'           => __('New Testimonial', 'wfi-headless'),
        'view_item'          => __('View Testimonial', 'wfi-headless'),
        'search_items'       => __('Search Testimonials', 'wfi-headless'),
        'not_found'          => __('No testimonials found', 'wfi-headless'),
        'not_found_in_trash' => __('No testimonials found in trash', 'wfi-headless'),
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
        'show_in_rest'        => true,
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
        'name'               => __('Partners', 'wfi-headless'),
        'singular_name'      => __('Partner', 'wfi-headless'),
        'menu_name'          => __('Partners', 'wfi-headless'),
        'add_new'            => __('Add New', 'wfi-headless'),
        'add_new_item'       => __('Add New Partner', 'wfi-headless'),
        'edit_item'          => __('Edit Partner', 'wfi-headless'),
        'new_item'           => __('New Partner', 'wfi-headless'),
        'view_item'          => __('View Partner', 'wfi-headless'),
        'search_items'       => __('Search Partners', 'wfi-headless'),
        'not_found'          => __('No partners found', 'wfi-headless'),
        'not_found_in_trash' => __('No partners found in trash', 'wfi-headless'),
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
        'show_in_rest'        => true,
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
        'name'               => __('Events', 'wfi-headless'),
        'singular_name'      => __('Event', 'wfi-headless'),
        'menu_name'          => __('Events/Webinars', 'wfi-headless'),
        'add_new'            => __('Add New', 'wfi-headless'),
        'add_new_item'       => __('Add New Event', 'wfi-headless'),
        'edit_item'          => __('Edit Event', 'wfi-headless'),
        'new_item'           => __('New Event', 'wfi-headless'),
        'view_item'          => __('View Event', 'wfi-headless'),
        'search_items'       => __('Search Events', 'wfi-headless'),
        'not_found'          => __('No events found', 'wfi-headless'),
        'not_found_in_trash' => __('No events found in trash', 'wfi-headless'),
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
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'event',
        'graphql_plural_name' => 'events',
    );

    register_post_type('event', $args);
}
add_action('init', 'wfi_register_events_cpt');

// =============================================================================
// ACF OPTIONS PAGE
// =============================================================================

/**
 * Register ACF Options Page for Global Settings
 */
function wfi_register_options_pages() {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    // Main Options Page
    acf_add_options_page(array(
        'page_title'      => __('Homepage Sections', 'wfi-headless'),
        'menu_title'      => __('Homepage Sections', 'wfi-headless'),
        'menu_slug'       => 'homepage-sections',
        'capability'      => 'edit_posts',
        'redirect'        => false,
        'icon_url'        => 'dashicons-admin-home',
        'position'        => 2,
        'show_in_graphql' => true,
    ));

    // Hero Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Hero Section', 'wfi-headless'),
        'menu_title'      => __('1. Hero', 'wfi-headless'),
        'menu_slug'       => 'hero-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Partners Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Partners Section', 'wfi-headless'),
        'menu_title'      => __('2. Partners', 'wfi-headless'),
        'menu_slug'       => 'partners-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Featured/Training Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Training Solutions Section', 'wfi-headless'),
        'menu_title'      => __('3. Training Solutions', 'wfi-headless'),
        'menu_slug'       => 'training-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Programs Section Header
    acf_add_options_sub_page(array(
        'page_title'      => __('Programs Section', 'wfi-headless'),
        'menu_title'      => __('4. Programs', 'wfi-headless'),
        'menu_slug'       => 'programs-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Testimonials Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Testimonials Section', 'wfi-headless'),
        'menu_title'      => __('5. Testimonials', 'wfi-headless'),
        'menu_slug'       => 'testimonials-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Integrations Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Integrations Section', 'wfi-headless'),
        'menu_title'      => __('6. Integrations', 'wfi-headless'),
        'menu_slug'       => 'integrations-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // AI Platform Section
    acf_add_options_sub_page(array(
        'page_title'      => __('AI Platform Section', 'wfi-headless'),
        'menu_title'      => __('7. AI Platform', 'wfi-headless'),
        'menu_slug'       => 'ai-platform-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Stats Section
    acf_add_options_sub_page(array(
        'page_title'      => __('Stats Section', 'wfi-headless'),
        'menu_title'      => __('8. Stats', 'wfi-headless'),
        'menu_slug'       => 'stats-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // CTA Section
    acf_add_options_sub_page(array(
        'page_title'      => __('CTA Section', 'wfi-headless'),
        'menu_title'      => __('9. CTA', 'wfi-headless'),
        'menu_slug'       => 'cta-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Blog Section Header
    acf_add_options_sub_page(array(
        'page_title'      => __('Blog Section', 'wfi-headless'),
        'menu_title'      => __('10. Blog', 'wfi-headless'),
        'menu_slug'       => 'blog-section',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));

    // Footer Settings
    acf_add_options_sub_page(array(
        'page_title'      => __('Footer Settings', 'wfi-headless'),
        'menu_title'      => __('Footer', 'wfi-headless'),
        'menu_slug'       => 'footer-settings',
        'parent_slug'     => 'homepage-sections',
        'show_in_graphql' => true,
    ));
}
add_action('acf/init', 'wfi_register_options_pages');

// =============================================================================
// CORS CONFIGURATION
// =============================================================================

/**
 * Configure CORS for headless frontend
 */
function wfi_cors_headers() {
    $allowed_origins = WFI_FRONTEND_DOMAINS;
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
add_action('init', 'wfi_cors_headers', 1);

/**
 * Add CORS to REST API responses
 */
function wfi_rest_cors() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = WFI_FRONTEND_DOMAINS;

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

// =============================================================================
// ISR REVALIDATION
// =============================================================================

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

    // Get configuration
    $revalidate_url = WFI_REVALIDATION_URL;
    $secret = WFI_REVALIDATION_SECRET;

    // Don't run if not configured
    if ($secret === 'CHANGE_THIS_TO_YOUR_SECRET') {
        return;
    }

    // Determine the paths to revalidate based on post type
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
        case 'testimonial':
            // Testimonials appear on homepage
            break;
        case 'partner':
            // Partners appear on homepage
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
        'timeout'  => 10,
        'blocking' => false, // Don't wait for response
    ));
}
add_action('save_post', 'wfi_trigger_revalidation', 10, 2);

/**
 * Trigger revalidation when ACF options are saved
 */
function wfi_trigger_options_revalidation($post_id) {
    if ($post_id !== 'options') {
        return;
    }

    $revalidate_url = WFI_REVALIDATION_URL;
    $secret = WFI_REVALIDATION_SECRET;

    if ($secret === 'CHANGE_THIS_TO_YOUR_SECRET') {
        return;
    }

    // Revalidate homepage when global settings change
    wp_remote_post($revalidate_url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $secret,
            'Content-Type'  => 'application/json',
        ),
        'body' => json_encode(array(
            'paths' => array('/'),
            'type'  => 'path',
        )),
        'timeout'  => 10,
        'blocking' => false,
    ));
}
add_action('acf/save_post', 'wfi_trigger_options_revalidation', 20);

// =============================================================================
// ADMIN NOTICES
// =============================================================================

/**
 * Show admin notice if WPGraphQL is not installed
 */
function wfi_check_dependencies() {
    $missing = array();

    if (!class_exists('WPGraphQL')) {
        $missing[] = 'WPGraphQL';
    }

    if (!class_exists('ACF')) {
        $missing[] = 'Advanced Custom Fields';
    }

    if (!empty($missing)) {
        add_action('admin_notices', function() use ($missing) {
            $plugins = implode(', ', $missing);
            echo '<div class="notice notice-error"><p>';
            echo sprintf(
                __('<strong>WFI Headless:</strong> The following required plugins are missing: %s. Please install and activate them.', 'wfi-headless'),
                $plugins
            );
            echo '</p></div>';
        });
    }

    // Check if revalidation secret is set
    if (WFI_REVALIDATION_SECRET === 'CHANGE_THIS_TO_YOUR_SECRET') {
        add_action('admin_notices', function() {
            echo '<div class="notice notice-warning"><p>';
            echo __('<strong>WFI Headless:</strong> Please update the REVALIDATION_SECRET in the plugin file for ISR to work.', 'wfi-headless');
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'wfi_check_dependencies');

// =============================================================================
// HELPFUL ADMIN DASHBOARD WIDGET
// =============================================================================

/**
 * Add a helpful dashboard widget
 */
function wfi_dashboard_widget() {
    wp_add_dashboard_widget(
        'wfi_headless_status',
        __('WFI Headless CMS Status', 'wfi-headless'),
        'wfi_dashboard_widget_content'
    );
}
add_action('wp_dashboard_setup', 'wfi_dashboard_widget');

function wfi_dashboard_widget_content() {
    $graphql_active = class_exists('WPGraphQL') ? '✅' : '❌';
    $acf_active = class_exists('ACF') ? '✅' : '❌';
    $graphql_acf_active = class_exists('WPGraphQL\ACF\ACF') ? '✅' : '❌';
    
    echo '<table style="width:100%">';
    echo '<tr><td>WPGraphQL</td><td>' . $graphql_active . '</td></tr>';
    echo '<tr><td>ACF Pro</td><td>' . $acf_active . '</td></tr>';
    echo '<tr><td>WPGraphQL for ACF</td><td>' . $graphql_acf_active . '</td></tr>';
    echo '</table>';
    
    echo '<hr>';
    echo '<p><strong>GraphQL Endpoint:</strong><br>';
    echo '<code>' . home_url('/graphql') . '</code></p>';
    
    echo '<p><strong>Quick Links:</strong></p>';
    echo '<ul>';
    echo '<li><a href="' . admin_url('admin.php?page=graphiql-ide') . '">GraphQL IDE</a></li>';
    echo '<li><a href="' . admin_url('admin.php?page=global-settings') . '">Global Settings</a></li>';
    echo '<li><a href="' . admin_url('edit.php?post_type=program') . '">Manage Programs</a></li>';
    echo '<li><a href="' . admin_url('edit.php?post_type=testimonial') . '">Manage Testimonials</a></li>';
    echo '</ul>';
}

// =============================================================================
// FLUSH REWRITE RULES ON ACTIVATION
// =============================================================================

function wfi_activate() {
    // Register CPTs first
    wfi_register_programs_cpt();
    wfi_register_testimonials_cpt();
    wfi_register_partners_cpt();
    wfi_register_events_cpt();
    
    // Flush rewrite rules
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'wfi_activate');

function wfi_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'wfi_deactivate');

