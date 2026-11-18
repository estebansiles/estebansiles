<?php
/**
 * API para cargar traducciones hechas a mano y enlazarlas con su original en WPML.
 *
 * Rutas (todas exigen una sesión o contraseña de aplicación con permisos de edición):
 *   GET  /wp-json/siles/v1/contenido/<id>   Contenido en bruto, idioma y traducciones de una página, proyecto o diseño.
 *   POST /wp-json/siles/v1/contenido/<id>   Actualiza el contenido o el título del original.
 *   GET  /wp-json/siles/v1/disenos          Diseños y plantillas del Theme Builder.
 *   POST /wp-json/siles/v1/traduccion       Crea o actualiza la traducción de una página, proyecto o diseño.
 *   GET  /wp-json/siles/v1/terminos         Términos de una taxonomía con su idioma y traducciones.
 *   POST /wp-json/siles/v1/termino          Crea o actualiza la traducción de un término (categoría de proyecto).
 *   POST /wp-json/siles/v1/menu             Crea o reemplaza la traducción de un menú con sus elementos.
 *
 * Sin WPML las rutas de traducción responden con un error y no tocan nada.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Tipos de contenido que se pueden traducir por esta API.
 */
const SILES_API_TIPOS   = array( 'page', 'project', 'et_header_layout', 'et_body_layout', 'et_footer_layout' );
const SILES_API_IDIOMAS = array( 'en', 'en-us', 'pt-br', 'fr' );

/**
 * Código de WPML para un idioma del tema: 'en' es 'en-us' si así está configurado en WPML.
 *
 * @param string $idioma Código pedido.
 * @return string
 */
function siles_api_codigo( $idioma ) {
	$activos = (array) apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 0 ) );
	if ( isset( $activos[ $idioma ] ) ) {
		return $idioma;
	}
	foreach ( array_keys( $activos ) as $codigo ) {
		if ( function_exists( 'siles_idioma_normal' ) && siles_idioma_normal( $codigo ) === $idioma ) {
			return $codigo;
		}
	}
	return $idioma;
}

/**
 * ¿Es un diseño del Theme Builder?
 *
 * @param string $tipo Tipo de contenido.
 * @return bool
 */
function siles_api_es_diseno( $tipo ) {
	return in_array( $tipo, array( 'et_header_layout', 'et_body_layout', 'et_footer_layout', 'et_template' ), true );
}

/**
 * ¿Está WPML activo?
 *
 * @return bool
 */
function siles_api_wpml() {
	return defined( 'ICL_SITEPRESS_VERSION' ) && has_filter( 'wpml_element_trid' );
}

/**
 * Permiso para leer o escribir un contenido.
 *
 * @param int $id Id del contenido.
 * @return bool
 */
function siles_api_puede( $id ) {
	$post = get_post( $id );
	if ( ! $post || ! in_array( $post->post_type, array_merge( SILES_API_TIPOS, array( 'et_template' ) ), true ) ) {
		return false;
	}
	if ( siles_api_es_diseno( $post->post_type ) ) {
		return current_user_can( 'edit_theme_options' );
	}
	return current_user_can( 'edit_post', $id );
}

/**
 * Idioma y traducciones de un contenido.
 *
 * @param WP_Post $post Contenido.
 * @return array{idioma:?string, traducciones:array<string,int>}
 */
function siles_api_idiomas_de( $post ) {
	$tipo   = 'post_' . $post->post_type;
	$datos  = apply_filters( 'wpml_element_language_details', null, array( 'element_id' => $post->ID, 'element_type' => $tipo ) );
	$idioma = $datos && ! empty( $datos->language_code ) ? $datos->language_code : null;
	$trads  = array();
	$trid   = apply_filters( 'wpml_element_trid', null, $post->ID, $tipo );
	if ( $trid ) {
		$lista = apply_filters( 'wpml_get_element_translations', null, $trid, $tipo );
		foreach ( (array) $lista as $codigo => $t ) {
			$trads[ $codigo ] = (int) $t->element_id;
		}
	}
	return array( 'idioma' => $idioma, 'traducciones' => $trads );
}

