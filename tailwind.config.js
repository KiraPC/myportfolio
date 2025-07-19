/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
				'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
				'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
				'pulse-gentle': 'pulse 2s infinite'
			},
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				fadeInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
			}
		}
	},
	plugins: []
}
