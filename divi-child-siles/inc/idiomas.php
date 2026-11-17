<?php
/**
 * Idiomas del sitio con WPML: español (principal), inglés, portugués de Brasil y francés.
 *
 * - siles_idioma(): código del idioma actual ('es', 'en', 'pt-br', 'fr').
 * - siles_t(): traduce un texto fijo del tema con el diccionario de inc/traducciones.php.
 * - siles_enlace(): dirección de una página del sitio en el idioma actual.
 * - [siles_idiomas]: selector de idioma (encabezado de escritorio y menú móvil).
 *
 * Sin WPML todo funciona en español, como antes.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Idioma actual.
 *
 * @return string
 */
function siles_idioma() {
	$idioma = apply_filters( 'wpml_current_language', null );
	return $idioma ? (string) $idioma : 'es';
}

/**
 * Traduce un texto fijo del tema. Si no hay traducción para el idioma actual, devuelve el texto en español.
 *
 * @param string      $texto  Texto en español, tal como aparece en el código.
 * @param string|null $idioma Idioma de destino; por defecto, el actual.
 * @return string
 */
function siles_t( $texto, $idioma = null ) {
	static $diccionario = null;
	$idioma = $idioma ? $idioma : siles_idioma();
	if ( 'es' === $idioma ) {
		return $texto;
	}
	if ( null === $diccionario ) {
		$diccionario = include __DIR__ . '/traducciones.php';
	}
	return isset( $diccionario[ $idioma ][ $texto ] ) ? $diccionario[ $idioma ][ $texto ] : $texto;
}

/**
 * Dirección de una página del sitio en el idioma actual, a partir de su ruta en español.
 * Ejemplos: siles_enlace( '/contacto/' ), siles_enlace( '/' ), siles_enlace( '/portafolio/' ).
 *
 * @param string $ruta Ruta en español, con barras.
 * @return string
 */
function siles_enlace( $ruta ) {
	$ruta = '/' . trim( (string) $ruta, '/' ) . '/';
	if ( '//' === $ruta ) {
		return apply_filters( 'wpml_home_url', home_url( '/' ) );
	}
	if ( '/portafolio/' === $ruta ) {
		$archivo = get_post_type_archive_link( 'project' );
		if ( $archivo ) {
			return apply_filters( 'wpml_permalink', $archivo, siles_idioma() );
		}
	}
	$pagina = get_page_by_path( trim( $ruta, '/' ), OBJECT, 'page' );
	if ( $pagina ) {
		$id = apply_filters( 'wpml_object_id', $pagina->ID, 'page', true );
		return get_permalink( $id );
	}
	return apply_filters( 'wpml_permalink', home_url( $ruta ), siles_idioma() );
}

/**
 * Idiomas activos con la dirección de la página actual en cada uno.
 *
 * @return array Lista de array( codigo, nombre, corto, url, actual ).
 */
function siles_idiomas_activos() {
	$activos = apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 0, 'orderby' => 'custom' ) );
	if ( empty( $activos ) || ! is_array( $activos ) ) {
		return array();
	}
	$nombres = array(
		'es'    => array( 'Español', 'ES' ),
		'en'    => array( 'English', 'EN' ),
		'pt-br' => array( 'Português', 'PT' ),
		'fr'    => array( 'Français', 'FR' ),
	);
	$lista = array();
	foreach ( $activos as $codigo => $idioma ) {
		$lista[] = array(
			'codigo' => $codigo,
			'nombre' => isset( $nombres[ $codigo ] ) ? $nombres[ $codigo ][0] : $idioma['native_name'],
			'corto'  => isset( $nombres[ $codigo ] ) ? $nombres[ $codigo ][1] : strtoupper( $codigo ),
			'url'    => $idioma['url'],
			'actual' => ! empty( $idioma['active'] ),
		);
	}
	return $lista;
}

/**
 * Selector de idioma: una lista de enlaces con el código corto (ES, EN, PT, FR) y el nombre para lectores de pantalla.
 * Con estilo="movil" muestra el nombre completo, para el menú del celular.
 *
 * @param array $atts Atributos del shortcode.
 * @return string
 */
function siles_selector_idiomas( $atts = array() ) {
	$atts  = shortcode_atts( array( 'estilo' => 'compacto' ), $atts, 'siles_idiomas' );
	$lista = siles_idiomas_activos();
	if ( count( $lista ) < 2 ) {
		return '';
	}
	$movil  = 'movil' === $atts['estilo'];
	$partes = array();
	foreach ( $lista as $idioma ) {
		$texto = $movil ? $idioma['nombre'] : $idioma['corto'];
		$partes[] = sprintf(
			'<li><a href="%1$s" hreflang="%2$s" lang="%2$s"%3$s%4$s>%5$s</a></li>',
			esc_url( $idioma['url'] ),
			esc_attr( 'pt-br' === $idioma['codigo'] ? 'pt-BR' : $idioma['codigo'] ),
			$idioma['actual'] ? ' aria-current="true"' : '',
			$movil ? '' : sprintf( ' title="%s"', esc_attr( $idioma['nombre'] ) ),
			$movil ? esc_html( $texto ) : sprintf( '<span aria-hidden="true">%s</span><span class="screen-reader-text">%s</span>', esc_html( $texto ), esc_html( $idioma['nombre'] ) )
		);
	}
	return sprintf(
		'<nav class="siles-idiomas siles-idiomas--%1$s" aria-label="%2$s"><ul>%3$s</ul></nav>',
		$movil ? 'movil' : 'compacto',
		esc_attr( siles_t( 'Idioma' ) ),
		implode( '', $partes )
	);
}
add_shortcode( 'siles_idiomas', 'siles_selector_idiomas' );
