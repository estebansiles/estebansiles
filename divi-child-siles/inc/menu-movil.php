<?php
/**
 * Menú para celular y tableta (hasta 980 px).
 *
 * El tema imprime su propia barra al inicio del <body>: logo, lupa y botón de menú de dos líneas.
 * El menú se abre a pantalla completa, con fondo difuminado, texto blanco e íconos de la serie Siles.
 * Los elementos salen del menú "Principal Siles" de WordPress, el mismo del encabezado de escritorio,
 * así que se editan en Apariencia › Menús.
 * En pantallas anchas, y si el navegador no ejecuta JavaScript, se sigue viendo el encabezado de Divi.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Menú de WordPress que usa la barra: el que se llama "Principal Siles".
 * Se puede cambiar con el filtro siles_menu_movil_menu (nombre, slug o id).
 *
 * @return array Elementos del menú, o un arreglo vacío.
 */
function siles_menu_movil_elementos() {
	$menu = wp_get_nav_menu_object( apply_filters( 'siles_menu_movil_menu', 'Principal Siles' ) );
	if ( ! $menu ) {
		return array();
	}
	// Con WPML, el menú del idioma actual (su traducción enlazada); si no existe, el original.
	$menu_id   = (int) apply_filters( 'wpml_object_id', $menu->term_id, 'nav_menu', true );
	$elementos = wp_get_nav_menu_items( $menu_id ? $menu_id : $menu->term_id, array( 'update_post_term_cache' => false ) );
	if ( ! is_array( $elementos ) ) {
		return array();
	}
	// Solo el primer nivel: el menú del sitio no tiene submenús.
	return array_values( array_filter( $elementos, function ( $e ) {
		return 0 === (int) $e->menu_item_parent;
	} ) );
}

/**
 * Ícono de la serie Siles para cada dirección. Lo que no esté en la lista lleva la flecha.
 *
 * @param string $url Dirección del elemento del menú.
 * @return string Nombre del ícono.
 */
function siles_menu_movil_icono( $url ) {
	$ruta    = trailingslashit( (string) wp_parse_url( $url, PHP_URL_PATH ) );
	$ruta    = preg_replace( '#^/(en|pt-br|fr)/#', '/', $ruta );
	$iconos  = apply_filters( 'siles_menu_movil_iconos', array(
		'/'            => 'transformacion-digital',
		'/esteban/'    => 'clientes',
		'/servicios/'  => 'estrategia',
		'/portafolio/' => 'diseno-web',
		'/blog/'       => 'marketing',
		'/contacto/'   => 'correo',
		'/cotizacion/' => 'pagos',
		'/conversemos/' => 'calendario',
		// Rutas de las traducciones (inglés, portugués y francés).
		'/about/' => 'clientes', '/sobre-mim/' => 'clientes', '/a-propos/' => 'clientes',
		'/services/' => 'estrategia', '/servicos/' => 'estrategia',
		'/portfolio/' => 'diseno-web',
		'/contact/' => 'correo', '/contato/' => 'correo',
		'/quote/' => 'pagos', '/orcamento/' => 'pagos', '/devis/' => 'pagos',
		'/lets-talk/' => 'calendario', '/vamos-conversar/' => 'calendario', '/parlons/' => 'calendario',
	) );
	return isset( $iconos[ $ruta ] ) ? $iconos[ $ruta ] : 'flecha';
}

/**
 * ¿El elemento apunta a la página actual?
 *
 * @param string $url Dirección del elemento.
 * @return bool
 */