/**
 * Datos de un contenido para la API.
 *
 * @param WP_Post $post Contenido.
 * @return array
 */
function siles_api_ficha( $post ) {
	$terminos = array();
	foreach ( get_object_taxonomies( $post->post_type ) as $tax ) {
		$ids = wp_get_object_terms( $post->ID, $tax, array( 'fields' => 'ids' ) );
		if ( ! is_wp_error( $ids ) && $ids ) {
			$terminos[ $tax ] = array_map( 'intval', $ids );
		}
	}
	return array_merge(
		array(
			'id'          => $post->ID,
			'tipo'        => $post->post_type,
			'estado'      => $post->post_status,
			'titulo'      => $post->post_title,
			'slug'        => $post->post_name,
			'extracto'    => $post->post_excerpt,
			'contenido'   => $post->post_content,
			'enlace'      => get_permalink( $post ),
			'terminos'    => $terminos,
			'yoast'       => array(
				'titulo'      => (string) get_post_meta( $post->ID, '_yoast_wpseo_title', true ),
				'descripcion' => (string) get_post_meta( $post->ID, '_yoast_wpseo_metadesc', true ),
			),
		),
		siles_api_idiomas_de( $post )
	);
}

/**
 * Asegura que el original tenga idioma en WPML (los diseños creados antes de WPML no lo tienen) y devuelve su trid.
 *
 * @param WP_Post $post Original.
 * @return int|null
 */
function siles_api_trid( $post ) {
	$tipo = 'post_' . $post->post_type;
	$trid = apply_filters( 'wpml_element_trid', null, $post->ID, $tipo );
	if ( ! $trid ) {
		do_action( 'wpml_set_element_language_details', array( 'element_id' => $post->ID, 'element_type' => $tipo, 'trid' => false, 'language_code' => 'es' ) );
		$trid = apply_filters( 'wpml_element_trid', null, $post->ID, $tipo );
	}
	return $trid ? (int) $trid : null;
}

/**
 * Vacía la caché de estilos de Divi del contenido (o toda, si es un diseño del Theme Builder).
 *
 * @param WP_Post $post Contenido.
 */
function siles_api_vaciar_cache( $post ) {
	if ( class_exists( 'ET_Core_PageResource' ) && method_exists( 'ET_Core_PageResource', 'remove_static_resources' ) ) {
		if ( siles_api_es_diseno( $post->post_type ) ) {
			ET_Core_PageResource::remove_static_resources( 'all', 'all' );
		} else {
			ET_Core_PageResource::remove_static_resources( $post->ID, 'all' );
		}
	}
}

/**
 * Pone el slug pedido aunque se repita en otro idioma (WPML resuelve la dirección por idioma).
 *
 * @param int    $id   Contenido.
 * @param string $slug Slug deseado.
 */
