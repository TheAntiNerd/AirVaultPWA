import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [
		react(),
		svgr({
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
			include: '**/*.svg',
		}),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true, // Enable PWA in development
				type: 'module', // Ensure modern module compatibility
				navigateFallback: 'index.html', // Fallback to SPA entry point
			},
			manifest: {
				name: 'AirVault Dashboard',
				short_name: 'AirVault Dash',
				description: 'AirVault Dashboard to manage your personal AirVault. Version: 0.0.1',
				theme_color: '#FFFFFF',
				icons: [
					{
						src: '/icon192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icon512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			workbox: {
				// Add skipWaiting and clientsClaim for immediate updates
				skipWaiting: true,
				clientsClaim: true,
				navigateFallback: 'index.html',
				navigateFallbackDenylist: [/^\/api/, /\.html$/], // Denylist specific paths or .html caching
				runtimeCaching: [
					{
						urlPattern: /\.html(\?.*)?$/,
						handler: 'NetworkOnly', // Always try the network first for HTML
						options: {
							cacheName: 'html-cache',
						},
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'image-cache',
							expiration: {
								maxEntries: 50, // Limit to 50 images
								maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
							},
						},
					},
					{
						urlPattern: /\.(?:css|js)$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'asset-cache-1',
							expiration: {
								maxEntries: 30, // Cache up to 30 CSS/JS files
								maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
							},
						},
					},
					{
						urlPattern: /\.(?:woff2|woff|ttf|otf|eot)$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'font-cache-1',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 24 * 60 * 60, // Cache for 60 days
							},
						},
					},
				],
				cleanupOutdatedCaches: true, // Remove old caches automatically
			},
			// injectRegister: 'auto', // Ensures SW is registered automatically
			// injectManifest: {
			// 	globPatterns: ['**/*.{js,css,png,svg}'], // Adjust as needed
			// },
		}),
	],
});
