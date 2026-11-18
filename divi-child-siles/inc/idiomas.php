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
	return siles_idioma_normal( (string) apply_filters( 'wpml_current_language', null ) );
}

/**
 * Código de WPML a código del tema: en-us pasa a en, pt-pt o pt-br a pt-br, fr-ca a fr.
 *
 * @param string $codigo Código de WPML.
 * @return string
 */
function siles_idioma_normal( $codigo ) {
	$codigo = strtolower( $codigo );
	foreach ( array( 'en', 'pt', 'fr', 'es' ) as $base ) {
		if ( $codigo === $base || 0 === strpos( $codigo, $base . '-' ) ) {
			return 'pt' === $base ? 'pt-br' : $base;
		}
	}
	return '' === $codigo ? 'es' : $codigo;
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
	foreach ( $activos as $codigo_wpml => $idioma ) {
		$codigo  = siles_idioma_normal( $codigo_wpml );
		$lista[] = array(
			'codigo'   => $codigo,
			'hreflang' => ! empty( $idioma['tag'] ) ? $idioma['tag'] : $codigo_wpml,
			'nombre'   => isset( $nombres[ $codigo ] ) ? $nombres[ $codigo ][0] : $idioma['native_name'],
			'corto'    => isset( $nombres[ $codigo ] ) ? $nombres[ $codigo ][1] : strtoupper( $codigo ),
			'url'      => $idioma['url'],
			'actual'   => ! empty( $idioma['active'] ),
		);
	}
	// Siempre en el mismo orden: español, inglés, portugués, francés.
	$orden = array_flip( array_keys( $nombres ) );
	usort( $lista, function ( $a, $b ) use ( $orden ) {
		return ( isset( $orden[ $a['codigo'] ] ) ? $orden[ $a['codigo'] ] : 9 ) - ( isset( $orden[ $b['codigo'] ] ) ? $orden[ $b['codigo'] ] : 9 );
	} );
	return $lista;
}

/**
 * Ícono de idioma: un globo con el trazo de la serie Siles (1,5 px, tinta) y un nodo de acento en verde,
 * como los nodos de la red de la marca. Usa currentColor y --icono-acento, igual que [siles_icono].
 *
 * @param int $tamano Tamaño en píxeles.
 * @return string
 */
function siles_icono_idioma( $tamano = 20 ) {
	return sprintf(
		'<svg class="siles-icono siles-icono--idioma" viewBox="0 0 24 24" width="%1$d" height="%1$d" aria-hidden="true" focusable="false">'
		. '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter">'
		. '<path d="M20.16 8.2A9 9 0 1 1 15.8 3.84"/><path d="M3.5 9h17M3.5 15h17"/>'
		. '<path d="M12 3c-2.4 2.5-3.6 5.5-3.6 9s1.2 6.5 3.6 9c2.4-2.5 3.6-5.5 3.6-9S14.4 5.5 12 3z"/></g>'
		. '<rect x="17.75" y="2.75" width="4.5" height="4.5" fill="var(--icono-acento, #008C99)"/></svg>',
		(int) $tamano
	);
}

/**
 * Selector de idioma.
 * - estilo="movil": lista con los nombres completos, para el menú del celular.
 * - Por defecto (encabezado de escritorio): un botón con el globo y el código del idioma actual que despliega la
 *   lista de idiomas. Está hecho con <details>, así funciona sin JavaScript; siles-idiomas.js lo cierra con Escape
 *   o al hacer clic afuera.
 *
 * @param array $atts Atributos del shortcode.
 * @return string
 */
