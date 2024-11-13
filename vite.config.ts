import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true, // Enable PWA in development
			},
			manifest: {
				name: 'Your App Name',
				short_name: 'App Name',
				description: 'Description of your app',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
						handler: 'CacheFirst',
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
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'asset-cache',
							expiration: {
								maxEntries: 30, // Cache up to 30 CSS/JS files
								maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
							},
						},
					},
					{
						urlPattern: /\.(?:woff2|woff|ttf|otf|eot)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'font-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 24 * 60 * 60, // Cache for 60 days
							},
						},
					},
				],
			},
		}),
	],
});
