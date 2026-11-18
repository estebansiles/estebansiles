<?php
/**
 * Plugin Name: Siles: consentimiento para Meta
 * Description: Retiene el píxel y la API de Conversiones del plugin "Meta pixel for WordPress" hasta que la persona acepte las cookies de marketing en Complianz. Sin consentimiento, el servidor no crea las cookies _fbp ni _fbc ni envía eventos a Meta.
 * Version: 1.0.0
 * Author: Siles Comunicación
 *
 * Va en wp-content/mu-plugins/ porque el plugin de Meta crea las cookies apenas se carga, antes que el tema y que
 * los plugins normales; un plugin obligatorio (mu-plugin) se carga antes que todos ellos.
 *
 * @package siles-divi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ¿Aceptó la persona las cookies de marketing?
 * Complianz guarda la elección en la cookie cmplz_marketing; la WP Consent API, en wp_consent_marketing.
 *
 * @return bool
 */
function siles_consentimiento_marketing() {
	foreach ( array( 'cmplz_marketing', 'wp_consent_marketing' ) as $cookie ) {
		if ( isset( $_COOKIE[ $cookie ] ) && 'allow' === $_COOKIE[ $cookie ] ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			return true;
		}
	}
	return false;
}

/*
 * El plugin de Meta pregunta este filtro antes de crear _fbp y _fbc, antes de imprimir el píxel y antes de enviar
 * eventos por la API de Conversiones. Mientras devuelve true, todo queda retenido.
 */
add_filter(
	'facebook_signals_held',
	function ( $retenido ) {
		return siles_consentimiento_marketing() ? $retenido : true;
	},
	99
);
