<?php
/**
 * Cotizador: [siles_cotizador]
 *
 * Lista de servicios con casillas y una cotización en borrador que se arma en vivo (assets/siles-cotizador.js).
 * Sin JavaScript sigue funcionando como formulario normal. El envío llega por correo a SILES_DIVI_CORREO
 * (filtro siles_cotizacion_destino). No guarda datos en la base: solo envía el correo,
 * con el consentimiento según la Ley 8968.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Servicios que se pueden cotizar.
 *
 * @return array<string, array{icono:string, concepto:string, detalle:string, alcance:string}>
 */
function siles_cotizador_oferta( $traducir = true ) {
	$oferta = array(
		'transformacion' => array( 'icono' => 'transformacion-digital', 'concepto' => 'Transformación digital', 'detalle' => 'Ordeno tus procesos y elijo con vos las herramientas.', 'alcance' => 'Diagnóstico de procesos, selección de herramientas y plan por fases.' ),
		'automatizacion' => array( 'icono' => 'automatizacion', 'concepto' => 'Automatización', 'detalle' => 'Flujos que corren solos.', 'alcance' => 'Mapa de procesos y priorización, integración entre sistemas existentes y capacitación para tu equipo.' ),
		'marketing'      => array( 'icono' => 'marketing', 'concepto' => 'Marketing digital', 'detalle' => 'Estrategia, contenido y medición.', 'alcance' => 'Estrategia y calendario de contenido, pauta en redes y buscadores, y tablero de resultados mensual.' ),
		'ux'             => array( 'icono' => 'experiencia-usuario', 'concepto' => 'Experiencia de usuario', 'detalle' => 'Sitios y aplicaciones pensados para quien los usa.', 'alcance' => 'Entrevistas y pruebas con usuarios, prototipos navegables y guía de diseño para desarrollo.' ),
		'factura'        => array( 'icono' => 'factura-electronica', 'concepto' => 'Factura electrónica', 'detalle' => 'Facturación conectada con tu operación.', 'alcance' => 'Integración de la facturación con tu contabilidad y tu sistema de ventas.' ),
		'agentes'        => array( 'icono' => 'agente-ia', 'concepto' => 'Agentes de IA', 'detalle' => 'Asistentes que atienden por vos.', 'alcance' => 'Asistentes que responden, agendan y dan seguimiento a tus clientes.' ),
	);
	if ( $traducir ) {
		foreach ( $oferta as $id => $o ) {
			foreach ( array( 'concepto', 'detalle', 'alcance' ) as $campo ) {
				$oferta[ $id ][ $campo ] = siles_t( $o[ $campo ] );
			}
		}
	}
	return $oferta;
}

/**
 * Marcado del cotizador.
 *
 * @return string
 */