function siles_selector_idiomas( $atts = array() ) {
	$atts  = shortcode_atts( array( 'estilo' => 'desplegable' ), $atts, 'siles_idiomas' );
	$lista = siles_idiomas_activos();
	if ( count( $lista ) < 2 ) {
		return '';
	}
	$etiqueta = siles_t( 'Idioma' );
	$enlaces  = '';
	$actual   = $lista[0];
	foreach ( $lista as $idioma ) {
		if ( $idioma['actual'] ) {
			$actual = $idioma;
		}
		$enlaces .= sprintf(
			'<li><a href="%1$s" hreflang="%2$s" lang="%2$s"%3$s>%4$s</a></li>',
			esc_url( $idioma['url'] ),
			esc_attr( $idioma['hreflang'] ),
			$idioma['actual'] ? ' aria-current="true"' : '',
			esc_html( $idioma['nombre'] )
		);
	}

	if ( 'movil' === $atts['estilo'] ) {
		return sprintf( '<nav class="siles-idiomas siles-idiomas--movil" aria-label="%1$s"><ul>%2$s</ul></nav>', esc_attr( $etiqueta ), $enlaces );
	}

	wp_enqueue_script( 'siles-idiomas' );
	// estilo="pie": el mismo desplegable con los colores del pie oscuro y la lista que abre hacia arriba.
	$variante = 'pie' === $atts['estilo'] ? ' siles-idiomas--pie' : '';
	return sprintf(
		'<nav class="siles-idiomas siles-idiomas--desplegable%6$s" aria-label="%1$s"><details data-siles-idiomas>'
		. '<summary><span class="screen-reader-text">%1$s: %2$s</span>%3$s<span class="siles-idiomas__codigo" aria-hidden="true">%4$s</span>'
		. '<svg class="siles-idiomas__flecha" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></summary>'
		. '<ul class="siles-idiomas__lista">%5$s</ul></details></nav>',
		esc_attr( $etiqueta ),
		esc_html( $actual['nombre'] ),
		siles_icono_idioma( 20 ),
		esc_html( $actual['corto'] ),
		$enlaces,
		$variante
	);
}

/**
 * Script del desplegable (se encola solo cuando se usa el selector).
 */
function siles_idiomas_script() {
	wp_register_script( 'siles-idiomas', get_stylesheet_directory_uri() . '/assets/siles-idiomas.js', array(), SILES_DIVI_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
}
add_action( 'wp_enqueue_scripts', 'siles_idiomas_script', 5 );
add_shortcode( 'siles_idiomas', 'siles_selector_idiomas' );

/**
 * Etiquetas hreflang en el <head>: le dicen a Google qué versión mostrar en cada idioma.
 * WPML las imprime solo si su opción de SEO está activa; si no lo está, las imprime el tema.
 * Solo se listan los idiomas en los que la página existe, más x-default (español).
 */
function siles_hreflang() {
	if ( ! has_filter( 'wpml_active_languages' ) || is_404() || is_search() ) {
		return;
	}
	$seo = apply_filters( 'wpml_setting', array(), 'seo' );
	if ( is_array( $seo ) && ! empty( $seo['head_langs'] ) ) {
		return; // WPML ya las imprime.
	}
	$idiomas = apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 1 ) );
	if ( empty( $idiomas ) || count( $idiomas ) < 2 ) {
		return;
	}
	$defecto = '';
	foreach ( $idiomas as $codigo => $idioma ) {
		$etiqueta = ! empty( $idioma['tag'] ) ? $idioma['tag'] : $codigo;
		printf( '<link rel="alternate" hreflang="%s" href="%s" />' . "\n", esc_attr( strtolower( $etiqueta ) ), esc_url( $idioma['url'] ) );
		if ( 'es' === siles_idioma_normal( $codigo ) ) {
			$defecto = $idioma['url'];
		}
	}
	if ( $defecto ) {
		printf( '<link rel="alternate" hreflang="x-default" href="%s" />' . "\n", esc_url( $defecto ) );
	}
}
add_action( 'wp_head', 'siles_hreflang', 2 );

/**
 * [siles_nota_legal]: nota al inicio de las páginas legales traducidas, con enlace a la versión en español,
 * que es la que prevalece. En español no muestra nada. Se arma al mostrar la página porque WPML cambiaría
 * el enlace guardado en el contenido por el de la página traducida.
 *
 * @return string
 */
function siles_nota_legal() {
	if ( 'es' === siles_idioma() ) {
		return '';
	}
	$id    = get_the_ID();
	$es_id = $id ? (int) apply_filters( 'wpml_object_id', $id, get_post_type( $id ), false, 'es' ) : 0;
	$url   = $es_id ? apply_filters( 'wpml_permalink', get_permalink( $es_id ), 'es' ) : home_url( '/' );
	$enlace = sprintf( '<a href="%s" hreflang="es" lang="es">%s</a>', esc_url( $url ), esc_html( siles_t( 'versión en español' ) ) );
	return '<p class="siles-nota siles-legal__nota">' . sprintf( esc_html( siles_t( 'Esta traducción se ofrece para tu comodidad. Si hay diferencias entre esta versión y la %s, prevalece la versión en español.' ) ), $enlace ) . '</p>';
}
add_shortcode( 'siles_nota_legal', 'siles_nota_legal' );
