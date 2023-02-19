/**
 * BLOCK: Call To Action.
 */

// Import block dependencies and components.
import attributes from './attributes';
import Edit from './edit';
import Save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'ubc/tabs', {
	title: __( 'UBC Tabs Block', 'ubc-tabs' ),
	description: __( 'Add accessible tabs of content which convert to accordions on smaller screens.', 'ubc-tabs' ),
	icon: () => {
		return <svg enableBackground="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32" x="0" /></g><g id="tab"><path d="M30,10V6h-8v4h-2V6h-8v4H10V6H0v20h32V10H30z M29.999,24.001H2V8h6v3.999h21.999V24.001z" /></g></svg>;
	},
	keywords: [ __( 'tabs' ), __( 'ubc-tabs' ) ],
	category: 'layout',
	attributes,
	supports: {
		// Declare support for block's alignment.
		// This adds support for all the options:
		// left, center, right, wide, and full.
		align: ['wide']
	},
	edit: Edit,
	save: Save,
} );