function siles_cotizador_shortcode() {
	wp_enqueue_script( 'siles-cotizador' );
	$oferta  = siles_cotizador_oferta();
	$estado  = isset( $_GET['cotizacion'] ) ? sanitize_key( wp_unslash( $_GET['cotizacion'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- solo muestra un aviso.
	$elegidas = array( 'transformacion', 'automatizacion' );

	ob_start();
	if ( 'enviada' === $estado ) {
		echo '<div class="siles-aviso siles-aviso--exito" role="status" id="cotizacion"><span class="siles-aviso__estado">' . esc_html( siles_t( 'Listo' ) ) . '</span><span class="siles-aviso__texto">' . esc_html( siles_t( 'Recibí tu solicitud. Te escribo en menos de 24 horas.' ) ) . '</span></div>';
	} elseif ( 'error' === $estado ) {
		echo '<div class="siles-aviso siles-aviso--error" role="alert" id="cotizacion"><span class="siles-aviso__estado">' . esc_html( siles_t( 'Error' ) ) . '</span><span class="siles-aviso__texto">' . esc_html( sprintf( siles_t( 'No pude enviar tu solicitud. Revisá que elegiste al menos un servicio, tu nombre, un correo válido y el consentimiento, o escribime a %s.' ), siles_cotizador_destino() ) ) . '</span></div>';
	}
	?>
	<form class="siles-cotizador" id="cotizador" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
		<input type="hidden" name="action" value="siles_cotizacion">
		<input type="hidden" name="idioma" value="<?php echo esc_attr( siles_idioma() ); ?>">
		<input type="hidden" name="volver" value="<?php echo esc_url( get_permalink() ); ?>">
		<div class="siles-cotizador__trampa" aria-hidden="true"><label>Sitio web <input type="text" name="sitio_web" tabindex="-1" autocomplete="off"></label></div>

		<fieldset class="siles-cotizador__opciones">
			<legend class="siles-antetitulo"><?php echo esc_html( siles_t( 'Elegí los servicios' ) ); ?></legend>
			<?php foreach ( $oferta as $id => $o ) : ?>
				<div class="siles-cotizador__opcion">
					<label class="siles-casilla">
						<input type="checkbox" name="servicios[]" value="<?php echo esc_attr( $id ); ?>" data-concepto="<?php echo esc_attr( $o['concepto'] ); ?>" data-alcance="<?php echo esc_attr( $o['alcance'] ); ?>" data-icono="<?php echo esc_attr( $o['icono'] ); ?>" <?php checked( in_array( $id, $elegidas, true ) ); ?>>
						<span><?php echo esc_html( $o['concepto'] ); ?></span>
					</label>
					<span class="siles-cotizador__detalle"><?php echo esc_html( $o['detalle'] ); ?></span>
				</div>
			<?php endforeach; ?>
		</fieldset>

		<article class="siles-cotizador__hoja siles-papel" aria-labelledby="cotizador-titulo">
			<div class="siles-cotizador__marca">
				<img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/marca/logo-color.svg' ); ?>" alt="Siles Comunicación" width="97" height="40">
				<span class="siles-estado"><?php echo esc_html( siles_t( 'Borrador' ) ); ?></span>
			</div>
			<h2 id="cotizador-titulo"><?php echo esc_html( siles_t( 'Servicios que querés cotizar' ) ); ?></h2>
			<div class="siles-cotizador__partidas" data-partidas>
				<div class="siles-cotizador__cabeza"><span><?php echo esc_html( siles_t( 'Servicio y alcance' ) ); ?></span><span role="status" data-cuenta><?php echo esc_html( sprintf( siles_t( '%d servicios' ), count( $elegidas ) ) ); ?></span></div>
				<?php foreach ( $elegidas as $id ) : ?>
					<div class="siles-cotizador__partida">
						<?php echo siles_divi_icono( array( 'nombre' => $oferta[ $id ]['icono'], 'tamano' => 32 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- marcado fijo del sistema. ?>
						<div><h3><?php echo esc_html( $oferta[ $id ]['concepto'] ); ?></h3><p><?php echo esc_html( $oferta[ $id ]['alcance'] ); ?></p></div>
					</div>
				<?php endforeach; ?>
			</div>
			<div class="siles-aviso siles-aviso--alerta" data-vacio hidden><span class="siles-aviso__estado"><?php echo esc_html( siles_t( 'Atención' ) ); ?></span><span class="siles-aviso__texto"><?php echo esc_html( siles_t( 'Marcá al menos un servicio para armar tu cotización.' ) ); ?></span></div>
			<p class="siles-nota"><?php echo wp_kses_post( siles_t( 'Te envío los montos en colones, con el IVA del 13&nbsp;% en fila aparte, después de una llamada de 30 minutos.' ) ); ?></p>

			<div class="siles-cotizador__datos">
				<label class="siles-campo"><span class="siles-campo__etiqueta"><?php echo esc_html( siles_t( 'Nombre' ) ); ?></span><input class="siles-campo__control" type="text" name="nombre" autocomplete="name" required placeholder="<?php echo esc_attr( siles_t( 'Tu nombre' ) ); ?>"></label>
				<label class="siles-campo"><span class="siles-campo__etiqueta"><?php echo esc_html( siles_t( 'Correo' ) ); ?></span><input class="siles-campo__control" type="email" name="correo" autocomplete="email" required placeholder="<?php echo esc_attr( siles_t( 'nombre@empresa.cr' ) ); ?>"></label>
				<label class="siles-campo siles-campo--ancho"><span class="siles-campo__etiqueta"><?php echo esc_html( siles_t( 'Algo más que deba saber (opcional)' ) ); ?></span><textarea class="siles-campo__control" name="comentario" rows="3" placeholder="<?php echo esc_attr( siles_t( 'Plazos, presupuesto, sistemas que ya usás' ) ); ?>"></textarea></label>
				<label class="siles-casilla siles-campo--ancho"><input type="checkbox" name="consentimiento" value="1" required><span><?php echo esc_html( siles_t( 'Acepto que Siles Comunicación use estos datos solo para responder esta solicitud, según la Ley 8968.' ) ); ?></span></label>
			</div>

			<div class="siles-cotizador__acciones">
				<button type="submit" class="siles-boton siles-boton--flecha" data-enviar><?php echo esc_html( siles_t( 'Pedí esta cotización' ) ); ?></button>
				<a class="siles-enlace" href="<?php echo esc_url( siles_enlace( '/contacto/' ) ); ?>"><?php echo esc_html( siles_t( 'Prefiero conversarlo' ) ); ?></a>
			</div>
		</article>
	</form>
	<?php
	return ob_get_clean();
}
add_shortcode( 'siles_cotizador', 'siles_cotizador_shortcode' );

/**
 * Registra el script; se encola solo en páginas con el shortcode.
 */
function siles_cotizador_script() {
	wp_register_script( 'siles-cotizador', get_stylesheet_directory_uri() . '/assets/siles-cotizador.js', array(), SILES_DIVI_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
	wp_localize_script(
		'siles-cotizador',
		'silesCotizador',
		array(
			'iconos' => include __DIR__ . '/iconos-data.php',
			'uno'    => siles_t( '1 servicio' ),
			'varios' => siles_t( '%d servicios' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'siles_cotizador_script' );

/**
 * Correo que recibe las solicitudes.
 *
 * @return string
 */
function siles_cotizador_destino() {
	return apply_filters( 'siles_cotizacion_destino', SILES_DIVI_CORREO );
}

/**
 * Recibe el formulario, valida y envía el correo. Siempre vuelve a la página del cotizador.
 */
function siles_cotizador_recibir() {
	// phpcs:disable WordPress.Security.NonceVerification.Missing -- formulario público sin sesión; las páginas se sirven desde caché, así que un nonce caducaría.
	$volver = isset( $_POST['volver'] ) ? esc_url_raw( wp_unslash( $_POST['volver'] ) ) : home_url( '/cotizacion/' );
	$volver = wp_validate_redirect( $volver, home_url( '/cotizacion/' ) );

	// Trampa para bots: un humano no ve ni llena este campo.
	if ( ! empty( $_POST['sitio_web'] ) ) {
		wp_safe_redirect( add_query_arg( 'cotizacion', 'enviada', $volver ) . '#cotizacion' );
		exit;
	}

	$oferta    = siles_cotizador_oferta( false );
	$idioma    = isset( $_POST['idioma'] ) ? sanitize_key( wp_unslash( $_POST['idioma'] ) ) : 'es';
	$servicios = isset( $_POST['servicios'] ) ? array_intersect( array_map( 'sanitize_key', (array) wp_unslash( $_POST['servicios'] ) ), array_keys( $oferta ) ) : array();
	$nombre    = isset( $_POST['nombre'] ) ? sanitize_text_field( wp_unslash( $_POST['nombre'] ) ) : '';
	$correo    = isset( $_POST['correo'] ) ? sanitize_email( wp_unslash( $_POST['correo'] ) ) : '';
	$nota      = isset( $_POST['comentario'] ) ? sanitize_textarea_field( wp_unslash( $_POST['comentario'] ) ) : '';
	$acepta    = ! empty( $_POST['consentimiento'] );
	// phpcs:enable

	if ( ! $servicios || '' === $nombre || ! is_email( $correo ) || ! $acepta ) {
		wp_safe_redirect( add_query_arg( 'cotizacion', 'error', $volver ) . '#cotizacion' );
		exit;
	}

	$lineas = array( 'Nueva solicitud de cotización desde ' . home_url(), '', 'Nombre: ' . $nombre, 'Correo: ' . $correo, 'Idioma de la página: ' . $idioma, '', 'Servicios:' );
	foreach ( $servicios as $id ) {
		$lineas[] = '- ' . $oferta[ $id ]['concepto'] . ': ' . $oferta[ $id ]['alcance'];
	}
	if ( '' !== $nota ) {
		$lineas[] = '';
		$lineas[] = 'Comentario:';
		$lineas[] = $nota;
	}
	$lineas[] = '';
	$lineas[] = 'Consentimiento (Ley 8968): aceptado el ' . wp_date( 'j/n/Y H:i' ) . '.';

	$enviado = wp_mail(
		siles_cotizador_destino(),
		'Cotización: ' . $nombre,
		implode( "\n", $lineas ),
		array( 'Reply-To: ' . $nombre . ' <' . $correo . '>' )
	);

	wp_safe_redirect( add_query_arg( 'cotizacion', $enviado ? 'enviada' : 'error', $volver ) . '#cotizacion' );
	exit;
}
add_action( 'admin_post_nopriv_siles_cotizacion', 'siles_cotizador_recibir' );
add_action( 'admin_post_siles_cotizacion', 'siles_cotizador_recibir' );