function siles_menu_movil_es_actual( $url ) {
	$actual = trailingslashit( (string) wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/', PHP_URL_PATH ) );
	$ruta   = trailingslashit( (string) wp_parse_url( $url, PHP_URL_PATH ) );
	$inicio = trailingslashit( (string) wp_parse_url( apply_filters( 'wpml_home_url', home_url( '/' ) ), PHP_URL_PATH ) );
	if ( '/' === $ruta || $inicio === $ruta ) {
		return $actual === $ruta || $actual === $inicio;
	}
	return 0 === strpos( $actual, $ruta );
}

/**
 * Marcado de la barra, el buscador y el panel del menú.
 *
 * @return string
 */
function siles_menu_movil_marcado() {
	ob_start();
	$marca     = get_stylesheet_directory_uri() . '/assets/marca';
	$elementos = siles_menu_movil_elementos();
	?>
	<div class="siles-movil" data-siles-movil>
		<div class="siles-movil__barra">
			<a class="siles-movil__logo" href="<?php echo esc_url( siles_enlace( '/' ) ); ?>" aria-label="<?php echo esc_attr( siles_t( 'Siles Comunicación, inicio' ) ); ?>">
				<img class="siles-movil__logo-color" src="<?php echo esc_url( $marca . '/logo-color.svg' ); ?>" width="87" height="36" alt="">
				<img class="siles-movil__logo-blanco" src="<?php echo esc_url( $marca . '/logo-blanco.svg' ); ?>" width="87" height="36" alt="">
			</a>
			<div class="siles-movil__acciones">
				<button type="button" class="siles-movil__boton siles-movil__lupa" aria-expanded="false" aria-controls="siles-movil-buscar" data-siles-buscar data-texto-abrir="<?php echo esc_attr( siles_t( 'Buscar' ) ); ?>" data-texto-cerrar="<?php echo esc_attr( siles_t( 'Cerrar el buscador' ) ); ?>">
					<?php echo siles_divi_icono( array( 'nombre' => 'busqueda', 'tamano' => 24 ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- SVG fijo del tema. ?>
					<?php echo siles_divi_icono( array( 'nombre' => 'cerrar', 'tamano' => 24 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span class="screen-reader-text" data-siles-buscar-texto><?php echo esc_html( siles_t( 'Buscar' ) ); ?></span>
				</button>
				<button type="button" class="siles-movil__boton siles-movil__hamburguesa" aria-expanded="false" aria-controls="siles-movil-menu" data-siles-menu data-texto-abrir="<?php echo esc_attr( siles_t( 'Abrir el menú' ) ); ?>" data-texto-cerrar="<?php echo esc_attr( siles_t( 'Cerrar el menú' ) ); ?>">
					<span class="siles-movil__linea siles-movil__linea--1" aria-hidden="true"></span>
					<span class="siles-movil__linea siles-movil__linea--2" aria-hidden="true"></span>
					<span class="screen-reader-text" data-siles-menu-texto><?php echo esc_html( siles_t( 'Abrir el menú' ) ); ?></span>
				</button>
			</div>
		</div>

		<form class="siles-movil__buscar" id="siles-movil-buscar" role="search" action="<?php echo esc_url( siles_enlace( '/' ) ); ?>" method="get" hidden>
			<label class="screen-reader-text" for="siles-movil-campo"><?php echo esc_html( siles_t( 'Buscar en el sitio' ) ); ?></label>
			<input class="siles-movil__campo" id="siles-movil-campo" type="search" name="s" placeholder="<?php echo esc_attr( siles_t( 'Buscar en el sitio' ) ); ?>" autocomplete="off" enterkeyhint="search">
			<button type="submit" class="siles-movil__boton siles-movil__enviar">
				<?php echo siles_divi_icono( array( 'nombre' => 'busqueda', 'tamano' => 24 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<span class="screen-reader-text"><?php echo esc_html( siles_t( 'Buscar' ) ); ?></span>
			</button>
		</form>

		<div class="siles-movil__panel" id="siles-movil-menu" style="--n: <?php echo (int) count( $elementos ); ?>" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( siles_t( 'Menú' ) ); ?>" hidden>
			<nav class="siles-movil__nav" aria-label="<?php echo esc_attr( siles_t( 'Menú principal' ) ); ?>">
				<a class="siles-movil__item siles-movil__item--principal" href="<?php echo esc_url( siles_enlace( '/conversemos/' ) ); ?>">
					<span class="siles-movil__texto"><?php echo esc_html( siles_t( 'Agendá una llamada' ) ); ?></span>
					<span class="siles-movil__circulo"><?php echo siles_divi_icono( array( 'nombre' => 'calendario', 'tamano' => 24 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
				</a>
				<ul class="siles-movil__lista" style="--n: <?php echo (int) count( $elementos ); ?>">
					<?php foreach ( $elementos as $i => $e ) : ?>
						<li style="--i: <?php echo (int) $i + 1; ?>">
							<a class="siles-movil__item" href="<?php echo esc_url( $e->url ); ?>"<?php echo siles_menu_movil_es_actual( $e->url ) ? ' aria-current="page"' : ''; ?>>
								<span class="siles-movil__texto"><?php echo esc_html( $e->title ); ?></span>
								<span class="siles-movil__circulo"><?php echo siles_divi_icono( array( 'nombre' => siles_menu_movil_icono( $e->url ), 'tamano' => 22 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</nav>
			<div class="siles-movil__pie">
				<?php // Selector de idioma: aparece cuando WPML tiene más de un idioma activo. ?>
				<div class="siles-movil__idioma" data-ranura="idioma">
					<?php echo siles_selector_idiomas( array( 'estilo' => 'movil' ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escapado en la función. ?>
					<?php do_action( 'siles_menu_movil_idioma' ); ?>
				</div>
			</div>
		</div>
	</div>
	<?php
	return trim( ob_get_clean() );
}
/*
 * Con el encabezado del Theme Builder, lo que el tema imprime en wp_body_open o wp_footer no llega a la página del
 * staging. Por eso el marcado viaja como dato del script del menú, que sí se publica, y el script arma la barra al
 * inicio del <body>. Sin JavaScript no hay barra y queda el encabezado de Divi.
 */
function siles_menu_movil_datos() {
	if ( is_admin() || ! wp_script_is( 'siles-menu-movil', 'enqueued' ) ) {
		return;
	}
	wp_add_inline_script(
		'siles-menu-movil',
		'window.silesMenuMovil = ' . wp_json_encode( array( 'html' => siles_menu_movil_marcado() ) ) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'siles_menu_movil_datos', 30 );
