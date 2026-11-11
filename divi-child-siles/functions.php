<?php
/**
 * Siles (hijo de Divi): carga de estilos del sistema de diseño.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SILES_DIVI_VERSION', '0.1.0' );

/**
 * Carga el estilo de Divi y, después, las hojas del sistema de diseño.
 * Prioridad 20 para quedar detrás de los estilos que Divi registra por su cuenta.
 */
function siles_divi_estilos() {
	$base = get_stylesheet_directory_uri() . '/assets';

	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array(), wp_get_theme( 'Divi' )->get( 'Version' ) );
	wp_enqueue_style( 'siles-tokens', $base . '/tokens.css', array(), SILES_DIVI_VERSION );
	wp_enqueue_style( 'siles-divi', $base . '/siles-divi.css', array( 'parent-style', 'siles-tokens' ), SILES_DIVI_VERSION );
	wp_enqueue_style( 'siles-movimiento', $base . '/siles-movimiento.css', array( 'siles-divi' ), SILES_DIVI_VERSION );
}
add_action( 'wp_enqueue_scripts', 'siles_divi_estilos', 20 );

/**
 * Precarga las dos fuentes que se ven primero (título y cuerpo) para evitar el salto de tipografía.
 */
function siles_divi_precarga_fuentes() {
	$fuentes = get_stylesheet_directory_uri() . '/assets/fonts';
	foreach ( array( 'poppins-600.woff2', 'lato-300.woff2' ) as $archivo ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( $fuentes . '/' . $archivo )
		);
	}
}
add_action( 'wp_head', 'siles_divi_precarga_fuentes', 1 );

/**
 * Marca el <body> para que los estilos del tema hijo ganen en especificidad sin usar !important en todo.
 *
 * @param string[] $clases Clases actuales del body.
 * @return string[]
 */
function siles_divi_clase_body( $clases ) {
	$clases[] = 'siles';
	return $clases;
}
add_filter( 'body_class', 'siles_divi_clase_body' );
