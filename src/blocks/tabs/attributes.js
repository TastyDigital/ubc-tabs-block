/**
 * BLOCK: Call To Action - Attributes
 */

import { v4 as uuidv4 } from 'uuid';

const attributes = {
	tabs: {
		type: 'array',
		default: [
			{
				title: 'Tab1',
				id: uuidv4(),
			},
			{
				title: 'Tab2',
				id: uuidv4()
			} ],
	},
	initialTabSelected: {
		type: 'number',
		default: 0,
	},		
	sideTabLayout: {
		type: "boolean",
		default: false,
	},
	styleString:{
		type: "string",
		default: "plain",
	},	
	blockInitialized: {
		type: 'boolean',
		default: false,
	}
};

export default attributes;
