<?php
/**
 * Siles (hijo de Divi): carga de estilos del sistema de diseño.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SILES_DIVI_VERSION', '0.6.0' );
define( 'SILES_DIVI_CORREO', 'contact@siles.cr' ); // Recibe las cotizaciones.

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

/**
 * Ícono de la serie Siles en línea, para módulos Texto y Código.
 * Hereda el color del texto (currentColor) y conserva el acento verde.
 * Uso: [siles_icono nombre="correo" tamano="24"]
 *
 * @param array $atts Atributos del shortcode.
 * @return string
 */
function siles_divi_icono( $atts ) {
	static $iconos = null;
	if ( null === $iconos ) {
		$iconos = include __DIR__ . '/inc/iconos-data.php';
	}
	$atts   = shortcode_atts( array( 'nombre' => '', 'tamano' => 24, 'titulo' => '' ), $atts, 'siles_icono' );
	$nombre = sanitize_key( $atts['nombre'] );
	if ( ! isset( $iconos[ $nombre ] ) ) {
		return '';
	}
	$tamano = max( 12, min( 96, absint( $atts['tamano'] ) ) );
	$titulo = sanitize_text_field( $atts['titulo'] );
	$a11y   = $titulo ? sprintf( 'role="img" aria-label="%s"', esc_attr( $titulo ) ) : 'aria-hidden="true" focusable="false"';
	return sprintf(
		'<svg class="siles-icono siles-icono--%1$s" viewBox="0 0 24 24" width="%2$d" height="%2$d" %3$s>%4$s</svg>',
		esc_attr( $nombre ),
		$tamano,
		$a11y,
		$iconos[ $nombre ] // Marcado fijo generado desde el sistema de diseño, no viene del usuario.
	);
}
add_shortcode( 'siles_icono', 'siles_divi_icono' );

require_once __DIR__ . '/inc/cotizador.php';