function siles_api_slug( $id, $slug ) {
	global $wpdb;
	$slug = sanitize_title( $slug );
	if ( '' === $slug || get_post_field( 'post_name', $id ) === $slug ) {
		return;
	}
	wp_update_post( array( 'ID' => $id, 'post_name' => $slug ) );
	if ( get_post_field( 'post_name', $id ) !== $slug ) {
		$wpdb->update( $wpdb->posts, array( 'post_name' => $slug ), array( 'ID' => $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		clean_post_cache( $id );
	}
}

/**
 * Metadatos que no se copian del original a la traducción.
 *
 * @param string $clave Clave del metadato.
 * @return bool
 */
function siles_api_meta_propia( $clave ) {
	return (bool) preg_match( '/^(_edit_|_wp_old_|_icl_|_wpml_|_last_translation_edit_mode|_yoast_wpseo_(title|metadesc|focuskw|opengraph-|twitter-|canonical|linkdex|content_score))/', $clave );
}

/**
 * Crea o actualiza una traducción.
 *
 * @param WP_REST_Request $req Pedido.
 * @return array|WP_Error
 */
function siles_api_traduccion( WP_REST_Request $req ) {
	if ( ! siles_api_wpml() ) {
		return new WP_Error( 'siles_sin_wpml', 'WPML no está activo.', array( 'status' => 409 ) );
	}
	$original = get_post( (int) $req['original'] );
	$idioma   = siles_api_codigo( (string) $req['idioma'] );
	$tipo     = $original->post_type;
	$trid     = siles_api_trid( $original );
	if ( ! $trid ) {
		return new WP_Error( 'siles_sin_trid', 'WPML no le asignó idioma al original.', array( 'status' => 500 ) );
	}

	$existente = (int) apply_filters( 'wpml_object_id', $original->ID, $tipo, false, $idioma );
	$existente = ( $existente && $existente !== $original->ID ) ? $existente : 0;

	$datos = array(
		'post_type'    => $tipo,
		'post_title'   => wp_slash( (string) $req['titulo'] ),
		'post_content' => wp_slash( (string) $req['contenido'] ),
		'post_status'  => $req['estado'] ? (string) $req['estado'] : $original->post_status,
		'post_author'  => $original->post_author,
		'menu_order'   => $original->menu_order,
		'post_excerpt' => wp_slash( null !== $req['extracto'] ? (string) $req['extracto'] : '' ),
	);
	if ( $original->post_parent ) {
		$padre = (int) apply_filters( 'wpml_object_id', $original->post_parent, $tipo, true, $idioma );
		$datos['post_parent'] = $padre ? $padre : $original->post_parent;
	}

	// WPML reconstruye las traducciones de páginas de Divi desde el original y sus cadenas traducidas, salvo que la
	// traducción se haya editado con el editor de WordPress. Estas traducciones son a mano: se marcan así antes y
	// después de guardar, para que WPML no las sobrescriba con el texto en español.
	$datos['meta_input'] = siles_api_meta_manual();
	if ( $existente ) {
		foreach ( siles_api_meta_manual() as $clave => $valor ) {
			update_post_meta( $existente, $clave, $valor );
		}
		$datos['ID'] = $existente;
		$id          = wp_update_post( $datos, true );
	} else {
		$id = wp_insert_post( $datos, true );
	}
	if ( is_wp_error( $id ) ) {
		return $id;
	}

	do_action(
		'wpml_set_element_language_details',
		array( 'element_id' => $id, 'element_type' => 'post_' . $tipo, 'trid' => $trid, 'language_code' => $idioma, 'source_language_code' => 'es' )
	);

	// Metadatos del original (Divi, plantilla, imagen destacada…) en la primera carga; después solo los de Divi.
	foreach ( get_post_meta( $original->ID ) as $clave => $valores ) {
		if ( siles_api_meta_propia( $clave ) ) {
			continue;
		}
		if ( $existente && 0 !== strpos( $clave, '_et_' ) && '_wp_page_template' !== $clave ) {
			continue;
		}
		delete_post_meta( $id, $clave );
		foreach ( $valores as $valor ) {
			add_post_meta( $id, $clave, maybe_unserialize( $valor ) );
		}
	}

	if ( $req['slug'] ) {
		siles_api_slug( $id, (string) $req['slug'] );
	}
	foreach ( (array) $req['terminos'] as $tax => $ids ) {
		if ( taxonomy_exists( $tax ) ) {
			wp_set_object_terms( $id, array_map( 'intval', (array) $ids ), $tax );
		}
	}
	if ( null !== $req['yoast_titulo'] ) {
		update_post_meta( $id, '_yoast_wpseo_title', sanitize_text_field( (string) $req['yoast_titulo'] ) );
	}
	if ( null !== $req['yoast_descripcion'] ) {
		update_post_meta( $id, '_yoast_wpseo_metadesc', sanitize_text_field( (string) $req['yoast_descripcion'] ) );
	}

	// Si WPML cambió el contenido al enlazar la traducción, se vuelve a poner el traducido.
	foreach ( siles_api_meta_manual() as $clave => $valor ) {
		update_post_meta( $id, $clave, $valor );
	}
	if ( get_post_field( 'post_content', $id ) !== (string) $req['contenido'] ) {
		global $wpdb;
		$wpdb->update( $wpdb->posts, array( 'post_content' => (string) $req['contenido'] ), array( 'ID' => $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		clean_post_cache( $id );
	}

	$post = get_post( $id );
	siles_api_vaciar_cache( $post );
	return siles_api_ficha( $post );
}

/**
 * Marcas de WPML para una traducción hecha a mano en el editor de WordPress.
 *
 * @return array<string,string>
 */
function siles_api_meta_manual() {
	return array(
		'_last_translation_edit_mode'          => 'native-editor',
		'_wpml_post_translation_editor_native' => 'yes',
	);
}

/**
 * Crea o actualiza la traducción de un término.
 *
 * @param WP_REST_Request $req Pedido.
 * @return array|WP_Error
 */
function siles_api_termino( WP_REST_Request $req ) {
	if ( ! siles_api_wpml() ) {
		return new WP_Error( 'siles_sin_wpml', 'WPML no está activo.', array( 'status' => 409 ) );
	}
	$tax      = (string) $req['taxonomia'];
	$original = get_term( (int) $req['original'], $tax );
	if ( ! $original || is_wp_error( $original ) ) {
		return new WP_Error( 'siles_sin_termino', 'No existe el término original.', array( 'status' => 404 ) );
	}
	$idioma = siles_api_codigo( (string) $req['idioma'] );
	$tipo   = 'tax_' . $tax;
	$trid   = apply_filters( 'wpml_element_trid', null, $original->term_taxonomy_id, $tipo );
	if ( ! $trid ) {
		do_action( 'wpml_set_element_language_details', array( 'element_id' => $original->term_taxonomy_id, 'element_type' => $tipo, 'trid' => false, 'language_code' => 'es' ) );
		$trid = apply_filters( 'wpml_element_trid', null, $original->term_taxonomy_id, $tipo );
	}
	$existente = (int) apply_filters( 'wpml_object_id', $original->term_id, $tax, false, $idioma );
	$existente = ( $existente && $existente !== $original->term_id ) ? $existente : 0;
	$args      = array( 'slug' => sanitize_title( (string) $req['slug'] ), 'description' => (string) $req['descripcion'] );

	if ( $existente ) {
		$res = wp_update_term( $existente, $tax, array_merge( $args, array( 'name' => (string) $req['nombre'] ) ) );
	} else {
		$res = wp_insert_term( (string) $req['nombre'], $tax, $args );
	}
	if ( is_wp_error( $res ) ) {
		return $res;
	}
	$termino = get_term( (int) $res['term_id'], $tax );
	do_action(
		'wpml_set_element_language_details',
		array( 'element_id' => $termino->term_taxonomy_id, 'element_type' => $tipo, 'trid' => $trid, 'language_code' => $idioma, 'source_language_code' => 'es' )
	);
	return array( 'id' => $termino->term_id, 'nombre' => $termino->name, 'slug' => $termino->slug, 'idioma' => $idioma );
}

/**
 * Crea o reemplaza la traducción de un menú. Los elementos son enlaces (título y dirección).
 *
 * @param WP_REST_Request $req Pedido.
 * @return array|WP_Error
 */
function siles_api_menu( WP_REST_Request $req ) {
	if ( ! siles_api_wpml() ) {
		return new WP_Error( 'siles_sin_wpml', 'WPML no está activo.', array( 'status' => 409 ) );
	}
	$original = wp_get_nav_menu_object( (int) $req['original'] );
	if ( ! $original ) {
		return new WP_Error( 'siles_sin_menu', 'No existe el menú original.', array( 'status' => 404 ) );
	}
	$idioma = siles_api_codigo( (string) $req['idioma'] );
	$tipo   = 'tax_nav_menu';
	$trid   = apply_filters( 'wpml_element_trid', null, $original->term_taxonomy_id, $tipo );
	if ( ! $trid ) {
		do_action( 'wpml_set_element_language_details', array( 'element_id' => $original->term_taxonomy_id, 'element_type' => $tipo, 'trid' => false, 'language_code' => 'es' ) );
		$trid = apply_filters( 'wpml_element_trid', null, $original->term_taxonomy_id, $tipo );
	}
	$menu_id = (int) apply_filters( 'wpml_object_id', $original->term_id, 'nav_menu', false, $idioma );
	if ( ! $menu_id || $menu_id === $original->term_id ) {
		$menu_id = wp_create_nav_menu( (string) $req['nombre'] );
		if ( is_wp_error( $menu_id ) ) {
			return $menu_id;
		}
	}
	$menu = wp_get_nav_menu_object( $menu_id );
	do_action(
		'wpml_set_element_language_details',
		array( 'element_id' => $menu->term_taxonomy_id, 'element_type' => $tipo, 'trid' => $trid, 'language_code' => $idioma, 'source_language_code' => 'es' )
	);

	foreach ( (array) wp_get_nav_menu_items( $menu_id, array( 'post_status' => 'any' ) ) as $viejo ) {
		wp_delete_post( $viejo->ID, true );
	}
	$creados = array();
	foreach ( array_values( (array) $req['elementos'] ) as $orden => $e ) {
		if ( empty( $e['titulo'] ) || empty( $e['url'] ) ) {
			continue;
		}
		$item = wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'    => sanitize_text_field( $e['titulo'] ),
				'menu-item-url'      => esc_url_raw( $e['url'] ),
				'menu-item-type'     => 'custom',
				'menu-item-status'   => 'publish',
				'menu-item-position' => $orden + 1,
			)
		);
		if ( ! is_wp_error( $item ) ) {
			do_action( 'wpml_set_element_language_details', array( 'element_id' => $item, 'element_type' => 'post_nav_menu_item', 'trid' => false, 'language_code' => $idioma ) );
			$creados[] = $item;
		}
	}
	return array( 'id' => $menu_id, 'idioma' => $idioma, 'elementos' => $creados );
}

/**
 * Registro de las rutas.
 */
function siles_api_rutas() {
	$idioma = array(
		'required'          => true,
		'type'              => 'string',
		'enum'              => SILES_API_IDIOMAS,
	);

	register_rest_route(
		'siles/v1',
		'/contenido/(?P<id>\d+)',
		array(
			array(
				'methods'             => 'GET',
				'permission_callback' => function ( $req ) {
					return siles_api_puede( (int) $req['id'] );
				},
				'callback'            => function ( $req ) {
					return siles_api_ficha( get_post( (int) $req['id'] ) );
				},
			),
			array(
				'methods'             => 'POST',
				'permission_callback' => function ( $req ) {
					return siles_api_puede( (int) $req['id'] );
				},
				'args'                => array(
					'contenido' => array( 'type' => 'string' ),
					'titulo'    => array( 'type' => 'string' ),
				),
				'callback'            => function ( $req ) {
					$datos = array( 'ID' => (int) $req['id'] );
					if ( null !== $req['contenido'] ) {
						$datos['post_content'] = wp_slash( (string) $req['contenido'] );
					}
					if ( null !== $req['titulo'] ) {
						$datos['post_title'] = wp_slash( (string) $req['titulo'] );
					}
					$res = wp_update_post( $datos, true );
					if ( is_wp_error( $res ) ) {
						return $res;
					}
					$post = get_post( $res );
					siles_api_vaciar_cache( $post );
					return siles_api_ficha( $post );
				},
			),
			array(
				// Borra una traducción. Nunca borra un original en español.
				'methods'             => 'DELETE',
				'permission_callback' => function ( $req ) {
					return siles_api_puede( (int) $req['id'] ) && current_user_can( 'delete_post', (int) $req['id'] );
				},
				'callback'            => function ( $req ) {
					$post   = get_post( (int) $req['id'] );
					$idioma = siles_api_idiomas_de( $post )['idioma'];
					if ( ! $idioma || 'es' === $idioma ) {
						return new WP_Error( 'siles_original', 'Solo se pueden borrar traducciones, no originales en español.', array( 'status' => 403 ) );
					}
					wp_delete_post( $post->ID, true );
					return array( 'borrado' => $post->ID, 'idioma' => $idioma );
				},
			),
		)
	);

	register_rest_route(
		'siles/v1',
		'/disenos',
		array(
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'edit_theme_options' );
			},
			'callback'            => function () {
				$lista = array();
				foreach ( get_posts( array( 'post_type' => array( 'et_template', 'et_header_layout', 'et_body_layout', 'et_footer_layout' ), 'post_status' => 'any', 'numberposts' => -1, 'suppress_filters' => true ) ) as $p ) {
					$fila = array(
						'id'     => $p->ID,
						'tipo'   => $p->post_type,
						'titulo' => $p->post_title,
						'estado' => $p->post_status,
					);
					if ( 'et_template' === $p->post_type ) {
						$fila['encabezado'] = (int) get_post_meta( $p->ID, '_et_header_layout_id', true );
						$fila['cuerpo']     = (int) get_post_meta( $p->ID, '_et_body_layout_id', true );
						$fila['pie']        = (int) get_post_meta( $p->ID, '_et_footer_layout_id', true );
						$fila['usar_en']    = get_post_meta( $p->ID, '_et_use_on' );
						$fila['activa']     = get_post_meta( $p->ID, '_et_enabled', true );
					}
					$lista[] = array_merge( $fila, siles_api_idiomas_de( $p ) );
				}
				return $lista;
			},
		)
	);

	register_rest_route(
		'siles/v1',
		'/traduccion',
		array(
			'methods'             => 'POST',
			'permission_callback' => function ( $req ) {
				return siles_api_puede( (int) $req['original'] );
			},
			'args'                => array(
				'original'          => array( 'required' => true, 'type' => 'integer' ),
				'idioma'            => $idioma,
				'titulo'            => array( 'required' => true, 'type' => 'string' ),
				'contenido'         => array( 'required' => true, 'type' => 'string' ),
				'slug'              => array( 'type' => 'string' ),
				'extracto'          => array( 'type' => 'string' ),
				'estado'            => array( 'type' => 'string', 'enum' => array( 'publish', 'draft', 'private' ) ),
				'terminos'          => array( 'type' => 'object' ),
				'yoast_titulo'      => array( 'type' => 'string' ),
				'yoast_descripcion' => array( 'type' => 'string' ),
			),
			'callback'            => 'siles_api_traduccion',
		)
	);

	register_rest_route(
		'siles/v1',
		'/terminos',
		array(
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'manage_categories' );
			},
			'args'                => array( 'taxonomia' => array( 'required' => true, 'type' => 'string' ) ),
			'callback'            => function ( $req ) {
				$tax   = (string) $req['taxonomia'];
				$lista = array();
				$terms = get_terms( array( 'taxonomy' => $tax, 'hide_empty' => false, 'suppress_filters' => true ) );
				foreach ( is_wp_error( $terms ) ? array() : $terms as $t ) {
					$datos   = apply_filters( 'wpml_element_language_details', null, array( 'element_id' => $t->term_taxonomy_id, 'element_type' => 'tax_' . $tax ) );
					$lista[] = array(
						'id'     => $t->term_id,
						'nombre' => $t->name,
						'slug'   => $t->slug,
						'idioma' => $datos && ! empty( $datos->language_code ) ? $datos->language_code : null,
					);
				}
				return $lista;
			},
		)
	);

	register_rest_route(
		'siles/v1',
		'/termino',
		array(
			'methods'             => 'POST',
			'permission_callback' => function () {
				return current_user_can( 'manage_categories' );
			},
			'args'                => array(
				'original'    => array( 'required' => true, 'type' => 'integer' ),
				'taxonomia'   => array( 'required' => true, 'type' => 'string' ),
				'idioma'      => $idioma,
				'nombre'      => array( 'required' => true, 'type' => 'string' ),
				'slug'        => array( 'type' => 'string' ),
				'descripcion' => array( 'type' => 'string' ),
			),
			'callback'            => 'siles_api_termino',
		)
	);

	register_rest_route(
		'siles/v1',
		'/menu',
		array(
			'methods'             => 'POST',
			'permission_callback' => function () {
				return current_user_can( 'edit_theme_options' );
			},
			'args'                => array(
				'original'  => array( 'required' => true, 'type' => 'integer' ),
				'idioma'    => $idioma,
				'nombre'    => array( 'required' => true, 'type' => 'string' ),
				'elementos' => array( 'required' => true, 'type' => 'array' ),
			),
			'callback'            => 'siles_api_menu',
		)
	);
}
add_action( 'rest_api_init', 'siles_api_rutas' );

