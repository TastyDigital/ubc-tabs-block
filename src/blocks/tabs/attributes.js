/**
 * BLOCK: Call To Action - Attributes
 */

const attributes = {
	tabTitles: {
		type: 'array',
		default: [ 'Tab1', 'Tab2' ],
	},
	initialTabSelected: {
		type: 'number',
		default: 0,
	},		
	sideTabLayout: {
		type: "boolean",
		default: false
	},
	styleString:{
		type: "string",
		default: "plain"	
	}
};

export default attributes;
