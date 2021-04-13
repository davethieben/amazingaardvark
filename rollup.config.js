import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default 
{
	input: 'src/main.ts',
	output: {
		name: 'app',
		format: 'iife',
		file: 'public/build/bundle.js',
		sourcemap: !production,
	},
	plugins: [
	  
		svelte({
		  include: 'src/**/*.svelte',
		  preprocess: sveltePreprocess({ sourceMap: !production }),
		  compilerOptions: {			  
			// enable run-time checks when not in production
			dev: !production, 
		  }
		}),
	   
		css({ output: 'bundle.css' }),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),		
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
				
		!production && serve({		
			contentBase: 'public',
			port: 8080
		}), 
		
		!production && livereload('src'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
		
	]
}