/**
 * Cadenas de WPML String Translation (textos de plugins como Complianz y Yoast, lema del sitio, etc.).
 *   GET  /wp-json/siles/v1/cadenas?contexto=…&buscar=…   Cadenas con sus traducciones (contextos, si no se indica ninguno).
 *   POST /wp-json/siles/v1/cadena                         Guarda la traducción de una cadena: { id, idioma, valor }.
 * Solo administradores. Sin WPML String Translation responden con un error.
 */
function siles_api_rutas_cadenas() {
	$permiso = function () {
		return current_user_can( 'manage_options' );
	};
	register_rest_route(
		'siles/v1',
		'/cadenas',
		array(
			'methods'             => 'GET',
			'permission_callback' => $permiso,
			'args'                => array(
				'contexto' => array( 'type' => 'string' ),
				'buscar'   => array( 'type' => 'string' ),
			),
			'callback'            => function ( $req ) {
				global $wpdb;
				$tabla = $wpdb->prefix . 'icl_strings';
				if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $tabla ) ) !== $tabla ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
					return new WP_Error( 'siles_sin_cadenas', 'WPML String Translation no está activo.', array( 'status' => 409 ) );
				}
				$contexto = (string) $req['contexto'];
				$buscar   = (string) $req['buscar'];
				if ( '' === $contexto && '' === $buscar ) {
					// phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
					return $wpdb->get_results( "SELECT context AS contexto, COUNT(*) AS cadenas FROM {$tabla} GROUP BY context ORDER BY context" );
				}
				$donde = array( '1=1' );
				$vals  = array();
				if ( '' !== $contexto ) {
					$donde[] = 'context = %s';
					$vals[]  = $contexto;
				}
				if ( '' !== $buscar ) {
					$donde[] = '(value LIKE %s OR name LIKE %s)';
					$vals[]  = '%' . $wpdb->esc_like( $buscar ) . '%';
					$vals[]  = '%' . $wpdb->esc_like( $buscar ) . '%';
				}
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQL.NotPrepared
				$filas = $wpdb->get_results( $wpdb->prepare( "SELECT id, context AS contexto, name AS nombre, value AS valor, language AS idioma FROM {$tabla} WHERE " . implode( ' AND ', $donde ) . ' ORDER BY id LIMIT 300', $vals ) );
				foreach ( $filas as $f ) {
					// phpcs:ignore WordPress.DB.DirectDatabaseQuery
					$trads = $wpdb->get_results( $wpdb->prepare( "SELECT language, value, status FROM {$wpdb->prefix}icl_string_translations WHERE string_id = %d", $f->id ) );
					$f->traducciones = array();
					foreach ( $trads as $t ) {
						$f->traducciones[ $t->language ] = array( 'valor' => $t->value, 'estado' => (int) $t->status );
					}
				}
				return $filas;
			},
		)
	);
	register_rest_route(
		'siles/v1',
		'/cadena',
		array(
			'methods'             => 'POST',
			'permission_callback' => $permiso,
			'args'                => array(
				'id'     => array( 'required' => true, 'type' => 'integer' ),
				'idioma' => array( 'required' => true, 'type' => 'string', 'enum' => SILES_API_IDIOMAS ),
				'valor'  => array( 'required' => true, 'type' => 'string' ),
			),
			'callback'            => function ( $req ) {
				if ( ! function_exists( 'icl_add_string_translation' ) ) {
					return new WP_Error( 'siles_sin_cadenas', 'WPML String Translation no está activo.', array( 'status' => 409 ) );
				}
				$idioma = siles_api_codigo( (string) $req['idioma'] );
				$res    = icl_add_string_translation( (int) $req['id'], $idioma, (string) $req['valor'], 10 ); // 10 = traducción completa.
				if ( ! $res ) {
					return new WP_Error( 'siles_cadena', 'WPML no guardó la traducción.', array( 'status' => 500 ) );
				}
				return array( 'id' => (int) $req['id'], 'idioma' => $idioma, 'traduccion' => (int) $res );
			},
		)
	);
}
add_action( 'rest_api_init', 'siles_api_rutas_cadenas' );
